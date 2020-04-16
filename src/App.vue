<template>

	<div id="app">

		<app-header v-bind:viewName="viewName"/>

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
				viewName: ""
         }
      }, // data

		// watch: {
		// 	viewName: function(newVal, oldVal) {
		// 		console.log("'viewName' changed: ", newVal, " | was: ", oldVal);
		// 		// this.viewName = newVal;
		// 	}
		// },
		created: function() {
			this.viewName = this.$route.name;
		},

		methods: {
		}, // methods
		updated: function() {
			this.viewName = this.$route.name;
		},


	}

</script>


<style lang="scss">

	// @import '@/assets/css/app.css';

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
