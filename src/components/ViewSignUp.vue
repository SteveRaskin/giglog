<template>

	<div class="container sign-up" id="sign-up">

		<section>

			<h1>sign up</h1>

			<div class="fieldset-wrapper">

				<fieldset>
					<legend>giglog sign-up</legend>

					<p class="error" v-bind:class="{ true: error }">
						{{ errorMsgBefore }}
						<br />
						<span class="errorMsg">{{ errorMsg }}</span>
						<br />
						{{ errorMsgAfter }}
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
						<app-button buttonClass="btn-sign-up" buttonText="sign up" v-on:click.native="signUp" />
					</div>
				</fieldset>
			</div><!-- END .fieldset-wrapper -->

			<p>
				password: <b>{{ password }}</b>
				<br />
				confirm password: <b>{{ confirmPassword }}</b>
				<br />
				<!-- match? <b>{{ match }}</b> -->
			</p>

			<p>
				already have an account?
				<router-link
					tag="button"
					class="btn btn-edit"
					:to="{ name: 'LogIn', params: {} }"
					>log in
				</router-link>

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
				errorMsgBefore: "oh nohz! somethin' ain't right!",
				errorMsgAfter: "please try again",
				errorMsg: ""
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



<style lang="scss">


   section  {
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      margin-bottom: 3rem;
		padding-bottom: 1.5rem;
		h1 { margin-bottom: 1.5rem; font-size: 1.8rem; color: $theme; text-transform: uppercase; }
   }

   .buttons,
   section .fieldset-wrapper { overflow: hidden; transition: all .9s ease-in-out; }
   section .fieldset-wrapper { width: 100%; }
   legend { color: #000; font-weight: bold; text-transform: uppercase; }

   /* init view: show the static data + 'edit' buttons, and hide the fieldset-wrapper */
   section > .buttons { max-height: 100vh; }
   section .fieldset-wrapper { max-height: 100vh; }


   .edit-link {
      min-width: 0;
      padding: 0;
      color: dodgerblue;
      background: transparent;
      font-weight: bold;
      text-transform: uppercase;
      border: 0;
      box-shadow: none;
      word-spacing: 0;
   }

	.error {
		max-height: 0;
		height: 0;
		overflow: hidden;
		margin-bottom: 0;
		padding: 0 .9rem;
		color: $error;
		border-top: 0;
		border-bottom: 0;
		border-radius: .3rem;
		transition: .9s all ease-in-out;
		&.true {
			max-height: 100vh;
			height: auto;
			margin-bottom: .9rem;
			padding: .3rem .9rem;
			border: 1px solid $error;
		}
		.errorMsg { font-weight: bold; text-transform: uppercase; }
	}


</style>
