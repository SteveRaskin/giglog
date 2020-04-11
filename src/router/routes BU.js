import Vue from 'vue' // why, as it's already in main.js?
import Router from 'vue-router'


// import HelloWorld from '@/components/HelloWorld'
// vars for required paths
// import home from '../components/projects.vue';
import projects from '../components/projects.vue';
import projectAdd from '../components/project-add.vue';
import projectDetail from '../components/project-detail.vue';
import projectEdit from '../components/project-edit.vue';
import logHours from '../components/log-hours.vue';
import login from '../components/login.vue';

Vue.use(Router)


export default new Router({
	mode: "",
	routes: [
		//  {
		//    path: '/',
		//    name: 'HelloWorld',
		//    component: HelloWorld
		// },
		{ 'path': '/', 'component': projects },
		{ 'path': '/projects', 'component': projects },
		{ 'path': '/add-project', 'component': projectAdd },
		{ 'path': '/project-detail/:id', 'component': projectDetail },
		{ 'path': '/project-edit/:id', 'component': projectEdit },
		{ 'path': '/log-hours/:id', 'component': logHours },
		{ 'path': '/login/', 'component': login },
		{ 'path': '/logout/', 'component': projects }
	]
})
