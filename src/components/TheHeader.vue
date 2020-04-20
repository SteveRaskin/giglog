<template>

	<header>

		<h1>
			<router-link :to="{ path: '/' }">gigz</router-link>
		</h1>

		<p style="display: none; color: orangered; font-size: 1.2rem;">viewName: <b>{{ viewName }}</b></p>
		<nav>
			<div class="buttons" v-if="(loggedIn && viewName !== 'LogIn' && viewName !== 'SignUp')">
				<router-link
					v-if="(viewName !== 'Projects')"
					tag="button"
					class="btn btn-color-1 btn-all-projects"
					:to="{ name: 'Projects', params: {}}"
					>Project List
				</router-link>
				<router-link
					tag="button"
					class="btn btn-color-1 btn-add-projects"
					:to="{ name: 'AddProject', params: {}}"
					>Add a Project
				</router-link>
				<app-button buttonClass="btn-log-out" buttonText="log out" v-on:click.native="signOut" />
			</div>
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
					// this.$router.replace('LogIn')
					this.$router.replace({ name: 'LogIn' })
				})
			}
		}, // methods
		updated: function() {
		}

   }
</script>



<style lang="scss">

</style>
