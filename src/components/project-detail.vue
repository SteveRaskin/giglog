<template>
   <!-- custom directive with optional argument (corresponds to binding.arg in the directive instance) -->

	<div class="container" id="project-detail">

		<app-subheader v-bind:fileName="fileName" v-bind:viewName="viewName" />

		<!-- ======================== CLIENT DATA ======================== -->
      <section class="client-data">
         <dl>
            <dt>client:</dt>
            <dd>
               <p><strong>{{ project.client }}</strong></p>
               <p>{{ project.address }} {{ project.city }} {{ project.state }} {{ project.zip }}</p>
            </dd>
         </dl>
		</section><!-- END .client-data -->

		<!-- ======================== GIG DATA ======================== -->
      <section class="gig-data">
         <dl>
            <dt>gig data:</dt>
            <dd>
               <dl>
                  <dt>work location:</dt> <dd>{{ project.workLocation }}</dd>
                  <dt>description:</dt> <dd>{{ project.description }}</dd>
                  <dt>source:</dt> <dd>{{ project.source }}</dd>
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
                     <div v-if="!contact.editingContact">
                        {{ contact.name }} ({{ ix }})<br />
                        {{ contact.title }}<br />
                        {{ contact.email }}<br />
                        {{ contact.phone }}
                     </div>
						</li><!-- END .contact -->
               </ul>
            </dd>
         </dl>
      </section><!-- END .contacts -->


		<!-- TODO: confirm this is redundant and remove -->
		<div class="project-metadata">
	      <!-- <input type="text" v-model="search" placeholder="search blog" /> -->
			<p>
				<span class="label">ID:</span>
				<span class="value">{{ this.id }}</span>
			</p>
			<p>
				<span class="label">client:</span>
				<span class="value">{{ project.client }}</span>
			</p>
			<p id="address">
				<span class="label">address:</span>
				<span class="value">{{ project.address }}</span>
				<span class="value">{{ project.city }}</span>
				<span class="value">{{ project.state }}</span>
				<span class="value">{{ project.zip }}</span>
			</p>
			<p>
				<span class="label">work location:</span>
				<span class="value">{{ project.workLocation }}</span>
			</p>
			<p id="projectReference">
				<span class="label">source:</span>
				<span class="value">{{ project.source }}</span>
			</p>

			<p>
				<span class="label">project:</span>
				<span class="value">{{ project.projectReference }}</span>
			</p>
			<p><span class="label">description:</span> <span class="value">{{ project.description }}</span></p>
			<p><span class="label">start date:</span> <span class="value">{{ project.startDate }}</span></p>
		</div><!-- END .project-metadata -->

		<div class="contacts-wrapper">
			<p><span class="label">all contacts:</span>
				<ul class="contacts">
					<li v-for="(contact, ix) in project.contacts" v-bind:key="ix">
						<p>
							<span class="strongest">{{ contact.name }}</span>
						</p>
						<p>
							<span class="stronger">{{ contact.title }}</span>
						</p>
						<p>{{ contact.email }}</p>
						<p>{{ contact.phone }}</p>
					</li>
				</ul>
			</p>
		</div><!-- END .contacts-wrapper -->

		<app-buttons v-bind:projectID="id"></app-buttons>

   	<!--
			don't need filter but maybe by default highlight most recent? => trivial via CSS
			- search function for sure
		-->
   </div><!-- END .container -->
</template>

<script>

   // import search  from '../mixins/searchMixin.js';
   export default {
      components: {
      },
      data () {
         return {
				viewName: "Project Detail",
				fileName: "project-detail.vue",
				id: this.$route.params.id,
				project: {},
            search: "",
				projectID: ""
         }
      }, // data

      methods: {
      }, // methods

      created: function() {
			this.$http.get("https://sr-giglog.firebaseio.com/projects/" + this.id + ".json")
         .then(function(data) {
            return data.json();
         }).then(function(data) {
				this.project = data;
				// console.log("project-detail.vue > created: data", data);
			})
      }, // created
      computed: {
      }, // computed
      directives: {
      }, // directives
      filters: {
      }, // filters
      // mixins: [ debugRoute ]
   } // export default
</script>


<style scoped>

	#project-detail .main .subheader h2 { display: none; }

	section  {
		display: flex;
		flex-flow: row wrap;
		align-items: flex-end;
		margin-bottom: 1.5rem;
		padding-bottom: 1.5rem;
		border-bottom: 3px double #ccc;
	}
	section .buttons { margin: 0 0 0 auto; }
	/*section button { margin: 0 0 0 auto; }*/

	dl {
		display: flex;
		justify-content: flex-start;
		/*padding: .9rem;*/
		flex-flow: row wrap;
	}

	dt { width: 100%; margin-bottom: .3rem; }
	dd { /*width: 21rem;*/ margin-bottom: 1.5rem; font-weight: bold; border: 0px solid lime; }
	dd:last-of-type   { margin-bottom: 0; }

	dt.inline,
	dd.inline   { width: auto; }
	dl + .buttons { display: inline-block; margin-top: 0; }

	ul.contacts { margin: 0; padding: 0; }

	/* TODO: confirm this is redundant and remove */
	.project-metadata { display: none; }

</style>
