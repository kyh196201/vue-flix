<template>
	<div class="movie-item">
		<a href="#" class="movie-item__link" @click.prevent="handleClick">
			<figure class="movie-item__image" :data-movie-title="movieTitle">
				<img
					v-if="useLazy"
					v-lazy-image="posterImage"
					:alt="movieTitle"
				/>
				<img
					v-else
					:src="posterImage"
					:alt="movieTitle"
					@error="onImageError"
				/>
			</figure>
		</a>
	</div>
</template>

<script>
// Composable
import movieItemComposable from '@/composable/movieItem';

// Utils
import { IMAGE_TYPES } from '@/utils/common/constants';

export default {
	name: 'movie-item',

	props: {
		/**
		 * 영화 데이터
		 */
		movieData: {
			type: Object,
			required: true,
		},

		/**
		 * 레이지 로딩 사용 여부
		 */
		useLazy: {
			type: Boolean,
			default: true,
		},

		/**
		 * image type
		 */
		imageType: {
			type: String,
			default: IMAGE_TYPES.backdrop,
		},
	},

	setup(props) {
		const { isMovieData, posterImage, movieTitle } =
			movieItemComposable(props);

		return {
			isMovieData,
			posterImage,
			movieTitle,
		};
	},

	methods: {
		onImageError() {
			this.$el.classList.add('error');
		},

		// click event handler
		// FIXME 추후에 다른 url에서 사용할 경우 에러 발생할 우려 있음
		handleClick() {
			const { id } = this.movieData;

			const { path, query } = this.$route;
			const url = path === '/' ? `detail/${id}` : `/detail/${id}`;
			const targetPath = path + url;

			this.$router.push({
				path: targetPath,
				query,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.movie-item {
	&__image {
		overflow: hidden;
		position: relative;
		width: 100%;
		padding-bottom: 56.25%;
		border-radius: 5px;
		background-color: $movie-item-background-color;

		img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: auto;
			max-height: 100%;
			border: none;

			&.lazy {
				opacity: 0;
				text-indent: -9999px;
				// background-image: linear-gradient(
				// 	$skeleton-color 100%,
				// 	transparent 0
				// );
			}
		}
	}

	// 이미지 로딩 에러
	&.error {
		.movie-item {
			&__image {
				&::after {
					content: attr(data-movie-title);
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					font-size: 12px;
					line-height: 1.2;
				}

				img {
					visibility: hidden !important;
				}
			}
		}
	}
}
</style>
