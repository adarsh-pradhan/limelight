export default {
  template: `
  <div>
    <div class="row">
      <div class="col">
        <input type="text" placeholder="Title" v-model="campaign.title"/>
        <input type="text" placeholder="Description" v-model="campaign.description" />
        <input type="text" placeholder="Niche" v-model="campaign.niche" />
        <input type="text" placeholder="Budget" v-model="campaign.budget" />
        <input type="text" placeholder="Goals" v-model="campaign.goals" />
        <button @click="editCampaign">Submit edited campaign</button>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger">
      Error: {{ error }}
    </div>
  </div>`,

  data() {
    return {
      campaign: {
        title: '',
        description: '',
        niche: '',
        budget: '',
        goals: '',
        campaign_id: '',
      },
      token: localStorage.getItem('auth-token'),
      error: null,
    }
  },

  methods: {
    async fetchCampaign(id) {
      try {
        const res = await fetch(`/api/campaign/${id}`, {
          headers: {
            'Authentication-Token': this.token,
          },
        });

        if (res.ok) {
          const data = await res.json();
          this.campaign = data.campaign;
        } else {
          this.error = `Error ${res.status}: ${res.statusText}`;
        }
      } catch (error) {
        console.error('Failed to fetch campaign:', error);
        this.error = 'Failed to fetch campaign.';
      }
    },
    async editCampaign() {
      
      try {
        console.log('Editing campaign with ID:', this.$route.params.id);
        const url = `/api/campaign/${this.$route.params.id}`;
        console.log('Request URL:', url);
    
        const res = await fetch(url, {
          method: 'PUT',
          headers: {
            'Authentication-Token': this.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.campaign),
        });
    
        if (res.ok) {
          alert(data.message);
          this.$router.push({ path: '/campaigns' });
        } else {
          console.error('Error:', data);
          alert(`Error: ${data.message || 'An unknown error occurred'}`);
        }
      } catch (error) {
        console.error('Request failed:', error);
        alert('An error occurred while updating the campaign.');
      }
    }
    
  },

  mounted() {
    const campaignId = this.$route.params.id;
    this.fetchCampaign(campaignId);
  }
}
