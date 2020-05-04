<template>
	<div class="container container-sign-up">

		<section class="section-sign-up">

			<h1>sign up</h1>

			<div class="fieldset-wrapper">

				<fieldset>
					<legend>giglog sign-up</legend>

					<p class="error" v-bind:class="{ true: error }">
						<span class="error-before">{{ errorMsgBefore }}</span>
						<span class="errorMsg">{{ errorMsg }}</span>
						<span class="error-after">{{ errorMsgAfter }}</span>
					</p>

					<!-- USER NAME -->
					<!--
						<div class="label-input text">
	                  <label for="">first name</label>
	                  <input type="text" id="first-name" v-model="first-name" placeholder="first name" required />
	               </div>
						<div class="label-input text">
	                  <label for="">last name</label>
	                  <input type="text" id="last-name" v-model="last-name" placeholder="last name" required />
	               </div>
					-->

					<!-- EMAIL ADDRESS -->
					<div class="label-input text">
						<label for="">email address</label>
						<input type="text" id="email" v-model="email" placeholder="email address" required />
					</div>

					<!-- PASSWORD -->
					<div class="label-input text">
						<label for="">password</label>
						<input type="password" class="password" id="password" v-model="password" placeholder="password" required />
					</div>

					<!-- CONFIRM PASSWORD -->
					<div class="label-input text">
						<label for="">confirm password</label>
						<input type="password" class="password" id="confirm-password" v-model="confirmPassword" placeholder="confirm password" required />
					</div>

					<div class="buttons">
						<app-button buttonClass="btn-color-1" buttonText="sign up" v-on:click.native="signUp" />
					</div>
				</fieldset>
			</div><!-- END .fieldset-wrapper -->

			<p>
				already have an account?
				<router-link tag="a" class="" :to="{ name: 'LogIn', params: {} }">log in</router-link>
			</p>

		</section>

	</div>
</template>




<script>

	import firebase from 'firebase';

	export default {
		name: "signUp",
		data: function() {
			return {
				email: "",
				password: "",
				confirmPassword: "",
				error: false,
				errorMsgBefore: "Message from firebase.io:",
				errorMsgAfter: "Please try again.",
				errorMsg: "",
			}
		},
		methods: {
			signUp: function() {
				const passwordInput = document.querySelector("#password");
				const emailInput = document.querySelector("#email");
				if (this.password !== this.confirmPassword) {
					this.error = true;
					this.errorMsg = "passwords don't match";
					this.password = "";
					this.confirmPassword = "";
					passwordInput.focus();
				}
				else {
					firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
						// arrow function non-optional re: this.$router
						(user) => {
							const userFirstName = this.email.charAt(0).toUpperCase() + this.email.slice(1).split('@')[0];
							alert('your account has been created, ' + userFirstName + ', please log in');
							firebase.auth().signOut();
							this.$router.replace({ name: 'LogIn' })
						},
						(err) => {
							console.log("err.message:", err.message);
							this.error = true;
							this.errorMsg = err.message;
							emailInput.focus();
						}
					)
				}
			} // signUp
		}, // methods
		watch: {}
	}
</script>



<style lang="scss" scoped>


	h1 { margin-bottom: 1.5rem; }

	.error {
		max-height: 0;
		height: 0;
		overflow: hidden;
		margin-bottom: 0;
		color: $error;
		transition: .9s all ease-in-out;
		&.true {
			max-height: 100vh;
			height: auto;
			margin-bottom: .9rem;
		}
		.error-before { margin-right: .6rem; }
		.errorMsg {
			margin-right: .6rem;
			font-weight: bold;
			text-transform: none;
		}
		.error-after {}
	}

</style>
