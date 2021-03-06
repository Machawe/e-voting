<template>
	<mdb-container class="white border">
		<mdb-stepper buttons :steps="registrationStepper" @submit="submit">
			<template #1>
				<h3 class="font-weight-bold pl-0 my-4">
					<strong>Election Dates</strong>
				</h3>
				<p class="blue-grey lighten-5 text-center h6 ">Starting Time</p>
				<mdb-row>
					<mdb-col>
						<mdb-date-picker-2 v-model="election.startdate" disabledPast placeholder="YYYY-MM-DD" label="Start Date" title="Select date" />
					</mdb-col>
					<mdb-col>
						<mdb-time-picker-2 id="starttimePicker" label="start time" placeholder="HH:MM am/pm" v-model="election.starttime" />
					</mdb-col>
				</mdb-row>
				<p class="blue-grey lighten-5 text-center h6 ">Election Deadline</p>
				<mdb-row>
					<mdb-col>
						<mdb-date-picker-2 v-model="election.enddate" label="YYYY-MM-DD" placeholder="End Date" title="Select date" />
					</mdb-col>
					<mdb-col>
						<mdb-time-picker-2 id="endtimePicker" disabledPast label="End time" placeholder="HH:MM am/pm" v-model="election.endtime" />
					</mdb-col>
				</mdb-row>
			</template>
			<template #2>
				<mdb-container>
					<mdb-card class="mt-4">
						<h3 class="card-header stylish-color white-text text-center font-weight-bold text-uppercase py-4">UNESWA SRC Positions</h3>
						<mdb-card-body>
							<mdb-table-editable :columns="columns" :rows="positions" class="text-center" striped bordered responsive pagination :display="5" :entries="5" />
						</mdb-card-body>
					</mdb-card>
				</mdb-container>
			</template>
			<template #3>
				<h3 class="font-weight-bold pl-0 m-4">
					<strong>Nomenees</strong>
				</h3>
				<mdb-container fluid>
					<div v-for="(position, index1) in positions" :key="index1">
						<p class="blue lighten-4 h5-responsive">{{ position.position }}</p>
						<mdb-row>
							<mdb-col>
								<mdb-input type="text" outline v-model="id[index1]" label="Student Id" />
							</mdb-col>
							<mdb-col> <mdb-btn outline="primary" class="mt-4" size="md" rounded icon="plus" @click="AddNomenee(id[index1], position, index1)"></mdb-btn></mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col col="11" md="4" lg="3" class="my-4"  v-for="(nomenee, index2) in getNomenees(position)" :key="index2">
								<span class=" card hoverable">
									<mdb-icon size="3x" icon="user-circle" />
									<hr />
									<h6 class="text-uppercase font-weight-bold mdb-color-text mb-3">{{ nomenee.studentID }}</h6>
								</span>
							</mdb-col>
						</mdb-row>
					</div>
				</mdb-container>
			</template>
			<template #4>
				<h3 class="font-weight-bold pl-0 my-4">
					<strong>Finish</strong>
				</h3>
				<h2 class="text-center font-weight-bold my-4">Registration completed!</h2>
			</template>
		</mdb-stepper>
	</mdb-container>
</template>
<script>
import { mdbStepper, mdbInput, mdbContainer, mdbDatePicker2, mdbTimePicker2, mdbRow, mdbCol, mdbTableEditable, mdbCard, mdbCardBody, mdbBtn, mdbIcon } from "mdbvue";

export default {
	components: {
		mdbStepper,
		mdbInput,
		mdbContainer,
		mdbDatePicker2,
		mdbTimePicker2,
		mdbRow,
		mdbCol,
		mdbTableEditable,
		mdbCard,
		mdbCardBody,
		mdbBtn,
		mdbIcon,
	},
	data() {
		return {
			id: [],
			studentID: "",
			registrationStep: 2,
			registrationStepper: [
				{ icon: "folder", far: true, name: "Basic Information" },
				{ icon: "pencil-alt", name: "Personal Data" },
				{ icon: "image", far: true, name: "Terms and Conditions" },
				{ icon: "check", name: "Finish" },
			],
			election: {
				startdate: "",
				starttime: "",
				enddate: "",
				endtime: "",
				positions: [],
			},
			columns: [
				{
					label: "Position",
					field: "position",
				},
				{
					label: "Campus",
					field: "campus",
				},
			],
			positions: [
				{
					position: "President",
					campus: "All",
				},
				{
					position: "Vise President",
					campus: "All",
				},
				{
					position: "Direcor of Canteen",
					campus: "Kwaluseni",
				},
				{
					position: "Direcor of Health",
					campus: "Mbabane",
				},
			],
			nomination: [
				{
					label: "Student ID",
					field: "ID",
				},
			],
			nomenees: [],
		};
	},
	methods: {
		submit() {
			console.log("submitted");
		},
		AddNomenee(studentID, position, index) {
			console.log(`${studentID} + ${position}`);
			if (this.id[index] == null || this.id[index] == undefined || this.id[index].length == 0) {
				return;
			}
			let p = {
				studentID,
				position,
			};
			console.log(index);
			//this.positions[index].nomenees.push(p)
			this.nomenees.push(p);
			this.id[index] = "";
		},
		getNomenees(position) {
			return this.nomenees.filter((e) => {
				if (e.position.position == position.position) {
					return true;
				} else {
					return false;
				}
			});
		},
	},
};
</script>
