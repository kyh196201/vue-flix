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
				<div
					class="observe-target"
					ref="observe-target"
					v-if="isMoreData"
				>
					<Spinner />
				</div>
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
import Spinner from '@/components/common/Spinner.vue';

// Vuex
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions, mapMutations, mapGetters } =
	createNamespacedHelpers('search');

export default {
	name: 'search-page',

	components: {
		MovieItem,
		Spinner,
	},

	computed: {
		...mapState(['totalPages', 'searchResult', 'loading', 'page']),

		...mapGetters(['isSearchResult', 'isMoreData']),

		/**
		 * @returns $route.query.q
		 */
		query() {
			const { q } = this.$route.query;

			if (this.validateQuery(q)) {
				return decodeURIComponent(q);
			}

			return '';
		},
	},

	watch: {
		$route: {
			handler() {
				if (this.query === '') return;

				this.setPage(1);

				this.debouncedFetchData(this.query);
			},

			immediate: true,
		},
	},

	methods: {
		...mapActions(['searchMovie', 'fetchMoreMovies']),
		...mapMutations(['setLoading', 'setPage', 'increasePage']),

		// https://stackoverflow.com/questions/45178621/how-to-correctly-use-vue-js-watch-with-lodash-debounce
		debouncedFetchData: debounce(async function (query) {
			await this.fetchData(query);

			// 1. 검색이 완료되고 검색 결과가 있으면
			const $observeTarget = this.$refs['observe-target'];

			if ($observeTarget) {
				// 2. 인터섹션 옵저버 인스턴스 생성
				// FIXME 옵저버 컴포넌트 만들기
				const observer = new IntersectionObserver(
					async ([entry], observer) => {
						const { isIntersecting, intersectionRatio } = entry;

						// 3. 영역이 보이면 데이터 요청
						if (isIntersecting) {
							const results = await this.fetchMoreData();

							if (!results.length) {
								// 검색 결과가 빈 배열이면(다음 페이지의 데이터가 없으면) 옵저버 감지 멈춤
								observer.disconnect();
								return false;
							}

							// 데이터를 요청한 후에도 target 엘리먼트가 계속해서 보일 경우
							this.$nextTick(() => {
								const threshold = 0.5;
								if (intersectionRatio >= threshold) {
									this.fetchMoreData();
								}
							});
						}
					},
					{ threshold: 0.5 },
				);

				observer.observe($observeTarget);
			}
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
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/views/search-page.scss';

.spinner {
	margin: 0 auto;
}
</style>
