<template>

   <div class="container container-log-hours">

		<app-subheader v-bind:fileName="fileName" v-bind:viewName="viewName" />

      <h3 class="client"><strong>{{ project.client }}</strong></h3>

		<!-- <form novalidate=true> -->
		<!-- <form v-on:submit.prevent="onSubmit"> -->

		<div class="logged-hours" v-if="showLoggedHours">
			<p>logged hours for this project:</p>
			<ul>
				<li v-for="(date, ix) in project.hours" v-bind:key="ix">
					<b>{{ dateString(date.date) }}</b>: {{ date.totalHours }} @{{ date.rate }} = {{ date.totalAmount }}
				</li>
			</ul>
		</div>

		<form ref="form" v-on:submit.prevent>

			<div v-if="errors.length" style="margin-bottom: .9rem; padding: .9rem;">
				<p class="error"><b>Errors:</b></p>
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
							USE v-model !!! DNU value or :value
					-->
					<date-picker
						type="date"
						ref="datepicker"
						v-model="logDate.date"
						:placeholder="datepickerPlaceholder"
					></date-picker>
				</div>
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
						@change="sumHours"
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
						@change="sumHours"
					/>
	         </div>

				<div class="label-input time break-time">
	            <label for="breakTime">break time<span>(s)</span></label>
					<input
						type="number"
						ref="breakTime"
						min="0"
						step="15"
						v-model="logDate.timeBreak"
						v-on:change="sumHours"
					/>
					<p class="info">minutes</p>
	         </div>

				<div class="label-input text total-hours">
	            <label for="totalHours">total hours</label>
					<input
						type="text"
						ref="totalHours"
						class="total-hours"
						v-model="logDate.totalHours"
						readonly
						tabindex="-1"
					/>
	         </div>
			</div><!-- END .hours-group -->

			<!-- ============ RATE/TOTAL ============ -->
			<div class="rate-total-amount">

				<div class="label-input text rate">
					<label for="rate">rate $/hr.</label>
	            <input
						type="number"
						ref="rate"
						placeholder="60"
						min="60"
						step="5"
						v-model.lazy="logDate.rate"
						@change="sumHours"
					/>
	         </div>

				<p class="total-amount" ref="totalAmount">
					<b>{{ dateString(logDate.date) }}</b> total billable
					<br />
					<span>{{ logDate.totalAmount }}</span>
				</p>
			</div><!-- END .ate-total-amount -->


			<!-- ============ NOTES? ============ -->
			<div class="label-input textarea">
            <label for="">notes</label>
   			<textarea v-model.lazy="logDate.notes">
				</textarea>
         </div>


			<div class="buttons">
				<app-button
					buttonClass="btn-color-4 btn-save"
					buttonText="save"
					v-on:click.native="post"
				/>
			</div>

		</form>

   </div><!-- END .container -->
</template>



<script>

	import titleCase from '@/mixins/titleCase.js';
	import DatePicker from 'vue2-datepicker';
	// import 'vue2-datepicker/index.css';

   export default {
      props: {
			projectID: String
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
				showLoggedHours: false,
				datepickerPlaceholder: "select date",
            logDate: {
					// date: "",
					date: "",
					timeIn: "09:00",
					timeOut: "18:00",
					timeBreak: "00",
					totalHours: "",
					rate: 75,
					totalAmount: null
				},
				errors: [],
				hoursError: false,
				hoursErrorMsg: "'ERROR: Time Out' cannot precede 'Time In'. Hours must be logged per-date (is AM/PM correct?)",
         }
      }, // data

		beforeMount: function() {
      }, // beforeMount

		created: function() {
			this.get();
      }, // created

      methods: {
         get: function() {
	         this.$http.get("https://sr-giglog.firebaseio.com/projects/" + this.id + ".json")
	            .then(data => data.json())
	            .then(data => {
	               this.project = data;
						console.log("this.project", this.project);
	            })
					.then(() => {
						this.displayLoggedHours();
						this.setDateDefault();
						this.sumHours();
					})
	      },

			displayLoggedHours: function() {
				if (this.project.hours && this.project.hours.length) {
					this.showLoggedHours = true;
				}
			},

			setDateDefault: function() {
				this.$refs.datepicker.focus();
				this.logDate.date = new Date();
			},

			dateString: function(dateObj) {
				return dateObj.toString().slice(0, 10).toUpperCase();
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
				const timeInDate = new Date(this.logDate.date).setHours(timeInHr, timeInMins);
				const timeOutDate = new Date(this.logDate.date).setHours(timeOutHr, timeOutMins);
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
				const rate = this.$refs.rate.value;
				let amt = parseFloat(totalHours * rate).toFixed(2);
				this.logDate.totalAmount = amt;
			},

			validate: function() {
				console.clear();
				this.errors = [];
				// datepicker value ensured
				if (!this.logDate.timeIn) {
					this.errors.push("start time required");
				}
				if (!this.logDate.timeOut) {
					this.errors.push("finishing time required");
				}
				if (this.errors.length) {
					this.$refs.form.scrollTo({
						left: 0,
						top: 0,
						behavior: "smooth"
					});
					return false;
				}
				else {
					return true;
				}
			}, // validate

			post: function() {
				this.errors = [];
				if (this.validate(this.logDate)) {
					if (!this.project.hours) {
						this.project.hours = [];
					}
					this.project.hours.push(this.logDate);
					this.logDate.notes = this.dateString(this.logDate.date) + ": " + this.logDate.totalHours + "hrs @ " + this.logDate.rate;
					this.$http.put("https://sr-giglog.firebaseio.com/projects/" + this.$route.params.id + ".json", this.project)
	               .then(response => {
	                  // console.log("response.body:", response.body);
	               }, response => {
	                  console.error("error? response.body", response.body);
	               })
						.then(() => {
							this.get();
							// this.$router.replace({ name: 'ProjectDetail', params: { id: this.project.id } })
						});
				} // if valid
			} // post
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

	.logged-hours {
		margin-bottom: 1.5rem;
		padding: .9rem;
		color: $theme1;
		border: 3px double $theme1;
		border-radius: .3rem;
	}
	.logged-hours p {
		margin-bottom: .9rem;
		text-transform: uppercase;
	}

   form {
   	display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
	}

	.label-input { flex-flow: column wrap; }
	.label-input label { display: block; text-transform: capitalize; }
	.label-input label:after { content: ":"; }
	.label-input label span { text-transform: none; }

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
	.rate-total-amount {
		width: 100%;
		margin-bottom: 1.5rem;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		align-items: flex-start;
		border-bottom: 1px dotted #000;
	}
	// .rate-subtotal { justify-content: flex-start; }

	.label-input.time { width: 24%; }
	.label-input.break-time,
	.label-input.total-hours {
		width: auto;
		text-align: center;
		// border: 1px dotted red;
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

	.label-input.rate,
	.total-amount {
		width: auto;
		flex-shrink: 3;
		// border: 1px solid lime;
	}
	.label-input.rate input { max-width: 7.5rem; }
	.total-amount {
		text-align: right;
		text-transform: capitalize;
	}
	.total-amount span {
		color: $theme4;
		font-weight: bold;
	}
	.total-amount span::before {
		display: inline-block;
		padding-right: .9rem;
		content: "$";
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
