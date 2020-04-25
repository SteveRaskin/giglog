<template>

   <div class="container" id="project-add">

		<app-subheader v-bind:fileName="fileName" v-bind:viewName="viewName" />

		<section>

			<form>

	         <div class="label-input text">
	            <label for="">client (company name)</label>
	            <input type="text" v-model.lazy="project.client" required />
	         </div>
	         <div class="label-input text">
	            <label for="">project reference (website)</label>
	            <input type="text" v-model.lazy="project.projectReference" required />
	         </div>

	         <!-- BUSINESS ADDRESS -->
	         <fieldset>
	            <legend>business address</legend>
	            <div class="label-input text">
	               <label for="">street address</label>
	               <input type="text" v-model.lazy="project.address" required />
	            </div>
	            <div class="label-input text">
	               <label for="">city</label>
	               <input type="text" v-model.lazy="project.city" required />
	            </div>
	            <div class="state-zip">
	               <div class="label-input text state">
	                  <label for="">state</label>
	                  <input type="text" v-model.lazy="project.state" required />
	               </div>
	               <div class="label-input text zip">
	                  <label for="">zip</label>
	                  <input type="text" v-model.lazy="project.zip" required />
	               </div>
	            </div>
	         </fieldset>
	<!--
	v-model will ignore the initial value, checked or selected attributes found on any form elements. It will always treat the Vue instance data as the source of truth. You should declare the initial value on the JavaScript side, inside the data option of your component.
	-->
	         <!-- WORK LOCATION -->
	         <fieldset class="radios">
	            <legend>work location:</legend>
	            <div class="label-input radio">
	               <label>
	                  <input type="radio" name="work-location" id="remote" value="remote" v-model="workLocation" />
	                  remote/at home
	               </label>
	            </div>
	            <div class="label-input radio">
	               <label>
	                  <input type="radio" name="work-location" id="business-address" value="business-address" v-model="workLocation" />
	                  at business address
	               </label>
	            </div>
	            <div class="label-input radio">
	               <label>
	                  <input type="radio" name="work-location" id="other-address" value="other-address" v-model="workLocation" />
	                  elsewhere:
	               </label>
	            </div>
	            <div class="label-input text" id="elsewhere" v-if="workLocation=='other-address'">
	               <!-- <label for="">work location</label> -->
	               <input type="text" v-model.lazy="project.workLocation" />
	            </div>
	         </fieldset>


	         <div class="label-input text">
	            <label for="">referrer:</label>
	            <input type="text" v-model.lazy="project.source" />
	         </div>


	         <!-- ============ CONTACTS INFO ============ -->
	         <div class="contacts-wrapper">
	            <fieldset class="contacts">
	               <legend>Contact(s):</legend>
	               <div class="label-input text contact">
	                  <label for="">name</label>
	                  <input type="text" class="contact-info" v-model.lazy="contactInfo.name" required />
	               </div>
	               <div class="label-input text contact">
	                  <label for="">title</label>
	                  <input type="text" v-model.lazy="contactInfo.title" required />
	               </div>
	               <div class="label-input text contact">
	                  <label for="">email address</label>
	                  <input type="text" v-model.lazy="contactInfo.email" required />
	               </div>
	               <div class="label-input text contact">
	                  <label for="">phone</label>
	                  <input type="text" v-model.lazy="contactInfo.phone" required />
	               </div>
	               <div class="buttons">
							<app-button
								buttonClass="btn-color-2 btn-add"
								buttonText="add contact"
								v-on:click.native="addContactInfo"
							/>

	   				</div><!-- END .buttons -->
	            </fieldset><!-- END .contacts -->
	         </div><!-- END .contacts-wrapper -->

	         <!-- DATES & RATE -->
	         <div class="label-input text">
	            <label for="">start date (TODO: datepicker)</label>
	            <input type="text" v-model.lazy="project.startDate" required />
	         </div>
	         <div class="label-input text">
	      		<label for="">description</label>
	      		<textarea v-model.lazy="project.description"></textarea>
	         </div>

	         <div class="buttons">
					<app-button
						buttonClass="btn-color-4 btn-save"
						buttonText="save project"
						v-on:click.native="post"
					/>
	         </div><!-- END .buttons -->
			</form>
		</section>

   </div>
</template>



<script>

   export default {
      components: {
      },

      data () {
         return {
				viewName: "Add a Project",
				fileName: "ProjectCreate.vue",
            project: {
					id: "",
               client: "",
               projectReference: "",
               address: "",
               city: "",
               state: "",
               zip: "",
               workLocation: "",
               contacts: [],
               startDate: "",
               description: ""
				},
            contactInfo: {},
            workLocation: true,
            submitted: false
         }
      }, // data
      methods: {
         addContactInfo: function(e) {
            e.preventDefault();
            console.log(this.contactInfo.name, this.contactInfo.title, this.contactInfo.email, this.contactInfo.phone);
            this.project.contacts.push(this.contactInfo);
            this.contactInfo = {};
         },
			validate: function() {
				console.log("time to validate");
			},
			post: function() {
            console.log(this.project);
            this.$http.post("https://sr-giglog.firebaseio.com/projects.json", this.project)
               .then(function(data) {
						this.project.id = data.body.name;
                  this.submitted = true;
               })
					.then(function(data) {
						this.$router.replace({ name: 'ProjectDetail', params: { id: this.project.id } })
					})
			} // post
      } // methods
   }
</script>


<style lang="scss" scoped>
</style>
