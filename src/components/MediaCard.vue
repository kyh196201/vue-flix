<template>
	<article class="media-card" :class="cardClassName">
		<a href="#">
			<div class="media-card__inner">
				<!-- backdrop-image -->
				<section class="media-card__backdrop-image">
					<figure class="backdrop-image">
						<img :src="posterImage" :alt="title" />
					</figure>
					<p class="run-time" v-if="runTime">
						{{ runTime }}
					</p>
					<p class="media-title">
						{{ title }}
					</p>
				</section>
				<section class="media-card__info">
					<div class="media-card__info__top">
						<span class="age-badge"></span>
						<span class="release-date">
							{{ releaseDate }}
						</span>
					</div>
					<div class="synopsis">
						{{ overview }}
					</div>
					<button type="button" class="btn btn--user">
						<font-awesome-icon
							class="btn__icon"
							:icon="['fas', 'plus']"
						></font-awesome-icon>
						<span class="btn__title">찜하기</span>
					</button>
				</section>
			</div>
		</a>
	</article>
</template>

<script>
import { toRefs, computed } from 'vue';

// Composable
import movieItemComposable from '@/composable/movie/movieItem';
import tvItemComposable from '@/composable/tv/tvItem';

// Utils
import { IMAGE_TYPES } from '@/utils/common/constants';

export default {
	name: 'media-card',

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
			const { title, posterImage, overview, releaseDate, runTime } =
				movieItemComposable(mediaData.value, imageType.value);

			state = {
				...state,
				title,
				posterImage,
				overview,
				releaseDate,
				runTime,
			};
		} else if (mediaType.value === 'tv') {
			const { title, posterImage, overview, firstAirDate, runTime } =
				tvItemComposable(mediaData.value, imageType.value);

			state = {
				...state,
				title,
				posterImage,
				overview,
				runTime,
				releaseDate: firstAirDate,
			};
		}

		const cardClassName = computed(() => {
			return mediaType.value;
		});

		return {
			...state,
			cardClassName,
		};
	},
};
</script>

<style lang="scss">
.media-card {
	// inner
	&__inner {
		overflow: hidden;
		border-radius: 4px;
	}

	// backdrop-image
	&__backdrop-image {
		position: relative;

		.backdrop-image {
			padding-top: 56.25%;
			background-color: $media-item-background-color;

			// img
			img {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: auto;
				max-height: 100%;

				&.lazy {
					opacity: 0;
					text-indent: -9999px;
				}
			}
		}

		// run-time
		.run-time,
		.media-title {
			position: absolute;
		}

		.run-time {
			top: 1rem;
			right: 1rem;
			letter-spacing: 0.1rem;
		}

		// media-title
		.media-title {
			overflow: hidden;
			bottom: 1rem;
			left: 0;
			max-width: 100%;
			padding: 0 1rem;
			font-size: 2rem;
			line-height: 1.3;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}

	// info
	&__info {
		position: relative;
		background-color: $media-card-background-color;
		padding: 2rem 1rem;

		// info__top
		&__top {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			margin-bottom: 2rem;

			& > span {
				&:not(:last-child) {
					margin-right: 0.8rem;
				}
			}
		}

		// synopsis
		.synopsis {
			font-size: 1.4rem;
			color: $media-card-synopsis-color;

			@include ellipsis(10);
		}

		// plus/minus btn
		.btn--user {
			position: absolute;
			top: 2rem;
			right: 1rem;
			font-size: 1.5rem;

			&:hover {
				border-color: $white;
			}
		}
	}
}
</style>
