<template>

	<div id="app">

		<app-header />

  		<main class="main">
			<router-view />
		</main>


		<!-- <app-footer /> -->

	</div>

</template>


<script>

	export default {
		components: {
		},
		data() {
         return {
            // const activeProjectID = {}
         }
      }, // data
      methods: {
      }, // methods
		created: function() {
			// console.log("app.vue @created");
		}
	}

</script>



<style lang="scss">

</style>
