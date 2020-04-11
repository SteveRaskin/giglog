import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import firebase from 'firebase';

import './scss/app.scss'
import router from './router/routes.js'
import store from './store'

import Header from './components/header.vue';
import Subheader from './components/subheader.vue';
// import Search from '@/components/search.vue';
import Buttons from './components/buttons.vue';
import Footer from './components/footer.vue';


// import firebaseConfig from './router/firebaseConfig.js';
import firebaseConfig from '@/router/firebaseConfig.js';
console.log("fb config", firebaseConfig);

var config = firebaseConfig.config;

firebase.initializeApp(config);

Vue.use(VueResource);

// REGISTER GLOBAL COMPONENTS
Vue.component('app-header', Header);
Vue.component('app-subheader', Subheader);
// Vue.component('app-search', Search);
Vue.component('app-buttons', Buttons);
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
				// 'app-subheader': Subheader
			},
			data: {},
			template: '<App/>',
		}).$mount('#app')
	} // if
});


router.beforeEach((to, from, next) => {
	// eslint: DNU 'let'
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
