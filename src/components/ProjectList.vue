<template>

   <div class="container" v-bind:id="viewName">

		<app-subheader v-bind:fileName="fileName" v-bind:viewName="viewName" v-bind:projects="projects" />

		<app-search v-if="(viewName == 'Projects')" v-bind:projects="projects" />

		<ol class="projects">

			<li class="project" v-for="(project, ix) in reverseprojects" v-bind:key="project.key">
            <p>
					<span class="client">{{ ix + 1 }}. {{ project.client }}
						<!-- <span class="project-id">({{ project.id }})</span> -->
					</span>
				</p>
				<p>
					<span class="label">start date:</span> <span class="value">{{ project.startDate }}</span>
				</p>
				<p>
					<span class="label">task:</span>
					<span class="value">
						{{ project.projectReference }}
						<!-- <router-link v-bind:to="'/project-detail/' + project.id">[ see full details ]</router-link> -->
					</span>
				</p>
				<p>
					<span class="label">source:</span>
					<span class="value"> {{ project.source }}</span>
				</p>
				<div class="buttons">
					<router-link
						tag="button"
						class="btn btn-color-1 btn-details"
						:to="{ name: 'ProjectDetail', params: { id: project.id, client: project.client }}"
						>details
					</router-link>
					<router-link
						tag="button"
						class="btn btn-color-2 btn-edit"
						:to="{ name: 'ProjectEdit', params: { id: project.id, client: project.client }}"
						>edit
					</router-link>
					<router-link
						tag="button"
						class="btn btn-color-3 btn-log-hours"
						:to="{ name: 'LogHours', params: { id: project.id, client: project.client }}"
						>log hours
					</router-link>
				</div>

         </li>
		</ol>

   </div><!-- END .container -->

</template>



<script>

	import Search from '@/components/search.vue';

	export default {

		components: {
			'app-search': Search
		},

		props: {},

      data() {
			// TAN
         return {
				viewName: "Projects",
				fileName: "ProjectList.vue",
            projects: [],
				activeID: ""
         }
      }, // data
      methods: {
			debug: function(arg) {
				// console.log("ProjectList @debug: arg", arg);
			}
		}, // methods
      created: function() {
			this.$http.get('https://sr-giglog.firebaseio.com/projects.json')
         .then(function(data){
            return data.json();
         }).then(function(data){
				let projectsArray = [];
				// project objects in projects.json don't have an 'id' key;
				// ergo use firebase keys as project.id for use herein
            for (const key in data) {
               data[key].id = key;
					if (!data[key].client.length) {
						data[key].client = "default client"
					}
               projectsArray.push(data[key]);
            } // for
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



<style lang="scss" scoped>

	ol.projects   {
		list-style-position: inside;
		/*max-width: 33rem;*/
		margin: 0 auto 1.5rem;
	}

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

 	.buttons { margin: 1.5rem 0; }


</style>
