<!-- TAN -->
<template>

		<!-- √√√ v-bind:to="'/' + path + '/' + id" -->
		<router-link
			tag="button"
			class="btn"
			v-bind:class="buttonClass"
			v-bind:to="buttonPath"
			exact
			>{{ buttonText }}
		</router-link>

</template>



<script>

   export default {
		props: {
			buttonClass: String,
			buttonText: String,
			path: {
				type: String,
				default: ""
			},
			projectID: String,
			id: String
		},

      data() {
         return {
         }
    	},
		computed: {
			buttonPath: function() {
				return this.path ? (this.id ? '/' + this.path + '/' + this.id : '/' + this.path) : "";
			}
		},
		created: function() {
			// console.log("this.buttonPath", this.buttonPath);
		},
		methods: {
		}

   }
</script>



<style scoped lang="scss">

	.buttons	{
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		/* DNU margins */
		font-weight: bold;
	}

	.buttons button:not(:last-child),
	.buttons .button:not(:last-child) { margin-right: 1.5rem; }

	button,
	a.button,
	input[type="text"],
	textarea {
	   font-size: 1.2rem; /* not inherited */
	   border-radius: .3em;
	}

	button,
	a.button	{
		display: inline-block;
		min-width: 8.4rem;
		padding: .45rem 1.8rem;
		font-weight: 500;
		text-align: center;
		word-spacing: .3rem;
		transition: .15s ease-in-out;
		/* ok if all buttons.button have bg color */
	   color: $w;
	}

	/*
		BUTTON/'BUTTON' CLASSES
		- ~ 'function' color codes:
			- color for .details, a.edit, etc.
			- then augment w/ button.details, etc.
	      [ https://github.com/vuejs/vue-loader/issues/363 ]

			https://mayvendev.com/blog/inner-shadows-in-css-images-text-and-beyond
			re: inset bevel text effect
	*/
	.btn {
		cursor: pointer;
		/* background: $b; */
		color: $b;
		background: $w;
		border: 1px solid $tr;
	}
	.btn:hover {
		/* backup */
		background: $b;
		color: $w;
		border: 1px solid $b;
		border-radius: 1.5em;
	}
	.btn::before {
		display: inline-block;
		padding-right: .9rem;
		font-size: 1.2em;
		font-weight: bold;
	}
	/*
		Projects: details, edit, log hours
		Add Project: add, save
		Detail: edit, log hours, all projects;
		Edit: edit, cancel, save
		Log Hours: log hours (should be 'save')
		! on buttons, the ???
		also sign-up and sign-in, log-in
	*/

	/* TODO: BUTTON MIXIN */
	.btn-details,
	.btn-all-projects,
	.btn-add-project {
		color: $theme;
		border: 1px solid $theme;
	}

	.btn-all-projects::before {
		content: "\2190";
	}
	.btn-add-project::before {
		content: "\002B";
	}
	/* https://www.toptal.com/designers/htmlarrows/math/*/

	.btn-details:hover,
	.btn-details:active,
	.btn-all-projects:hover,
	.btn-all-projects:active {
	   color: $w;
	   background: $theme;
	}

	.btn-edit {
		color: $edit;
		border: 1px solid $edit;
	}
	.btn-edit:hover,
	.btn-edit:active {
		color: $w;
	   background: $edit;
	}

	.btn-log-hours {
		color: $log-hours;
		border: 1px solid $log-hours;
	}
	.btn-log-hours:hover,
	.btn-log-hours:active {
	   color: $w;
	   background: $log-hours;
	}

	.btn-save {
		color: $save;
		border: 1px solid $save;
	}
	.btn-save:hover,
	.btn-save:active {
	   color: $w;
	   background: $save;
	}



	.btn-cancel { background: $cancel; }
	.btn-cancel:hover,
	.btn-cancel:active {
	   color: $cancel;
	   background: $w;
	   border: 1px solid $cancel;
	}

	.btn-logout	{
		color: $b;
		background: $tr;
		border: 0;
	}
	.btn-logout:hover,
	.btn-logout:active {
	   background: $tr;
		box-shadow: none;
		text-decoration: underline;
	}

	/*
	#project-detail .buttons .btn-details,
	#project-edit .buttons .btn-edit,
	#project-edit .buttons .btn-log-hours,
	#projects .buttons .btn-all-projects	{ display: none; }
	*/



	.debug { color: lime; }

</style>
