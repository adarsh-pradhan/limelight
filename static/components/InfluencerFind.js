export default {
    template: `
      <div class="container mt-4">
        <div class="row">
          <div class="col-md-8">
            <div class="card mb-4">
              <div class="card-body">
                <h3 class="card-title">Find Campaigns</h3>
              </div>
            </div>
  
            <form class="d-flex mb-4" @submit.prevent="searchItems">
              <input v-model="searchQuery" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
  
            <div v-if="searchResults.campaigns.length || searchResults.ad_requests.length" class="card mb-4">
              <div class="card-body">
                <h4 class="card-title">Search Results</h4>
  
                <div v-if="searchResults.campaigns.length">
                  <h5>Campaigns</h5>
                  <div v-for="campaign in searchResults.campaigns" :key="campaign.id" class="row mb-3">
                    <div class="col">
                      <p>{{ campaign.title }} | {{ campaign.description }}</p>
                    </div>
                    <div class="col text-end">
                      <button type="button" class="btn btn-warning" @click="viewItem(campaign, 'campaign')">View</button>
                    </div>
                  </div>
                </div>
  
                <div v-if="searchResults.ad_requests.length">
                  <h5>Ad Requests</h5>
                  <div v-for="adRequest in searchResults.ad_requests" :key="adRequest.id" class="row mb-3">
                    <div class="col">
                      <p>{{ adRequest.messages }} | {{ adRequest.requirements }}</p>
                    </div>
                    <div class="col text-end">
                      <button type="button" class="btn btn-warning" @click="viewItem(adRequest, 'adRequest')">View</button>
                      <button v-if="adRequest.campaign_id" type="button" class="btn btn-success" @click="requestCampaign(adRequest.campaign_id)">Request</button>
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
          campaigns: [],
          ad_requests: []
        },
        token: localStorage.getItem('auth-token'),
        error: null,
      };
    },
  
    methods: {
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
              campaigns: data.campaigns || [],
              ad_requests: data.ad_requests || []
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
  