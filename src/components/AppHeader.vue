<template>

	<header>

		<h1>
			<router-link :to="'/projects'" exact>gigz</router-link>
		</h1>

		<p style="display: none; color: orangered; font-size: 1.2rem;">viewName: <b>{{ viewName }}</b></p>
		<nav>
			<ul v-if="loggedIn">
				<app-button v-if="(viewName !== 'Projects')" buttonClass="btn-all-projects" buttonText="back to all projects" path="projects" />
				<app-button buttonClass="btn-add-project" buttonText="add project" path="add-project" />
				<app-button buttonClass="btn-logout" buttonText="log out" v-on:click.native="signOut" />
			</ul>
		</nav>

	</header>

</template>



<script>

	import firebase from 'firebase';

   export default {
		props: {
			viewName: String
		},

      data() {
         return {
				title: "",
				subtitle: "",
				loggedIn: false
         }
    	},

		watch: {
		},

		created: function() {
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
		}, // methods
		updated: function() {
		}

   }
</script>



<style lang="scss">

</style>
