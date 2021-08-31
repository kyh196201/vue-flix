<template>
	<section class="search-page">
		<h1 class="visually-hidden">검색 페이지</h1>

		<template v-if="!loading">
			<!-- 검색 결과 -->
			<section class="search-page__movie-list" v-if="isMovieList">
				<ul class="movie-list">
					<li
						v-for="(movie, index) in movieList"
						:key="`${index}-${movie.id}`"
					>
						<MovieItem :movieData="movie"></MovieItem>
					</li>
				</ul>
			</section>

			<!-- 검색 결과 없을 경우 -->
			<section
				class="search-page__no-result"
				v-else-if="searchFlag && !isMovieList"
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
// Api
import { searchMovie } from '@/api/search';

// Utils
import { isString } from '@/utils/validate';

// Components
import MovieItem from '@/components/movie/MovieItem.vue';

export default {
	name: 'search-page',

	components: {
		MovieItem,
	},

	data() {
		return {
			message: 'This is Search page.',

			movieList: [],

			pagination: {
				totalPages: 0,
				totalResults: 0,
				page: 1,
			},

			loading: false,

			// 검색했는지 여부 판단 변수
			// FIXME: 더 좋은 방법 있는지 찾아보기
			searchFlag: false,
		};
	},

	computed: {
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

		isMovieList() {
			return this.movieList.length > 0;
		},
	},

	watch: {
		$route: {
			handler() {
				if (!this.query) return;

				this.fetchData();
			},
			immediate: true,
		},
	},

	methods: {
		async fetchData() {
			this.loading = true;

			const { page } = this.pagination;

			const result = await searchMovie(this.query, page);

			if (result.isError) {
				console.log(result.errorData.message);
			} else {
				const { total_pages, total_results, results } = result.data;

				this.pagination.totalPages = total_pages;
				this.pagination.totalResults = total_results;
				this.movieList = results;
			}

			this.loading = false;
			this.searchFlag = true;
		},

		validateQuery(value) {
			return isString(value) && value.length > 0;
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/views/search-page.scss';
</style>
