// Root Mutations
const mutations = {
	openSearchForm(state) {
		state.isSearchForm = true;
	},

	closeSearchForm(state) {
		state.isSearchForm = false;
	},

	setIsHeaderScroll(state, toggle = true) {
		state.isHeaderScroll = toggle;
	},

	setIsHeaderSticky(state, toggle = true) {
		state.isHeaderSticky = toggle;
	},
};

export default mutations;
