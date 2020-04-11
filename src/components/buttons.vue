<!--
	<router-link to="/[ path ]" ... correspond to routes.js paths

	https://stackoverflow.com/questions/46243964/vue-js-how-to-access-property-value-of-objects-in-loop-in-a-child-component
	usage:
		1. in projects.vue: <app-buttons v-bind:projectID="project.id"></app-buttons>
			- "project.id" because they're in the 'projects' loop;
		2. elsewhere, e.g., project-detail: <app-buttons v-bind:projectID="id"></app-buttons>
			- "id" per data > return > id: this.$route.params.id

FFS DNU <app-buttons> here as in ... where? ... the alias element [ for lack of knowing what Vue call it ] has been imported, registered (~defined?) in main.js, and therein referenced as <app-buttons>, ergo

 -->

<template>
	<div class="buttons">
		<router-link tag="button" class="btn details" v-bind:to="'/project-detail/' + projectID">details</router-link>
		<router-link tag="button" class="btn edit" v-bind:to="'/project-edit/' + projectID">edit</router-link>
		<router-link tag="button" class="btn log-hours" v-bind:to="'/log-hours/' + projectID">log hours</router-link>
		<!-- <router-link tag="button" class="btn all-projects" v-bind:to="'/'">back to projects</router-link> -->
		<router-link tag="button" class="btn all-projects" v-bind:to="'/projects'" exact>all projectz</router-link>


	</div><!-- END .buttons -->
</template>



<script>

   export default {
		props: [ "projectID" ],
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
