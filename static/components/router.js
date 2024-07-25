import Login from './login.js';


Vue.use(VueRouter);

const routes = [
    {
        path : '/',
        component : login,
        name : 'Login',
    },
    {
        path : '/signup',
        component : signup,
        name : 'signup',
    },
    {
        path : '/adminDashboard',
        component : adminDashboard,
        name : 'AdminDashboard',
    },
    {
        path : '/influencerDashboard',
        component : influencerDashboard,
        name : 'InfluencerDashboard',
    },
    {
        path : '/sponsorDashboard',
        component : sponsorDashboard,
        name : 'SponsorDashboard',
    },

];

const router new VueRouter({
    routes
});

export default router;
