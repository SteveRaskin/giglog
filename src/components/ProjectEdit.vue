<template>

   <div class="container container-project-edit">

		<app-subheader v-bind:fileName="fileName" v-bind:viewName="viewName" />

      <!-- ======================== CLIENT ======================== -->
      <section class="card client-data" v-bind:class="{ editMode: isEditingClient }">
         <dl>
            <dt>client:</dt>
            <dd>
               <p><strong>{{ project.client }}</strong></p>
               <p>{{ project.address }}</p>
               <p>{{ project.city }} {{ project.state }} {{ project.zip }}</p>
            </dd>
         </dl>
         <div class="buttons">
				<app-button
					buttonClass="btn-color-2 btn-edit"
					buttonID="edit-client"
					buttonText="edit"
					v-on:click.native="editMode"
				/>
         </div>
         <div class="fieldset-wrapper">
            <fieldset>
					<legend><span>editing</span> client</legend>
               <div class="label-input text">
                  <label for="">company name</label>
                  <input type="text" v-model.lazy="project.client" />
               </div>
               <div class="label-input text">
                  <label for="">company website</label>
                  <input type="text" v-model.lazy="project.projectReference" />
               </div>
               <div class="label-input text">
                  <label for="">street address</label>
                  <input type="text" v-model.lazy="project.address" />
               </div>
               <div class="label-input text">
                  <label for="">city</label>
                  <input type="text" v-model.lazy="project.city" />
               </div>
               <div class="state-zip">
                  <div class="label-input text state">
                     <label for="">state</label>
                     <input type="text" v-model.lazy="project.state" />
                  </div>
                  <div class="label-input text zip">
                     <label for="">zip</label>
                     <input type="text" v-model.lazy="project.zip" />
                  </div>
               </div>
               <div class="buttons">
						<app-button
							buttonClass="btn-color-bw btn-cancel"
							buttonText="cancel"
							v-on:click.native="exitEditMode"
						/>
						<app-button
							buttonClass="btn-color-4 btn-save"
							buttonText="save"
							v-on:click.native="post"
						/>
               </div>
            </fieldset>
         </div><!-- END .fieldset-wrapper -->
      </section><!-- END .client-data -->



      <!-- ======================== GIG ======================== -->
      <section class="card gig-data" v-bind:class="{ editMode: isEditingGig }">
         <dl>
            <dt>gig:</dt>
            <dd>
               <dl>
                  <dt>work location:</dt> <dd>{{ project.workLocation }}</dd>
                  <dt>description:</dt> <dd>{{ project.description }}</dd>
                  <dt>source:</dt> <dd>{{ project.source }}</dd>
                  <dt>start date:</dt> <dd>{{ project.startDate }}</dd>
               </dl>
            </dd>
         </dl>
         <div class="buttons">
				<app-button
					v-if=!isEditingGig
					buttonClass="btn-color-2 btn-edit"
					buttonID="edit-gig"
					buttonText="edit"
					v-on:click.native="editMode"
				/>
         </div>

         <div class="fieldset-wrapper">
				<!-- <fieldset v-if="isEditingGig"> -->
				<fieldset>
               <legend><span>editing</span> gig</legend>

               <div class="label-input text">
                  <label for="">referrer:</label>
                  <input type="text" v-model.lazy="project.source" />
               </div>
               <div class="label-input text">
            		<label for="">description</label>
            		<textarea v-model.lazy="project.description"></textarea>
               </div>

               <fieldset class="radios">
						<legend><span>editing</span> work location</legend>
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
               </fieldset><!-- END .radios -->
					<div class="label-input text">
						<label for="">start date (TODO: datepicker)</label>
						<input type="text" v-model.lazy="project.startDate" required />
					</div>

               <div class="buttons">
						<app-button buttonClass="btn-color-bw btn-cancel" buttonText="cancel" v-on:click.native="exitEditMode" />
						<app-button buttonClass="btn-color-4 btn-save" buttonText="save changes" v-on:click.native="post" />
               </div>
            </fieldset>
         </div><!-- END .fieldset-wrapper -->
      </section><!-- END .gig-data -->



      <!-- ======================== CONTACTS ======================== -->
      <section class="card contacts-wrapper">

         <dl>
            <dt>contacts:</dt>
            <dd>
               <ul class="contacts">
                  <li
							v-for="(contact, ix) in project.contacts"
							v-bind:key="ix"
							class="contact"
							v-bind:class="{ editMode: ix == contactIx }"
						>
                     <div class="contact-data">
                        <!-- {{ ix + 1 }}. -->
								<p class="contact-name">{{ capitalizer(contact.name) }}</p>
                        <p class="contact-title">{{ capitalizer(contact.title) }}</p>
                        <p class="contact-email">{{ contact.email }}</p>
                        <p class="contact-phone">{{ contact.phone }}</p>
                        <div class="buttons">
									<app-button
										buttonClass="btn-color-2 btn-edit"
										buttonText="edit"
										v-on:click.native="editContact(ix)"
									/>
									<app-button
										buttonClass="btn-color-6 btn-delete"
										buttonText="delete"
										v-on:click.native="deleteContact(ix)"
									/>
                        </div>
                     </div><!-- END .contact-data -->

                     <div class="fieldset-wrapper">
                        <fieldset>
									<legend><span>editing</span> contact</legend>
                           <div class="label-input text contact">
                              <label for="">name</label>
										<input type="text" class="contact-info" v-model.lazy="contact.name" required />
                           </div>
                           <div class="label-input text contact">
                              <label for="">title</label>
										<input type="text" v-model.lazy="contact.title" required />
                           </div>
                           <div class="label-input text contact">
                              <label for="">email address</label>
										<input type="text" v-model.lazy="contact.email" required />
                           </div>
                           <div class="label-input text contact">
                              <label for="">phone</label>
										<input type="number" v-model.lazy="contact.phone" required />
                           </div>

                           <div class="buttons">
										<app-button
											buttonClass="btn-color-bw btn-cancel"
											buttonText="cancel"
											v-on:click.native="exitEditMode"
										/>
										<app-button
											buttonClass="btn-color-4 btn-save"
											buttonText="save changes"
											v-on:click.native="post"
										/>
                           </div><!-- END .buttons -->
                        </fieldset>
                     </div><!-- END .fieldset-wrapper -->
                  </li><!-- END .contact -->
               </ul>
            </dd>
         </dl>



			<!-- ==================================== 'ADD CONTACT' ==================================== -->
         <div class="add-contact-wrapper" v-bind:class="{ editMode: addingContact }">

            <div class="buttons">
					<app-button
						buttonClass="btn-color-2 btn-add"
						buttonText="+ add contact"
						v-on:click.native="addContact"
					/>
            </div><!-- END .buttons -->

            <div class="fieldset-wrapper">
               <fieldset>
						<legend>add contact</legend>
                  <div class="label-input text contact">
                     <label for="">name</label>
							<input type="text" v-model.lazy="newContact.name" required />
                  </div>
                  <div class="label-input text contact">
                     <label for="">title</label>
							<input type="text" v-model.lazy="newContact.title" required />
                  </div>
                  <div class="label-input text contact">
                     <label for="">email address</label>
							<input type="text" v-model.lazy="newContact.email" required />
                  </div>
                  <div class="label-input text contact">
                     <label for="">phone</label>
							<input type="text" v-model.lazy="newContact.phone" required />
                  </div>
                  <div class="buttons">
							<app-button
								buttonClass="btn-color-bw btn-cancel"
								buttonText="cancel"
								v-on:click.native="exitEditMode"
							/>
							<app-button
								buttonClass="btn-color-4 btn-save"
								buttonText="save new contact"
								v-on:click.native.prevent="saveNewContact"
							/>
                  </div><!-- END .buttons -->
               </fieldset>

            </div><!-- END .add-contact-fieldset-wrapper -->
         </div><!-- END .add-contact-wrapper -->


      </section><!-- END .contacts -->

         <!-- DATES & RATE -->
<!--
			<div class="label-input text">
            <label for="">start date (TODO: datepicker)</label>
            <input type="text" v-model.lazy="project.startDate" required />
         </div>
         <div class="label-input text">
      		<label for="">description</label>
      		<textarea v-model.lazy="project.description"></textarea>
         </div>

         <div class="buttons">
            <button v-on:click.prevent="post">save project</button>
         </div>
 -->
         <form v-if="!submitted">

		</form>

		<div class="buttons">
			<router-link
				tag="button"
				class="btn btn-color-1 btn-details"
				:to="{ name: 'ProjectDetail', params: { id: this.id }}"
				>exit (to detail view)
			</router-link>
			<router-link
				tag="button"
				class="btn btn-color-3 btn-log-hours"
				:to="{ name: 'LogHours', params: { id: this.id }}"
				>log hours
			</router-link>
		</div>

   </div>
</template>



<script>

	import capitalizer from '@/mixins/mixin_capitalizer.js';

   export default {
      props: {
			client: String,
			id: String
		},
      components: {
      },
      data () {
         return {
				// id: this.$route.params.id,
				routerParamID: this.$route.params.id,
				routerParamClient: this.$route.params.client,
				viewName: "Project Edit",
				fileName: "ProjectEdit.vue",
				project: {},
            contactInfo: {},
            workLocation: true,
            submitted: false,
            isEditingClient: false,
            isEditingGig: false,
            // editingContact: [], // keep 'it 'til u recall source of .$set
            contactIx: "-1",
            addingContact: false,
				newContact: {
					name: "",
					title: "",
					email: "",
					phone: "",
				},
            // contacts: []
         }
      }, // data
      created: function() {
			this.get();
      }, // created

      methods: {

			// ======================== GET ========================
         get: function() {
				// TAN 'why url, path must be ;id to get project data'
				// this.id is router-link's 'id' prop, tho it's unavailable in $router obj unless it's the path variable
	         this.$http.get("https://sr-giglog.firebaseio.com/projects/" + this.id + ".json")
	         .then(data => data.json())
	         .then(data => {
	            this.project = data;
				}).then(function() {
					this.exitEditMode();
				})
			},


			// ======================== POST ========================
         post: function() {
            this.$http.put("https://sr-giglog.firebaseio.com/projects/" + this.$route.params.id + ".json", this.project)
               .then(response => {
                  // console.log("response.body:", response.body);
               }, response => {
                  console.error(".error??? response.body", response.body);
               })
               .then(function(data){
                  this.submitted = true;
               })
					.then(() => {
						this.isEditingClient = false;
	               this.isEditingGig = false;
						this.get();
					});
         }, // post

			editMode: function(e) {
			   const buttonID = e.currentTarget.id;
				console.log("editMode.buttonID", buttonID);
			   // toggle editMode of appropriate group
			   switch (buttonID) {
			   	case "edit-client":
			         // get parent/sibling els, toggle classes
			         this.isEditingClient = !this.isEditingClient;
			   		break;
			      case "edit-gig":
			   		this.isEditingGig = !this.isEditingGig;
			   		break;
			   	default:
			   }
			},

			// EDIT & DELETE: this.contactIx applies '.editMode' to corresponding li[ix] in ul.contacts
         editContact: function(ix) {
            this.contactIx = ix;
         },
			deleteContact: function(ix) {
				// TODO: now that delete is where it is, we still need the ix but not used for the same purpose as it's used in edit, so perhaps there should be a different data
				this.contactIx = ix;
				let fullName = this.capitalizer(this.project.contacts[this.contactIx].name);
				if (confirm("Are you sure you want to delete " + fullName + "?")) {
					this.project.contacts.splice(ix, 1);
					this.post();
				}
				else this.exitEditMode();
			},


			// TODO: rename this; ~ showNewContactForm ?
			addContact: function(e) {
			   this.addingContact = true; // adds '.editMode' to .add-contact-wrapper
			},

			saveNewContact: function(newContact) {
				// capitalizes pre-db
				this.newContact.name = this.capitalizer(this.newContact.name);
				if (!this.project.contacts) {
					this.project.contacts = [];
				}
				this.project.contacts.push(this.newContact);
				this.post();
			},

			exitEditMode: function() {
            this.isEditingClient = false;
            this.isEditingGig = false;
            this.contactIx = "-1";
				this.addingContact = false;
				console.log("pre: this.newContact", this.newContact);
				// this clears the object values ... but why are they already gone at the preceeding log?
				// Object.keys(this.newContact).forEach(key => {
				// 	this.newContact[key] = "";
				// })
				this.newContact.name = "";
				this.newContact.title = "";
				this.newContact.email = "";
				this.newContact.phone = "";
				console.log("post this.newContact", this.newContact);
         }

      },
		updated: function() {
		},
		mixins: [ capitalizer ]
   } // export default
</script>


<style lang="scss" scoped>

	// section.card
	.card {
		padding: 1.8rem;
		background: #f9f9f9;
		border-radius: 6px;
		transition: .21s all ease-in-out;
	}
	.card:hover,
	.card.editMode {
		background: #f0f0ff;
		box-shadow: .9rem .9rem .9rem #ccc;
	}

   /*
      <section>s:
		1 <dl>
			<dt>Client</dl>
			<dd> ...
		2 <dl>
			<dt>Gig</dl>
			<dd> ...
		3 <dl>
			<dt>Contacts</dl>
			<dd> ...

	 	.card > dl,
		.card > .buttons
		.card > .fieldset-wrapper
		initial view: show project data & buttons, hide the fieldset-wrapper;
		when .card has .editMode (isEditingClient, isEditingGig, etc.),
		hide project data & buttons, show the fieldset-wrapper;
		// https://www.the-art-of-web.com/css/format-dl/
	*/

	// initial view: show project data & buttons, hide the fieldset-wrappers (includes add-contact fieldset) ...
   .card dl,
   .card .buttons,
   .card .fieldset-wrapper { overflow: hidden; transition: all .9s ease-in-out; }
   .card > dl,
	.card > .buttons { max-height: 900vh; }
   .card .fieldset-wrapper { max-height: 0; }

	/*
		... when .card has .editMode (isEditingClient, isEditingGig, etc.),
		hide project data & buttons, show the fieldset-wrapper
	*/
   .card.editMode > dl,
   .card.editMode > .buttons { max-height: 0; }
   .card.editMode .fieldset-wrapper { max-height: 100vh; }


   // ul.contacts > li.contact
   .contact-name { font-weight: bold; color: #000; }
   .contact-title { color: #000; text-transform: uppercase; }


	// initial view: show li.contact > div.contact-data, hide .contact > .fieldset-wrapper ...
   .contact > .contact-data,
   .contact > .fieldset-wrapper { transition: all .9s ease-in-out; overflow: hidden; }
   .contact .contact-data { max-height: 100vh; }
   .contact .fieldset-wrapper { max-height: 0; }

	// ... when .contact has .editMode, hide .contact-data, show the .contact > .fieldset-wrapper
   .contact.editMode .contact-data { max-height: 0; }
   .contact.editMode .fieldset-wrapper { max-height: 100vh; }


	/*
		 .add-contact-wrapper is a child of .contacts-wrapper;
		 - similar to above, init show .buttons, hide .fieldset-wrapper (be default, above)
		 - .add-contact-wrapper has .editMode ? reverse
	*/
   .add-contact-wrapper { width: 100%; }
   .add-contact-wrapper.editMode > .buttons { max-height: 0; }
   .add-contact-wrapper.editMode .fieldset-wrapper { max-height: 100vh; }


	.btn.btn-edit,
	.btn.btn-delete {
		margin-right: .9rem;
		padding: 0;
		text-transform: uppercase;
		font-size: .99rem;
		border: 0;
		border-radius: 0;
		background: transparent;
	}
	.btn.btn-edit:hover,
	.btn.btn-delete:hover {
		background: transparent;
		border: 0;
		border-radius: 0;
	}

	.btn.btn-edit { border-bottom: 1px dashed $theme2; }
	.btn.btn-delete { border-bottom: 1px dashed $error; }

	.btn.btn-edit:hover {
		color: $theme2;
		border-bottom: 1px solid $theme2;
	}
	.btn.btn-delete:hover {
		color: $error;
		border-bottom: 1px solid $error;
	}



</style>
