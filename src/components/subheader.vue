<template>
	<div class="subheader">

		<!-- <h1>{{ viewName }}</h1> -->
		<h1>{{ title }}</h1>
		<!-- <h1>subtitle: {{ subtitle }}</h1> -->

		<app-search v-bind:projects="projects" v-if="(viewName == 'projects.vue' || viewName == 'ping')" />

	</div><!-- END .subheader -->
</template>



<script>

	// import searchMixin  from '../mixins/searchMixin.js';
	import Search from '@/components/search.vue';

   export default {
		components: {
			'app-search': Search
		},
		props: {
			viewName: String,
			title: String,
			subtitle: String,
			projects: Array
		},
      data() {
         return {
				search: "",
         }
    	},
		created: function() {
			// console.log("subheader.vue > created: projects.length", this.projects.length);
			// console.log("subheader.vue @created: Array.isArray(this.projects)?", Array.isArray(this.projects), this.projects);
		},

		beforeMount: function() {
		},

		mounted: function() {
			// console.log("subheader.vue > mounted: projects.length", this.projects.length);
			// console.log("subheader.vue @mounted: Array.isArray(this.projects)?", Array.isArray(this.projects), this.projects);
		},

		methods: {},
		// mixins: [ searchMixin ],

		computed: {
			searchResultsLength: function() {
				// eslint bitched about 'let filteredProjects ... '
				let filteredProjects = [];
				// console.log("filteredProjects.length", filteredProjects.length);
				return filteredProjects.length;
			}
		} // computed



   }
</script>



<style scoped>

	.subheader { }
	#projects .subheader h2,
	#project-detail .subheader h2 { display: none; }

	.results-count { margin: .9rem 0 1.5rem; font-weight: bold; }

</style>
