export default {
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <canvas id="barChart" width="400" height="400"></canvas>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <canvas id="pieChart" width="400" height="400"></canvas>
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
      allCampaigns: [],
      allAdRequests: [],
      allUsers: [],
      token: localStorage.getItem('auth-token'),
      error: null,
      barChart: null,
      pieChart: null,
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
          this.updateCharts();
        } else {
          this.error = `Error ${res.status}: ${res.statusText}`;
        }
      } catch (err) {
        console.error('Failed to fetch campaigns:', err);
        this.error = 'Failed to fetch campaigns.';
      }
    },

    async fetchAdRequests() {
      try {
        const res = await fetch('/api/ad_request', {
          headers: {
            'Authentication-Token': this.token,
          },
        });

        if (res.ok) {
          const data = await res.json();
          this.allAdRequests = data;
          this.updateCharts();
        } else {
          this.error = `Error ${res.status}: ${res.statusText}`;
        }
      } catch (err) {
        console.error('Failed to fetch ad requests:', err);
        this.error = 'Failed to fetch ad requests.';
      }
    },

    async fetchUsers() {
      try {
        const res = await fetch('/api/user', {
          headers: {
            'Authentication-Token': this.token,
          },
        });

        if (res.ok) {
          const data = await res.json();
          this.allUsers = data;
          this.updateCharts();
        } else {
          this.error = `Error ${res.status}: ${res.statusText}`;
        }
      } catch (err) {
        console.error('Failed to fetch users:', err);
        this.error = 'Failed to fetch users.';
      }
    },

    updateCharts() {
      const ctxBar = document.getElementById('barChart').getContext('2d');
      if (this.barChart) {
        this.barChart.destroy();  // Destroy the existing chart instance
      }
      this.barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: ['Campaigns', 'Ad Requests'],
          datasets: [{
            label: 'Count',
            data: [
              this.allCampaigns.length,
              this.allAdRequests.length,
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allows for the custom size
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Prepare role counts
      const roleCounts = this.allUsers.reduce((counts, user) => {
        user.roles.forEach(role => {
          counts[role] = (counts[role] || 0) + 1;
        });
        return counts;
      }, {});

      // Convert role counts to arrays for Chart.js
      const roleLabels = Object.keys(roleCounts);
      const roleData = Object.values(roleCounts);

      const ctxPie = document.getElementById('pieChart').getContext('2d');
      if (this.pieChart) {
        this.pieChart.destroy();  // Destroy the existing chart instance
      }
      this.pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
          labels: roleLabels,
          datasets: [{
            label: 'User Roles',
            data: roleData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allows for the custom size
        },
      });
    },
  },

  mounted() {
    this.fetchCampaigns();
    this.fetchAdRequests();
    this.fetchUsers();
  },
};
