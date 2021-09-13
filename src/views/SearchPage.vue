<template>
	<section class="search-page">
		<h1 class="visually-hidden">검색 페이지</h1>

		<template v-if="!loading">
			<!-- 검색 결과 -->
			<section class="search-page__movie-list" v-if="isSearchResult">
				<ul class="movie-list">
					<li
						v-for="(movie, index) in searchResult"
						:key="`${index}-${movie.id}`"
					>
						<MovieItem :movieData="movie"></MovieItem>
					</li>
				</ul>
				<InfiniteScroll @infinite="infiniteHandler" />
			</section>

			<!-- 검색 결과 없을 경우 -->
			<section
				class="search-page__no-result"
				v-else-if="totalPages !== null && !isSearchResult"
			>
				<div class="no-result">
					<h2>
						입력하신 검색어 <strong>"{{ query }}"</strong>(와)과
						일치하는 결과가 없습니다.
					</h2>
					<p>추천 검색어:</p>
					<ul>
						<li>다른 키워드를 입력해 보세요.</li>
						<li>TV 프로그램이나 영화를 찾고 있으신가요?</li>
						<li>
							영화 제목, TV 프로그램 제목, 또는 배우나 감독의
							이름으로 검색해 보세요.
						</li>
						<li>
							코미디, 로맨스, 스포츠 또는 드라마와 같은 장르명으로
							검색해보세요
						</li>
					</ul>
				</div>
			</section>
		</template>

		<!-- router-view -->
		<router-view v-slot="{ Component }">
			<transition name="modal" mode="out-in">
				<component :is="Component"></component>
			</transition>
		</router-view>
	</section>
</template>

<script>
// Utils
import { isString } from '@/utils/validate';
import debounce from '@/utils/common/debounce';

// Components
import MovieItem from '@/components/movie/MovieItem.vue';
import InfiniteScroll from '@/components/common/InfiniteScroll.vue';

// Vuex
import { createNamespacedHelpers, mapMutations } from 'vuex';

const searchModule = createNamespacedHelpers('search');

export default {
	name: 'search-page',

	components: {
		MovieItem,
		InfiniteScroll,
	},

	computed: {
		...searchModule.mapState([
			'totalPages',
			'searchResult',
			'loading',
			'page',
			'searchText',
		]),

		...searchModule.mapGetters(['isSearchResult', 'isMoreData']),

		/**
		 * @returns searchText
		 */
		query() {
			return this.searchText ? this.searchText.trim() : '';
		},
	},

	watch: {
		$route: {
			handler(newRoute, oldRoute) {
				if (oldRoute) return;

				// 페이지를 새로고침 했을 경우
				const { q } = newRoute.query;

				if (this.validateQuery(q)) {
					this.setSearchText(decodeURIComponent(q));
					this.openSearchForm();
				}
			},

			immediate: true,
		},

		query: {
			handler(newValue) {
				if (newValue.length) {
					this.setPage(1);
					this.debouncedFetchData(newValue);
				}
			},

			immediate: true,
		},
	},

	beforeUnmount() {
		// 페이지 데이터 초기화
		this.clearState();
	},

	methods: {
		...mapMutations(['openSearchForm']),

		...searchModule.mapActions([
			'searchMovie',
			'fetchMoreMovies',
			'clearState',
		]),
		...searchModule.mapMutations([
			'setLoading',
			'setPage',
			'increasePage',
			'setSearchText',
		]),

		// https://stackoverflow.com/questions/45178621/how-to-correctly-use-vue-js-watch-with-lodash-debounce
		debouncedFetchData: debounce(async function (query) {
			await this.fetchData(query);
		}),

		async fetchData(query) {
			try {
				this.setLoading(true);

				await this.searchMovie(query);
			} catch (error) {
				console.error(error.message);
			} finally {
				this.setLoading(false);
			}
		},

		// 인피니티 스크롤 API 요청 함수
		async fetchMoreData() {
			try {
				// 1. 페이지 1 증가
				this.increasePage();
				// 2. 스토어 액션 호출
				const results = await this.fetchMoreMovies(this.query);

				return results;
			} catch (error) {
				console.error(error.message);
				return [];
			}
		},

		validateQuery(value) {
			return isString(value) && value.length > 0;
		},

		async infiniteHandler(state) {
			try {
				const results = await this.fetchMoreData();

				if (results.length) {
					state.loaded();
				} else {
					state.complete();
				}
			} catch (error) {
				console.log(error.message);
			}
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/views/search-page.scss';

.spinner {
	margin: 0 auto;
}
</style>
