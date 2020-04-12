<!-- TAN -->

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
		props: {
			projectID: String
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
