// ~ entry point? ~ResourceLoader.java ?
import Vue from 'vue'
import VueResource from 'vue-resource';
import firebase from 'firebase';

// import './scss/app.scss'
import router from './router/routes.js'
import store from './store'

import App from './App.vue'
import Header from './components/AppHeader.vue';
import Subheader from './components/AppSubheader.vue';
import Button from './components/AppButton.vue';
import Footer from './components/AppFooter.vue';

import firebaseConfig from '@/router/firebaseConfig.js';
var config = firebaseConfig.config;
firebase.initializeApp(config);

Vue.use(VueResource);

// REGISTER GLOBAL COMPONENTS
Vue.component('app-header', Header);
Vue.component('app-subheader', Subheader);
// Vue.component('app-buttons', Buttons);
Vue.component('app-button', Button);
Vue.component('app-footer', Footer);



/* eslint-disable no-new */
firebase.auth().onAuthStateChanged(function(user) {
	var vm;
	if (!vm) {
		vm = new Vue({
			el: '#app',
			router: router,
			footerView: Footer,
			store: store,
			components: {
				App,
			},
			data: {},
			template: '<App/>',
		}).$mount('#app')
	} // if
});


router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser;
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	// if (from.name == 'SignUp' && currentUser ) next ('LogIn')
	// else if (requiresAuth && !currentUser) next ('LogIn')
	if (requiresAuth && !currentUser) {
		next('LogIn');
	}
	else if (!requiresAuth && currentUser) {
		next('Projects');
	}
	else next();
});

Vue.config.productionTip = false
