export default {
  template: `
    <div class="container mt-4">
      <div v-if="error" class="alert alert-danger">
        Error: {{ error }}
      </div>
      <!-- Users Section -->
      <div class="mb-4 p-3 border rounded bg-light">
        <h3 class="mb-3">Users</h3>
        <div class="list-group">
          <div v-for="user in allUsers" :key="user.id" class="list-group-item d-flex justify-content-between align-items-center">
            <span>{{ user.email }} - {{ user.active ? 'Active' : 'Inactive' }}</span>
            <div>
              <button class="btn btn-primary" v-if="!user.active" @click="approve(user.id)">
                Approve
              </button>
              <button class="btn btn-danger" @click="deleteUser(user.id)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      allUsers: [],
      token: localStorage.getItem('auth-token'),
      error: null,
    };
  },
  methods: {
    async approve(userId) {
      try {
        const res = await fetch(`/activate/inst/${userId}`, {
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
        const res = await fetch(`/api/user/${userId}`, {
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
  },
  mounted() {
    this.fetchUsers()
  },
};
