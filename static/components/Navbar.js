export default {
  template: `
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  
    <a class="navbar-brand" href="/"><i class="fa-solid fa-lemon"></i>Limelight</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav">

        <li class="nav-item" v-if="role=='admin'">
          <router-link class="nav-link" to="/admin-info">Info</router-link>
        </li>
        <li class="nav-item" v-if="role=='admin'">
          <router-link class="nav-link" to="/admin-users">Users</router-link>
        </li>
        <li class="nav-item" v-if="role=='admin'">
          <router-link class="nav-link" to="/admin-find">Find</router-link>
        </li>
        <li class="nav-item" v-if="role=='admin'">
          <router-link class="nav-link" to="/admin-stats">Stats</router-link>
        </li>

        <li class="nav-item" v-if="role=='influencer'">
          <router-link class="nav-link" to="/influencer-home">Profile</router-link>
        </li>
        <li class="nav-item" v-if="role=='influencer'">
          <router-link class="nav-link" to="/influencer-find">Find</router-link>
        </li>
        <li class="nav-item" v-if="role=='influencer'">
          <router-link class="nav-link" to="/influencer-stats">Stats</router-link>
        </li>

        <li class="nav-item" v-if="role=='sponsor'">
          <router-link class="nav-link" to="/sponsor-home">Profile</router-link>
        </li>
        <li class="nav-item" v-if="role=='sponsor'">
          <router-link class="nav-link" to="/sponsor-campaigns">Campaigns</router-link>
        </li>
        <li class="nav-item" v-if="role=='sponsor'">
          <router-link class="nav-link" to="/sponsor-find">Find</router-link>
        </li>
        <li class="nav-item" v-if="role=='sponsor'">
          <router-link class="nav-link" to="/sponsor-stats">Stats</router-link>
        </li>
        
        <li class="nav-item" v-if="!is_login">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item" v-if="!is_login">
          <router-link class="nav-link" to="/sign-up">Sign-up</router-link>
        </li>
        <li class="nav-item" v-if="is_login">
          <button class="nav-link" @click='logout' >Logout</button>
        </li>
      </ul>
    </div>
  </div>
</nav>`,
  data() {
    return {
      role: localStorage.getItem('role'),
      is_login: localStorage.getItem('auth-token'),
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('auth-token')
      localStorage.removeItem('role')
      this.$router.push({ path: '/' })
    },
  },
}
