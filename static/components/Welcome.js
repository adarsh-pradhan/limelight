const Welcome = {
    template : 
    `
        <div class="d-flex justify-content-center align-items-center vh-0">
            <div class="card p-4 shadow-lg" style="max-width: 80%; width: 100%; height: 70%;">
                <div class="row g-0 h-100">
                <!-- Image on the Left -->
                <div class="col-md-6 d-flex justify-content-center align-items-center">
                    <img src="static/images/lime.jpg" class="img-fluid rounded-start" alt="Big Image">
                </div>
                <!-- Content on the Right -->
                <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <h3 class="card-title text-center mb-4">Welcome to Limelight!</h3>
                    <div v-if="!isAuthenticated" class="w-100">
                    <router-link class="btn btn-primary btn-lg w-75 mb-3 d-block mx-auto" to="/login">Login</router-link>
                    <router-link class="btn btn-secondary btn-lg w-75 d-block mx-auto" to="/sign-up">Signup</router-link>
                    </div>
                    <div v-if="isAuthenticated" class="text-center">
                    <h5>You are already Logged-in</h5>
                    </div>
                </div>
                </div>
            </div>
        </div>

    `,
    data() {
        return {
            role: localStorage.getItem('role'),
            isAuthenticated: localStorage.getItem('Authentication-Token') ? true : false,
        };
    },
};

export default Welcome;
