<template>

	<header>

		<!-- <img class="logo" src="../assets/logo.png" /> -->
		<h1><router-link to="/" exact>gigz</router-link></h1>
		<nav>
			<ul v-if="loggedIn">
				<li><router-link to="/projects" exact>all projects</router-link></li>
				<li><router-link to="/add-project" exact>add project</router-link></li>
				<li><a class="btn logout" href="/" v-on:click="signOut">log out</a></li>
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
