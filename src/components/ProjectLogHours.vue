<template>

   <div class="container" id="log-hours">

		<app-subheader v-bind:fileName="fileName" v-bind:viewName="viewName" />

      <h3 class="client"><strong>{{ project.client }}</strong></h3>

		<form v-if="!submitted">

			<!-- ============ DATE ============ -->
			<div class="date-group">
				<div class="label-input date">
					<label for="">date</label>
					<input type="date" id="date" value="" required v-model="logDate.date" />
				</div>
			</div><!-- END .date-group -->


			<!-- ============ HOURS ============ -->
			<div class="hours-group">
				<!--
					The value of the time input is always in 24-hour format: "HH:mm", "HH:mm:ss"; HH is 00-23, mm & ss are 00-59;
					"v-model when you can, v-bind when you must" (both ok re: default values for timeIn, timeOut)
				-->
	         <div class="label-input time">
	            <label for="">time in</label>
					<input type="time" id="time-in" required step="900" pattern="[0-9]{2}:[0-9]{2}" v-model="logDate.timeIn" v-on:blur="sumHours" />
	         </div>
				<div class="label-input time">
	            <label for="">time out</label>
					<input type="time" id="time-out" required step="900" pattern="[0-9]{2}:[0-9]{2}" v-model="logDate.timeOut" v-on:blur="sumHours" />
	         </div>

				<div class="label-input time break-time">
	            <label for="">break? (minutes)</label>
					<input type="text" id="break-time" v-model="logDate.timeBreak" v-on:blur="sumHours" />
	         </div>

				<div class="label-input text total-hours">
	            <label for="">total hours</label>
					<input type="text" class="total-hours" v-model="logDate.totalHours" readonly />
	         </div>
			</div><!-- END .hours-group -->


			<div class="rate-group">
				<div class="label-input text">
	            <label for="">rate</label>
	            <input type="text" v-model.lazy="logDate.rate" required />
	         </div>
			</div><!-- END .rate-group -->

			<div class="label-input textarea">
            <label for="">notes</label>
   			<textarea v-model.lazy="logDate.notes"></textarea>
         </div>

			<div class="buttons">
				<app-button buttonClass="btn-color-4 btn-save" buttonText="save" path="" v-on:click.native="post" />
			</div>

		</form>

		<div class="" v-if="submitted">
			<h3>"submitted!"</h3>

		</div>

		<div class="preview">
			<h3>preview</h3>
			<p>logDate.date: <b>{{ logDate.date }}</b></p>
			<p>logDate.timeIn: <b>{{ logDate.timeIn }}</b></p>
			<p>logDate.timeOut: <b>{{ logDate.timeOut }}</b></p>
		</div>

   </div><!-- END .container -->
</template>



<script>


   export default {
      props: {
			// projectID: String
		},
      components: {
      },
      data () {
         return {
            id: this.$route.params.id,
				viewName: "Log Hours",
				fileName: "log-hours.vue",
            subtitle: "ID: " + this.$route.params.id + ", (hours.json)",
            project: {},
            logDate: {
					date: "",
					dateIn: "",
					timeIn: "09:00",
					timeOut: "17:00",
					timeBreak: "00",
					totalHours: ""
				},
				submitted: false
         }
      }, // data

		beforeMount: function() {
      }, // beforeMount

      created: function() {
         this.$http.get("https://sr-giglog.firebaseio.com/projects/" + this.id + ".json")
            .then(data => data.json())
            .then(data => {
               this.project = data;
            })
				.then(function setDateDefault() {
					const dateInput = document.querySelector("#date"); // to focus
					const today = new Date(); // not a legit format to set as date input value (required: "yyyy-mm-dd"), ergo:
					const currentYear = today.getFullYear();
					/*
						.getMonth() returns number as 0-based index, w/out leading zero, ergo:
						- '"0" + ' adds leading zero (& coerces to string), "+1" for readability, and slice() to eliminate superfluous leading zeros
					*/
					const currentMonth = ("0" + (today.getMonth() + 1)).slice(-2);
					const currentDate = ("0" + today.getDate()).slice(-2);
					// regardless of display, required date format is "yyyy-mm-dd"
					this.logDate.date = (currentYear + "-" + currentMonth + "-" + currentDate);
					dateInput.focus();
				})
      }, // created
      methods: {
			sumHours: function(e) {
				const timeIn = document.querySelector("#time-in").value; // string
				const timeOut = document.querySelector("#time-out").value; // string
				const timeBreak = (Math.round((document.querySelector("#break-time").value * 1 / 60) / 0.25) * 0.25).toFixed(2);
				const timeInHrs = parseInt(timeIn.slice(0, 2));
				const timeInMins = Math.round(parseInt(timeIn.slice(3)) / 15) * 15; // round to nearest 1/4 hour
				const timeOutHrs = parseInt(timeOut.slice(0, 2));
				const timeOutMins = Math.round(parseInt(timeOut.slice(3)) / 15) * 15; // round to nearest 1/4 hour
				const timeInDate = new Date(this.logDate.date).setHours(timeInHrs, timeInMins);
				const timeOutDate = new Date(this.logDate.date).setHours(timeOutHrs, timeOutMins);
				let totalHours = ((timeOutDate - timeInDate) / 3600000);
            // post-midnight timeOut doesn't increment date, ergo:
				totalHours < 0 ? totalHours += 24 : totalHours;
				totalHours = parseFloat((totalHours - timeBreak).toFixed(2));
				this.logDate.totalHours = totalHours;
			},
			post: function() {
				console.log("log-hours @post");
				this.$router.replace({ name: 'Projects' })
			}
      } // methods
   }
</script>


<style scoped>

   /* @import url('/static/giglog.css'); */

	h1 { margin-bottom: 1.5rem; }
	h1 .project-id { font-size: 1.2rem; color: #999; }

   h3.client {
      display: inline-block;
      width: auto;
      margin-bottom: 3rem;
      color: darkgreen;
      text-transform: uppercase;
      border-bottom: 3px double darkgreen;
   }

   form { display: flex; flex-flow: row wrap; justify-content: flex-start; }

	.label-input { flex-flow: column wrap; margin-right: .9rem; }
	.label-input.select { display: none; }
	.label-input label { display: block; }
	.label-input label:after { content: ":"; }

	select,
	input[type="date"],
   input[type="time"],
   input[type="datetime-local"],
	textarea {
		width: 100%;
		font-size: .99rem;
		padding: .3rem .9rem;
		border: 1px solid #ccc;
		border-radius: 3px;
	}
	select   {
		min-width: 7.5rem;
		height: calc(2.1rem + 2px);
		font-size: .9rem;
	}

	textarea { /*border: 1px solid #ccc; border-radius: .3rem;*/ min-height: 6rem; resize: vertical; }

	/* ~rows */
	.date-group,
	.hours-group,
	.rate-group {
		width: 100%;
		margin-bottom: .9rem;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		border: 1px dotted #eee;
	}

	.hours-group .label-input { min-width: 9.45rem; /*max-width: 12rem;*/ width: 30%; }

	.label-input.break-time,
	.label-input.total-hours { max-width: 15%; text-align: center; }

	.label-input.break-time input,
	.label-input.total-hours input { max-width: 3.6rem; height: calc(2.1rem + 2px); margin: auto; }


	.label-input.textarea { width: 51%; }
	.label-input + .buttons { width: 100%; }




</style>
