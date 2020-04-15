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



<style scoped>

</style>
