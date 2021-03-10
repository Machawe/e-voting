<template>
	<mdb-container fluid class="pt-5">
		<mdb-navbar color="stylish" position="top" animation="5" dark>
			<mdb-navbar-nav>
				<mdb-nav-item href="#">
					<mdb-btn size="md" outline="white" @click="$router.go(-1)" class="m-0 p-0" icon="arrow-left" />
				</mdb-nav-item>
			</mdb-navbar-nav>
			<mdb-navbar-nav right>
				<mdb-nav-item href="#">
					<mdb-icon size="2x" outline="white" class="m-0 p-0" icon="user-circle" />
				</mdb-nav-item>
			</mdb-navbar-nav>
		</mdb-navbar>
		<h1 class="mt-5"><mdb-icon icon="poll" /> Leaderboard</h1>
		<!-- <mdb-icon  /> -->
		<span v-if="loading" class=" d-flex justify-content-center   mx-0 px-0 p-0 m-0" style="height:80vh;width:100%">
			<mdb-spinner class="align-middle align-self-center" big crazy />
		</span>
		<span v-else-if="NotSetup" class="d-flex justify-content-center" style="height:80vh;width:100%">
			<span class="align-middle align-self-center">
				<h1>The 2020/2021 election had not been seup yet</h1>
				<mdb-icon size="4x" icon="exclamation-circle" />
				<p class="h4">Contact electoral officer</p>
			</span>
		</span>
		<span else>
			<mdb-row class="justify-content-center py-4 white">
				<mdb-col col="11" md="4" lg="3">
					<p v-if="student.has_voted" class="h4 green-text">You have Voted</p>
					<mdb-btn size="lg" outline="primary" v-else block @click="$router.push({ name: 'polling' })" class="m-0 p-0" icon="vote-yea">Vote </mdb-btn>
				</mdb-col>
			</mdb-row>

			<div v-for="(position, index1) in election.positions" :key="index1">
				<p class="blue lighten-4 h5-responsive">{{ position.position }}</p>
				<mdb-row>
					<mdb-col col="11" md="4" lg="3" class="my-4 mx-4" v-for="(nomenee, index2) in getNomenees(position)" :key="index2">
						<span class=" card hoverable pt-3">
							<mdb-row>
								<mdb-col col="12">
									<mdb-avatar tag="img" v-if="nomenee.picture.length != 0" :src="nomenee.picture" circle class="z-depth-1" alt="Sample avatar" />
									<mdb-icon size="5x" v-else icon="user-circle" />
								</mdb-col>
							</mdb-row>
							<hr />
							<p class=" text-uppercase font-weight-bold mdb-color-text">{{ nomenee.name }} {{ nomenee.surname }}</p>
							<p class="mb-3">ID :{{ nomenee.studentID }}</p>
							<p class="mb-3">Campus : {{ nomenee.campus }}</p>
							<p class="mb-3">
								Programme : <span class="small indigo-text"> {{ nomenee.programme }}</span>
							</p>
							<h4 class="blue mb-0 darken-2 white white-text font-weight-bold">Votes : {{ nomenee.votes }}<mdb-badge color="info"></mdb-badge></h4>
						</span>
					</mdb-col>
				</mdb-row>
			</div>
		</span>
	</mdb-container>
</template>
<script>
// import axios from "axios";

import { elections } from "@/plugins/firebase.js";
// import {API} from "@/client.js";
import { mdbNavbar, mdbNavbarNav, mdbSpinner, mdbNavItem, mdbBtn, mdbIcon, mdbRow, mdbCol, mdbContainer, mdbBadge, mdbAvatar } from "mdbvue";
// import Navbar from "@/components/InappNevBar"
export default {
	name: "leaderboard",
	components: {
		// Navbar
		mdbNavbar,
		mdbBtn,
		mdbNavbarNav,
		mdbNavItem,
		mdbIcon,
		mdbRow,
		mdbSpinner,
		mdbCol,
		mdbContainer,
		mdbBadge,
		mdbAvatar,
	},
	data() {
		return {
			loading: false,
			NotSetup: false,
			election: {
				acardemic_year: "",
				startdate: "",
				starttime: "",
				enddate: "",
				endtime: "",
				positions: [
					{ position: "President", campus: "All" },
					{ position: "Vise President", campus: "All" },
					{ position: "Direcor of Canteen", campus: "Kwaluseni" },
					{ position: "Direcor of Health", campus: "Mbabane" },
				],
				nomenees: [
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
						name: "Khulekane",
						surname: "Matsebula",
						campus: "Luyengu",
						programme: "Bachelor of Arts in Humanities",
						votes: 200,
						picture: "",
						studentID: "161717",
						position: { position: "President", campus: "All" },
					},
					{
						name: "Phathizwe",
						surname: "Vilakazi",
						campus: "Mbabane",
						programme: "Bachelor of Education",
						votes: 890,
						picture: "",
						studentID: "201900229",
						position: { position: "President", campus: "All" },
					},
					{
						name: "Sihle",
						surname: "Mamba",
						campus: "Kwaluseni",
						programme: "Bsc Nursing",
						votes: 222,
						picture: "",
						studentID: "12345",
						position: { position: "Vise President", campus: "All" },
					},
					{
						name: "Siya",
						surname: "Msibi",
						campus: "Luyengu",
						programme: "Bsc Hoticulture",
						picture: "",
						votes: 143,
						studentID: "8989",
						position: { position: "Vise President", campus: "All" },
					},
					{
						name: "Vusi",
						surname: "Gama",
						campus: "Mbabane",
						programme: "Bachelor of Science",
						votes: 13,
						picture: "",
						studentID: "168972",
						position: { position: "Vise President", campus: "All" },
					},
					{
						name: "Sipho",
						surname: "Gwebu",
						picture: "",
						campus: "Luyengu",
						programme: "",
						votes: 143,
						studentID: "154232",
						position: { position: "Vise President", campus: "All" },
					},
					{
						name: "Buhle",
						surname: "Gumbi",
						campus: "Kwaluseni",
						programme: "Bachelor of Science",
						picture: "",
						votes: 411,
						studentID: "140098",
						position: { position: "Direcor of Canteen", campus: "Kwaluseni" },
					},
					{
						name: "Lethu",
						surname: "Dlamini",
						campus: "Kwaluseni",
						programme: "Bachelor of Science",
						votes: 111,
						picture: "",
						studentID: "20200087",
						position: { position: "Direcor of Canteen", campus: "Kwaluseni" },
					},
					{
						name: "Colile",
						surname: "Nhlabatsi",
						campus: "Mbabane",
						programme: "Bachelor of Commerce",
						votes: 333,
						picture: "",
						studentID: "20200876",
						position: { position: "Direcor of Canteen", campus: "Kwaluseni" },
					},
					{
						name: "Zinhle",
						surname: "Mhlanga",
						picture: "",
						campus: "Mbabane",
						programme: "",
						votes: 143,
						studentID: "165543",
						position: { position: "Direcor of Health", campus: "Mbabane" },
					},
					{
						name: "Alex",
						surname: "Gamedze",
						campus: "Kwaluseni",
						programme: "Bachelor of Commerce",
						votes: 341,
						studentID: "150098",
						picture: "",
						position: { position: "Direcor of Health", campus: "Mbabane" },
					},
					{
						name: "Tibu",
						surname: "Dlamini",
						campus: "Luyengu",
						programme: "Bsc Animal Science",
						votes: 105,
						studentID: "160098",
						picture: "",
						position: { position: "Direcor of Health", campus: "Mbabane" },
					},
				],
			},
			student: {},
		};
	},
	methods: {
		getNomenees(position) {
			return this.election.nomenees.filter((e) => {
				if (e.position.position == position.position) {
					return true;
				} else {
					return false;
				}
			});
		},
	},
	mounted() {
		this.loading = true;
		elections
			.doc("2020-2021")
			.get()
			.then((doc) => {
				if (doc.exists) {
					this.loading = false;
					this.election = doc.data();
					this.loading = false;
					this.student = this.$store.state.user;
				} else {
					this.loading = false;
					this.NotSetup = true;
				}
			})
			.catch((error) => {
				this.$notify.error({ message: error.message, position: "top right", timeOut: 5000 });
				this.loading = false;
				this.NotSetup = true;
			});
	},
};
</script>
