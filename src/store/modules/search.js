import * as api from '@/api/search';

export default {
	namespaced: true,

	state() {
		return {
			searchResult: [],

			totalPages: null,

			page: 1,

			loading: false,
		};
	},

	mutations: {
		// API 결과 result
		setSearchResult(state, result = []) {
			state.searchResult = [...result];
		},

		// API 결과 total_pages
		setTotalPages(state, pages) {
			state.totalPages = pages;
		},

		setPage(state, page = 1) {
			state.page = page;
		},

		setLoading(state, loading) {
			state.loading = loading;
		},
	},

	actions: {
		async searchMovie({ commit, state }, query) {
			const result = await api.searchMovie(query, state.page);

			if (result.isError) {
				commit('setTotalPages', null);
				throw result.errorData;
			}

			const { total_pages, results } = result.data;

			commit('setSearchResult', results);
			commit('setTotalPages', total_pages);
		},

		clearState({ commit }) {
			commit('setPage', 1);
			commit('setSearchResult', []);
			commit('setTotalPages', null);
		},
	},

	getters: {
		isSearchResult(state) {
			return !!state.searchResult.length;
		},
	},
};
