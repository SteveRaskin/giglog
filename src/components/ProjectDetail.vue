<template>
   <!-- custom directive with optional argument (corresponds to binding.arg in the directive instance) -->

	<div class="container container-project-detail">

		<app-subheader v-bind:fileName="fileName" v-bind:viewName="viewName" />

		<!-- ======================== CLIENT INFO ======================== -->
      <section class="card client-data">
         <dl>
            <dt>client:</dt>
            <dd>
					<p class="client">{{ project.client }}</p>
               <p class="street-address">{{ project.address }}</p>
					<p>
						<span class="city">{{ project.city }}</span>
						<span class="state">{{ project.state }}</span>
						<span class="zip">{{ project.zip }}</span>
					</p>
					<!-- <p><span class="label">ID:</span><span class="value"> {{ this.id }}</span></p> -->
            </dd>
         </dl>
		</section>


		<!-- ======================== GIG INFO ======================== -->
      <section class="gig-data">
			<dl>
            <dt>gig:</dt>
            <dd>
               <dl>
						<dt>start date:</dt> <dd>{{ project.startDate }}</dd>
                  <dt>task:</dt> <dd>{{ project.description }}</dd>
						<dt>website:</dt> <dd>{{ project.projectReference }}</dd>
						<dt>tech stack:</dt> <dd>{{ project.techstack }}</dd>
						<dt>referrer:</dt> <dd>{{ project.source }}</dd>
						<dt>work site:</dt> <dd>{{ project.workLocation }}</dd>
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

		<section class="card logged-hours" v-if="showLoggedHours">
			<p>hours: <strong>{{ project.client }}</strong>:</p>
			<ul>
				<li v-for="(date, ix) in project.hours" v-bind:key="ix">
					<b>{{ dateString(date.date) }}</b>: {{ date.totalHours }} hrs @ {{ date.rate }}/hr. = <strong>$ {{ date.totalAmount }}</strong> ... "{{ date.notes }}"
				</li>
			</ul>
		</section>


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
				showLoggedHours: false
				// data via props (also $route object params):
         }
      }, // data

      created: function() {
			// TAN 'note; why url, path must be ;id to get project data'
			// this.$http.get("https://sr-giglog.firebaseio.com/projects/" + this.$route.params.id + ".json")
			// odd, but strange: this.id is id prop which is only coming from the router link, yet unless the path variable is the id, the id prop is lost
			this.$http.get("https://sr-giglog.firebaseio.com/projects/" + this.id + ".json")
			.then(data => data.json())
			.then(data => {
				this.project = data;
			})
			.then(() => {
				this.displayLoggedHours();
			})
      }, // created


		methods: {
			debug: function(id) {
				// console.log("ProjectDetail @debug: project.id", id);
			},
			displayLoggedHours: function() {
				if (this.project.hours && this.project.hours.length) {
					this.showLoggedHours = true;
				}
			},
			dateString: function(dateObj) {
				return dateObj.toString().slice(0, 10).toUpperCase();
			},
		}, // methods


      computed: {
      }, // computed
      directives: {
      }, // directives
      filters: {
      }, // filters
		mixins: [ titleCase ]
   } // export default
</script>


<style lang="scss" scoped>

</style>
