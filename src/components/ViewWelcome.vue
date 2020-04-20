<template>

	<div class="container">

		<section>

			<h1>welcome</h1>

			<p>
				Welcome to Gigz.
			</p>

			<p>
				no account yet?
				<router-link
					tag="button"
					class="btn btn-color-1"
					:to="{ name: 'SignUp', params: {} }"
					>sign up
				</router-link>
			</p>

			<p>
				already have an account?
				<router-link
					tag="button"
					class="btn btn-color-1"
					:to="{ name: 'LogIn', params: {} }"
					>log in
				</router-link>

			</p>


		</section>
	</div>
</template>




<script>


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
				errorMsg: ""
			}
		},
		methods: {
		}, // methods
		watch: {}
	}
</script>



<style lang="scss">




</style>
