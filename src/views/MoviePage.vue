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
		<div class="movie-page__content"></div>
	</section>
</template>

<script>
import { watch } from 'vue';

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
		const {
			genres,
			selectedGenreId,
			selectedGenre,
			selectGenre,
			fetchGenres,
		} = genreListComposable();

		fetchGenres();

		watch(selectedGenreId, () => {
			// 여기서 url 변경
			// https://next.router.vuejs.org/guide/advanced/composition-api.html
			// 여기서 데이터 fetch
			console.log(selectedGenreId.value);
		});

		return {
			genres,
			selectedGenreId,
			selectedGenre,
			selectGenre,
		};
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/views/movie-page.scss';
</style>
