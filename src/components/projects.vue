<template>

   <div class="container" v-bind:id="viewName">

		<app-subheader v-bind:fileName="fileName" v-bind:viewName="viewName" v-bind:projects="projects" />

		<ol class="projects">
			<!-- <li class="project" v-for="(project, ix) in projects" v-bind:key="project.client"> -->
			<li class="project" v-for="(project, ix) in reverseprojects" v-bind:key="project.key">
				<h5>{{ ix + 1 }}.</h5>
            <!-- <p>
					<span class="label">key/project ID:</span>
					<span class="value">{{ project.id }}</span>
				</p> -->
            <p>
					<span class="label"></span>
					<span class="value"> {{ project.client }}</span>
				</p>
				<p>
					<span class="label">task:</span>
					<span class="value">
						<router-link v-bind:to="'/project-detail/' + project.id">
							{{ project.projectReference }} [ details ]
						</router-link>
					</span>
				</p>
				<p>
					<span class="label">source:</span>
					<span class="value"> {{ project.source }}</span>
				</p>
				<p>
					<span class="label">start date:</span>
					<span class="value">{{ project.startDate }}</span>
				</p>
				<p>
					<span class="label">id:</span>
					<span class="value">{{ project.id }}</span>
				</p>
				<!--
					TODO: replace <app-buttons /> w/multiple instances of an <app-button /> component
				-->
            <app-buttons v-bind:projectID="project.id" v-bind:fileName="fileName" />
         </li>
		</ol>

   </div><!-- END .container -->

</template>



<script>

   export default {

		props: {},

      components: {},

      data() {
			// TAN
         return {
				viewName: "All Projects",
				fileName: "projects.vue",
            projects: []
         }
      }, // data
      methods: {}, // methods
      created: function() {
			// console.log("projects @created");
			this.$http.get('https://sr-giglog.firebaseio.com/projects.json')
         .then(function(data){
            return data.json();
         }).then(function(data){
				let projectsArray = [];
            // add key to each object (see also project-edit.vue)
            for (const key in data) {
               data[key].id = key;
               this.projectID = key;
               projectsArray.push(data[key]);
            }
            this.projects = projectsArray;
         })
      }, // created

		beforeMount: function() {},

      computed: {
			reverseprojects() {
				return this.projects.slice().reverse();
			},
      },

      directives: {},

      filters: {
         makeSnippet(value) {
            return value.slice(0, 39) + " ...";
         }
      }, // filters

   } // export default
</script>



<style scoped>

	li.project > h5 {
		margin-right: .6rem;
	}

	li.project > h5 + p:first-of-type {
		display: inline-flex;
		align-items: center;
		width: auto;
	}

</style>
