<template>

	<div class="container">

		<section>

			<h1>welcome</h1>

			<p>
				Welcome to Gigz.
			</p>

			stuff i've learned and/or decided during development;

			as to a calendar plug-in;
			a fine job but I encounter an issue and while it's discussed in the dude's github page, the code offered to resolve it failed in my app, and I decided at that point - which is to say, if it ain't perfect, and if I have to jump through debugging hoops, then I'd just as soon work with the native input. I'm more concerned with working out the validation than I am with someone else's timesuck for an arguably pointless feature. Furthermore if I'm gonna use his plug-in for datepicker then why not timepicker as well, and in this case the timepicker sucked



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
