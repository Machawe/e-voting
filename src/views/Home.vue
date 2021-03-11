<template>
	<div class="classic-form-page">
		<mdb-navbar color="mdb-color" position="top" animation="5" dark>
			<mdb-container fluid>
				<mdbNavbarBrand href="#/"> <img src="@/assets/l.png" class="my-0 py-0" height="40" alt=""/></mdbNavbarBrand>
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

		<view-wrapper>
			<mdb-mask class="d-flex gradient .mypage primary-color-dark justify-content-center align-items-center">
				<mdb-container>
					<mdb-row class="align-items-center ">
						<div class="white-text text-center text-md-left  col-md-6 mt-xl-5 my-5">
							<h1 class="h1-responsive font-weight-bold animated fadeInLeft">UNESWA SRC <span class="text-success"> e-VOTING</span></h1>
							<hr class="hr-light animated fadeInLeft" />
							<h6 class="mb-4 animated fadeInLeft">Due to the covid-19, the SRC elections could not be held physically. Please register and vote.</h6>
							<mdb-btn outline="white animated fadeInLeft" @click="$router.push({ name: 'results' })" color="white">Results</mdb-btn>
						</div>

						<mdb-col md="6" xl="5" class="my-5  animated fadeInRight">
							<img src="@/assets/voting.svg" class="img-fluid" alt="Responsive image" />
						</mdb-col>
					</mdb-row>
				</mdb-container>
			</mdb-mask>
		</view-wrapper>

		<mdb-footer color="mdb-color" class="page-footer font-small pt-4 mt-0">
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
					<mdb-btn color="primary" v-if="loading" disabled>
						<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
						Loading...
					</mdb-btn>
					<mdb-btn outline="primary" v-else icon="key" size="md" @click="login()">Sign In</mdb-btn>
				</div>
			</mdb-modal-body>
			<mdb-modal-footer class="mx-5 pt-3 mb-1" end>
				<p class="font-small grey-text">Not registered? <a class="blue-text ml-1" href="#/register">Sign Up</a></p>
			</mdb-modal-footer>
		</mdb-modal>
	</div>
</template>

<script>
// import axios from "axios";
import {
	mdbContainer,
	mdbRow,
	mdbCol,
	mdbNavbar,
	mdbNavbarNav,
	mdbNavbarToggler,
	ViewWrapper,
	mdbMask,
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
		ViewWrapper,
		mdbMask,
		mdbBtn,
		mdbNavbarBrand,
		mdbFooter,
		mdbModal,
		mdbModalHeader,
		mdbModalTitle,
		mdbModalBody,
		mdbModalFooter,
	},
	data() {
		return {
			loading: false,
			modal: false,
			student_id: "",
			password: "",
		};
	},
	methods: {
		// ...mapActions({
		// 	signin: "store/signInAction",
		// }),
		login() {
			this.loading = true;
			if (this.student_id == "admin" && this.password == "admin") {
				this.loading = false;
				this.$notify.success({ message: `Welcome Administrator`, position: "top right", timeOut: 5000 });
						
				this.$router.push("/admin");
			} else {
				this.$store
					.dispatch("signInAction", { email: this.student_id + "@student.uniswa.sz", password: this.password })
					.then((user) => {
						console.log("user : "+user)
						this.loading = false;
						this.$notify.success({ message: `Welcome ${user.name} ${user.surname}`, position: "top right", timeOut: 5000 });						
						this.$router.push({ name: "leaderboard" });
					})
					.catch((err) => {
						this.loading = false;
						console.log(err);
					});
			}
		},
	},
};
</script>
<style scoped>
.mypage {
	height: 100vh;
}
</style>
