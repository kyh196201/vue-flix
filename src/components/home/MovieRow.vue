<template>
	<article class="movie-row">
		<div class="movie-row__inner">
			<!-- 제목 -->
			<div class="movie-row__title">
				<span class="title">
					{{ title }}
				</span>
			</div>

			<!-- 영화 슬라이더 -->
			<div class="movie-row__slider">
				<div class="slider-container">
					<template v-if="movies.length">
						<swiper
							v-bind="swiperOptions"
							class="movie-swiper"
							:class="swiperClass"
							@swiper="onSwiperReady"
							@observerUpdate="onSwiperUpdate"
							@mouseenter="handleMouseEnterSwiper"
							@mouseleave="handleMouseLeaveSwiper"
						>
							<swiper-slide
								v-for="(movie, index) in movies"
								:key="`${movie.id}-${index}`"
							>
								<MovieItem :movieData="movie"></MovieItem>
							</swiper-slide>
						</swiper>
					</template>
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

import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

SwiperCore.use([Pagination, Navigation]);

// Import Swiper styles
import 'swiper/swiper.scss';

export default {
	name: 'home-movie-row',

	components: {
		Swiper,
		SwiperSlide,
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
			loading: false,

			movies: [],

			page: 1,

			totalPages: 0,

			// swiper instance
			$swiper: null,

			// swiper mouseEnter 여부
			isHover: false,

			// Swiper 옵션
			swiperOptions: {
				// 루프
				// loop: true,

				// loop와 slidesPerGroup를 같이 사용하기 위한 옵션
				// loopFillGroupWithBlank: true,

				observer: true,

				// 네비게이션
				navigation: true,

				// 페이지네이션
				pagination: true,

				slidesPerView: 6,
				slidesPerGroup: 6,
				spaceBetween: 10,
				// 반응형 breakpoints
				breakpoints: {
					375: {
						slidesPerView: 1,
						slidesPerGroup: 1,
					},
					425: {
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
					768: {
						slidesPerView: 3,
						slidesPerGroup: 3,
					},
					1024: {
						slidesPerView: 4,
						slidesPerGroup: 4,
					},
					1400: {
						slidesPerView: 5,
						slidesPerGroup: 5,
					},
				},
			},
		};
	},

	computed: {
		/**
		 * @returns {Object} movie-swiper 추가되는 클래스
		 */
		swiperClass() {
			return {
				'movie-swiper--active': this.isHover,
			};
		},
	},

	created() {
		this.init();
	},

	methods: {
		async init() {
			this.loading = true;
			await this.fetchMovies();
			this.loading = false;
		},

		/**
		 * releaseType에 따라 영화 데이터 조회
		 */
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

		// set swiper instance
		onSwiperReady(swiper) {
			this.$swiper = swiper;
		},

		// Ref: swiper observerUpdate events
		onSwiperUpdate(swiper) {
			swiper.update();
		},

		/**
		 * swiper mouseenter 이벤트 핸들러
		 */
		handleMouseEnterSwiper() {
			this.isHover = true;
		},

		/**
		 * swiper mouseleave 이벤트 핸들러
		 */
		handleMouseLeaveSwiper() {
			this.isHover = false;
		},
	},
};
</script>

<style lang="scss">
@import 'swiper/components/pagination/pagination.scss';
@import 'swiper/components/navigation/navigation.scss';

// movie-swiper
.movie-swiper {
	// swiper
	.swiper {
		// pagination
		&-pagination {
			&-bullets {
				display: flex;
				bottom: auto;
				left: auto;
				top: -10px;
				right: 4%;
				width: auto;
				height: auto;
				opacity: 0;
			}

			// bullet 스타일
			&-bullet {
				width: 10px;
				height: 2px;
				border-radius: 1px;
				margin: 0 1px !important;
				background-color: $white;
				opacity: 0.3;

				// bullet active 스타일
				&-active {
					opacity: 1;
				}
			}
		}
		// pagination End

		// navigation button 스타일
		&-button {
			&-prev,
			&-next {
				top: 0;
				bottom: 0;
				margin: 0;
				background-color: $black;
				opacity: 0;
				width: 4%;
				height: auto;
			}

			// prev button 스타일
			&-prev {
				left: 0;
			}

			// next button 스타일
			&-next {
				right: 0;
			}
		}
	}
	// swiper End

	// movie-swiper에 마우스 오버시 스타일
	&.movie-swiper--active {
		.swiper {
			// pagination
			&-pagination {
				&-bullets {
					opacity: 1;
				}
			}
			// pagination End

			// navigation
			&-button {
				&-prev,
				&-next {
					opacity: 0.7;

					&:hover {
						opacity: 1;
					}
				}
			}
		}
	}
}
</style>

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
			&-container {
				overflow: hidden;
				position: relative;
				padding-top: 10px;

				.movie-swiper {
					overflow: visible;
					padding: 0 4%;
				}
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
