<!-- TAN -->
<template>

	<div class="buttons">

		<!--
			TODO:
				there should be, instead of this, a button component;
				in projects.vue, instead of an <app-buttons /> component,
				there should be the multiple instances of an <app-button /> component
		-->
		<router-link tag="button" class="btn details" v-bind:to="'/project-detail/' + projectID">full project details</router-link>
		<router-link tag="button" class="btn edit" v-bind:to="'/project-edit/' + projectID">edit project</router-link>
		<router-link tag="button" class="btn log-hours" v-bind:to="'/log-hours/' + projectID">log hours</router-link>
		<!-- <router-link tag="button" class="btn all-projects" v-bind:to="'/'">back to projects</router-link> -->
		<router-link
			tag="button"
			class="btn all-projects"
			v-bind:to="'/projects'"
			exact
			v-if="(fileName !== 'projects.vue')"
			>all projectz
		</router-link>

	</div><!-- END .buttons -->

</template>



<script>

   export default {
		// projectID passed by projects.vue: <app-buttons v-bind:projectID="project.id">
		props: {
			projectID: String,
			fileName: String
		},

      data() {
         return {
				title: "",
				subtitle: ""
         }
    	},

		methods: {}
   }
</script>



<style scoped>

</style>
