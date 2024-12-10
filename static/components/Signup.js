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

                <div class='text-danger' v-if="error!=null">*{{error}}</div>

                <h2>Sign Up</h2>
                <label for="user-username" class="form-label">Your name</label>
                <input type="text" class="form-control" id="user-username" v-model="userData.username">
                <label for="user-email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="user-email" placeholder="name@limelight.com" v-model="userData.email">
                <label for="user-password" class="form-label">Password</label>
                <input type="password" class="form-control" id="user-password" v-model="userData.password">
                <label for="user-role" class="form-label">Choose Role</label>
                <select class="form-select" id="user-role" v-model="userData.role">
                  <option value="">Select Role</option>
                  <option value="influencer">Influencer</option>
                  <option value="sponsor">Sponsor</option>
                </select>
                <label for="user-niche" class="form-label" v-if="userData.role=='influencer'">Niche</label>
                <input type="text" class="form-control" id="user-niche" v-model="userData.niche" v-if="userData.role=='influencer'">
                <button class="btn btn-primary mt-2" @click='signup' > Sign Up </button>
            </div> 

          </div>
        </div>
      </div>
    </div>
    `,
    data() {
      return {
        userData: {
          username: null,
          email: null,
          password: null,
          role: "",
          niche: "",
        },
        error: null,
      }
    },
    methods: {
      async signup() {
        const { username, email, password, role , niche} = this.userData;
        if (!username || !email || !password || !role) {
          this.error = "Please fill in all fields";
          return;
        }
  
        const res = await fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password, role , niche}),
        })
  
        const data = await res.json();
        if (res.ok) {
          console.log(data.message);
          this.$router.push({ path: '/login' });
        } else {
          this.error = data.message;
        }
      },
    },
  }
  