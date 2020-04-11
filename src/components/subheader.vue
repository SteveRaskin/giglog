<template>
	<div class="subheader">

		<!-- <div class="headings"> -->
		<!-- <h1 v-html="title"></h1> -->
		<h1>{{ viewName }}</h1>
			<!--
				<h2 v-html="subtitle"></h2>
				<h3>viewID: {{ viewID }}</h3>
				<h3>ping: {{ ping }}</h3>
	 		-->

			<!--
			<app-search />:
				.search-wrapper
					+ .search
					+ .search-results-wrapper [ can't make this 100% width ]
			-->
			<app-search v-bind:projects="projects" v-if="(viewName == 'projects' || viewName == 'ping')" ></app-search>


		<!-- </div><!ZZZ END .headings ZZZ -->
	</div><!-- END .subheader -->
</template>



<script>

	// import searchMixin  from '../mixins/searchMixin.js';
	import Search from '@/components/search.vue';


   export default {
		components: {
			'app-search': Search
		},
		// projects.vue data:
		props: [ "viewName", "title", "subtitle", "projects" ],
      data() {
         return {
				search: "",
         }
    	},

		created: function() {
			// console.log("created; log projects", this.projects);
			// console.log("viewID in subheader @created:", this.viewID); // "projects"
			console.log("subheader.vue > created: this.ping", this.viewName);
		},
		beforeMount: function() {
		},

		methods: {},
		// mixins: [ searchMixin ],
		computed: {
			searchResultsLength: function() {
				// eslint bitched about 'let filteredProjects ... '
				const filteredProjects = [];
				console.log("filteredProjects.length", filteredProjects.length);
				return filteredProjects.length;
			}
		}
   }
</script>



<style scoped>

	.subheader { min-height: 3rem; border: 2px solid lime; }
	#projects .subheader h2,
	#project-detail .subheader h2 { display: none; }

	.results-count { margin: .9rem 0 1.5rem; font-weight: bold; }

</style>
