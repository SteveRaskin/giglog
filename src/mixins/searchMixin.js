export default {
	computed: {
		filteredProjects: function() {
			// let noResults = false;
			const searchTerm = this.search.toLowerCase();
			if (!searchTerm) {
				return false;
			}

			// .filter() returns an array, so it's always true; use .length() to return false when empty
			// client, contacts, projectReference, description, source
			return this.projects.filter((project) => {
				/*
					imperfect; search 'sous' would return nada because there's only one instance of 'sous-chef' (contact's title)
					in a project which is missing the 'source' key
				*/
				if (project.client && project.contacts.length && project.projectReference && project.description && project.source) {
					return (project.client.toLowerCase().match(searchTerm)) ||
								(project.contacts.filter((el) => {
									if (el != null) {
										return el.name.toLowerCase().match(searchTerm);
									}
								}).length > 0) ||
								(project.projectReference.toLowerCase().match(searchTerm)) ||
								(project.description.toLowerCase().match(searchTerm)) ||
								(project.source.toLowerCase().match(searchTerm));
				}
				else {
					// console.log("no results match the search term");
					// noResults = true;
					// return;
				}
			});
		},
	} // computed
}
