<template>

	<div class="container container-ux">

		<section>

			<h1>UX</h1>

			<p class="welcome">
				The original UX mockups I scratched out in Balsamiq a few thousand years ago:
			</p>

			<img class="ux-mockup" src="@/assets/img/project_list.png" alt="ux mockup" />
			<img class="ux-mockup" src="@/assets/img/project_create.png" alt="ux mockup" />
			<img class="ux-mockup" src="@/assets/img/project_detail.png" alt="ux mockup" />
			<img class="ux-mockup" src="@/assets/img/project_edit.png" alt="ux mockup" />
			<img class="ux-mockup" src="@/assets/img/project_log_hours.png" alt="ux mockup" />

		</section>
	</div>
</template>




<script>

	export default {
		name: "Welcome",

		data: function() {
			return {
			}
		},
		created: function() {
		},
		mounted: function() {
		},
		methods: {
		},
		watch: {}
	}
</script>



<style lang="scss">

	.container-ux h1 {
		margin-bottom: 1.5rem;
	}

	.ux-mockup {
		max-width: 900px;
		margin: 0 auto 1.5rem;
	}

</style>
