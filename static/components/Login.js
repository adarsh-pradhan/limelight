export default {
  template: `
  <div class="d-flex justify-content-center align-items-center vh-0">
    <div class="card p-4 shadow-lg" style="max-width: 80%; width: 100%; height: 70%;">
      <div class="row g-0 h-100">
        <!-- Image on the Left -->
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <img src="static/images/lime.jpg" class="img-fluid rounded-start" alt="Big Image">
        </div>
        <!-- Content on the Right -->
        <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div class="mb-3 p-5 bg-light">
            <div class='text-danger'>*{{error}}</div>
            <label for="user-email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="user-email" placeholder="name@example.com" v-model="cred.email">
            <label for="user-password" class="form-label">Password</label>
            <input type="password" class="form-control" id="user-password" v-model="cred.password">
            <button class="btn btn-primary mt-2" @click='login' > Login </button>
          </div> 
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      cred: {
        email: null,
        password: null,
      },
      error: null,
    }
  },
  methods: {
    async login() {
      const res = await fetch('/user-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.cred),
      })
      const data = await res.json()
      if (res.ok) {
        if (data.message == "User is not approved") {
          window.alert(this.error = data.message);
          this.$router.push({ path: '/' })
        }
        else {
          localStorage.setItem('auth-token', data.token)
          localStorage.setItem('role', data.role)
          if (data.role == "influencer") {
            this.$router.push({ path: '/influencer-home' })
          }
          else if (data.role == "sponsor") {
            this.$router.push({ path: '/sponsor-home' })
          }
          else if (data.role == "admin") {
            this.$router.push({ path: '/admin-info' })
          }
          else {
            window.alert(this.error = data.message);
            this.$router.push({ path: '/' })
          }
        }
        
      } else {
        this.error = data.message
      }
    },
  },
}
