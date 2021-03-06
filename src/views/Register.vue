<template>
	<mdb-container class="white border">
		<mdb-container fluid>
			<mdb-navbar color="stylish" position="top" animation="5" dark href="#">
				<mdbNavbarBrand href="#/">
					<router-link class="white-text" :to="{ name: 'home' }">
						<strong>UNESWA</strong>
					</router-link>
				</mdbNavbarBrand>
				<mdb-navbar-toggler>
					<mdb-navbar-nav left>
						<mdb-nav-item href="/" class="white-text" active><mdb-icon icon="home"/></mdb-nav-item>
					</mdb-navbar-nav>
				</mdb-navbar-toggler>
			</mdb-navbar>
		</mdb-container>

		<h1 class="mt-4" >Register</h1>
		<mdb-stepper class="text-left mb-3" buttons :steps="registrationStepper" :options="options" @submit="register">
			<template #1 style="min-height:55vh;">
				<p class="blue-grey lighten-5 h4  text-center mt-4 font-weight-bold">Personal Details</p>

				<div class="page">
					<mdb-row>
						<mdb-col>
							<mdb-input outline type="text" label="Student id" v-model="student.id" />
						</mdb-col>
						<div class="w-100"></div>
						<mdb-col>
							<mdb-input type="text" outline label="name" v-model="student.name" />
						</mdb-col>
						<div class="w-100"></div>
						<mdb-col>
							<mdb-input type="text" outline label="surname" v-model="student.surname" />
						</mdb-col>
						<div class="w-100"></div>
						<mdb-col>
							<mdb-input outline type="password" label="password" v-model="student.password" />
							<mdb-input outline type="password" label="Confirm password" v-model="password" />
						</mdb-col>
					</mdb-row>
				</div>
			</template>
			<template #2>
				<div class="page">
					<p class="blue-grey lighten-5 h4  text-center mt-4 font-weight-bold">Educational Details</p>
					<form>
						<mdb-container>
							<mdb-row class="h-100 border">
								<mdb-col>
									<mdb-select search outline v-model="courses" @getValue="getSelectCourse" searchPlaceholder="Search Course" :visibleOptions="5" label="Select your course" />
								</mdb-col>
								<hr class="w-100" />
								<mdb-col class="my-5 h5">
									<mdb-input type="checkbox"  id="opentonomination" name="opentonomination" v-model="student.nominatable" label="I would like to run for office" />
								</mdb-col>
							</mdb-row>
						</mdb-container>
					</form>
				</div>
			</template>
			<template #3 style="min-height:55vh;">
				<p class="blue-grey lighten-5 h4  text-center font-wesght-bold mt-4">Contact Details</p>
				<div class="page">
					<form>
						<mdb-input outline label="email" icon="at" type="email" v-model="student.email" />
						<mdb-input outline label="phone" icon="phone" type="number" v-model="student.phone" />
					</form>
				</div>
			</template>
			<template #4 style="min-height:55vh;">
				<p class="blue-grey lighten-5 h4 mt-4 text-center font-weight-bold">Verify</p>
				<div class="page">
					<mdb-container>
						<mdb-row>
							<mdb-col>Student ID </mdb-col>
							<mdb-col class="mdb-color-text font-weight-bold">{{ student.id }} </mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col>Name </mdb-col>
							<mdb-col class="mdb-color-text font-weight-bold">{{ student.name }} {{ student.surname }} </mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col>Programme </mdb-col>
							<mdb-col class="mdb-color-text font-weight-bold"> {{ student.programme }}</mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col>Phone Number <mdb-icon icon="phone"/></mdb-col>
							<mdb-col class="mdb-color-text font-weight-bold"> {{ student.email }}</mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col>Email <mdb-icon icon="at" /> </mdb-col>
							<mdb-col class="mdb-color-text font-weight-bold"> {{ student.phone }}</mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col>Can Run For Office </mdb-col>
							<mdb-col class="mdb-color-text  font-weight-bold" v-if="student.nominatable"> Yes <mdb-icon class="text-success" icon="check"/></mdb-col>
							<mdb-col class="mdb-color-text  font-weight-bold" v-else>No <mdb-icon far class=" red-text" icon="times-circle"/></mdb-col>
						</mdb-row>
					</mdb-container>
					<!-- <mdb-btn outline="primary" rounded icon="pen" @click="register">Register</mdb-btn> -->
				</div>
			</template>
		</mdb-stepper>
	</mdb-container>
</template>

<script>
import axios from "axios"
import { mdbStepper, mdbInput, mdbContainer, mdbSelect, mdbRow, mdbCol, mdbIcon, mdbNavbar, mdbNavbarNav, mdbNavbarToggler, mdbNavbarBrand, mdbNavItem } from "mdbvue";
export default {
	name: "register",
	components: {
		mdbStepper,
		mdbInput,
		mdbContainer,
		mdbSelect,
		mdbRow,
		mdbCol,
		mdbNavbar,
		mdbNavbarNav,
		mdbNavbarToggler,
		mdbNavbarBrand,
		mdbIcon,
		mdbNavItem,
	},
	data() {
		return {
			password: "",
			student: {
				id: "",
				name: "",
				surname: "",
				programme: "",
				campus: "",
				cell: "",
				email: "",
				password: "",
				nominatable: false,
			},
			courses: [
				{ text: "Bachelor of Science", value: "Bachelor of Science", selected: true },
				{ text: "Bachelor of Engineering in Electrical and Electronic Engineering", value: "Bachelor of Engineering in Electrical and Electronic Engineering" },
				{ text: "Bachelor of Arts in Social Science(BASS) ", value: "Bachelor of Arts in Social Science(BASS) " },
				{ text: "Bachelor of Laws(LLB) ", value: "Bachelor of Laws(LLB) " },
				{ text: "Bachelor of Social Work(BSW) ", value: "Bachelor of Social Work(BSW) " },
				{ text: "Bsc in Agricultural and Bio-systems Engineering", value: "Bsc in Agricultural and Bio-systems Engineering" },
				{ text: "Bachelor of Arts in Social Science", value: "Bachelor of Arts in Social Science" },
				{ text: "Bachelor of Science in Agricultural Education", value: "Bachelor of Science in Agricultural Education" },
				{ text: "Bachelor of Science in Agricultural Extention", value: "Bachelor of Science in Agricultural Extention" },
				{ text: "Bachelor of Science in Agronomy", value: "Bachelor of Science in Agronomy" },
				{ text: "Bachelor of Science in Animal Science", value: "Bachelor of Science in Animal Science" },
				{ text: "Bachelor of Science in Animal Science(Dairy)", value: "Bachelor of Science in Animal Science(Dairy)" },
				{ text: "Bachelor of Science in Horticulture", value: "Bachelor of Science in Horticulture" },
				{ text: "Bachelor of Commerce in Accounting and Finance", value: "Bachelor of Commerce in Accounting and Finance" },
				{ text: "Bachelor of Commerce in Management", value: "Bachelor of Commerce in Management" },
				{ text: "Bachelor of Commerce in Marketing", value: "Bachelor of Commerce in Marketing" },
				{ text: "Bachelor of Science in Consumer Science", value: "Bachelor of Science in Consumer Science" },
				{ text: "Bachelor of Science in Consumer Science Education", value: "Bachelor of Science in Consumer Science Education" },
				{ text: "Bachelor of Science in Food Science, Nutrition and Technology", value: "Bachelor of Science in Food Science, Nutrition and Technology" },
				{ text: "Bachelor of Science in Texttiles Apparel Design and Management", value: "Bachelor of Science in Texttiles Apparel Design and Management" },
				{ text: "Certificate in Adult Education", value: "Certificate in Adult Education" },
				{ text: "Post-Graduate Certificate in Education(PGCE)", value: "Post-Graduate Certificate in Education(PGCE)" },
				{ text: "Diploma in Adult Education", value: "Diploma in Adult Education" },
				{ text: "Bachelor of Education (Primary)", value: "Bachelor of Education (Primary)" },
				{ text: "Bachelor of Education (Secondary)", value: "Bachelor of Education (Secondary)" },
				{ text: "Bachelor of Nursing Science ", value: "Bachelor of Nursing Science " },
				{ text: "Bachelor of Science in Environmental Health Science ", value: "Bachelor of Science in Environmental Health Science " },
				{
					text: "Bachelor of Science in Environmental Management and Occupational Satefy and Health ",
					value: "Bachelor of Science in Environmental Management and Occupational Satefy and Health ",
				},
				{ text: "Bachelor of Science in Environmental Management and Water Resources ", value: "Bachelor of Science in Environmental Management and Water Resources " },
				{ text: "Bachelor of Science in Environmental Health and Food Science ", value: "Bachelor of Science in Environmental Health and Food Science " },
				{ text: "Bachelor of Science in Community Health Nursing with Midwifery ", value: "Bachelor of Science in Community Health Nursing with Midwifery " },
				{
					text: "Bachelor of Science in Community Health Nursing with Community Mental Health Nursing ",
					value: "Bachelor of Science in Community Health Nursing with Community Mental Health Nursing ",
				},
				{ text: "Bachelor of Science in Nursing Science(Midwifery) ", value: "Bachelor of Science in Nursing Science(Midwifery) " },
				{ text: "Bachelor of Science in Nursing Science(Mental Health) ", value: "Bachelor of Science in Nursing Science(Mental Health) " },
				{ text: "Bachelor of Arts in Humanities ", value: "Bachelor of Arts in Humanities " },
				{ text: "Bachelor of Arts in Journalism and Mass Communication ", value: "Bachelor of Arts in Journalism and Mass Communication " },
				{ text: " ", value: " " },
				{ text: " ", value: " " },
			],
			options: {
				nextBtn: {
					outline: "primary",
					icon: "arrow-right",
					text: "Next",
				},
				prevBtn: {
					outline: "primary",
					icon: "arrow-left",
					iconClass: "red-text",
				},
				stepBtn: {
					active: "primary",
					outline: "primary",
					iconClass: "text-primary",
				},
			},
			registrationStepper: [
				{ icon: "user", name: "Basic Information" },
				{ icon: "pencil-alt", name: "Educational Information" },
				{ icon: "phone", name: "Contact Details" },
				{ icon: "check", name: "Finish" },
			],
		};
	},
	methods: {
		register() {
			console.log("register");
			axios.get("localhost:5000/t",JSON.stringify(this.student))
			// axios.post("localhost:5000",JSON.stringify(this.student))
		},
		getSelectCourse(value, text) {
			this.student.programme = value;
			console.log("value : " + value);
			console.log("text : " + text);
		},
	},
};
</script>
