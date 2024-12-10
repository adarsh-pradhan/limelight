export default {
    template: `
        <div class="container mt-4">

            <div class="row">
                <div class="col-md-6">
                    <div class="card mb-4">
                        Graphs
                    </div>
                </div>
                <div class="col-md-6">
                    More statistics
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
  
      
  
      viewCampaign(campaign_id) {
        this.$router.push({ name: 'campaign-view', params: { id: campaign_id } });
      },
    },
  
    async mounted() {
      this.fetchCampaigns();
    },
  }
  