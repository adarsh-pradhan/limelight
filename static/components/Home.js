import Welcome from './Welcome.js'
import SponsorHome from './SponsorHome.js'
import InfluencerHome from './InfluencerHome.js'
import AdminHome from './AdminInfo.js'
import Campaign from './SponsorCampaigns.js'

export default {
  template: 
  `
  <div>
    <Welcome />
  </div>`,

  data() {
    return {
      userRole: localStorage.getItem('role'),
      authToken: localStorage.getItem('auth-token'),
      isAuthenticated: localStorage.getItem('token') ? true : false,
    }
  },

  components: {
    Welcome,
    SponsorHome,
    InfluencerHome,
    AdminHome,
    Campaign,
  },
}
