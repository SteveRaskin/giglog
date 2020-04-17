<template>

   <div class="container" v-bind:id="viewName">

		<app-subheader v-bind:fileName="fileName" v-bind:viewName="viewName" v-bind:projects="projects" />

		<p class="debug">debug</p>
		<ol class="projects">

			<li class="project" v-for="(project, ix) in reverseprojects" v-bind:key="project.key">
				<!-- <h5>{{ ix + 1 }}.</h5> -->
            <p>
					<!-- <span class="label">{{ ix + 1 }}: </span> -->
					<span class="client">{{ ix + 1 }}: {{ project.client }} <span class="project-id">({{ project.id }})</span></span>
				</p>
				<p>
					<span class="label">start date:</span> <span class="value">{{ project.startDate }}</span>
				</p>
				<p>
					<span class="label">task:</span>
					<span class="value">
						{{ project.projectReference }}
						<router-link v-bind:to="'/project-detail/' + project.id">[ see full details ]</router-link>
					</span>
				</p>
				<p>
					<span class="label">source:</span>
					<span class="value"> {{ project.source }}</span>
				</p>
				<div class="buttons">
					<app-button buttonClass="btn-details" buttonText="project details" path="project-detail" v-bind:id="project.id" />
					<app-button buttonClass="btn-edit" buttonText="edit project" path="project-edit" v-bind:id="project.id" />
					<app-button buttonClass="btn-log-hours" buttonText="log hours" path="log-hours" v-bind:id="project.id" />
				</div>

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
				viewName: "projects",
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
					// console.log("data[key].startDate", data[key].startDate);
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

	.project p {
		/* border: 1px dotted #ccc; */
	}
	.project p span {
		display: inline-block;
		/* border: 1px dotted #f00; */
	}
	.project .client {
		font-weight: bold;
		text-transform: uppercase;
	}
	.project .client span {
		font-weight: normal;
		text-transform: none;
	}
	.project p .label {
		width: 6rem;
		float: left;
		text-align: right;
	}
	.project p .value {
		width: calc(100% - 6.9rem);
		float: left;
	}
	.value .project-id {
		font-weight: normal;
		color: #666;
	}




	li.project .label { margin-right: .6rem; }


</style>
