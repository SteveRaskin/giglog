<template>

	<div id="app">

		<app-header />

  		<main class="main">
			<transition name="component-fade" mode="out-in">
				<router-view />
			</transition>
		</main>

		<transition name="component-fade" mode="out-in">
			<app-footer />
		</transition>

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
	.component-fade-enter-active,
	.component-fade-leave-active {
		transition: opacity .45s ease;
	}
	.component-fade-enter,
	.component-fade-leave-to
		/* .component-fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
</style>
