export default {
    template: `
      <div class="container mt-4">
        <div class="row">
          <div class="col-md-8">
            <div class="card mb-4">
              <div class="card-body">
                <h3 class="card-title">Find Influencers</h3>
              </div>
            </div>
  
            <form class="d-flex mb-4" @submit.prevent="searchItems">
              <input v-model="searchQuery" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
  
            <div v-if="searchResults.influencers" class="card mb-4">
              <div class="card-body">
                <h4 class="card-title">Search Results</h4>
  
                <div v-if="searchResults.influencers">
                  <h5>Influencers:</h5>
                  <div v-for="influencer in searchResults.influencers" :key="influencer.id" class="row mb-3">
                    <div class="col">
                      <p>{{ influencer.username }} | {{ influencer.niche }}</p>
                    </div>
                    <div class="col text-end">
                      <button class="btn btn-success mt-3" @click="adRequestForm(influencer.user_id)">Send AdRequest</button>
                    </div>
                  </div>
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
        searchQuery: '',
        searchResults: {
          influencers: []
        },
        token: localStorage.getItem('auth-token'),
        error: null,
      };
    },
  
    methods: {
      adRequestForm(influencer_id) {
        this.$router.push({ name: 'sponsor-adRequest-form', params: { id: influencer_id } });
      },
      async searchItems() {
        if (!this.searchQuery) {
          this.error = 'Please enter a search query.';
          return;
        }
  
        try {
          const response = await fetch(`/api/search?search=${encodeURIComponent(this.searchQuery)}`, {
            headers: {
              'Authentication-Token': this.token,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            this.searchResults = {
              influencers: data.influencers || []
            };
          } else {
            this.error = `Error fetching data: ${response.statusText}`;
          }
        } catch (error) {
          console.error('Failed to fetch search results:', error);
          this.error = 'Failed to fetch search results.';
        }
      },
  
      viewItem(item, type) {
        const routeName = type === 'campaign' ? 'campaign-view' : 'ad-request-view';
        this.$router.push({ name: routeName, params: { id: item.id } });
      },
  
      requestCampaign(campaign_id) {
        // Implement the request logic here
      },
    },
  }
  