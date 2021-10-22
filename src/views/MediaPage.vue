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
						<span> {{ pageTitle }} </span>
					</a>
					<strong class="movie-page__current-genre">
						{{ selectedGenre.name }}
					</strong>
				</template>
				<template v-else>
					<h2 class="movie-page__title">{{ pageTitle }}</h2>

					<!-- 장르 선택 -->
					<GenreList
						:list="genres"
						:selectedId="selectedGenreId"
						@select-genre="selectGenre($event)"
					></GenreList>
				</template>
			</div>

			<Filter
				:filters="filters"
				:selectedId="selectedFilterId"
				@select-filter="selectFilter($event)"
			></Filter>
		</header>

		<!-- content -->
		<Spinner v-if="loadingDiscover" class="movie-page__spinner" />
		<div class="movie-page__content" v-else>
			<template v-if="isMovieList">
				<ul class="movie-list">
					<li
						v-for="(movie, index) in movieList"
						:key="`${index}-${movie.id}`"
					>
						<MediaItem
							:mediaType="mediaType"
							:mediaData="movie"
						></MediaItem>
					</li>
				</ul>

				<InfiniteScroll @infinite="infiniteHandler" />
			</template>
		</div>
	</section>

	<!-- router-view -->
	<router-view v-slot="{ Component }">
		<transition name="modal" mode="out-in">
			<component :is="Component"></component>
		</transition>
	</router-view>
</template>

<script>
import { computed, watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Composable
import genreListComposable from '@/composable/movie-page/genreList';
import discoverComposable from '@/composable/movie-page/discover';
import filterComposable from '@/composable/movie-page/filter';

// Components
import Spinner from '@/components/common/loading/Spinner.vue';
import MediaItem from '@/components/MediaItem.vue';
import InfiniteScroll from '@/components/common/InfiniteScroll.vue';
import GenreList from '@/components/movie-page/GenreList.vue';
import Filter from '@/components/movie-page/Filter.vue';

export default {
	name: 'media-page',

	components: {
		Spinner,
		MediaItem,
		InfiniteScroll,
		GenreList,
		Filter,
	},

	setup() {
		const route = useRoute();
		const router = useRouter();
		const mediaType = ref(route.meta.mediaType || 'movie');

		const { genre, filter } = route.query;

		// Genre Composable
		const {
			genres,
			selectedGenreId,
			selectedGenre,
			selectGenre,
			fetchGenres,
		} = genreListComposable(mediaType.value, Number(genre));

		// Filter Composable
		const { filters, selectedFilter, selectedFilterId, selectFilter } =
			filterComposable(filter);

		// Discover Composable
		const {
			loadingDiscover,
			page,
			totalPages,
			movieList,
			isMovieList,

			discoverPrograms,
			discoverMorePrograms,
		} = discoverComposable(mediaType.value);

		const queries = computed(() => {
			return {
				genre: selectedGenreId.value,
				filter: selectedFilter.value.queryValue,
			};
		});

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

			discoverPrograms(queries.value, page.value);
		});

		// Watch Filter Id Update
		watch(selectedFilterId, () => {
			const filter = selectedFilter.value?.id;
			const query = Object.assign({}, route.query);

			if (filter) {
				query.filter = filter;
			} else {
				delete query.filter;
			}

			page.value = 1;

			router.replace({
				query,
			});

			discoverPrograms(queries.value, page.value);
		});

		fetchGenres();

		return {
			mediaType,
			queries,

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

			// Filter Data
			filters,
			selectedFilter,
			selectedFilterId,

			// Functions
			selectGenre,
			selectFilter,
			discoverPrograms,
			discoverMorePrograms,
		};
	},

	computed: {
		pageTitle() {
			return this.mediaType === 'movie' ? '영화' : 'TV';
		},
	},

	created() {
		this.discoverPrograms(this.queries, this.page);
	},

	methods: {
		async infiniteHandler(state) {
			this.page += 1;
			const results = await this.discoverMorePrograms(
				this.queries,
				this.page,
			);

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
