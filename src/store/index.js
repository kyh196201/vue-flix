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

export default store;
