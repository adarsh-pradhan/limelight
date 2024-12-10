export default {
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">Welcome Sponsor</h3>
            </div>
          </div>

          <!-- Active Campaigns Section -->
          <div v-if="allCampaigns" class="card mb-4">
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
          </div>

          <!-- Ad Requests Section -->
          <div v-if="adRequests" class="card">
            <div class="card-body">
              <h4 class="card-title">New Requests</h4>
              <div v-for="request in adRequests" :key="request.id" class="row mb-3">
                <div class="col">
                  <p>{{ request.campaign_id }} | {{ request.influencer_id }}</p>
                </div>
                <div class="col text-end">
                  <button type="button" class="btn btn-warning">View</button>
                  <button type="button" class="btn btn-success">Accept</button>
                  <button type="button" class="btn btn-danger">Reject</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Error Message -->
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
      adRequests: [],
    };
  },
  async created() {
    try {
      const res = await fetch(`/api/campaign`, {
        headers: {
          'Authentication-Token': this.token,
        },
      });
      if (res.ok) {
        const data = await res.json();
        this.campaign = data.campaign;
        this.adRequests = data.adRequests;
      } else {
        this.error = `Error ${res.status}: ${res.statusText}`;
      }
    } catch (error) {
      console.error('Failed to fetch campaign details:', error);
      this.error = 'Failed to fetch campaign details.';
    }
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
      this.$router.push({ name: 'campaign-edit', params: { id: campaign_id } });
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
  },

  mounted() {
    this.fetchCampaigns();
  },
}
