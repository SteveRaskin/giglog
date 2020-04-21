<template>

	<header>

		<h1>
			<router-link :to="{ path: '/' }">gigz</router-link>
		</h1>

		<p style="display: none; color: orangered; font-size: 1.2rem;">viewName: <b>{{ viewName }}</b></p>
		<nav>
			<div class="buttons" v-if="(loggedIn && viewName !== 'LogIn' && viewName !== 'SignUp')">
				<router-link
					v-if="(viewName !== 'Projects')"
					tag="button"
					class="btn btn-color-1 btn-all-projects"
					:to="{ name: 'Projects', params: {}}"
					>Project List
				</router-link>
				<router-link
					tag="button"
					class="btn btn-color-1 btn-add-projects"
					:to="{ name: 'AddProject', params: {}}"
					>Add a Project
				</router-link>
				<app-button buttonClass="btn-log-out" buttonText="log out" v-on:click.native="signOut" />
			</div>
		</nav>

	</header>

</template>



<script>

	import firebase from 'firebase';

   export default {
		props: {
			viewName: String
		},

      data() {
         return {
				title: "",
				subtitle: "",
				loggedIn: false
         }
    	},

		watch: {
		},

		created: function() {
			var _this = this;
			firebase.auth().onAuthStateChanged(function(user) {
				if (user) {
					_this.loggedIn = true;
				} else {
					_this.loggedIn = false;
				}
			});
		},

		methods: {
			signOut: function() {
				firebase.auth().signOut().then(() => {
					// this.$router.replace('LogIn')
					this.$router.replace({ name: 'LogIn' })
				})
			}
		}, // methods
		updated: function() {
		}

   }
</script>



<style lang="scss" scoped>

	header {
	   h1	{
			display: flex;
			align-items: center;
			height: 100%;
			max-height: 4.2rem;
			margin-left: -1.8rem;
			padding: 0 3rem .3rem 3rem;
			font-size: 2.4rem;
			text-transform: lowercase;
			background: $theme1;
			border-radius: 3rem 0;
			transition: .3s all ease-in-out;
	   }
	   h1 > a {
			display: block;
			color: $w;
			transition: .3s all ease-in-out;
		}
		h1:hover {
			background: #fff;
			border-radius: 1.5rem 0;
		}
		h1:hover a {
			color: $theme1;
			border-radius: 1.5rem 0;
		}

		nav {
			ul	{
				display: flex;
				justify-content: space-between;
				margin: .9rem 0;
				padding: .3rem 0;
				li	{
					white-space: nowrap;
					margin-right: .9rem;
				}
				li > a	{
					padding: .3rem 2.1rem;
					color: #fff;
					text-decoration: none;
					box-shadow: inset 0 0 0 #fff;
					border: 1px solid transparent;
					background: #666;
					border-radius: 3px;
					transition: .15s all ease-in-out;
				}
				li > a:hover,
				li > .router-link-active { /*background: #f0f0f0;*/ color: #333; box-shadow: inset 0 2.1rem #f0f0f0; }
				li > .router-link-active { color: darkgreen; font-weight: bold; }
			} /* ul */
		} /* nav */

	} /* header */

</style>
