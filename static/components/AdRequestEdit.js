export default {
    template: `
    <div>
        <div class="row">
            <div class="col">
                <input type="text" placeholder="Messages" v-model="adRequest.messages" />
                <input type="text" placeholder="Requirements" v-model="adRequest.requirements" />
                <input type="number" placeholder="Payment Amount" v-model="adRequest.payment_amount" />
                <select id="status" class="form-select" v-model="adRequest.status">
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
                <button @click="editAdRequest">Submit edited AdRequest</button>
            </div>
        </div>
  
      <div v-if="error" class="alert alert-danger">
        Error: {{ error }}
      </div>
    </div>`,
  
    data() {
      return {
        adRequest: {
          campain_id: '',
          messages: '',
          requirements: '',
          payment_amount: '',
          status: '',
        },
        token: localStorage.getItem('auth-token'),
        error: null,
      }
    },
  
    methods: {
      async fetchAdRequest(id) {
        try {
          const res = await fetch(`/api/ad_request/${id}`, {
            headers: {
              'Authentication-Token': this.token,
            },
          });
  
          if (res.ok) {
            const data = await res.json();
            this.adRequest.campain_id = data.campain_id;
            this.adRequest.messages = data.messages;
            this.adRequest.requirements = data.requirements;
            this.adRequest.payment_amount = data.payment_amount;
            this.adRequest.status = data.status;
          } else {
            this.error = `Error ${res.status}: ${res.statusText}`;
          }
        } catch (error) {
          console.error('Failed to fetch AdRequest:', error);
          this.error = 'Failed to fetch AdRequest.';
        }
      },
      async editAdRequest() {
        try {
          const url = `/api/ad_request/${this.$route.params.id}`;
          const res = await fetch(url, {
            method: 'PUT',
            headers: {
              'Authentication-Token': this.token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.adRequest),
          });
  
          const data = await res.json();
  
          if (res.ok) {
            alert(data.message);
            this.$router.push({ path: '/adrequests' });
          } else {
            console.error('Error:', data);
            alert(`Error: ${data.message || 'An unknown error occurred'}`);
          }
        } catch (error) {
          console.error('Request failed:', error);
          alert('An error occurred while updating the AdRequest.');
        }
      }
    },
  
    mounted() {
      const adRequestId = this.$route.params.id;
      this.fetchAdRequest(adRequestId);
    }
  }
  