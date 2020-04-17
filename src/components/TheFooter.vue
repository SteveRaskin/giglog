<template>

	<footer class="footer">

		<p>Footer.vue</p>
		<app-button buttonClass="btn-debug" buttonText="log route" @click.native="test"/>

	</footer>

</template>




<script>

	import debugRoute from '@/mixins/debug_route.js';

   export default {
		props: {},

      data() {
			return {
				title: "",
				subtitle: "",
				debugMsg: "footer.vue",
				loggedIn: false
         }
    	},

		created: function() {
			// console.log("footer.vue @created");
		},

		methods: {},

		mixins: [debugRoute]

   }
</script>



<style lang="scss">

	.footer {
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		margin-top: auto;
		padding: 0 6%;
		background: transparent;
		border: 1px solid lime;
	}

</style>
