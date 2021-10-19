<template>
	<section class="movie-page">
		<h1 class="visually-hidden">영화 페이지</h1>

		<!-- header -->
		<header class="movie-page__header">
			<div class="movie-page__header__inner">
				<template v-if="selectedGenre">
					<a
						href="#"
						class="movie-page__home-link"
						@click.prevent="selectGenre(null)"
					>
						<span> 영화 </span>
					</a>
					<strong class="movie-page__current-genre">
						{{ selectedGenre.name }}
					</strong>
				</template>
				<template v-else>
					<h2 class="movie-page__title">영화</h2>

					<!-- 장르 선택 -->
					<GenreList
						:list="genres"
						:selectedId="selectedGenreId"
						@select-genre="selectGenre($event)"
					></GenreList>
				</template>
			</div>

			<Filter></Filter>
		</header>

		<!-- content -->
		<div class="movie-page__content">
			<template v-if="isMovieList">
				<ul class="movie-list">
					<li
						v-for="(movie, index) in movieList"
						:key="`${index}-${movie.id}`"
					>
						<MovieItem :movieData="movie"></MovieItem>
					</li>
				</ul>

				<InfiniteScroll @infinite="infiniteHandler" />
			</template>
		</div>
	</section>
</template>

<script>
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Composable
import genreListComposable from '@/composable/movie-page/genreList';
import discoverComposable from '@/composable/movie-page/discover';

// Components
import MovieItem from '@/components/movie/MovieItem.vue';
import InfiniteScroll from '@/components/common/InfiniteScroll.vue';
import GenreList from '@/components/movie-page/GenreList.vue';
import Filter from '@/components/movie-page/Filter.vue';

export default {
	name: 'movie-page',

	components: {
		MovieItem,
		InfiniteScroll,
		GenreList,
		Filter,
	},

	setup() {
		const programType = 'movie';
		const route = useRoute();
		const router = useRouter();

		const { genre } = route.query;

		// Genre Composable
		const {
			genres,
			selectedGenreId,
			selectedGenre,
			selectGenre,
			fetchGenres,
		} = genreListComposable(programType, Number(genre));

		// Discover Composable
		const {
			loadingDiscover,
			page,
			totalPages,
			movieList,
			isMovieList,

			discoverPrograms,
			discoverMorePrograms,
		} = discoverComposable(programType);

		// Watch Genre Id Update
		watch(selectedGenreId, () => {
			// genreId null값일 경우 예외처리
			const genre = selectedGenreId.value;
			const query = Object.assign({}, route.query);

			if (genre) {
				query.genre = genre;
			} else {
				delete query.genre;
			}

			// Clear page to 1
			page.value = 1;

			router.replace({
				query,
			});

			discoverPrograms(query, page.value);
		});

		// Watch Page Update
		// watch(page, () => {
		// 	const { query } = route;

		// 	discoverPrograms(query, page.value);
		// });

		fetchGenres();

		return {
			// Movie/Tv Data
			loadingDiscover,
			movieList,
			page,
			totalPages,
			isMovieList,

			// Genre Data
			genres,
			selectedGenreId,
			selectedGenre,

			// Functions
			selectGenre,
			discoverPrograms,
			discoverMorePrograms,
		};
	},

	created() {
		const { query } = this.$route;

		this.discoverPrograms(query, this.page);
	},

	methods: {
		async infiniteHandler(state) {
			const { query } = this.$route;
			this.page += 1;
			const results = await this.discoverMorePrograms(query, this.page);

			if (results.length) {
				state.loaded();
			} else {
				state.complete();
			}
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/views/movie-page.scss';
</style>
