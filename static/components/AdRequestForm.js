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
        campaign: null,
        adRequest: {
          messages: '',
          requirements: '',
          payment_amount: '',
          campaign_id: null,
        },
        token: localStorage.getItem('auth-token'),
        error: null,
      };
    },
    async created() {
      
      
    },
  
    async created() {

      this.adRequest.campaign_id = this.$route.params.id;

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
      async createAdRequest() {
        if (!this.adRequest.messages || !this.adRequest.requirements || !this.adRequest.payment_amount || !this.adRequest.campaign_id) {
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
            body: JSON.stringify(this.adRequest),
          });
  
          const data = await res.json();
          if (res.ok) {
            alert(data.message);
            this.$router.push({ name: 'campaign-view', params: { id: this.$route.params.id } });
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
  