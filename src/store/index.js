import { createStore } from 'vuex';
import rootState from './state';
import rootGetters from './getters';
import rootMutations from './mutations';

// Modules
import search from './modules/search';
import auth from './modules/auth';

const store = createStore({
	state: rootState,
	mutations: rootMutations,
	getters: rootGetters,

	modules: {
		search,
		auth,
	},
});

// store.subscribe((mutation, state) => {
// 	const { type } = mutation;

// 	// 로그인 되었을 경우
// 	if (type === 'auth/setUserAuth' && !!state.auth.idToken) {

// 		store.dispatch('auth/getUserData');
// 	}
// });

export default store;
