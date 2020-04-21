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
							v-bind:class="{ editMode: ix == contactIx }"
						>
                     <div class="contact-data">
                        <!-- {{ ix + 1 }}. -->
								<p class="contact-name">{{ contact.name }}</p>
                        <p class="contact-title">{{ contact.title }}</p>
                        <p class="contact-email">{{ contact.email }}</p>
                        <p class="contact-phone">{{ contact.phone }}</p>

                        <div class="buttons">
									<app-button
										buttonClass="btn-color-2 btn-edit"
										buttonText="edit"
										:key="ix"
										v-on:click.native="editContact(ix)"
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
                              <input type="text" v-model.lazy="contact.phone" required />
                           </div>

                           <div class="buttons">
										<app-button
											buttonClass="btn-color-bw btn-cancel"
											buttonText="cancel"
											v-on:click.native="exitEditMode"
										/>
										<app-button
											buttonClass="btn-color-6 btn-delete"
											buttonText="delete contact"
											v-on:click.native="deleteContact"
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



			<!-- ==================================== 'ADD CONTACT' BUTTON ==================================== -->
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
				class="btn btn-color-2 btn-edit"
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
				// add.vue has 'contactInfo'; add contact oughta be a component since there's > 1
				newContact: {
					name: "",
					title: "",
					email: "",
					phone: "",
				}
            // contacts: []
         }
      }, // data
      created: function() {
			// TAN 'why url, path must be ;id to get project data'
			// odd, but strange: this.id is id prop which is only coming from the router link, yet unless the path variable is the id, the id prop is lost
         this.$http.get("https://sr-giglog.firebaseio.com/projects/" + this.id + ".json")
         .then(data => data.json())
         .then(data => {
            /*
               .$set = alias of the global Vue.set
               https://vuejs.org/v2/api/#Vue-set
               Vue.set( target, key, value )
            */
            // for (let contact of data.contacts) {
            //    this.$set(contact, 'editingContact', false) // creates 'editingContact' key in each contact object in projects.json
            // }
            this.project = data;
            // console.log("project-detail @create: ", this.project);
         })
         // console.log(this.project);
      }, // created

      methods: {
         // ======================== POST ========================
         post: function() {
            console.log("post", this.project);
            this.$http.put("https://sr-giglog.firebaseio.com/projects/" + this.$route.params.id + ".json", this.project)
               .then(response => {
                  console.log("response.body:", response.body);
               }, response => {
                  console.error(".error??? response.body", response.body);
               })
               .then(function(data){
                  this.submitted = true;
               })
               // },
               // response => {
               //    console.error(response.body);
               // )
               this.isEditingClient = false;
               this.isEditingGig = false;

					// console.log(this.newContact.name, this.newContact.title, this.newContact.email, this.newContact.phone);

               this.exitEditMode();
         }, // post function

			/*
				re: editMode toggle:
				1. default view (i.e., editMode FALSE) displays dl (static data) + buttons, undisplays fieldset;
				2. click => toggle '.editMode' class on section:
				 	dl + buttons hidden, fieldset displayed (CSS)

				3. ergo, how to transition?
				- orig version used toggled 'isEditingXyz' boolean prop; no classes involved, elements toggled by vue, e.g.,
				- <dl v-if="!isEditingClient">
				- <div class="buttons" v-if=!isEditingClient>
				- etc.
			*/

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

         editContact: function(ix) {
            console.log("editContact; ix:", ix);
            this.contactIx = ix;
            console.log("this.contactIx: " + this.contactIx);
         }, // editContact

         exitEditMode: function() {
            console.log("exitEditMode");
            this.isEditingClient = false;
            this.isEditingGig = false;
            this.contactIx = "-1";
            this.addingContact = false;
         }, // exitEditMode

			addContact: function(e) {
			   console.log('addContact');
			   this.addingContact = true;
				// this.contacts.push(this.newContact);
			   // this.project.contacts.push(this.contactInfo); //
			   // this.contactInfo = {};
			},

			deleteContact: function(e) {
			   console.log('deleteContact');
				// this.contacts.push(this.newContact);
			   // this.project.contacts.push(this.contactInfo); //
			   // this.contactInfo = {};
			},


			saveNewContact: function(newContact) {
				// console.log(this.newContact.name);
				// console.log(this.newContact.title);
				// console.log(this.newContact.email);
				// console.log(this.newContact.phone);
				console.log("this.newContact", this.newContact);
				this.project.contacts.push(this.newContact);
				this.post();
			}
      } // methods
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
      each <section> contains a def list, with <dt> els:
         - 'Client', 'Gig', 'Contacts' ....
   */

   /* re: transitions: shared attributes */
   /* section > dl,
   section > .buttons, */
   dl,
   .buttons,
	// heads-up; if this is eventually moved to global _form_controls.scss,
	// not all .fieldset-wrapper will have section parent (could be appropriate)
   .card .fieldset-wrapper { overflow: hidden; transition: all .9s ease-in-out; }
   .card .fieldset-wrapper { width: 100%; }


	fieldset,
	legend { color: #000; background: #fff; font-weight: bold; text-transform: capitalize; }
	legend { text-transform: uppercase; }
	legend span {
		margin-right: .9rem;
		padding: .15rem .6rem;
		font-weight: normal;
		color: $b;
		background: gold;
		text-transform: none;
		border-radius: .15rem;
	}
	legend span::after {
		display: inline-block;
		content: ":"
	}

   /* init view: show the static data + 'edit' buttons, and hide the fieldset-wrapper */
   section > dl,
	/* why'd ya do it? this is bad */
   section > .buttons { max-height: 100vh; }
   section .fieldset-wrapper { max-height: 0; }

   /* editMode: disappear the static data + 'edit' buttons, bring on the fieldset-wrapper */
   section.editMode > dl,
   section.editMode > .buttons { max-height: 0; }
   section.editMode .fieldset-wrapper { max-height: 100vh; }

   ul.contacts { margin: 0; padding: 0; }
   .contact-name { font-weight: bold; color: #000; }
   .contact-title { text-transform: uppercase; }
   .contact-email,
   .contact-phone { font-weight: bold; color: #000; }

   .contacts li > .contact-data,
   .contacts li > .fieldset-wrapper { transition: all .9s ease-in-out; overflow: hidden; }

   .contacts li .contact-data { max-height: 100vh; }
   .contacts li .fieldset-wrapper { max-height: 0; }

   li.editMode .contact-data { max-height: 0; }
   li.editMode .fieldset-wrapper { max-height: 100vh; }


   .add-contact-wrapper { width: 100%; }
   .add-contact-wrapper.editMode > .buttons { max-height: 0; }
   .add-contact-wrapper.editMode .fieldset-wrapper { max-height: 100vh; }
	.add-contact   {
		margin-bottom: 1.5rem;
		padding: .9rem 0 1.5rem 1.5rem;
		border: 3px double #999;
		border-width: 3px 0;
	}
	.add-contact h3   { margin-bottom: .9rem; }

// nested dl in 'gig', but not in contacts, 'cause no need for ~dt, i.e., 'title', 'email', 'phone'

// https://www.the-art-of-web.com/css/format-dl/


.btn.btn-edit {
	padding: 0;
	text-transform: uppercase;
	border: 0;
	border-bottom: 1px dashed $theme2;
	border-radius: 0;
	background: transparent;
}
.btn.btn-edit:hover {
	color: $theme2;
	background: transparent;
	border: 0;
	border-radius: 0;
	border-bottom: 1px solid $theme2;
}

.btn-all-projects::before { content: "\2190"; }
.btn-add-project::before { content: "\002B"; }

</style>
