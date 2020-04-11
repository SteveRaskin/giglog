<template>

   <div class="container" id="project-add">

		<h1>Add a Project</h1>

      <form v-if="!submitted">

         <div class="label-input text">
            <label for="">client/company name</label>
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
            <label for="">referred by/source:</label>
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
                  <button class="btn save" v-on:click.prevent="addContactInfo">add Contact</button>
   				</div><!-- END .buttons -->
            </fieldset><!-- END .contacts -->
         </div><!-- END .contacts-wrapper -->

         <!-- DATES & RATE -->
         <div class="label-input text">
            <label for="">start date (TO-DO: datepicker)</label>
            <input type="text" v-model.lazy="project.startDate" required />
         </div>
         <div class="label-input text">
      		<label for="">description</label>
      		<textarea v-model.lazy="project.description"></textarea>
         </div>

         <div class="buttons">
            <button class="btn save" v-on:click.prevent="post">save project</button>
         </div><!-- END .buttons -->
		</form>



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


   </div>
</template>



<script>

   export default {
      components: {
      },
      data () {
         return {
            project: {
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
			post: function() {
            console.log(this.project);
            this.$http.post("https://sr-giglog.firebaseio.com/projects.json", this.project)
               .then(function(data){
                  this.submitted = true;
               }
         )} // post function
      } // methods
   }
</script>


<style scoped>

   /* @import url('/static/giglog.css'); */

</style>
