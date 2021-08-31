import { createStore } from 'vuex';
import state from './state';
import mutations from './mutations';

// Modules
import search from './modules/search';

const store = createStore({
	state,
	mutations,

	modules: {
		search,
	},
});

export default store;
