import navbar from './components/navbar.js';
import router from './components/router.js';

new Vue({
    el : '#app',
    template :
    `
    <div>
        <navbar>
        </navbar>
        <router-view>
        </router-view>
    </div>
    `,
    router,
    components : {
        navbar,
    },
});