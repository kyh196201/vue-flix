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

		// 페이지 1 증가
		increasePage(state) {
			state.page += 1;
		},

		// 현재 페이지 1페이지로 초기화
		clearPage(state) {
			state.page = 1;
		},

		setLoading(state, loading) {
			state.loading = loading;
		},
	},

	actions: {
		async searchMovie({ commit }, { query, page }) {
			const result = await api.searchMovie(query, page);

			if (result.isError) {
				commit('setTotalPages', null);
				throw result.errorData;
			}

			const { total_pages, results } = result.data;

			commit('setSearchResult', results);
			commit('setTotalPages', total_pages);
		},

		clearState({ commit }) {
			commit('clearPage');
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
