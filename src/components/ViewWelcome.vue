<template>

	<div class="container">

		<section>

			<h1>Welcome to Giglog</h1>

			<p class="welcome">
				I should probably say something here about my objective in building this app, you know, like learning stuff about Vue.
			</p>


			<div class="" v-if="!loggedIn">
				<p class="welcome">
					If you have an account, please
					<router-link
						tag="a"
						class="btn btn-welcome"
						:to="{ name: 'LogIn', params: {} }"
						>log in
					</router-link>
				</p>

				<p class="welcome">
					Otherwise, please
					<router-link
						tag="a"
						class="btn btn-welcome"
						:to="{ name: 'SignUp', params: {} }"
						>sign up
					</router-link>
				</p>
			</div>

			<div class="" v-if="loggedIn">
				<p>
					you're logged in; wanna
					<router-link
						tag="a"
						class="btn btn-welcome"
						v-on:click.native="signOut"
						:to="{ name: 'Welcome', params: {} }"
						>log out
					</router-link>
					?
				</p>

			</div>


		</section>
	</div>
</template>




<script>

	import firebase from 'firebase';

	export default {
		name: "Welcome",

		data: function() {
			return {
				email: "",
				password: "",
				confirmPassword: "",
				error: false,
				errorMsgBefore: "oh nohz! somethin' ain't right!",
				errorMsgAfter: "please try again",
				errorMsg: "",
				loggedIn: false
			}
		},
		created: function() {
			// console.log("this.$router", this.$router);
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
					// TODO: try again with a mixin for signOut 'cause it's duped in Welcome'
					// p.s. avoid conflict with rules in main.js by just offing any $router call
					// this.$router.replace('LogIn')
					// this.$router.replace({ name: 'Welcome' })
				})
			}
		},
		watch: {}
	}
</script>



<style lang="scss">

	.welcome { margin-bottom: 1.5rem; }
	.btn.btn-welcome {
		padding: 0;
		text-transform: uppercase;
		font-size: .99rem;
		font-weight: 600;
		color: $theme1;
		border: 0;
		border-bottom: 1px dashed $theme1;
		border-radius: 0;
		background: transparent;
	}
	.btn.btn-welcome:hover {
		color: $theme1;
		background: transparent;
		border: 0;
		border-bottom: 1px solid $theme1;
		border-radius: 0;
	}

</style>
