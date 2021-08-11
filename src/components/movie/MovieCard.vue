<template>
	<article class="movie-card">
		<a href="#">
			<div class="movie-card__inner">
				<!-- backdrop-image -->
				<section class="movie-card__backdrop-image">
					<figure class="backdrop-image">
						<img :src="posterImage" :alt="movieTitle" />
					</figure>
					<p class="run-time">
						{{ runTime }}
					</p>
					<p class="movie-title">
						{{ movieTitle }}
					</p>
				</section>
				<section class="movie-card__info">
					<div class="movie-card__info__top">
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
// Composable
import movieItemComposable from '@/composable/movieItem';

// Utils
import { IMAGE_TYPES } from '@/utils/common/constants';

export default {
	name: 'movie-card',

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
		const {
			isMovieData,
			movieTitle,
			posterImage,
			overview,
			releaseDate,
			runTime,
		} = movieItemComposable(props);

		return {
			isMovieData,
			movieTitle,
			posterImage,
			overview,
			releaseDate,
			runTime,
		};
	},
};
</script>

<style lang="scss">
.movie-card {
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

			// img
			img {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: auto;
				max-height: 100%;
			}
		}

		// run-time
		.run-time,
		.movie-title {
			position: absolute;
		}

		.run-time {
			top: 1rem;
			right: 1rem;
			letter-spacing: 0.1rem;
		}

		// movie-title
		.movie-title {
			overflow: hidden;
			bottom: 1rem;
			left: 0;
			max-width: 100%;
			padding: 0 1rem;
			font-size: 2rem;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}

	// info
	&__info {
		position: relative;
		background-color: $movie-card-background-color;
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
			color: $movie-card-synopsis-color;

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
