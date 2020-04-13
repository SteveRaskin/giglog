<template>

   <div class="container" id="project-edit">

		<app-subheader v-bind:fileName="fileName" v-bind:viewName="viewName" />

      <!--
         about the mode switching:
         1. default view (i.e., editMode FALSE) displays dl (static data) + buttons, undisplays fieldset;
         2. onclick = toggles editMode, toggles 'editMode' class on section; CSS accordingly undisplays dl + buttons, displays fieldset
         3. ergo, how to transition?
         - orig version used toggled 'isEditingXyz' boolean prop; no classes involved, elements toggled by vue, e.g.,
            - <dl v-if="!isEditingClient">
            - <div class="buttons" v-if=!isEditingClient>
            - etc.
      -->
      <!-- ======================== CLIENT DATA ======================== -->
      <section class="client-data" v-bind:class="{ editMode: isEditingClient }">
         <dl>
            <dt>client:</dt>
            <dd>
               <p><strong>{{ project.client }}</strong></p>
               <p>{{ project.address }}</p>
               <p>{{ project.city }} {{ project.state }} {{ project.zip }}</p>
            </dd>
         </dl>
         <div class="buttons">
            <button class="btn edit-link" id="edit-client" v-on:click="editMode">edit</button>
         </div>

         <div class="fieldset-wrapper">
            <fieldset>
               <legend>editing client data</legend>
               <div class="label-input text">
                  <label for="">client/company name</label>
                  <input type="text" v-model.lazy="project.client" />
               </div>
               <div class="label-input text">
                  <label for="">project reference (website)</label>
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
                  <button class="btn cancel" v-on:click="exitEditMode">cancel</button>
                  <button class="btn save" v-on:click="post">save changes</button>
               </div>
            </fieldset>
         </div><!-- END .fieldset-wrapper -->
      </section><!-- END .client-data -->



      <!-- ======================== GIG DATA ======================== -->
      <section class="gig-data" v-bind:class="{ editMode: isEditingGig }">
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
            <button class="btn edit-link" id="edit-gig" v-if=!isEditingGig v-on:click="editMode">edit</button>
         </div>

         <div class="fieldset-wrapper">
            <fieldset v-if="isEditingGig">
               <legend>editing gig data</legend>

               <div class="label-input text">
                  <label for="">referred by/source:</label>
                  <input type="text" v-model.lazy="project.source" />
               </div>
               <div class="label-input text">
            		<label for="">description</label>
            		<textarea v-model.lazy="project.description"></textarea>
               </div>

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
               </fieldset><!-- END .radios -->
               <div class="buttons">
                  <button class="btn cancel" v-on:click="exitEditMode">cancel</button>
                  <button class="btn save" v-on:click="post">save changes</button>
               </div>
            </fieldset>
         </div><!-- END .fieldset-wrapper -->
      </section><!-- END .gig-data -->



      <!-- ======================== CONTACTS ======================== -->
      <section class="contacts-wrapper">

         <dl>
            <dt>contacts:</dt>
            <dd>
               <ul class="contacts">

                  <template v-for="(contact, ix) in project.contacts">
                     <li v-bind:key="ix" v-bind:class="{ editMode: ix == contactIx }">

                        <div class="contact-data">
                           {{ ix }}. <span class="contact-name">{{ contact.name }}</span><br />
                           <span class="contact-title">{{ contact.title }}</span><br />
                           email: <span class="contact-email">{{ contact.email }}</span><br />
                           phone: <span class="contact-phone">{{ contact.phone }}</span>

                           <div class="buttons">
                              <button class="btn edit-link" :key="ix" v-on:click="editContact(ix)">edit</button>
                           </div>
                        </div><!-- END .contact-data -->

                        <div class="fieldset-wrapper">

                           <fieldset>
                              <legend>edit contact:</legend>
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


											<!-- ======================== 'CANCEL'/'SAVE CHANGES'/'DELETE CONTACT' BUTTONS ======================== -->
											<!-- ======================== 'CANCEL'/'SAVE CHANGES'/'DELETE CONTACT' BUTTONS ======================== -->
											<!-- ======================== 'CANCEL'/'SAVE CHANGES'/'DELETE CONTACT' BUTTONS ======================== -->


											<button class="btn cancel" v-on:click="exitEditMode">cancel</button>
											<button class="btn delete-contact" v-on:click="deleteContact">delete contact</button>
                                 <button class="btn save" v-on:click="post">save changes</button>
                              </div><!-- END .buttons -->
                           </fieldset>
                        </div><!-- END .fieldset-wrapper -->
                     </li><!-- END .contact -->
                  </template>
               </ul>
            </dd>
         </dl>



			<!-- ==================================== 'ADD CONTACT' BUTTON ==================================== -->
         <div class="add-contact-wrapper" v-bind:class="{ editMode: addingContact }">
            <div class="buttons">
               <button class="btn edit-link new-contact" v-on:click="addContact">+ add contact</button>
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
                     <button class="btn cancel" v-on:click="exitEditMode">cancel</button>
                     <button class="btn save" v-on:click.prevent="saveNewContact">save new contact</button>
                  </div><!-- END .buttons -->
               </fieldset>

            </div><!-- END .add-contact-fieldset-wrapper -->
         </div><!-- END .add-contact-wrapper -->








      </section><!-- END .contacts -->

         <!-- DATES & RATE -->
         <!-- <div class="label-input text">
            <label for="">start date (TO-DO: datepicker)</label>
            <input type="text" v-model.lazy="project.startDate" required />
         </div>
         <div class="label-input text">
      		<label for="">description</label>
      		<textarea v-model.lazy="project.description"></textarea>
         </div>

         <div class="buttons">
            <button v-on:click.prevent="post">save project</button>
         </div> -->

         <form v-if="!submitted">

		</form>



<div class="preview">
	<div class="">
		name: <span>{{ newContact.name }}</span><br />
		title: <span>{{ newContact.title }}</span><br />
		email: <span>{{ newContact.email }}</span><br />
		phone: <span>{{ newContact.phone }}</span>
	</div>

</div>


      <!-- PREVIEW -->
		<div id="preview">
			<h3>Preview</h3>
         <!--
            <p><span class="label">source:</span> <span class="value">{{ project.source }}</span></p>
         -->
         <p><span class="label">client:</span> <span class="value">{{ project.client }}</span></p>
         <p><span class="label">project:</span> <span class="value">{{ project.projectReference }}</span></p>
         <p><span class="label">address:</span> <span class="value">{{ project.address }}</span></p>
         <p><span class="label">work location:</span> <span class="value">{{ project.workLocation }}</span></p>
         <p><span class="label">source:</span> <span class="value">{{ project.source }}</span></p>
         <p><span class="label">description:</span> <span class="value">{{ project.description }}</span></p>
         <p><span class="label">start date:</span> <span class="value">{{ project.startDate }}</span></p>
         <ul class="contacts">
            <li class="contact" v-for="(contact, ix) in project.contacts" v-bind:key="ix">
               <h5>{{ ix + 1 }}.</h5> <strong>{{ contact.name }}</strong><br />
               title: <span>{{ contact.title }}</span><br />
               email: <span>{{ contact.email }}</span><br />
               phone: <span>{{ contact.phone }}</span>
            </li>
         </ul>
		</div><!-- END #preview -->

      <app-buttons v-bind:projectID="id"></app-buttons>


   </div>
</template>



<script>

   export default {
      props: {
			projectID: String
		},
      components: {
      },
      data () {
         return {
				id: this.$route.params.id,
				viewName: "Edit Project",
				fileName: "project-edit.vue",
				subtitle: "ID: " + this.$route.params.id + ", (hours.json)",
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
            this.$http.put("https://sr-giglog.firebaseio.com/projects/" + this.id + ".json", this.project)
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

         editMode: function(e) {
            console.log("editMode");
            const buttonID = e.currentTarget.id;
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


<style scoped>

   /* @import url('/static/giglog.css'); */
	h1 { margin-bottom: 1.5rem; }
	h1 .project-id { font-size: 1.2rem; color: #999; }

   section {
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      margin-bottom: 3rem;
		padding-bottom: 1.5rem;
		padding: 1.8rem;
		background: #fff;
		border: 2px solid transparent;
		border-radius: 6px;
		transition: .21s all ease-in-out;
   }
	section:hover,
	section.editMode {
		background: #eee;
		border: 2px solid #c3c3c3;
		box-shadow: .6rem .6rem .6rem #ccc;
	}




   dl { display: flex; width: 100%; justify-content: flex-start; flex-flow: row wrap; }

   /*
      each <section> contains a def list, with <dt> els:
         - 'Client', 'Gig', 'Contacts' ....
         - both 'Gig' and 'Contacts'
   */

   /*
      as there are nested def lists, keep the dt/dd rules asap,
      i.e., no padding/margins; prefer to style the nested def list els
   */
   dt {
      width: 100%;
      color: #000;
      font-weight: bold;
		/* text-align: center; */
		font-size: 1.35rem;
      text-transform: uppercase;
   }
   dd {}

   /* nested def list is child of dd (gig data section) */
   dd dl {}
   dd dt {
		width: 7.5rem;
		color: #333;
		text-align: left;
		font-size: .9rem;
		text-transform: none;
	}
   dd dd { width: calc(100% - 7.5rem); }
   dd dd:not(:last-child) { margin-bottom: .9rem; }

   /* re: transitions: shared attributes */
   /* section > dl,
   section > .buttons, */
   dl,
   .buttons,
   section .fieldset-wrapper { overflow: hidden; transition: all .9s ease-in-out; }
   section .fieldset-wrapper { width: 100%; }

	fieldset,
	legend { color: #000; background: #fff; font-weight: bold; text-transform: uppercase; }

   /* init view: show the static data + 'edit' buttons, and hide the fieldset-wrapper */
   section > dl,
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

   .edit-link {
      min-width: 0;
      padding: 0;
      color: dodgerblue;
      background: transparent;
      font-weight: bold;
      text-transform: uppercase;
      border: 0;
      box-shadow: none;
      word-spacing: 0;
   }

   .add-contact-wrapper { width: 100%; }
   .add-contact-wrapper.editMode > .buttons { max-height: 0; }
   .add-contact-wrapper.editMode .fieldset-wrapper { max-height: 100vh; }


   #preview { display: none; }






</style>





































<!--  -->
