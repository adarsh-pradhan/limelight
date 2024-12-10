export default {
  template: `
  <div>
    <div class="row">
      <div class="col">
        <input type="text" placeholder="Title" v-model="campaign.title"/>
        <input type="text" placeholder="Description" v-model="campaign.description" />
        <input type="text" placeholder="Niche" v-model="campaign.niche" />
        <input type="text" placeholder="Budget" v-model="campaign.budget" />
        <input type="text" placeholder="Goals" v-model="campaign.goals" />
        <button @click="createCampaign">Create Campaign</button>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger">
      Error: {{ error }}
    </div>
  </div>`,

  data() {
    return {
      campaign: {
        title: '',
        description: '',
        niche: '',
        budget: '',
        goals: '',
      },
      token: localStorage.getItem('auth-token'),
      error: null,
    }
  },

  methods: {
    async createCampaign() {
      if (!this.campaign.title || !this.campaign.description || !this.campaign.niche) {
        alert('All fields are required')
        return
      }

      try {
        const res = await fetch('/api/campaign', {
          method: 'POST',
          headers: {
            'Authentication-Token': this.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.campaign),
        })

        const data = await res.json()
        if (res.ok) {
          alert(data.message)
          this.$router.push({ path: '/sponsor-campaigns' })
        } else {
          console.error('Error:', data)
          alert(`Error: ${data.message}`)
        }
      } catch (error) {
        console.error('Request failed:', error)
      }
    },
  }
}
