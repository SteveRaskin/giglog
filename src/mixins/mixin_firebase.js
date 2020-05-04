import firebase from 'firebase';

export default {
	created: function() {
		// this.getLoggedIn();
		// console.log("mixin fb @created: this.loggedIn", this.loggedIn);
		// var _this = this;
		// firebase.auth().onAuthStateChanged(function(user) {
		// 	if (user) {
		// 		_this.loggedIn = true;
		// 	} else {
		// 		_this.loggedIn = false;
		// 	}
		// });
	},

	methods: {
		getLoggedIn: function() {
			console.log("mixin fb @created: this.loggedIn", this.loggedIn);
			var _this = this;
			firebase.auth().onAuthStateChanged(function(user) {
				if (user) {
					_this.loggedIn = true;
				} else {
					_this.loggedIn = false;
				}
			});
		},

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
		}, // signUp

		logIn: function() {
			const emailInput = document.querySelector("#email");
			firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
				// arrow function non-optional re: this.$router
				(user) => {
					const userFirstName = this.email.charAt(0).toUpperCase() + this.email.slice(1).split('@')[0];
					alert("welcome to giglog, " + userFirstName);
					this.$router.replace({ name: 'Projects' })
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

		signOut: function() {
			console.log("signOut");
			firebase.auth().signOut().then(() => {
				// this.$router.replace('LogIn')
				// this.$router.replace({ name: 'LogIn' })
				this.$router.replace({ name: 'Welcome' });
				// if (this.$router.from !== "Welcome") {
				// 	this.$router.replace({ name: 'Welcome' });
				// }
			})
		}
	}, // methods
}
