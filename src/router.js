import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Leaderboard from "./views/Leaderboard.vue";
import Polling from "./views/Polling.vue";
import Register from "./views/Register.vue";
import Results from "./views/Results.vue";
import Admin from "./views/Admin.vue";
import Setup from "./views/Admin/Setup.vue";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/leaderboard",
			name: "leaderboard",
			component: Leaderboard,
		},
		{
			path: "/polling",
			name: "polling",
			component: Polling,
		},
		{
			path: "/register",
			name: "register",
			component: Register,
		},
		{
			path: "/results",
			name: "results",
			component: Results,
		},
		{
			path: "/admin",
			component: Admin,
			children: [
				{
					path: "",
					redirect: { name: "setup" },
				},
				{
					path: "setup",
					name: "setup",
					component: Setup,
				},
			],
		},
	],
});
