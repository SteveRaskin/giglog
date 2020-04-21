<template>

	<div class="subheader">

		<h1>{{ viewName }} <span>({{ fileName }})</span></h1>

	</div><!-- END .subheader -->

</template>



<script>

	// import searchMixin  from '../mixins/searchMixin.js';

   export default {
		components: {
		},
		props: {
			viewName: String,
			fileName: String,
			projects: Array
		},
      data() {
         return {
				search: "",
         }
    	},
		created: function() {
		},

		beforeMount: function() {
		},

		mounted: function() {
		},

		methods: {},
		// mixins: [ searchMixin ],

		computed: {
			// TODO: put this somewhere appropriate
			searchResultsLength: function() {
				// eslint bitched about 'let filteredProjects ... '
				let filteredProjects = [];
				// console.log("filteredProjects.length", filteredProjects.length);
				return filteredProjects.length;
			}
		} // computed

   }
</script>



<style lang="scss" scoped>

	.subheader {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		h1 {
			width: auto;
			// margin-bottom: 1.5rem;
			font-size: 2.1rem;
			color: $theme1;
			span { font-size: .6em; }
		}
	}

</style>
