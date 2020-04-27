<template>

   <div class="container" id="project-add" ref="container">

		<app-subheader v-bind:fileName="fileName" v-bind:viewName="viewName" />

		<section>

			<form ref="form">

				<p v-if="errors.length" style="margin-bottom: .9rem; padding: .9rem;">
					<b>Please include:</b>
					<ul>
						<li class="error" v-for="(error, ix) in errors" v-bind:key="ix">- {{ error }}</li>
					</ul>
				</p>

	         <div class="label-input text">
	            <label for="name">client (company name)</label>
	            <input type="text" id="name" v-model.lazy="project.client" required />
	         </div>
	         <div class="label-input text">
	            <label for="project-reference">project (website)</label>
	            <input type="text" id="project-reference" v-model.lazy="project.projectReference" required />
	         </div>

				<div class="label-input">
	            <!-- <label for="">start date</label> -->
					<date-picker
						valueType="format"
						v-model="project.startDate"
						type="date"
						placeholder="select start date"
						format="YYYY.MM.DD (ddd)"
					>
						<template v-slot:header="">
							<p class="">oh, a slot</p>
						</template>
					</date-picker>
	         </div>

	         <!-- BUSINESS ADDRESS -->
	         <fieldset>
	            <legend>business address</legend>
	            <div class="label-input text">
	               <label for="street-address">street address</label>
	               <input type="text" id="street-address" v-model.lazy="project.address" required />
	            </div>
	            <div class="label-input text">
	               <label for="city">city</label>
	               <input type="text" id="city" v-model.lazy="project.city" required />
	            </div>
	            <div class="state-zip">
	               <div class="label-input text state">
	                  <label for="state">state/province</label>
	                  <input type="text" id="state" v-model.lazy="project.state" required />
	               </div>
	               <div class="label-input text zip">
	                  <label for="zip">zip/postal code</label>
	                  <input type="text" id="zip" v-model.lazy="project.zip" required />
	               </div>
	            </div>
	         </fieldset>


	         <!-- WORK LOCATION -->
	         <fieldset class="radios">
	            <legend>work location:</legend>

	            <div class="label-input radio">
						<!-- these v-model values of 'workLocation' refer to the boolean -->
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
	                  <input type="radio" name="work-location" id="other-address" value="other address" v-model="workLocation" />
	                  elsewhere:
	               </label>
	            </div>


	            <div class="label-input text" id="elsewhere" v-if="workLocation=='other address'">
	               <!-- <label for="">work location</label> -->
	               <input type="text" v-model.lazy="project.workLocation" />
	            </div>
	         </fieldset>


	         <div class="label-input text">
	            <label for="referrer">referrer:</label>
	            <input type="text" id="referrer" v-model.lazy="project.source" />
	         </div>


				<!-- ============ CONTACTS INFO ============ -->
	         <div class="contacts-wrapper" style="border: 1px solid red;">

					<ul style="margin-bottom: 1.5rem;">
						<li v-for="(contact, ix) in project.contacts" v-bind:key="ix">
							<b>{{ contact.name }}</b>, {{ contact.title }}, {{ contact.email }}
						</li>
					</ul>

	            <fieldset class="contacts">
						<p v-if="contactError" class="error" style="margin-bottom: .9rem; padding: .9rem;">
							<b>Please provide name &amp; email address for at least one contact</b>
						</p>
						<p v-if="emailFormatError" class="error" style="margin-bottom: .9rem; padding: .9rem;">
							<b>Please provide a valid email address for this contact</b>
						</p>

	               <legend>Contact(s):</legend>

	               <div class="label-input text contact">
	                  <label for="contact-name">name</label>
	                  <input
								type="text"
								v-model.lazy="contactInfo.name"
								id="contact-name"
								ref="nameInput"
								v-on:blur="checkInput"
							/>
	               </div>
	               <div class="label-input text contact">
	                  <label for="contact-title">title</label>
	                  <input
								type="text"
								v-model.lazy="contactInfo.title"
								id="contact-title"
								ref="titleInput"
								v-on:blur="checkInput"
							/>
	               </div>
	               <div class="label-input text contact">
	                  <label for="contact-email">email address</label>
	                  <input
								type="email"
								v-model.lazy="contactInfo.email"
								id="contact-email"
								ref="emailInput"
								v-on:blur="checkInput"
							/>
	               </div>
	               <div class="label-input text contact">
	                  <label for="contact-phone">phone</label>
	                  <input
								type="text"
								v-model.lazy="contactInfo.phone"
								id="contact-phone"
							/>
	               </div>

	               <div class="buttons">
							<!-- :buttonText="project.contacts.length ? 'add another contact' : 'add contact'" -->
							<app-button
								ref="btnAddContact"
								buttonClass="btn-color-2 btn-add"
								buttonText="add contact"
								v-on:click.native="addContact"
								:disabled="btnAddContactDisabled"
							/>
	   				</div><!-- END .buttons -->
	            </fieldset><!-- END .contacts -->
	         </div><!-- END .contacts-wrapper -->

	         <!-- DATES & RATE -->

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
				<!-- <input type="submit" name="submit" value="submit" v-on:click="validate"> -->

<!-- <date-picker v-model="time1" valueType="format"></date-picker>
<br />
<date-picker v-model="time2" type="datetime"></date-picker>
<br /> -->
<!-- date|datetime|year|month|time|week -->

			</form>
		</section>

   </div>
</template>



<script>

	import titleCase from '@/mixins/titleCase.js'
	import DatePicker from 'vue2-datepicker';
	import 'vue2-datepicker/index.css';


   export default {
      components: {
			// 'cause it ain't global
			DatePicker
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
					source: "",
               startDate: "",
               description: ""
				},
            contactInfo: {
					name: "",
					title: "",
					email: "",
					phone: ""
				},
            workLocation: "",
				errors: [],
				btnAddContactDisabled: true,
				contactError: false,
				emailFormatError: false,
				time1: null,
				time2: null,
				time3: null,

         }
      }, // data
		created: function() {
		},
		mounted: function() {
		},
		watch: {},
		computed: {},
      methods: {
			checkInput: function() {
				if (this.$refs.nameInput.value.length && this.$refs.titleInput.value.length && this.$refs.emailInput.value.length) {
					this.btnAddContactDisabled = false;
				}
				else {
					this.btnAddContactDisabled = true;
				}
			},
			addContact: function(e) {
            e.preventDefault();
				// interim validation to ensure at least one legit contact entry
				if (!this.contactInfo.name || !this.contactInfo.email) {
					this.contactError = true;
				}
				else if (!this.validEmail(this.contactInfo.email)) {
					this.emailFormatError = true;
				}
				else {
					this.contactError = false;
					this.emailFormatError = false;
					this.contactInfo.name = this.titleCase(this.contactInfo.name);
					this.project.contacts.push(this.contactInfo);
	            this.contactInfo = {};
				}
         },
			validEmail: function(email) {
	      	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	      	return re.test(email);
			},

			validate: function(project) {
				// https://frontstuff.io/a-better-way-to-perform-multiple-comparisons-in-javascript
				// const inputs = [
				// 	this.project.client,
				// 	this.project.address,
				// 	this.project.city,
				// 	this.project.state,
				// 	this.workLocation,
				// 	this.project.workLocation
				// ]
				// const errorMsgs = {
				// 	errClient: "please provide a client (company name)",
				// 	errAddress: "please provide client street address",
				// 	errCity: "please provide client city",
				// 	errState: "please provide client state",
				// 	errWorkLocation: "please provide a work location ",
				// 	errOneContact: "please provide at least one full contact "
				// }
				if (!this.project.client) {
					this.errors.push('client (company name)');
				}
				if (!this.project.address) {
					this.errors.push('client street address');
				}
				if (!this.project.city) {
					this.errors.push('city');
				}
				if (!this.project.state) {
					this.errors.push('state');
				}
				if (!this.workLocation) {
					this.errors.push('a work location');
				}
				if (this.workLocation === "other address" && !this.project.workLocation) {
					this.errors.push('a work location');
				}
				if (!this.project.contacts.length) {
					this.errors.push('at least one full contact');
				}
				if (this.errors.length) {
					this.$refs.form.scrollTo({
						left: 0,
						top: "-300px",
						behavior: "smooth"
					});
					return false;
				}
				else {
					return true;
				}
			},

			post: function() {
				this.errors = [];
				console.log("this.project", this.project);
				if (this.validate(this.project)) {
					this.project.client = this.titleCase(this.project.client);
					this.project.address = this.titleCase(this.project.address);
					this.project.city = this.titleCase(this.project.city);
					this.project.state = this.project.city.toUppercase;

	            this.$http.post("https://sr-giglog.firebaseio.com/projects.json", this.project)
	               .then(function(data) {
							this.project.id = data.body.name;
	               })
						.then(function(data) {
							this.$router.replace({ name: 'ProjectDetail', params: { id: this.project.id } })
						})
				}
			} // post
      }, // methods
		mixins: [ titleCase ]
   }
</script>


<style lang="scss" scoped>
	// If your project uses SCSS, you can change the default style variables.
	// To create a scss file. e.g. datepicker.scss:
	// $default-color: #555;
	// $primary-color: #1284e7;
	// @import '~vue2-datepicker/scss/index.scss';
</style>
