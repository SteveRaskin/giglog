export default {
	methods: {
		capitalizer: function(str) {
			let firstName = str.split(' ').slice(0, -1).join(' ');
			let lastName = str.split(' ').slice(-1).join(' ');
			firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
			lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
			return firstName + " " + lastName;
		}
	}
}
