<template>

	<div class="container container-welcome">

		<section>

			<h1>Welcome to Giglog</h1>

			<p class="welcome">
				Giglog is one of my initial forays into the Vue.js application framework. Among whatever other lessons would come through this project, I figured I would at least check a few boxes in building this one, e.g.:
			</p>

			<ul class="lessons">
				<li>
					<b>employ ViewResource to make the .get(), .post() &amp; .put() API calls</b> to Firebase, to create and then access, edit and/or delete demo data (JSON);</li>
				<li>
					<b>establish protected routes,</b> employing methods available in firebase to enforce the rules, ergo <b>account creation and log in processes</b>;
				</li>
				<li>
					<b>incorporate dynamic routes;</b>
				</li>
				<li>
					<b>incorporate a search function;</b>
				</li>
				<li>
					<b>adopt Vue.js' recommended practices with regard to a consistent approach to component naming and architecture;</b> this was also informed by my recent experience working on an enterprise GWT-based (Java) application, one of far greater complexity than this one;
				</li>
				<li>
					<b>form validation:</b> I tried to be reasonably thorough in anticipating possible usage and interactions, and employ validation to account for them, to preclude bad data.
				</li>
				<li>
					regarding CSS (my wheelhouse): <b>configure vue.config.js to use SCSS</b>, enabling (scoped) SCSS in various component where it seemed advantageous, otherwise maintaining CSS as globally as design variance allowed;
				</li>
				<li>
					<b>keep things (mostly) native:</b> it's no accident that this app doesn't look as slick as it might if I'd employed a design library - as I'm likely to do with a future version of giglog, but I wanted to keep my focus on the ins and outs of Vue.js rather than diving into 3rd-party rabbit holes (the calendar is the notable exception);
				</li>
				<li>
					<b>add a few mixins to the mix;</b> (TODO: having added some dyamic account-related function to this view among others, move some repeated logic to a mixin for firebase methods)
				</li>
				<li>
					&hellip; more to come &hellip;
				</li>
			</ul>

			<p class="welcome">
				So please click through it and feel free to add, edit or delete any data - it's all junk for demo purposes. I'll have the code up on github shortly. Comments, pro or con, are most welcome; <a v-bind:href="emailAddress" v-bind:title="{ emailText }">{{ emailText }}</a>
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
					, otherwise, please
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
					By the way, you're still logged in; wanna
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
				loggedIn: false,
				emailAddress: "",
				emailText: ""
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
		mounted: function() {
			const s1 = "giglog";
			const s2 = "@";
			const s3 = "outtolaunch.com";
			this.emailAddress = "mailto:" + s1 + s2 + s3;
			// console.log("this.emailAddress", this.emailAddress);
			// this.emailText = s1 + s2 + s3;
			this.emailText = "I'm all ears";
			// console.log("this.emailText", this.emailText);
		},
		methods: {
			signOut: function() {
				firebase.auth().signOut().then(() => {
					// TODO: try again with a mixin for signOut 'cause it's duped in Welcome'
					// p.s. avoid conflict with rules in main.js by just offing any $router call
					// this.$router.replace('LogIn')
					// this.$router.replace({ name: 'Welcome' })
				})
			},
		},
		watch: {}
	}
</script>



<style lang="scss">

	.welcome { margin-bottom: 1.5rem; }
	.container-welcome h1 {
		margin-bottom: 1.5rem;
	}

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

	.lessons {
		margin: auto 18% auto 9%;
		list-style: lower-roman;
		list-style-position: outside;
		// border: 1px dotted #ccc;
	}
	.lessons li {
		margin-bottom: 1.5rem;
	}
	.lessons li:last-of-type {
		list-style: none;
	}


	// span.email:after { content: "nospam\40example.com"; }
	span.email:after { content: "fedev\40outtolaunch.com"; }






</style>
