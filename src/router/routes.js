import Vue from 'vue';
import VueRouter from 'vue-router'

// import projects from '../components/projects.vue';
// import projectAdd from '../components/project-add.vue';
// import projectDetail from '../components/project-detail.vue';
// import projectEdit from '../components/project-edit.vue';
// import logHours from '../components/log-hours.vue';
// import login from '../components/login.vue';
// import signup from '../components/signup.vue';

import ProjectList from '../components/ProjectList.vue';
import ProjectCreate from '../components/ProjectCreate.vue';
import ProjectDetail from '../components/ProjectDetail.vue';
import ProjectEdit from '../components/ProjectEdit.vue';
import ProjectLogHours from '../components/ProjectLogHours.vue';
import LogIn from '../components/Login.vue';
import Signup from '../components/Signup.vue';




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
			component: LogIn,
			meta: {
				requiresAuth: false
			}
		},
		{
			path: '/login/',
			name: 'LogIn',
			component: LogIn,
			meta: {
				requiresAuth: false
			}
		},
		{
			path: '/signup/',
			name: 'SignUp',
			component: Signup,
			meta: {
				requiresAuth: false
			}
		},
		{
			path: '/projects',
			name: 'ProjectList',
			component: ProjectList,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/add-project',
			name: 'ProjectCreate',
			component: ProjectCreate,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/project-detail/:id',
			name: 'ProjectDetail',
			component: ProjectDetail,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/project-edit/:id',
			name: 'ProjectEdit',
			component: ProjectEdit,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/log-hours/:id',
			name: 'ProjectLogHours',
			component: ProjectLogHours,
			meta: {
				requiresAuth: true
			}
		}
	]
})












//
