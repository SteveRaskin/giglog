export default {
	created: function() {},
	computed: {
		searchResults: function() {
			const searchTerm = this.search.toLowerCase();
			if (!searchTerm) {
				return false;
			}
			// .filter() returns an array, so .length() to return false when empty
			// client, contacts, projectReference, description, source
			return this.projects.filter((project) => {
				if (project.client && project.contacts !== undefined && project.contacts.length && project.projectReference && project.description && project.source) {
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
				else {}
			}); // return
		},
	} // computed
}
