import { createStore } from 'vuex';
import state from './state';
import mutations from './mutations';

// Modules
import search from './modules/search';
import auth from './modules/auth';

const store = createStore({
	state,
	mutations,

	modules: {
		search,
		auth,
	},
});

export default store;
