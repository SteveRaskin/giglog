<template>

   <div class="container container-log-hours">

		<app-subheader v-bind:fileName="fileName" v-bind:viewName="viewName" />

      <h3 class="client"><strong>{{ project.client }}</strong></h3>

		<!-- <form novalidate=true> -->
		<!-- <form v-on:submit.prevent="onSubmit"> -->
		<form v-on:submit.prevent>

			<div v-if="errors.length" style="margin-bottom: .9rem; padding: .9rem;">
				<b>Please include:</b>
				<ul>
					<li class="error" v-for="(error, ix) in errors" v-bind:key="ix">- {{ error }}</li>
				</ul>
			</div>


			<!-- ============ DATE ============ -->
			<div class="date-group">
				<div class="label-input">
					<label for="date">date</label>
					<!-- ================ NATIVE DATE INPUT ================ -->
					<!-- <input
						type="date"
						ref="dateInput"
						v-model="logDate.date"
					/> -->

					<!-- ================ DATEPICKER ================ -->
					<!--
						value-type:
							'date' returns a Date object (default)
							'format'	returns a string using pattern of format attr, e.g., format="YYYY.MM.DD (ddd)"
					-->
					<date-picker
						type="date"
						ref="datepicker"
						v-model="logDate.datepicker"
						:placeholder="logDate.datepickerPlaceholder"
						@blur="setDatepickerDate"
					></date-picker>
				</div>
				<p>{{logDate.date}}</p>
			</div>

			<!-- ============ HOURS ============ -->
			<div class="hours-group">

				<p class="error hours-error" :class="{ show: this.hoursError }">
					{{ hoursErrorMsg }}
				</p>

	         <div class="label-input time">
	            <label for="">time in</label>
					<input
						type="time"
						ref="timeIn"
						pattern="[0-9]{2}:[0-9]{2}"
						step="900"
						v-model="logDate.timeIn"
						v-on:change="sumHours"
					/>
	         </div>
				<div class="label-input time">
	            <label for="">time out</label>
					<input
						type="time"
						ref="timeOut"
						pattern="[0-9]{2}:[0-9]{2}"
						step="900"
						v-model="logDate.timeOut"
						v-on:change="sumHours"
					/>
	         </div>

				<div class="label-input time break-time">
	            <label for="">break</label>
					<input type="number" ref="breakTime" min="0" step="15" v-model="logDate.timeBreak" v-on:change="sumHours" />
					<p>(minutes)</p>
	         </div>

				<div class="label-input text total-hours">
	            <label for="">total hours</label>
					<input type="text" class="total-hours" v-model="logDate.totalHours" readonly />
	         </div>

			</div><!-- END .hours-group -->


			<div class="rate-group">
				<div class="label-input text">
	            <label for="">rate $/hr.</label>
	            <input type="number" placeholder="60" min="60" step="10" v-model.lazy="logDate.rate" />
	         </div>
			</div><!-- END .rate-group -->

			<div class="label-input textarea">
            <label for="">notes</label>
   			<textarea v-model.lazy="logDate.notes"></textarea>
         </div>


			<div class="buttons">
				<app-button
					buttonClass="btn-color-4 btn-save"
					buttonText="save"
					v-on:click.native="validate"
				/>
			</div>

		</form>


		<div class="preview">
			<h3>preview</h3>
			<p>logDate.date: <b>{{ logDate.date }}</b></p>
			<p>logDate.timeIn: <b>{{ logDate.timeIn }}</b></p>
			<p>logDate.timeOut: <b>{{ logDate.timeOut }}</b></p>
		</div>

   </div><!-- END .container -->
</template>



<script>

	import titleCase from '@/mixins/titleCase.js';
	import DatePicker from 'vue2-datepicker';
	// import 'vue2-datepicker/index.css';

   export default {
      props: {
			// projectID: String
		},
      components: {
			DatePicker
      },
      data () {
         return {
            id: this.$route.params.id,
				viewName: "Log Hours",
				fileName: "ProjectLogHours.vue",
            subtitle: "ID: " + this.$route.params.id + ", (hours.json)",
            project: {},
            logDate: {
					date: "",
					// logDate.datepicker is it's 'value', but not .value
					datepicker: "",
					datepickerPlaceholder: "select date",
					timeIn: "09:00",
					timeOut: "18:00",
					// timeIn: "",
					// timeOut: "",
					timeBreak: "00",
					totalHours: "",
					rate: null
				},
				errors: [],
				hoursError: false,
				hoursErrorMsg: "'Time Out' cannot precede 'Time In'. Hours must be logged per-date (is AM/PM correct?)",
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
					this.$refs.datepicker.focus();
					const today = new Date(); // not a legit format to set as date input value (required: "yyyy-mm-dd"), ergo:
					const currentYear = today.getFullYear();
					/*
						.getMonth() returns 0-based index w/out leading zero, ergo:
						- '"0" + ' adds leading zero (& coerces to string), "+1" for readability, and slice() to eliminate superfluous leading zeros
					*/
					const currentMonth = ("0" + (today.getMonth() + 1)).slice(-2);
					const currentDate = ("0" + today.getDate()).slice(-2);
					// regardless of display, required date format is "yyyy-mm-dd"
					this.logDate.datepicker = (currentYear + "." + currentMonth + "." + currentDate);
				})
      }, // created
      methods: {
			setDatepickerDate: function() {
				this.logDate.datepickerPlaceholder = this.logDate.datepicker;
				this.$refs.timeIn.focus();
			},

			sumHours: function(e) {
				console.clear();
				const timeIn = this.$refs.timeIn.value;
				const timeOut = this.$refs.timeOut.value;
				const timeBreak = (Math.round((this.$refs.breakTime.value * 1 / 60) / 0.25) * 0.25).toFixed(2);

				const timeInHr = parseInt(timeIn.slice(0, 2));
				const timeInMins = Math.round(parseInt(timeIn.slice(3)) / 15) * 15; // round to nearest 1/4 hour

				const timeOutHr = parseInt(timeOut.slice(0, 2));
				const timeOutMins = Math.round(parseInt(timeOut.slice(3)) / 15) * 15; // round to nearest 1/4 hour

				const timeInDate = new Date(this.logDate.datepicker).setHours(timeInHr, timeInMins);
				const timeOutDate = new Date(this.logDate.datepicker).setHours(timeOutHr, timeOutMins);

				timeInDate > timeOutDate ? this.hoursError = true : this.hoursError = false;

				let totalHours = ((timeOutDate - timeInDate) / 3600000);
            // post-midnight timeOut doesn't increment date, ergo:
				totalHours < 0 ? totalHours += 24 : totalHours;
				totalHours = parseFloat((totalHours - timeBreak).toFixed(2));

				if (isNaN(totalHours)) {
					console.log("totalHours isNaN", "(" + totalHours + ")");
				}
				else {
					this.logDate.totalHours = totalHours;
				}
			},

			validate: function() {
				console.log("validate");
				// datepicker's 'value' ain't .value
				if (!this.logDate.datepicker) {
					this.errors.push("date selection required");
				}

				if (!this.logDate.timeIn) {
					this.errors.push("start time required");
				}
				if (!this.logDate.timeOut) {
					this.errors.push("finishing time required");
				}
				console.log("this.errors", this.errors);

				// if (this.errors.length) {
				// 	this.$refs.form.scrollTo({
				// 		left: 0,
				// 		top: "-300px",
				// 		behavior: "smooth"
				// 	});
				// 	return false;
				// }
				// else {
				// 	return true;
				// }
			},

			// post: function() {
			// 	this.errors = [];
			// 	console.log("this.project", this.project);
			// 	if (this.validate(this.project)) {
			// 		this.project.client = this.titleCase(this.project.client);
			// 		this.project.address = this.titleCase(this.project.address);
			// 		this.project.city = this.titleCase(this.project.city);
			// 		this.project.state = this.project.city.toUppercase;
			//
			// 		this.$http.post("https://sr-giglog.firebaseio.com/projects.json", this.project)
			// 			.then(function(data) {
			// 				this.project.id = data.body.name;
			// 			})
			// 			.then(function(data) {
			// 				this.$router.replace({ name: 'ProjectDetail', params: { id: this.project.id } })
			// 			})
			// 	}
			// }, // post








			// reservedMethod: function() {
			// 	this.$router.replace({ name: 'Projects' })
			// }
      }, // methods

		mixins: [ titleCase ]
   }
</script>


<style lang="scss" scoped>

   h3.client {
      display: inline-block;
      width: auto;
      margin-bottom: 3rem;
      color: $theme4;
      text-transform: uppercase;
      border-bottom: 3px double $theme4;
   }

   form {
   	display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
	}

	.label-input { flex-flow: column wrap; }
	.label-input label { display: block; text-transform: capitalize; }
	.label-input label:after { content: ":"; }

	input[type="date"],
   input[type="time"],
   input[type="datetime-local"],
	textarea {
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


	/* ~rows */
	.date-group,
	.hours-group,
	.rate-group {
		width: 100%;
		margin-bottom: 1.5rem;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		align-items: flex-start;
		border-bottom: 1px dotted #000;
	}

	.hours-group .label-input {
		// border: 1px dotted red;
	}

	.label-input.time { width: 30%; }

	.label-input.break-time,
	.label-input.total-hours {
		width: auto;
		text-align: center;
	}

	.time input { max-width: 90%; }

	.break-time input,
	.total-hours input {
		max-width: 4.5rem;
		height: calc(2.1rem + 2px);
		margin: auto;
		text-align: center;
	}
	.break-time input { padding-left: .75rem; }


	.hours-error {
		width: 100%;
		max-height: 0;
		margin-bottom: .9rem;
		padding: 0 .45rem;
		border: 0;
		border-radius: .45rem;
		transition: all .45s ease-in-out;
		overflow: hidden;
	}
	.hours-error.show {
		max-height: 100vh;
		padding: .45rem;
		border: 1px solid $error;
	}


	.textarea { width: 100%; }
	textarea {
		min-width: 100%;
		min-height: 9rem;
		resize: horizontal;
	}

	.preview	{
		order: 9;
		width: 100%;
		margin-top: 3rem;
		padding: 0 1.5rem;
		border: 1px dotted #f0f0f0;
	}

	.calendar-slot { display: flex; flex-flow: row nowrap; justify-content: space-around; }

</style>
