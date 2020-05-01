export default {
	methods: {
		// titleCase: function(str) {
		// 	return str.toLowerCase().split(' ').map(function(word) {
		// 		return (word.charAt(0).toUpperCase() + word.slice(1));
		// 	}).join(' ');
		// }
		validEmail: function(email) {
			var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
	}
}
