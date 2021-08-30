// Root Mutations
const mutations = {
	openSearchForm(state) {
		state.isSearchForm = true;
	},

	closeSearchForm(state) {
		state.isSearchForm = false;
	},
};

export default mutations;
