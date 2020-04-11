export default {
	computed: {
		filteredProjects: function() {
			const searchTerm = this.search.toLowerCase();
			if (!searchTerm) {
				return false;
			}
			console.log("searchTerm:", searchTerm);

			// return this.projects.filter((project) => {
			// 	return	(project.client.toLowerCase().match(searchTerm)) ||
			// 				// .()filter returns an array, so its value will always be true; use .length() to return false when empty
			// 				(project.contacts.filter((el) => {
			// 					return el.name.toLowerCase().match(searchTerm);
			// 				}).length > 0) ||
			// 				(project.projectReference.toLowerCase().match(searchTerm)) ||
			// 				(project.description.toLowerCase().match(searchTerm)) ||
			// 				(project.source.toLowerCase().match(searchTerm));
			// }); // this.projects.filter



		} // filteredProjects
	} // computed
}


// hmm, add contact.title?
