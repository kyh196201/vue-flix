<template>
	<article class="movie-row">
		<div class="movie-row__inner">
			<!-- 제목 -->
			<div class="movie-row__title">{{ title }}</div>

			<!-- 영화 슬라이더 -->
			<div class="movie-row__slider">
				<div class="slider-container">
					<div class="slider-wrapper">
						<div
							class="slider-slide"
							v-for="(movie, index) in movies"
							:key="`${movie.id}-${index}`"
						>
							<MovieItem :movieData="movie"></MovieItem>
						</div>
					</div>
				</div>
			</div>
		</div>
	</article>
</template>

<script>
// Api
import { getMovieLists } from '@/api/movie.js';

// Components
import MovieItem from '@/components/movie/MovieItem.vue';

export default {
	name: 'home-movie-row',

	components: {
		MovieItem,
	},

	props: {
		title: {
			type: String,
			required: true,
		},

		releaseType: {
			type: String,
			reuiqred: true,
		},
	},

	data() {
		return {
			imageSrc:
				'https://image.tmdb.org/t/p/w780/8ChCpCYxh9YXusmHwcE9YzP0TSG.jpg',

			movies: [],

			page: 1,

			totalPages: 0,
		};
	},

	created() {
		this.fetchMovies();
	},

	methods: {
		async fetchMovies() {
			const result = await getMovieLists(this.releaseType, this.page);

			if (result.isError) {
				console.error(result.errorData);
				return;
			}

			const { results, total_pages } = result.data;

			this.totalPages = total_pages;
			this.movies.push(...results);
		},
	},
};
</script>

<style lang="scss" scoped>
.movie-row {
	// 이너

	// 제목
	&__title {
		margin-bottom: 0.7vw;
		padding: 0 4%;
		color: $white;
		font-size: 1.4vw;
		font-weight: 700;

		@include labtop {
			font-size: 12px;
			margin-bottom: 10px;
		}
	}

	// 슬라이더
	&__slider {
		.slider {
			// slider-container
			&-container {
				position: relative;
				padding: 0 4%;
			}

			// slider-wrapper
			&-wrapper {
				position: relative;
				width: 100%;
				display: flex;
			}

			// slider-slide
			&-slide {
				flex-shrink: 0;
				width: 20%;
				padding: 0 2.5px;

				// 뷰포트에 따른 슬라이드 너비
				@include labtop {
					width: 25%;
				}

				@include tablet {
					width: 33.33%;
				}

				@include mobile {
					width: 50%;
				}

				@include mobile-small {
					width: 100%;
				}
			}
		}
	}
}
</style>
