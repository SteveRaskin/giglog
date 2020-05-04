import Vue from 'vue';
import VueRouter from 'vue-router'

import welcome from '../components/ViewWelcome.vue';
import projects from '../components/ProjectList.vue';
import projectAdd from '../components/ProjectCreate.vue';
import projectDetail from '../components/ProjectDetail.vue';
import projectEdit from '../components/ProjectEdit.vue';
import logHours from '../components/ProjectLogHours.vue';
import login from '../components/ViewLogIn.vue';
import signup from '../components/ViewSignUp.vue';



Vue.use(VueRouter)

export default new VueRouter({
	mode: 'history',
	// https://router.vuejs.org/api/#base
	// the base URL of the app; if the SPA is served at domain.com/app/, then base should be "/app/" (default: "/")
	base: '/giglog/',
	routes: [
		// redirect to a path, not a name
		{
			path: '*',
			redirect: '/index.html'
		},
		{
			path: '/',
			redirect: '/index.html'
		},
		{
			path: '/index.html',
			name: 'Welcome',
			component: welcome,
			meta: {
				requiresAuth: false
			}
		},
		{
			path: '/login/',
			name: 'LogIn',
			component: login,
			meta: {
				requiresAuth: false
			}
		},
		{
			path: '/signup/',
			name: 'SignUp',
			component: signup,
			meta: {
				requiresAuth: false
			}
		},

		// ===========================================================
		// requiresAuth: true
		{
			path: '/projects',
			name: 'Projects',
			component: projects,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/add-project',
			name: 'AddProject',
			component: projectAdd,
			meta: {
				requiresAuth: true
			}
		},

		// ===========================================================
		// dyanmic routes
		{
			path: '/project-detail/:id',
			name: 'ProjectDetail',
			component: projectDetail,
			props: true,
			params: {
				id: String,
				client: String
			},
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/project-edit/:id',
			name: 'ProjectEdit',
			component: projectEdit,
			props: true,
			params: {
				id: String,
				client: String
			},
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/log-hours/:id',
			name: 'LogHours',
			component: logHours,
			props: true,
			params: {
				id: String,
				client: String
			},
			meta: {
				requiresAuth: true
			}
		}
	]
})
