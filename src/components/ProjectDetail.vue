<template>
   <!-- custom directive with optional argument (corresponds to binding.arg in the directive instance) -->

	<div class="container project-detail">

		<app-subheader v-bind:fileName="fileName" v-bind:viewName="viewName" />

		<!-- ======================== CLIENT INFO ======================== -->
      <section class="card client-data">
         <dl>
            <dt>client:</dt>
            <dd>
               <p><strong>{{ project.client }}</strong></p>
               <p>{{ project.address }}</p>
               <p>{{ project.city }} {{ project.state }} {{ project.zip }}</p>
					<p>
						<span class="label">ID:</span>
						<span class="value"> {{ this.id }}</span>
					</p>
            </dd>
         </dl>
			<!-- TODO: confirm whether .label & .value are required after porting in markup from Edit -->
		</section><!-- END .client-data -->

		<!-- ======================== GIG INFO ======================== -->
      <section class="gig-data">

			<dl>
            <dt>gig:</dt>
            <dd>
               <dl>
                  <dt>work location:</dt> <dd>{{ project.workLocation }}</dd>
                  <dt>task:</dt> <dd>{{ project.description }}</dd>
						<dt>referrer:</dt> <dd>{{ project.source }}</dd>
						<dt>reference ???:</dt> <dd>{{ project.projectReference }}</dd>
                  <dt>start date:</dt> <dd>{{ project.startDate }}</dd>
               </dl>
            </dd>
         </dl>
		</section><!-- END .gig-data -->


		<!-- ======================== CONTACTS ======================== -->
      <section class="contacts-wrapper">
			<dl>
            <dt>contacts:</dt>
            <dd>

               <ul class="contacts">
                  <li v-for="(contact, ix) in project.contacts" v-bind:key="ix">
                     <div class="contact-data">
                        <!-- {{ ix + 1 }}. -->
								<p class="contact-name">{{ contact.name }}</p>
                        <p class="contact-title">{{ contact.title }}</p>
								<p class="contact-email">
									<a :href="'mailto:contact.email'" :title="contact.email">
										{{ contact.email }}
									</a>
								</p>
                        <p class="contact-phone">{{ contact.phone }}</p>
                     </div>
						</li><!-- END .contact -->
               </ul>
            </dd>
         </dl>
      </section><!-- END .contacts -->

		<div class="buttons">
			<router-link
				tag="button"
				class="btn btn-color-2 btn-edit"
				:to="{ name: 'ProjectEdit', params: { id: this.id, client: this.client }}"
				>edit
			</router-link>
			<router-link
				tag="button"
				class="btn btn-color-3 btn-log-hours"
				:to="{ name: 'LogHours', params: { id: this.id, client: this.client }}"
				>log hours
			</router-link>
		</div>

   </div><!-- END .container -->
</template>

<script>

   // import search  from '../mixins/searchMixin.js';
	import titleCase from '@/mixins/titleCase.js';

   export default {
		props: {
			client: String,
			id: String
		},
      components: {
      },
      data () {
         return {
				viewName: "Project Detail",
				fileName: "ProjectDetail.vue",
				project: {},
            search: "",
				// data via props (also $route object params):
         }
      }, // data

		methods: {
			debug: function(id) {
				// console.log("ProjectDetail @debug: project.id", id);
			}
		}, // methods

      created: function() {
			// TAN 'note; why url, path must be ;id to get project data'
			// this.$http.get("https://sr-giglog.firebaseio.com/projects/" + this.$route.params.id + ".json")
			// odd, but strange: this.id is id prop which is only coming from the router link, yet unless the path variable is the id, the id prop is lost
			this.$http.get("https://sr-giglog.firebaseio.com/projects/" + this.id + ".json")
			.then(data => data.json())
         .then(data => {
				this.project = data;
			})
      }, // created
      computed: {
      }, // computed
      directives: {
      }, // directives
      filters: {
      }, // filters
		mixins: [ titleCase ]
      // mixins: [ debugRoute ]
   } // export default
</script>


<style lang="scss" scoped>

</style>
