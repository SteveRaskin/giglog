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
	routes: [
      // !quotes around imports (i.e., name key/component key values)
		//  *** HEADS-UP; CAREFUL IF RENAMING ***
		{
			path: '*',
			redirect: 'LogIn'
		},

		// {
		// 	path: '/',
		// 	name: 'LogIn',
		// 	component: login,
		// 	meta: {
		// 		requiresAuth: false
		// 	}
		// },

		{
			path: '/',
			name: 'Welcome',
			component: welcome,
			meta: {
				requiresAuth: false
			}
		},
		// maybe don't need this
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












//
