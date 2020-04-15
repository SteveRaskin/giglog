<template>

	<header>

		<h1>
			<!-- <router-link v-bind:to="'/projects'" exact>gigz</router-link> -->
			<router-link :to="'/projects'" exact>gigz</router-link>

		</h1>
		<nav>
			<ul v-if="loggedIn">
				<app-button buttonClass="btn-hdr" buttonText="all projects" path="projects" />
				<app-button buttonClass="btn-hdr" buttonText="add project" path="add-project" />
				<app-button buttonClass="btn-logout" buttonText="log out" v-on:click.native="signOut" />
			</ul>
		</nav>

	</header>

</template>



<script>

	import firebase from 'firebase';

   export default {
		props: {},

      data() {
         return {
				title: "",
				subtitle: "",
				loggedIn: false
         }
    	},

		created: function() {
			// console.log("header.vue @created");
			var _this = this;
			firebase.auth().onAuthStateChanged(function(user) {
				if (user) {
					_this.loggedIn = true;
				} else {
					_this.loggedIn = false;
				}
			});
		},

		methods: {
			signOut: function() {
				firebase.auth().signOut().then(() => {
					this.$router.replace('LogIn')
				})
			}
		} // methods

   }
</script>



<style lang="scss">

</style>
