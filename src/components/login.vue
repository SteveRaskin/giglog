<template>

   <div class="container" id="login">

      <section>

			<h1>log in</h1>

         <div class="fieldset-wrapper">
            <fieldset>
               <legend>giglog login</legend>

					<p class="error" v-bind:class="{ true: error }">
						{{ errorMsgBefore }}
						<br />
						<span class="errorMsg">{{ errorMsg }}</span>
						<br />
						{{ errorMsgAfter }}
					</p>

					<!-- EMAIL ADDRESS -->
               <div class="label-input text">
                  <label for="">email address</label>
                  <input type="text" id="email" v-model="email" placeholder="email address" required />
               </div>

               <!-- PASSWORD -->
					<div class="label-input text">
                  <label for="">password</label>
                  <input type="password" id="password" v-model="password" placeholder="password" required />
               </div>

		         <div class="buttons">
						<app-button buttonClass="btn-log-in" buttonText="log in" v-on:click.native="logIn" />
		         </div><!-- END .buttons -->
				</fieldset>

         </div><!-- END .fieldset-wrapper -->

			<p>
				no account yet?
				<router-link :to="{ name: 'SignUp', params: {} }">Sign Up</router-link>
			</p>

      </section>
      <!-- <form v-if="!submitted">
		</form> -->

   </div>
</template>



<script>

	import firebase from 'firebase';

   export default {
		name: "login",
		data: function() {
			return {
				name: "",
				email: "",
				password: "",
				error: false,
				errorMsgBefore: "oh nohz! somethin' ain't right!",
				errorMsgAfter: "please try again",
				errorMsg: ""
			}
		},

      props: {
		},

      components: {
      },

      created: function() {
			console.log('login.vue @created');
      },
		mounted: function() {
			let emailInput = document.querySelector("#email");
			emailInput.focus();
		},
      methods: {
			logIn: function() {
				const emailInput = document.querySelector("#email");
				firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
					// arrow function non-optional re: this.$router
					(user) => {
						const userFirstName = this.email.charAt(0).toUpperCase() + this.email.slice(1).split('@')[0];
						alert("welcome to giglog, " + userFirstName);
						this.$router.replace('Projects')
					},
					(err) => {
						console.log("err.message:", err.message);
						this.error = true;
						this.errorMsg = err.message;
						emailInput.classList += 'true';
						emailInput.focus();
					}
				)
			}, // logIn
      },
		watch: {
		},

   } // export default
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




<!--  -->
