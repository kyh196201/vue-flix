<template>
	<section class="movie-page">
		<h1 class="visually-hidden">영화 페이지</h1>

		<!-- header -->
		<header class="movie-page__header">
			<div class="movie-page__header__inner">
				<template v-if="true">
					<h2 class="movie-page__title">영화</h2>

					<!-- 장르 선택 -->
					<GenreList
						:list="genres"
						:selectedId="selectedGenreId"
						@select-genre="selectGenre($event)"
					></GenreList>
				</template>
				<template v-else>
					<a href="#" class="movie-page__home-link">
						<span> 영화 </span>
					</a>
					<strong class="movie-page__current-genre">
						미국 영화
					</strong>
				</template>
			</div>

			<Filter></Filter>
		</header>

		<!-- content -->
		<div class="movie-page__content"></div>
	</section>
</template>

<script>
// Composable
import genreListComposable from '@/composable/movie-page/genreList';

// Components
import GenreList from '@/components/movie-page/GenreList.vue';
import Filter from '@/components/movie-page/Filter.vue';

export default {
	name: 'movie-page',

	components: {
		GenreList,
		Filter,
	},

	setup() {
		const { genres, selectedGenreId, selectGenre, fetchGenres } =
			genreListComposable();

		fetchGenres();

		return {
			genres,
			selectedGenreId,
			selectGenre,
		};
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/views/movie-page.scss';
</style>
