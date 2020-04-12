<template>

   <div class="container" v-bind:id="viewName">

		<app-subheader v-bind:viewName="viewName" v-bind:title="title" v-bind:subtitle="subtitle" v-bind:projects="projects" />

		<ol class="projects">
			<!-- <li class="project" v-for="(project, ix) in projects" v-bind:key="project.client"> -->
			<li class="project" v-for="(project, ix) in reverseprojects" v-bind:key="project.key">
				<h5>{{ ix + 1 }}:</h5>
            <p>
					<span class="label">key/project ID:</span>
					<span class="value">{{ project.id }}</span>
				</p>
            <p>
					<span class="label">client:</span>
					<span class="value">{{ project.client }}</span>
				</p>
				<p>
					<span class="label">project:</span>
					<span class="value">
						<router-link v-bind:to="'/project-detail/' + project.id">
							{{ project.projectReference }} [ details ]
						</router-link>
					</span>
				</p>
				<p>
					<span class="label">source:</span>
					<span class="value">{{ project.source }}</span>
				</p>
				<p>
					<span class="label">start date:</span>
					<span class="value">{{ project.startDate }}</span>
				</p>
				<p>
					<span class="label">id:</span>
					<span class="value">{{ project.id }}</span>
				</p>
            <app-buttons v-bind:projectID="project.id"></app-buttons>
         </li>
		</ol>

   </div><!-- END .container -->
</template>



<script>

	// import firebase from 'firebase';

   export default {
		props: {},
      components: {},
      data() {
			/*
				a component's return data are values used in its template,
				including as PROPS of a component used in its template;
				in projects.vue, e.g., the projects array is iterated in the template
				*and* passed as a prop to the <sub-header /> component, ergo in subheader.vue
				props include 'projects'
			*/
         return {
				viewName: "projects.vue",
				title: "All Projects",
				subtitle: "subtitle",
            projects: []
         }
      }, // data
      methods: {
      }, // methods
      created: function() {
			// console.log("projects @created");
			this.$http.get('https://sr-giglog.firebaseio.com/projects.json')
         .then(function(data){
            return data.json();
         }).then(function(data){
				let projectsArray = [];
            // add key to each object (see also project-edit.vue)
				// p.s. eslint bitched about for(let key ...
            for (const key in data) {
               data[key].id = key;
               this.projectID = key;
               projectsArray.push(data[key]);
               // console.log(data[key]);
            }
				// console.log("firebase.auth().currentUser @created:", firebase.auth().currentUser);
				// console.log("projects @created: projectsArray", projectsArray);
				// console.log("projects.vue @created: Array.isArray(projectsArray)?", Array.isArray(projectsArray), projectsArray);
            this.projects = projectsArray;
				// console.log("projects.vue @created: Array.isArray(this.projects)?", Array.isArray(this.projects), this.projects);
         })
      }, // created

		beforeMount: function() {},

      computed: {
			reverseprojects() {
				return this.projects.slice().reverse();
			},
      },

      directives: {
      },

      filters: {
         makeSnippet(value) {
            return value.slice(0, 39) + " ...";
         }
      }, // filters
   } // export default
</script>



<style scoped>

</style>







<!--  -->
