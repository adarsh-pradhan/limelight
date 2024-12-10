export default {
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h3 class="mb-4 text-center">Fill the form for Ad Request below</h3>

          <div class="mb-3">
            <label for="messages" class="form-label">Messages</label>
            <input type="text" id="messages" class="form-control" v-model="adRequest.messages" placeholder="Enter messages"/>
          </div>
          <div class="mb-3">
            <label for="requirements" class="form-label">Requirements</label>
            <input type="text" id="requirements" class="form-control" v-model="adRequest.requirements" placeholder="Enter requirements"/>
          </div>
          <div class="mb-3">
            <label for="paymentAmount" class="form-label">Payment Amount</label>
            <input type="number" id="paymentAmount" class="form-control" v-model="adRequest.payment_amount" placeholder="Enter payment amount"/>
          </div>
          <div class="mb-3">
            <label for="campaigns" class="form-label">Select Campaign</label>
            <select id="campaigns" class="form-select" v-model="selectedCampaign">
              <option v-for="campaign in campaigns" :key="campaign.id" :value="campaign.id">
                {{ campaign.title }}
              </option>
            </select>
          </div>
          <div class="text-center">
            <button class="btn btn-primary" @click="createAdRequest">Send Ad Request</button>
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
      campaigns: [],
      selectedCampaign: null,
      adRequest: {
        messages: '',
        requirements: '',
        payment_amount: '',
      },
      token: localStorage.getItem('auth-token'),
      error: null,
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
        this.campaigns = data;
      } else {
        const errorData = await res.json();
        this.error = `Error ${res.status}: ${errorData.message || res.statusText}`;
      }
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
      this.error = 'Failed to fetch campaigns.';
    }
  },

  methods: {
    async createAdRequest() {
      if (!this.adRequest.messages || !this.adRequest.requirements || !this.adRequest.payment_amount || !this.selectedCampaign) {
        alert('All fields are required');
        return;
      }

      try {
        const res = await fetch('/api/ad_request', {
          method: 'POST',
          headers: {
            'Authentication-Token': this.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...this.adRequest,
            campaign_id: this.selectedCampaign,
            influencer_id: this.$route.params.id, // Assuming influencer ID is passed as a route parameter
          }),
        });

        const data = await res.json();
        if (res.ok) {
          alert(data.message);
          this.$router.push({ name: 'campaign-view', params: { id: this.selectedCampaign } });
        } else {
          console.error('Error:', data);
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Request failed:', error);
        this.error = error.toString();
      }
    },
  },
};
