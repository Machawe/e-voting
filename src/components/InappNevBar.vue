<template>
	<mdb-navbar color="stylish" position="top" animation="5" dark>
		<mdb-navbar-nav>
			<mdb-nav-item href="#">
				<mdb-btn  size="md" outline="white" @click="$router.go(-1)" class="m-0 p-0" icon="arrow-left" />
			</mdb-nav-item>
		</mdb-navbar-nav>
	</mdb-navbar>
</template>
<script>
import { mdbNavbar, mdbNavbarNav, mdbNavItem, mdbBtn } from "mdbvue";
export default {
	name: "InappNavBar",
	components: {
		mdbNavbar,
		mdbBtn,
		mdbNavbarNav,
		mdbNavItem,
	},
};
</script>
