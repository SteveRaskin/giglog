// ~ entry point? ~ResourceLoader.java ?
import Vue from 'vue'
import VueResource from 'vue-resource';

/*
ES Modules:
import firebase from 'firebase/app';
import 'firebase/<PACKAGE>';
*/
import firebase from 'firebase/app';
import 'firebase/auth';

// import './scss/app.scss'
import router from '@/router/routes.js'
import store from '@/store'

import App from '@/App.vue'

import Header from '@/components/TheHeader.vue';
import Subheader from '@/components/TheSubheader.vue';
import Footer from '@/components/TheFooter.vue';

import Button from '@/components/AppButton.vue';

import DatePicker from "vue2-datepicker";
import "@/scss/datepicker.scss";

import firebaseConfig from '@/router/firebaseConfig.js';
var config = firebaseConfig.config;
firebase.initializeApp(config);

Vue.use(VueResource);

// REGISTER GLOBAL COMPONENTS
Vue.component('app-header', Header);
Vue.component('app-subheader', Subheader);
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
	}
});

// 'to', 'from', 'next': route objects
router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser;
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	// if (from.name == 'SignUp' && currentUser) next ('LogIn')
	// else if (requiresAuth && !currentUser) next ('LogIn')
	if (requiresAuth && !currentUser) { // protected route, logged out:
		// next('LogIn');
		// from.name === "LogIn" ? next() : next("LogIn"); //
		// from.name === "LogIn" && next.name !== "Projects" ? next() : next("LogIn"); //
		next('Welcome');
	}
	//
	// else if (!requiresAuth && currentUser) {
	// 	from.name === "SignUp" ? next() : next("Projects"); //
	// }
	else {
		next();
	}
});



DatePicker.install(Vue);



Vue.config.productionTip = false
