<template>
	<div class="media-item" :class="className">
		<a href="#" class="media-item__link" @click.prevent="handleClick">
			<figure class="media-item__image" :data-media-title="title">
				<img v-if="useLazy" v-lazy-image="posterImage" :alt="title" />
				<img
					v-else
					:src="posterImage"
					:alt="title"
					@error="onImageError"
				/>
			</figure>
		</a>
	</div>
</template>

<script>
import { toRefs, computed } from 'vue';

// Composable
import movieItemComposable from '@/composable/movie/movieItem';
import tvItemComposable from '@/composable/tv/tvItem';

// Utils
import { IMAGE_TYPES } from '@/utils/common/constants';

export default {
	name: 'media-item',

	props: {
		mediaType: {
			type: String,
			default: 'movie',
		},

		/**
		 * 영화 데이터
		 */
		mediaData: {
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
		const { mediaData, imageType, mediaType } = toRefs(props);

		let state = {};

		if (mediaType.value === 'movie') {
			const { posterImage, title } = movieItemComposable(
				mediaData.value,
				imageType.value,
			);

			state = {
				...state,
				posterImage,
				title,
			};
		} else if (mediaType.value === 'tv') {
			const { posterImage, title } = tvItemComposable(
				mediaData.value,
				imageType.value,
			);

			state = {
				...state,
				posterImage,
				title,
			};
		}

		const className = computed(() => {
			return mediaType.value;
		});

		return {
			...state,
			className,
		};
	},

	methods: {
		onImageError() {
			this.$el.classList.add('error');
		},

		// click event handler
		// FIXME 추후에 다른 url에서 사용할 경우 에러 발생할 우려 있음
		handleClick() {
			const { id } = this.mediaData;

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
.media-item {
	&__image {
		overflow: hidden;
		position: relative;
		width: 100%;
		padding-bottom: 56.25%;
		border-radius: 5px;
		background-color: $media-item-background-color;

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
		.media-item {
			&__image {
				&::after {
					content: attr(data-media-title);
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
