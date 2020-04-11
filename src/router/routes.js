import Vue from 'vue';
import VueRouter from 'vue-router'

import projects from '../components/projects.vue';
import projectAdd from '../components/project-add.vue';
import projectDetail from '../components/project-detail.vue';
import projectEdit from '../components/project-edit.vue';
import logHours from '../components/log-hours.vue';
import login from '../components/login.vue';
import signup from '../components/signup.vue';

Vue.use(VueRouter)

export default new VueRouter({
	mode: 'history',
	routes: [
      // !quotes around imports (i.e., name key/component key values)
		{
			path: '*',
			redirect: 'LogIn'
		},
		{
			path: '/',
			name: 'LogIn',
			component: login,
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
		{
			path: '/project-detail/:id',
			// name: 'ProjectDetail',
			component: projectDetail,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/project-edit/:id',
			// name: 'ProjectEdit',
			component: projectEdit,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/log-hours/:id',
			// name: 'LogHours',
			component: logHours,
			meta: {
				requiresAuth: true
			}
		}
	]
})












//
