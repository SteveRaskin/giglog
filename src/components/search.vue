<template>

	<div class="search-wrapper">

		<div class="search">
			<input type="text" v-model="search" placeholder="search by client (company), contact name, description" />
		</div>

		<div class="search-results-wrapper" v-bind:class="[{ open: filteredProjects.length > 0 }, { noresults: filteredProjects.length < 1 }]">

			<h4 class="results-count" v-if="filteredProjects.length == 0">
				no results matching "{{ search }}":
			</h4>
			<h4 class="results-count" v-if="filteredProjects.length > 0">
				{{ filteredProjects.length }} result<span v-if="filteredProjects.length > 1">s</span> matching search "{{ search }}":
			</h4>

			<ul class="search-results">
				<li v-for="(project, ix) in filteredProjects" :key="ix">
					{{ ix + 1 }}.
					<router-link v-bind:to="'/project-detail/' + project.id">
						{{ project.client }} ({{ project.projectReference }})
					</router-link>
				</li>
			</ul>
		</div>

	</div><!-- END .search-wrapper -->

</template>



<script>

	import searchMixin from '../mixins/searchMixin.js';

   export default {
		props: {
			projects: Array
		},
      data() {
         return {
				search: ""
         }
    	},
		created: function() {
			// console.log("search.vue @created: this.projects.length", this.projects.length);
			// console.log("search.vue @created: Array.isArray(this.projects)?", Array.isArray(this.projects), this.projects);
		},
		mounted: function() {
			// console.log("search.vue @mounted: Array.isArray(this.projects)?", Array.isArray(this.projects), this.projects);
			// console.log("search.vue @updated: this.projects.length", this.projects.length);
		},
		mixins: [ searchMixin ],
   }
</script>



<style lang="scss">

	#projects .subheader h2,
	#project-detail .subheader h2 { display: none; color: red; }

   .results-count { display: block; margin-bottom: .9rem; }
   .search-results li {
      margin-bottom: .9rem;
		padding: $space * 3;
      color: rgb(18, 72, 255);
      background: #fff;
      border: .15rem solid lighten($theme1, 9%);
      border-radius: .3rem;
		transition: ease-in-out all .15s;
   }
   .search-results li:hover {
      margin-bottom: .9rem;
      color: #fff;
      background: rgb(18, 72, 255);
      border: .15rem solid rgb(18, 72, 255);
   }
	.search-results li a {
		color: $theme1;
		border-bottom: 1px dotted $theme1;
		transition: ease-in-out all .15s;
	}
	.search-results li:hover a {
		color: #fff;
		border-bottom: 1px solid #fff;
	}




</style>
