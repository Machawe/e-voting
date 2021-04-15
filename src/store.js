import Vue from "vue";
import { auth, students } from "@/plugins/firebase.js";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
		userToken: "",
		election: null,
	},
	mutations: {
		ADD_USER(state, user) {
			state.user = user;
		},
	},
	actions: {
		signInAction({ commit }, payload) {
			return new Promise((resolve, reject) => {
				auth
					.signInWithEmailAndPassword(payload.email, payload.password)
					.then((userObj) => {
						console.log(userObj);
						// resolve(userObj);
						// var u;
						students
							.where("userId", "==", userObj.user.uid)
							.get()
							.then((querySnapshot) => {
								querySnapshot.forEach((doc) => {
									commit("ADD_USER", doc.data());
									// u = doc.data();
									console.log("this is working");
									console.log(doc.id, " => ", doc.data());
									resolve(doc.data());
								});
							});
						})
						.catch((error) => {
							reject(error);
						});
					});
				},
				updateUser({commit},payload){
					commit("ADD_USER", payload);
				}
	},
	getters: {
		
	},
});
