<template>

	<div class="subheader">

		<h1>{{ viewName }} <span>({{ fileName }})</span></h1>

	</div><!-- END .subheader -->

</template>



<script>

   export default {
		components: {
		},
		props: {
			viewName: String,
			fileName: String,
			projects: Array
		},
      data() {
         return {
				search: "",
         }
    	},
		created: function() {
		},

		beforeMount: function() {
		},

		mounted: function() {
		},

		methods: {},
		// mixins: [ mixin_search ],

		computed: {
		} // computed

   }
</script>



<style lang="scss" scoped>

	.subheader {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		h1 {
			width: auto;
			// margin-bottom: 1.5rem;
			font-size: 2.1rem;
			color: $theme1;
			span { font-size: .6em; }
		}
	}

</style>
