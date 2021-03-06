<template>
	<div class="classic-form-page">
		<mdb-navbar color="stylish" position="top" animation="5" dark>
			<mdb-container fluid>
				<mdbNavbarBrand href="#">
					<mdb-btn outline="white" size="md" class="m-0 p-0 " icon="arrow-left" @click.native="$router.go(-1)"></mdb-btn>
				</mdbNavbarBrand>
				<mdb-navbar-toggler>
					<mdb-navbar-nav right>
						<mdb-form-inline
							><mdb-btn outline="white" size="sm" class="my-0" @click.native="modal = true" type="submit">Login</mdb-btn>
							<mdb-btn outline="white" size="sm" class="my-0" @click="$router.push({ name: 'register' })" type="submit">Register</mdb-btn>
						</mdb-form-inline>
					</mdb-navbar-nav>
				</mdb-navbar-toggler>
			</mdb-container>
		</mdb-navbar>
		<mdb-row>
			<mdb-col
				><p class="h3 mt-5">Results for {{ election.acardemic_year }}</p>
			</mdb-col>
		</mdb-row>
		<mdb-row>
			<mdb-col></mdb-col>
			<mdb-col></mdb-col>
		</mdb-row>
		<mdb-row class="blue lighten-5 py-5 justify-content-center" v-if="election.inProgress">
			<mdb-col col="12">
				<mdb-icon class="grey-text" size="7x" icon="info-circle" />
			</mdb-col>
			<mdb-col col="12">
				<h1 class="red-text my-5  font-weight-bold">The elections are still in prograss!!</h1>
				<hr />
			</mdb-col>
			<mdb-col col="11" md="4" lg="3">
				<mdb-btn size="lg" outline="primary" block @click.native="modal = true" class="m-0 p-0" icon="vote-yea">Vote </mdb-btn>
			</mdb-col>
		</mdb-row>
		<mdb-row v-else>
			<mdb-col lg="3" md="6" class="mb-5 mx-2 border" v-for="(position, index) in election.positions" :key="index">
				<mdb-avatar tag="img" v-if="election.positions[index].picture.length != 0" :src="election.positions[index].picture" circle class="z-depth-1" alt="Sample avatar" />
				<mdb-icon size="2x" v-else icon="user-circle" />
				<h5 class="font-weight-bold mt-4 mb-3">{{ position.position.position }}</h5>
				<p class="text-uppercase blue-text">{{ position.name }} {{ position.surname }}</p>

				<p class="mdb-color-text m-0">Campus : {{ position.campus }}</p>
				<p class="mdb-color-text m-0">Votes : {{ position.votes }}</p>
			</mdb-col>
		</mdb-row>

		<mdb-footer color="stylish-color-dark" class="page-footer font-small pt-4 mt-0">
			<div class="text-center">
				<ul class="list-unstyled list-inline">
					<li class="list-inline-item">
						<a class="btn-floating btn-sm btn-fb mx-1"><i class="fab fa-facebook"> </i></a>
					</li>
					<li class="list-inline-item">
						<a class="btn-floating btn-sm btn-tw mx-1"><i class="fab fa-twitter"> </i></a>
					</li>
					<li class="list-inline-item">
						<a class="btn-floating btn-sm btn-gplus mx-1"><i class="fab fa-google-plus"> </i></a>
					</li>
					<li class="list-inline-item">
						<a class="btn-floating btn-sm btn-li mx-1"><i class="fab fa-linkedin-in"> </i></a>
					</li>
					<li class="list-inline-item">
						<a class="btn-floating btn-sm btn-dribbble mx-1"><i class="fab fa-dribbble"> </i></a>
					</li>
				</ul>
			</div>
			<div class="footer-copyright text-center py-3">
				<mdb-container fluid> &copy; 2021 Copyright: <a href="http://www.uneswa.ac.sz/"> UNESWA </a> </mdb-container>
			</div>
		</mdb-footer>

		<mdb-modal :show="modal" @close="modal = false" elegant>
			<mdb-modal-header class="text-center">
				<mdb-modal-title tag="h3" bold class="w-100 my-3">Sign in</mdb-modal-title>
			</mdb-modal-header>
			<mdb-modal-body class="mx-3">
				<mdb-input label="Student ID" type="text" size="md" icon="user" v-model="student_id" class="mb-5 text-left" />
				<mdb-input label="Enter password" type="password" icon="lock" v-model="password" class="pb-3 text-left"></mdb-input>
				<p class="font-small red-text d-flex justify-content-end mb-2">Forgot <a class="ml-1"> Password?</a></p>
				<div class="text-center mb-3">
					<mdb-btn outline="indigo" icon="key" size="md" @click="login()">Sign In</mdb-btn>
				</div>
			</mdb-modal-body>
			<mdb-modal-footer class="mx-5 pt-3 mb-1" end>
				<p class="font-small grey-text">Not registered? <a class="blue-text ml-1" href="#/register">Sign Up</a></p>
			</mdb-modal-footer>
		</mdb-modal>
	</div>
</template>

<script>
import axios from "axios";
import {
	mdbContainer,
	mdbRow,
	mdbCol,
	mdbNavbar,
	mdbNavbarNav,
	mdbNavbarToggler,
	mdbBtn,
	mdbInput,
	mdbNavbarBrand,
	mdbFormInline,
	mdbFooter,
	mdbModal,
	mdbModalHeader,
	mdbModalTitle,
	mdbModalBody,
	mdbModalFooter,
	mdbAvatar,
	mdbIcon,
} from "mdbvue";
export default {
	name: "ClassicFormPage",
	components: {
		mdbContainer,
		mdbInput,
		mdbRow,
		mdbCol,
		mdbNavbar,
		mdbNavbarNav,
		mdbFormInline,
		mdbNavbarToggler,
		mdbBtn,
		mdbNavbarBrand,
		mdbFooter,
		mdbModal,
		mdbModalHeader,
		mdbModalTitle,
		mdbModalBody,
		mdbModalFooter,
		mdbAvatar,
		mdbIcon,
	},
	data() {
		return {
			modal: false,
			student_id: "",
			password: "",
			election: {
				inProgress: true,
				acardemic_year: "2020-2021",
				startDate: "20-05-2021",
				startTime: "00:01 AM",
				endDate: "30-05-2021",
				endTime: "11:59 PM",

				positions: [
					{
						name: "Mbuso",
						surname: "Shongwe",
						campus: "Kwaluseni",
						programme: "Bachelor of Science",
						votes: 20,
						picture: "",
						studentID: "161986",
						position: { position: "President", campus: "All" },
					},
					{
						name: "Sihle",
						surname: "Mamba",
						campus: "Kwaluseni",
						programme: "Bsc Nursing",
						votes: 222,
						studentID: "12345",
						picture: "",
						position: { position: "Vise President", campus: "All" },
					},
					{
						name: "Buhle",
						surname: "Gumbi",
						campus: "Kwaluseni",
						programme: "Bachelor of Science",
						votes: 143,
						studentID: "140098",
						picture: "",
						position: { position: "Direcor of Canteen", campus: "Kwaluseni" },
					},
					{
						name: "Alex",
						surname: "Gamedze",
						campus: "Kwaluseni",
						programme: "Bachelor of Commerce",
						votes: 143,
						studentID: "150098",
						picture: "",
						position: { position: "Direcor of Health", campus: "Mbabane" },
					},
					{
						name: "Tibu",
						surname: "Dlamini",
						campus: "Luyengu",
						programme: "Bsc Animal Science",
						votes: 143,
						studentID: "160098",
						picture: "",
						position: { position: "Direcor of Health", campus: "Mbabane" },
					},
				],
			},
		};
	},
	methods: {
		login() {
			if (this.student_id == "admin" && this.password == "admin") {
				this.$router.push("/admin");
			} else {
				this.$router.push({ name: "leaderboard" });
			}
		},
	},
	mounted() {
		axios.get(`https://randomuser.me/api/?results=${this.election.positions.length}&inc=picture`).then((response) => {
			for (let i = 0; i < this.election.positions.length; i++) {
				console.log(response.data.results[i].picture.large);
				this.election.positions[i].picture = response.data.results[i].picture.large;
			}
		});
	},
};
</script>
<style scoped>
.mypage {
	height: 100vh;
}
</style>
