<template>
	<mdb-container fluid class="py-5 blue lighten-5">
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
		<h1 class="mt-5 font-weight-bold"><mdb-icon icon="person-booth" /> Polling</h1>

		<div v-for="(position, index1) in election.positions" :key="index1">
			<p class="blue darken-2 white-text  h5-responsive">{{ position.position }}</p>
			<mdb-row>
				<mdb-col col="11" md="4" lg="3" class="my-4 mx-4" v-for="(nomenee, index2) in getNomenees(position)" :key="index2">
					<span
						:class="vote[index1] != nomenee.studentID ? 'card hoverable pt-0' : 'green lighten-4 card border border-success hoverable pt-0'"
						@click="poll(nomenee.studentID, index1)"
					>
						<mdb-row>
							<mdb-col>
								<mdb-input
									type="radio"
									class=" border-bottom lighten-4 mb-3 rounded"
									:id="index1 + '-' + index2"
									:name="position.position"
									:radioValue="nomenee.studentID"
									v-model="vote[index1]"
									:label="vote[index1] != nomenee.studentID ? 'Click Here' : position.position"
								/>
							</mdb-col>
							<mdb-col col="2">
								<mdb-icon v-if="vote[index2] == nomenee.studentID" class="success-text" icon="check-double" />
							</mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col col="12">
								<mdb-avatar tag="img" v-if="nomenee.picture.length != 0" :src="nomenee.picture" circle class="z-depth-1" alt="Sample avatar" />
								<mdb-icon size="5x" v-else icon="user-circle" />
							</mdb-col>
						</mdb-row>
						<hr />
						<p class=" text-uppercase font-weight-bold mdb-color-text">{{ nomenee.name }} {{ nomenee.surname }}</p>
						<p :class="vote[index1] != nomenee.studentID ? 'mb-3' : 'mb-1'">ID :{{ nomenee.studentID }}</p>
						<p :class="vote[index1] != nomenee.studentID ? 'mb-3' : 'mb-1'">Campus : {{ nomenee.campus }}</p>
						<p :class="vote[index1] != nomenee.studentID ? 'mb-3' : 'mb-4'">
							Programme : <span class="small indigo-text"> {{ nomenee.programme }}</span>
						</p>
						<mdb-badge v-if="vote[index1] == nomenee.studentID" color="success">Selected</mdb-badge>
					</span>
				</mdb-col>
				<hr />
			</mdb-row>
		</div>
		<mdb-row class="mb-5 py-3 white border-top justify-content-center">
			<mdb-col sm="9" lg="6">
				<mdb-btn color="primary" v-if="loading" disabled>
						<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
						Loading...
					</mdb-btn>
				<mdb-btn outline="primary" v-else rounded block @click="submit" color="white" icon="vote-yea">SUBMIT </mdb-btn>
			</mdb-col>
		</mdb-row>
	</mdb-container>
</template>
<script>
import { elections, students } from "@/plugins/firebase.js";
import { mdbNavbar, mdbNavbarNav, mdbAvatar, mdbNavItem, mdbBtn, mdbIcon, mdbRow, mdbCol, mdbContainer, mdbBadge, mdbInput } from "mdbvue";
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
		mdbCol,
		mdbContainer,
		mdbBadge,
		mdbInput,
		mdbAvatar,
	},
	data() {
		return {
			loading: false,
			Voted: false,
			election: {
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
						chosen: false,
						votes: 20,
						studentID: "161986",
						picture: "",

						position: { position: "President", campus: "All" },
					},
					{
						name: "Khulekane",
						surname: "Matsebula",
						campus: "Luyengu",
						programme: "Bachelor of Arts in Humanities",
						votes: 200,
						studentID: "161717",
						picture: "",
						position: { position: "President", campus: "All" },
					},
					{
						name: "Phathizwe",
						surname: "Vilakazi",
						campus: "Mbabane",
						programme: "Bachelor of Education",
						votes: 890,
						studentID: "201900229",
						picture: "",
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
						name: "Siya",
						surname: "Msibi",
						campus: "Luyengu",
						programme: "Bsc Hoticulture",
						votes: 143,
						studentID: "8989",
						picture: "",
						position: { position: "Vise President", campus: "All" },
					},
					{
						name: "Vusi",
						surname: "Gama",
						campus: "Mbabane",
						programme: "Bachelor of Science",
						votes: 143,
						picture: "",
						studentID: "168972",
						position: { position: "Vise President", campus: "All" },
					},
					{
						name: "Sipho",
						surname: "Gwebu",
						campus: "Luyengu",
						programme: "",
						votes: 143,
						studentID: "154232",
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
						name: "Lethu",
						surname: "Dlamini",
						campus: "Kwaluseni",
						programme: "Bachelor of Science",
						votes: 143,
						studentID: "20200087",
						picture: "",
						position: { position: "Direcor of Canteen", campus: "Kwaluseni" },
					},
					{
						name: "Colile",
						surname: "Nhlabatsi",
						campus: "Mbabane",
						programme: "Bachelor of Commerce",
						votes: 143,
						studentID: "20200876",
						picture: "",
						position: { position: "Direcor of Canteen", campus: "Kwaluseni" },
					},
					{
						name: "Zinhle",
						surname: "Mhlanga",
						campus: "Mbabane",
						programme: "",
						votes: 143,
						studentID: "165543",
						picture: "",
						position: { position: "Direcor of Health", campus: "Mbabane" },
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
			student: {},
			vote: [],
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
		poll(studentID, index1) {
			this.vote[index1] = studentID;
			// this.election.nomenees[index2].votes++;
		},
		joinVote() {
			let V = [];
			for (let i = 0; i < this.election.positions.length; i++) {
				console.log("position : " + this.election.positions[i].position);
				console.log("vote :" + this.vote[i]);
				V.push({ nomeneeID: this.vote[i], position: this.election.positions[i] });
			}
			this.vote.forEach((v) => {
				this.election.nomenees.forEach((nomenee) => {
					if (nomenee.studentID == v) {
						nomenee.votes++;
					}
				});
			});

			return V;
		},
		submit() {
			this.loading = true;
			let Vote = this.joinVote();
			this.vote = [];
			elections
				.doc("2020-2021")
				.set({
					nomenees: this.election.nomenees,
				})
				.then(() => {
					students
						.doc(this.$store.state.user.userId)
						.set({
							has_voted: true,
						})
						.then(() => {
							this.loading = false;
							this.loading = false;
							this.$router.push({ name: "leaderboard" });
						})
						.catch((err) => {
							this.loading = false;
							console.log(err);
						});
				})
				.catch((err) => {
					this.loading = false;
					console.log(err);
				});
			console.log(Vote);
		},
	},
	mounted() {
		elections
			.doc("2020-2021")
			.get()
			.then((doc) => {
				if (doc.exists) {
					this.election = doc.data();
					this.loading = false;
				} else {
					this.loading = false;
					this.Voted = true;
					this.$notify.error({ message: "You can only vote once", position: "top right", timeOut: 5000 });
				}
			})
			.catch((error) => {
				this.$notify.error({ message: error.message, position: "top right", timeOut: 5000 });
				this.loading = false;
				this.Voted = true;
			});
		// API.get('election').then((response)=>{
		// 		this.election = response.data;
		// })

		// API.get('positions').then((response)=>{
		// 		this.election.positions = response.data;
		// })

		// API.get('positions').then((response)=>{
		// 		this.election.nomenees = response.data;
		// })

		// axios.get(`https://randomuser.me/api/?results=${this.election.nomenees.length}&inc=picture`).then((response) => {
		// 	for (let i = 0; i < this.election.nomenees.length; i++) {
		// 		console.log(response.data.results[i].picture.large);
		// 		this.election.nomenees[i].picture = response.data.results[i].picture.large;
		// 	}
		// });
	},
};
</script>
