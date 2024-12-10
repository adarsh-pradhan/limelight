export default {
  template: `
    <div class="container mt-4 d-flex justify-content-center">
      <div class="w-75">
        <div v-if="error" class="alert alert-danger text-center">
          Error: {{ error }}
        </div>

        <div v-else-if="campaign" class="campaign-card card mb-4 shadow">
          <div class="card-header text-center">
            <h2>{{ campaign.title }}</h2>
          </div>
          <div class="card-body text-center">
            <p class="card-text">{{ campaign.description }}</p>
            <p class="card-text"><strong>Niche:</strong> {{ campaign.niche }}</p>
            <p class="card-text"><strong>Budget:</strong> {{ campaign.budget }}</p>
            <p class="card-text"><strong>Goals:</strong> {{ campaign.goals }}</p>
            <button class="btn btn-success mt-3" @click="adRequestForm(campaign.id)" v-if="role=='influencer'">Send AdRequest</button>
          </div>
        </div>

        <div v-if="adRequests.length" class="mt-4">
          <h3 class="mb-4 text-center">Associated Ad Requests</h3>
          <div class="row justify-content-center">

            <div class="col-lg-4 col-md-6 mb-4" v-for="adRequest in adRequests" :key="adRequest.id">
              <div class="ad-request-card card shadow">
                <div class="card-body text-center">
                  <p class="card-text"><strong>Messages:</strong> {{ adRequest.messages }}</p>
                  <p class="card-text"><strong>Requirements:</strong> {{ adRequest.requirements }}</p>
                  <p class="card-text"><strong>Payment Amount:</strong> {{ adRequest.payment_amount }}</p>
                  <p class="card-text"><strong>Status:</strong> {{ adRequest.status }}</p>
                  <button class="btn btn-warning" @click="editAdRequest(adRequest.id)">Edit</button>
                  <button class="btn btn-danger" @click="deleteAdRequest(adRequest.id)">Delete</button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  `,

  data() {
    return {
      campaign: null,
      adRequests: [],
      error: null,
      role: localStorage.getItem('role'),
    };
  },

  async created() {
    const campaignId = this.$route.params.id;
    try {
      const res = await fetch(`/api/campaign/${campaignId}`, {
        headers: {
          'Authentication-Token': localStorage.getItem('auth-token'),
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
    editAdRequest(adRequest_id) {
      this.$router.push({ name: 'adRequest-edit', params: { id : adRequest_id } });
    },
    adRequestForm(campaign_id) {
      this.$router.push({ name: 'adRequest-form', params: { id: campaign_id } });
    },
    async deleteAdRequest(id) {
      try {
        const res = await fetch(`/api/ad_request/${id}`, {
          method: 'DELETE',
          headers: {
            'Authentication-Token': localStorage.getItem('auth-token'),
          },
        });
  
        if (res.ok) {
          const data = await res.json();
          alert(data.message);
          // Update the adRequests list after deletion
          this.fetchAdRequests();
        } else {
          const errorData = await res.json();
          console.error('Error:', errorData);
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Request failed:', error);
        alert('Request failed. Please try again.');
      }
    },
    async fetchAdRequests() {
      const campaignId = this.$route.params.id;
      try {
        const res = await fetch(`/api/campaign/${campaignId}`, {
          headers: {
            'Authentication-Token': localStorage.getItem('auth-token'),
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
    }
  }
  
};
