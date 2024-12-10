export default {
  template: `
    <div class="container mt-4">
      <div class="row mb-3">
        <div class="col text-center">
          <router-link to="/campaign-form" class="btn btn-primary">Add Campaign</router-link>
          <button class="btn btn-info mt-2" @click="downloadCsv">Download Campaign CSV</button>
        </div>
      </div>

      <div class="row">
        <div v-for="campaign in allCampaigns" :key="campaign.id" class="col-md-12 mb-3">
          <div class="card border-primary">
            <div class="card-body">
              <h5 class="card-title">{{ campaign.title }}</h5>
              <div class="d-flex justify-content-between">
                <button class="btn btn-success" @click="viewCampaign(campaign.id)">View</button>
                <button class="btn btn-warning" @click="editCampaign(campaign.id)">Edit</button>
                <button class="btn btn-danger" @click="deleteCampaign(campaign.id)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="error" class="alert alert-danger mt-3 text-center">
        Error: {{ error }}
      </div>
    </div>
  `,

  data() {
    return {
      allCampaigns: [],
      token: localStorage.getItem('auth-token'),
      error: null,
    };
  },

  methods: {
    async fetchCampaigns() {
      try {
        const res = await fetch('/api/campaign', {
          headers: {
            'Authentication-Token': this.token,
          },
        });

        if (res.ok) {
          const data = await res.json();
          this.allCampaigns = data;
        } else {
          this.error = `Error ${res.status}: ${res.statusText}`;
        }
      } catch (error) {
        console.error('Failed to fetch campaigns:', error);
        this.error = 'Failed to fetch campaigns.';
      }
    },

    async editCampaign(campaign_id) {
      this.$router.push({ name: 'campaign-edit', params: { id : campaign_id } });
    },

    async deleteCampaign(id) {
      try {
        const res = await fetch(`/api/campaign/${id}`, {
          method: 'DELETE',
          headers: {
            'Authentication-Token': this.token,
          },
        });

        const data = await res.json();

        if (res.ok) {
          alert(data.message);
          this.fetchCampaigns();
        } else {
          console.error('Error:', data);
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Request failed:', error);
      }
    },

    viewCampaign(campaign_id) {
      this.$router.push({ name: 'campaign-view', params: { id: campaign_id } });
    },

    async downloadCsv() {
      try {
        const res = await fetch('/download-csv', {
          method: 'GET',
          headers: {
            'Authentication-Token': this.token,
          },
        });

        if (res.ok) {
          const { 'task-id': taskId } = await res.json();
          this.checkCsvStatus(taskId);
        } else {
          this.error = `Error ${res.status}: ${res.statusText}`;
        }
      } catch (error) {
        console.error('Failed to request CSV download:', error);
        this.error = 'Failed to request CSV download.';
      }
    },

    async checkCsvStatus(taskId) {
      try {
        const res = await fetch(`/api/get-csv/${taskId}`, {
          headers: {
            'Authentication-Token': this.token,
          },
        });

        if (res.ok) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'campaigns.csv';
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(url);
        } else if (res.status === 404) {
          setTimeout(() => this.checkCsvStatus(taskId), 1000); // Check again in 1 second
        } else {
          this.error = `Error ${res.status}: ${res.statusText}`;
        }
      } catch (error) {
        console.error('Failed to check CSV status:', error);
        this.error = 'Failed to check CSV status.';
      }
    },
  },

  async mounted() {
    this.fetchCampaigns();
  },
}
