import * as api from '@/api/search';

export default {
	namespaced: true,

	state() {
		return {
			// 검색어
			searchText: '',

			// 검색 결과
			searchResult: [],

			// 총 페이지
			totalPages: null,

			// 총 결과
			totalResults: 0,

			// 현재 검색하고있는 페이지
			page: 1,

			// 로딩
			loading: false,
		};
	},

	mutations: {
		// 검색어
		setSearchText(state, searchText) {
			state.searchText = searchText;
		},

		// API 결과 result
		setSearchResult(state, result = []) {
			state.searchResult = [...result];
		},

		// API 결과 total_pages
		setTotalPages(state, pages) {
			state.totalPages = pages;
		},

		// API 결과 total_pages
		setTotalResults(state, totalResults) {
			state.totalResults = totalResults;
		},

		setPage(state, page = 1) {
			state.page = page;
		},

		// 페이지 1 증가
		increasePage(state) {
			state.page += 1;
		},

		// 로딩 상태 변경
		setLoading(state, loading) {
			state.loading = loading;
		},
	},

	actions: {
		// 영화 검색
		async searchMovie({ commit, state }, query) {
			const result = await api.searchMovie(query, state.page);

			if (result.isError) {
				commit('setTotalPages', null);
				throw result.errorData;
			}

			const { total_pages, results, total_results } = result.data;

			commit('setSearchResult', results);
			commit('setTotalPages', total_pages);
			commit('setTotalResults', total_results);

			return results;
		},

		// 인피니티 스크롤을 통해서 추가 데이터 불러오는 API 함수
		async fetchMoreMovies({ commit, state }, query) {
			const result = await api.searchMovie(query, state.page);

			if (result.isError) {
				commit('setTotalPages', null);
				throw result.errorData;
			}

			const { total_pages, results, total_results } = result.data;

			commit('setSearchResult', [...state.searchResult, ...results]);
			commit('setTotalPages', total_pages);
			commit('setTotalResults', total_results);

			return results;
		},

		// state 초기화
		clearState({ commit }) {
			commit('setPage', 1);
			commit('setSearchResult', []);
			commit('setTotalPages', null);
			commit('setTotalResults', 0);
			commit('setLoading', false);
		},
	},

	getters: {
		isSearchResult(state) {
			return !!state.searchResult.length;
		},

		// 더 불러올 데이터 있는지 체크
		isMoreData(state) {
			return state.totalResults > state.searchResult.length;
		},
	},
};
