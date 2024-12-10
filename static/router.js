import Home from './components/Home.js'
import Welcome from './components/Welcome.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'

import AdminInfo from './components/AdminInfo.js'
import AdminUsers from './components/AdminUsers.js'
import AdminFind from './components/AdminFind.js'
import AdminStats from './components/AdminStats.js'

import SponsorHome from './components/SponsorHome.js'
import SponsorCampaigns from './components/SponsorCampaigns.js'
import SponsorFind from './components/SponsorFind.js'
import SponsorStats from './components/SponsorStats.js'
import SponsorAdRequestForm from './components/SponsorAdRequestForm.js'

import InfluencerHome from './components/InfluencerHome.js'
import InfluencerFind from './components/InfluencerFind.js'
import InfluencerStats from './components/InfluencerStats.js'

import CampaignForm from './components/CampaignForm.js'
import CampaignView from './components/CampaignView.js'
import CampaignEdit from './components/CampaignEdit.js'

import AdRequestForm from './components/AdRequestForm.js'
import AdRequestEdit from './components/AdRequestEdit.js'


const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/welcome', component: Welcome, name: 'Welcome' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/sign-up', component: Signup, name: 'Signup' },

  { path: '/admin-info', component: AdminInfo },
  { path: '/admin-users', component: AdminUsers },
  { path: '/admin-find', component: AdminFind},
  { path: '/admin-stats', component: AdminStats },
  

  { path: '/sponsor-home', component: SponsorHome },
  { path: '/sponsor-campaigns', component: SponsorCampaigns },
  { path: '/sponsor-find', component: SponsorFind },
  { path: '/sponsor-stats', component: SponsorStats },
  { path: '/sponsor-adRequest-form/:id', name: 'sponsor-adRequest-form', component: SponsorAdRequestForm},

  { path: '/influencer-home', component: InfluencerHome },
  { path: '/influencer-find', component: InfluencerFind },  
  { path: '/influencer-stats', component: InfluencerStats },

  { path: '/campaign-form', component: CampaignForm },
  { path: '/campaign-view', component: CampaignView },
  { path: '/campaign-view/:id', name: 'campaign-view', component: CampaignView },
  { path: '/campaign-edit/:id', name: 'campaign-edit', component: CampaignEdit },

  { path: '/adRequest-form/:id', name: 'adRequest-form', component: AdRequestForm },
  { path: '/adRequest-edit/:id', name: 'adRequest-edit', component: AdRequestEdit },
]

export default new VueRouter({
  routes,
})
