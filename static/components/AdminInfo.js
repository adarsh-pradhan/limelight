export default {
  template: `
    <div class="container mt-4">
      <h2 class="text-center">Welcome Admin</h2>

      <div v-if="error" class="alert alert-danger">
        Error: {{ error }}
      </div>

      <!-- Users Section -->
      <div class="mb-4 p-3 border rounded bg-light">
        <h3 class="mb-3">Approve Sponsor Request:</h3>
        <div class="list-group">
          <div v-for="user in allUsers" :key="user.id" v-if="!user.active" class="list-group-item d-flex justify-content-between align-items-center">
            <span>{{ user.email }} - Inactive</span>
            <div>
              <button class="btn btn-primary" @click="approve(user.id)">
                Approve
              </button>
              <button class="btn btn-danger" @click="deleteUser(user.id)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>


      <!-- Campaigns Section -->
      <div class="mb-4 p-3 border rounded bg-light">
        <h3 class="mb-3">Campaigns</h3>
        <div class="list-group">
          <div v-for="campaign in allCampaigns" :key="campaign.id" class="list-group-item d-flex justify-content-between align-items-center">
            <span>{{ campaign.title }} - {{ campaign.description }}</span>
            <div>
              <button class="btn btn-warning" @click="editCampaign(campaign.id)">
                Edit
              </button>
              <button class="btn btn-danger" @click="deleteCampaign(campaign.id)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Ad Requests Section -->
      <div class="mb-4 p-3 border rounded bg-light">
        <h3 class="mb-3">Ad Requests</h3>
        <div class="list-group">
          <div v-for="adRequest in allAdRequests" :key="adRequest.id" class="list-group-item d-flex justify-content-between align-items-center">
            <span>{{ adRequest.messages }} - {{ adRequest.status }}</span>
            <button class="btn btn-danger" @click="deleteAdRequest(adRequest.id)">
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Influencers Section -->
      <div class="mb-4 p-3 border rounded bg-light">
        <h3 class="mb-3">Influencers</h3>
        <div class="list-group">
          <div v-for="influencer in allInfluencers" :key="influencer.id" class="list-group-item d-flex justify-content-between align-items-center">
            <span>{{ influencer.username }} - {{ influencer.niche }}</span>
            <button class="btn btn-danger" @click="deleteInfluencer(influencer.id)">
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Sponsors Section -->
      <div class="mb-4 p-3 border rounded bg-light">
        <h3 class="mb-3">Sponsors</h3>
        <div class="list-group">
          <div v-for="sponsor in allSponsors" :key="sponsor.id" class="list-group-item d-flex justify-content-between align-items-center">
            <span>Sponsor ID: {{ sponsor.id }}</span>
            <button class="btn btn-danger" @click="deleteSponsor(sponsor.id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  `,

  data() {
    return {
      allUsers: [],
      allCampaigns: [],
      allAdRequests: [],
      allInfluencers: [],
      allSponsors: [],
      token: localStorage.getItem('auth-token'),
      error: null,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await fetch('/users', {
          headers: {
            'Authentication-Token': this.token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          this.allUsers = data;
        } else {
          this.error = `Failed to fetch users: ${data.message}`;
        }
      } catch (e) {
        this.error = 'An error occurred while fetching users.';
      }
    },
    async fetchCampaigns() {
      try {
        const res = await fetch('/api/campaign', {
          headers: {
            'Authentication-Token': this.token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          this.allCampaigns = data;
        } else {
          this.error = `Failed to fetch campaigns: ${data.message}`;
        }
      } catch (e) {
        this.error = 'An error occurred while fetching campaigns.';
      }
    },
    async fetchAdRequests() {
      try {
        const res = await fetch('/api/ad_request', {
          headers: {
            'Authentication-Token': this.token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          this.allAdRequests = data;
        } else {
          this.error = `Failed to fetch ad requests: ${data.message}`;
        }
      } catch (e) {
        this.error = 'An error occurred while fetching ad requests.';
      }
    },
    async fetchInfluencers() {
      try {
        const res = await fetch('/api/influencer', {
          headers: {
            'Authentication-Token': this.token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          this.allInfluencers = data;
        } else {
          this.error = `Failed to fetch influencers: ${data.message}`;
        }
      } catch (e) {
        this.error = 'An error occurred while fetching influencers.';
      }
    },
    async fetchSponsors() {
      try {
        const res = await fetch('/api/sponsor', {
          headers: {
            'Authentication-Token': this.token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          this.allSponsors = data;
        } else {
          this.error = `Failed to fetch sponsors: ${data.message}`;
        }
      } catch (e) {
        this.error = 'An error occurred while fetching sponsors.';
      }
    },
    async approve(userId) {
      try {
        const res = await fetch(`/activate/sponsor/${userId}`, {
          headers: {
            'Authentication-Token': this.token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          alert(data.message);
          this.fetchUsers();
        } else {
          this.error = `Failed to approve user: ${data.message}`;
        }
      } catch (e) {
        this.error = 'An error occurred while approving the user.';
      }
    },
    async deleteUser(userId) {
      try {
        const res = await fetch(`/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authentication-Token': this.token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          alert(data.message);
          this.fetchUsers();
        } else {
          this.error = `Failed to delete user: ${data.message}`;
        }
      } catch (e) {
        this.error = 'An error occurred while deleting the user.';
      }
    },
    async deleteCampaign(campaignId) {
      try {
        const res = await fetch(`/api/campaign/${campaignId}`, {
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
          this.error = `Failed to delete campaign: ${data.message}`;
        }
      } catch (e) {
        this.error = 'An error occurred while deleting the campaign.';
      }
    },
    async deleteAdRequest(adRequestId) {
      try {
        const res = await fetch(`/api/ad-request/${adRequestId}`, {
          method: 'DELETE',
          headers: {
            'Authentication-Token': this.token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          alert(data.message);
          this.fetchAdRequests();
        } else {
          this.error = `Failed to delete ad request: ${data.message}`;
        }
      } catch (e) {
        this.error = 'An error occurred while deleting the ad request.';
      }
    },
    async deleteInfluencer(influencerId) {
      try {
        const res = await fetch(`/api/influencer/${influencerId}`, {
          method: 'DELETE',
          headers: {
            'Authentication-Token': this.token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          alert(data.message);
          this.fetchInfluencers();
        } else {
          this.error = `Failed to delete influencer: ${data.message}`;
        }
      } catch (e) {
        this.error = 'An error occurred while deleting the influencer.';
      }
    },
    async deleteSponsor(sponsorId) {
      try {
        const res = await fetch(`/api/sponsor/${sponsorId}`, {
          method: 'DELETE',
          headers: {
            'Authentication-Token': this.token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          alert(data.message);
          this.fetchSponsors();
        } else {
          this.error = `Failed to delete sponsor: ${data.message}`;
        }
      } catch (e) {
        this.error = 'An error occurred while deleting the sponsor.';
      }
    },
    editCampaign(campaignId) {
      // Redirect to the edit campaign page
      this.$router.push(`/edit-campaign/${campaignId}`);
    },
  },
  mounted() {
    this.fetchUsers();
    this.fetchCampaigns();
    this.fetchAdRequests();
    this.fetchInfluencers();
    this.fetchSponsors();
  },
};
