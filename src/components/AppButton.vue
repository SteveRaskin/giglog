<!-- TAN -->
<template>

	<button
		class="btn"
		v-bind:class="buttonClass"
		v-bind:id="buttonID"
		v-bind:to="buttonPath"
		v-bind:disabled="buttonDisabled"
		>{{ buttonText }}
	</button>

</template>



<script>

   export default {
		props: {
			buttonClass: String,
			buttonID: String,
			buttonText: String,
			buttonDisabled: Boolean,
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


	.debug { color: lime; }

</style>
