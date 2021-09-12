<template>
	<div class="movie-item">
		<a href="#" class="movie-item__link" @click.prevent="handleClick">
			<figure class="movie-item__image" :data-movie-title="movieTitle">
				<img
					v-if="useLazy"
					:data-src="posterImage"
					:alt="movieTitle"
					class="lazy"
					@error="onImageError"
					ref="lazy-img"
				/>
				<img
					:src="posterImage"
					:alt="movieTitle"
					@error="onImageError"
					v-else
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

// Observer
import MyObserver from '@/utils/observer';

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

	data() {
		return {
			$observer: null,
		};
	},

	created() {
		if (this.useLazy) {
			this.createObserver();
		}
	},

	mounted() {
		if (this.$observer instanceof MyObserver) {
			this.$observer.observe(this.$el);
		}
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

		createObserver() {
			this.$observer = new MyObserver(this.handleIntersect.bind(this));
		},

		// observe 핸들러

		handleIntersect(entries, observer) {
			const [entry] = entries;
			const { isIntersecting, target } = entry;

			if (isIntersecting) {
				const $lazyImg = this.$refs['lazy-img'];
				const imageUrl = $lazyImg.dataset.src;
				$lazyImg.setAttribute('src', imageUrl);
				$lazyImg.classList.remove('lazy');
				observer.unobserve(target);
			}
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
				text-indent: -9999px;
				background-image: linear-gradient(
					$skeleton-color 100%,
					transparent 0
				);
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
