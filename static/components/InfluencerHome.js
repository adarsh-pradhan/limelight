export default {
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">Welcome Influencer</h3>
            </div>
          </div>

          <!-- Ad Requests Section -->
          <div v-if="adRequests.length" class="mt-4">
            <h3 class="mb-4 text-center">Ad Requests</h3>
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 mb-4" v-for="adRequest in adRequests" :key="adRequest.id">
                <div class="ad-request-card card shadow">
                  <div class="card-body text-center">
                    <p class="card-text"><strong>Messages:</strong> {{ adRequest.messages }}</p>
                    <p class="card-text"><strong>Requirements:</strong> {{ adRequest.requirements }}</p>
                    <p class="card-text"><strong>Payment Amount:</strong> {{ adRequest.payment_amount }}</p>
                    <p class="card-text"><strong>Status:</strong> {{ adRequest.status }}</p>
                    <button class="btn btn-warning" @click="negotiateAdRequest(adRequest.id)" v-if="adRequest.status=='Pending'">Negotiate payment</button>
                    <button class="btn btn-success" @click="acceptAdRequest(adRequest.id)" v-if="adRequest.status=='Pending'">Accept</button>
                    <button class="btn btn-danger" @click="rejectAdRequest(adRequest.id)" v-if="adRequest.status=='Pending'">Reject</button>
                  </div>
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
      activeCampaigns: [],
      token: localStorage.getItem('auth-token'),
      error: null,
      adRequests: [],
      creator_id: localStorage.getItem('user-id'),
    };
  },

  async created() {
    await this.fetchCampaigns();
    await this.fetchAdRequests();
  },

  methods: {
    async fetchCampaigns() {
      try {
        const res = await fetch(`/api/campaign`, {
          headers: {
            'Authentication-Token': this.token,
          },
        });

        if (res.ok) {
          const data = await res.json();
          this.allCampaigns = data; // Adjust based on your actual API response format
        } else {
          this.error = `Error ${res.status}: ${res.statusText}`;
        }
      } catch (error) {
        console.error('Failed to fetch campaigns:', error);
        this.error = 'Failed to fetch campaigns.';
      }
    },

    async fetchAdRequests() {
      try {
        const res = await fetch(`/api/ad_request`, {
          headers: {
            'Authentication-Token': this.token,
          },
        });

        if (res.ok) {
          const data = await res.json();
          this.adRequests = data; // Adjust based on your actual API response format
        } else {
          this.error = `Error ${res.status}: ${res.statusText}`;
        }
      } catch (error) {
        console.error('Failed to fetch ad requests:', error);
        this.error = 'Failed to fetch ad requests.';
      }
    },

    async acceptAdRequest(id) {
      await this.updateAdRequestStatus(id, 'Accepted');
    },

    async rejectAdRequest(id) {
      await this.updateAdRequestStatus(id, 'Rejected');
    },

    async negotiateAdRequest(id) {
      // Implement negotiation logic if needed
      // For now, just showing a prompt for demo purposes
      const newPaymentAmount = prompt('Enter new payment amount:');
      if (newPaymentAmount) {
        await this.updateAdRequestStatus(id, 'Accepted', newPaymentAmount);
      }
    },

    async updateAdRequestStatus(id, status, paymentAmount = null) {
      try {
        const res = await fetch(`/api/ad_request/${id}`, {
          method: 'PUT',
          headers: {
            'Authentication-Token': this.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status, payment_amount: paymentAmount }),
        });

        const data = await res.json();

        if (res.ok) {
          alert(data.message);
          this.fetchAdRequests(); // Refresh the ad requests list
        } else {
          console.error('Error:', data);
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Request failed:', error);
        this.error = error.toString();
      }
    },
    
    viewCampaign(campaign_id) {
      this.$router.push({ name: 'campaign-view', params: { id: campaign_id } });
    },
  },
}
