<template>

   <div class="container" v-bind:id="viewName">

		<app-subheader v-bind:fileName="fileName" v-bind:viewName="viewName" v-bind:projects="projects" />

		<app-search v-if="(viewName == 'Projects')" v-bind:projects="projects" />

<!--
li:
	<p>{{ project.client }}</p>
	<p>{{ project.city }}</p>
<dl>
	<dt>start date</dt><dd>{{ project.startDate }}</dd>
</dl>
-->

		<ol class="projects">


			<li class="project" v-for="(project, ix) in reverseprojects" v-bind:key="project.key">
				<p class="client-city">
					<span class="client">{{ ix + 1 }}. {{ project.client }}</span>
					<span class="city">{{ project.city }}</span>
					<span class="state">{{ project.state }}</span>
				</p>

				<p class="start-date">
					<span class="label">start date:</span> <span class="value">{{ project.startDate }}</span>
				</p>

				<p class="description-short">
					<span class="label">summary:</span>
					<span class="value">{{ project.projectReference }}</span>
				</p>
				<p class="tech-stack">
					<span class="label">tech stack:</span>
					<span class="value"> {{ project.techstack }}</span>
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

	.projects {
		list-style-position: inside;
		margin: 0 auto 3rem;
	}

	.project {
		display: flex;
		flex-flow: row wrap;
		width: 100%;
		margin-bottom: 2.4rem;
		padding: 0 .9rem 2.4rem 0;
		border-bottom: 3px double #ccc;
		// border: 1px double #ccc;
	}

	.project p { width: 100%; /*!!!*/}
	.project p:last-of-type { margin-bottom: 1.2rem; }


	.client-city .client {
		text-transform: uppercase;
		margin-right: .6rem;
	}
	.client-city .city { text-transform: capitalize; }
	.client-city .state { text-transform: uppercase; }
	.client-city .city:before { content: "("}
	.client-city .state:after { content: ")"}




	.project p .label {
		width: 6.9rem;
		float: left;
		text-align: right;
	}
	.project p .value {
		width: calc(100% - 7.5rem);
		float: left;
	}

	.project .label { margin-right: .6rem; }


</style>
