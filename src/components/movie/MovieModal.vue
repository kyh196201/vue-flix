<template>
	<Modal class="movie-modal" @close="handleClose" v-bind="modalOption">
		<template v-slot:body>
			<section class="movie-modal__body">
				<h2 class="visually-hidden">영화 상세 모달</h2>
				<!-- billboard -->
				<section class="movie-modal__billboard">
					<div class="billboard__back">
						<!-- 포스터 -->
						<figure class="billboard__poster">
							<img
								v-if="movieData"
								:src="backdropImage"
								:alt="movieData.title"
								@error="onImageError"
							/>
						</figure>

						<!-- 비디오 -->
					</div>
					<div class="billboard__front">
						<div class="billboard__info" v-if="movieData">
							<!-- 제목 -->
							<div class="billboard__title">
								{{ movieData.title }}
							</div>

							<!-- 버튼 -->
							<div class="billboard__interface">
								<ul class="billboard__buttons">
									<li>
										<button
											type="button"
											class="btn btn--play"
										>
											<font-awesome-icon
												class="btn__icon"
												:icon="['fas', 'play']"
											></font-awesome-icon>
											<span class="btn__title">재생</span>
										</button>
									</li>
									<!-- +, 좋아요, 싫어요 버튼 -->
									<li>
										<button
											type="button"
											class="btn btn--user"
										>
											<font-awesome-icon
												class="btn__icon"
												:icon="['fas', 'plus']"
											></font-awesome-icon>
											<span class="btn__title"
												>찜하기</span
											>
										</button>
									</li>
									<li>
										<button
											type="button"
											class="btn btn--user btn--like"
										>
											<font-awesome-icon
												class="btn__icon"
												:icon="['fas', 'thumbs-up']"
											></font-awesome-icon>
											<span class="btn__title"
												>좋아요</span
											>
										</button>
									</li>
									<li>
										<button
											type="button"
											class="btn btn--user btn--dislike"
										>
											<font-awesome-icon
												class="btn__icon"
												:icon="['fas', 'thumbs-down']"
											></font-awesome-icon>
											<span class="btn__title"
												>마음에 안들어요</span
											>
										</button>
									</li>
								</ul>
								<button class="btn btn--user">
									<font-awesome-icon
										class="btn__icon"
										:icon="['fas', 'volume-mute']"
									></font-awesome-icon>
								</button>
							</div>
						</div>
					</div>
				</section>

				<!-- main -->
				<section class="movie-modal__main">
					<h3 class="visually-hidden">영화 상세 메인 영역</h3>
					<!-- main > info -->
					<section class="movie-modal__movie-info">
						<div class="movie-info__left">
							<div class="movie-info__basic">
								<SkeletonBox :width="'50%'" v-if="isLoading" />
								<template v-else-if="isMovieDataLoaded">
									<span class="release-date">{{
										releaseDate
									}}</span>
									<span class="age-badge"></span>
									<span class="run-time">
										{{ runTime }}
									</span>
								</template>
							</div>
							<div class="movie-info__synopsis">
								<SkeletonBox
									:height="'10rem'"
									v-if="isLoading"
								/>
								<p
									class="synopsis"
									v-else-if="!isLoading && overview"
								>
									{{ overview }}
								</p>
							</div>
						</div>
						<div class="movie-info__right">
							<SkeletonList v-if="isLoading" :rows="2" />
							<template v-else>
								<div class="info-row" v-if="castList.length">
									<span class="info-row__title">출연</span>
									<ul class="info-row__list">
										<li
											class="info-row__item"
											v-for="cast in castList"
											:key="`cast-${cast.id}`"
										>
											<span>{{ cast.name }}</span>
										</li>
										<li class="info-row__item">
											<a
												href="#"
												class="info-row__more-btn"
											>
												더 보기
											</a>
										</li>
									</ul>
								</div>
								<div class="info-row" v-if="false">
									<span class="info-row__title"
										>프로그램 특징</span
									>
									<ul class="info-row__list">
										<li class="info-row__item">
											<span>긴장감 넘치는</span>
										</li>
									</ul>
								</div>

								<!-- 장르 -->
								<div class="info-row" v-if="isGenres">
									<span class="info-row__title">장르</span>
									<ul class="info-row__list">
										<li
											class="info-row__item"
											v-for="genre in movieData.genres"
											:key="`genre-${genre.id}`"
										>
											<span>{{ genre.name }}</span>
										</li>
									</ul>
								</div>
							</template>
						</div>
					</section>

					<!-- main > similar -->
					<section class="movie-modal__similar-contents">
						<h3>비슷한 콘텐츠</h3>

						<section
							class="similar-contents"
							:class="{ opened: isSimilarContentsOpened }"
						>
							<div class="similar-contents__inner">
								<ul
									class="similar-contents__list"
									v-if="!isSimilarContentsLoaded"
								>
									<li
										class="similar-contents__item"
										v-for="i in 6"
										:key="i"
									>
										<SkeletonBox
											height="30rem"
										></SkeletonBox>
									</li>
								</ul>
								<ul
									class="similar-contents__list"
									v-else-if="
										isSimilarContentsLoaded &&
										isSimilarContents
									"
								>
									<li
										class="similar-contents__item"
										v-for="media in similarContents"
										:key="`similar-${media.id}`"
									>
										<MediaCard
											:mediaData="media"
										></MediaCard>
									</li>
								</ul>
							</div>
						</section>
						<!-- caret-up, down -->
						<label class="btn btn--user btn--fold">
							<input
								type="checkbox"
								v-model="isSimilarContentsOpened"
							/>
							<font-awesome-icon
								class="btn__icon"
								:icon="foldBtnIcon"
							></font-awesome-icon>
							<span class="btn__title">찜하기</span>
						</label>
					</section>

					<!-- main > detail -->
					<!-- <section class="movie-modal__detail">detail</section> -->
				</section>
			</section>
		</template>
	</Modal>
</template>

<script>
// Mixin
import movieDetailMixin from '@/mixins/movie';

// Component
import Modal from '@/components/common/Modal.vue';
import SkeletonBox from '@/components/common/loading/SkeletonBox.vue';
import SkeletonList from '@/components/common/loading/SkeletonList.vue';
import MediaCard from '@/components/MediaCard.vue';

export default {
	name: 'MovieModal',

	extends: movieDetailMixin,

	components: {
		Modal,
		SkeletonBox,
		SkeletonList,
		MediaCard,
	},

	data() {
		return {
			isSimilarContentsOpened: false,

			modalOption: {
				isOpen: true,
			},
		};
	},

	computed: {
		/**
		 * 비슷한 콘텐츠 fold 버튼 font-awesome 아이콘
		 * @returns array
		 */
		foldBtnIcon() {
			const icon = this.isSimilarContentsOpened
				? 'caret-up'
				: 'caret-down';

			return ['fas', icon];
		},
	},

	methods: {
		// close 이벤트 emit
		handleClose() {
			this.$router.back();
		},

		// 데이터 fetch
		async fetchData() {
			this.fetchMovieDetail();
			this.fetchMovieCredits();
			this.fetchSimilarMovies();
		},

		// 이미지 로드 에러
		onImageError(event) {
			event.target.style.visibility = 'hidden';
		},
	},
};
</script>

<style lang="scss">
$modal-padding: 48px;

.movie-modal {
	&.modal-mask {
		padding: 30px 0;
	}

	.modal {
		// 컨테이너
		&-container {
			overflow: hidden;
			align-self: flex-start;
			width: 90vw;
			max-width: 1200px;
			height: auto;
			background-color: $modal-color;
			border-radius: 12px;
		}

		// close 버튼
		&__close-btn {
			top: 10px;
			right: 10px;
			z-index: 10;
		}
	}

	// 빌보드
	&__billboard {
		position: relative;
		width: 100%;
		padding-top: 56.25%;

		.billboard {
			&__back,
			&__front {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
			}

			&__back {
				height: 100%;
				z-index: 0;
			}

			// poster
			&__poster {
				width: 100%;
				height: 100%;
				background-color: $media-item-background-color;

				img {
					display: block;
					width: 100%;
					height: auto;
				}
			}

			// front
			&__front {
				height: 100%;
				background: linear-gradient(to top, #181818, transparent 50%);
			}

			// billboard > info
			&__info {
				position: absolute;
				left: 0;
				bottom: 50px;
				width: 100%;
				padding: 0 $modal-padding;
			}

			// billboard > title
			&__title {
				width: 70%;
				font-size: 50px;
				line-height: 1.2;
				color: $white;
				@include ellipsis(2);
			}

			// billboard > interface
			&__interface {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 20px;

				.btn {
					transition: all 0.2s ease;

					&--play {
						height: 42px;
						padding: 0 22px;

						&:hover {
							opacity: 0.7;
						}

						.btn__icon {
							margin-right: 0.4em;
						}

						@include labtop {
							height: 32px;
						}

						@include tablet {
							padding: 0 10px;
						}
					}

					&--user {
						width: 42px;
						height: 42px;
						font-size: 21px;

						&:hover {
							border-color: $white;
						}

						@include labtop {
							width: 32px;
							height: 32px;
							font-size: 16px;
						}
					}
				}
			}

			// billboard > buttons
			&__buttons {
				display: flex;
				align-items: center;
				justify-content: flex-start;

				li {
					&:not(:last-child) {
						margin-right: 10px;

						@include labtop {
							margin-right: 5px;
						}
					}
				}
			}
		}
	}

	// main
	&__main {
		position: relative;
		padding: 12px $modal-padding 10px;
		background-color: $modal-color;
	}

	// main > movie-info
	&__movie-info {
		display: flex;
		margin-bottom: 50px;

		.movie-info {
			&__left {
				width: 60%;
				margin-right: 5%;
			}

			&__right {
				width: 35%;
				font-size: 14px;
			}

			&__basic {
				display: flex;
				align-items: center;
				margin-bottom: 18px;
				font-size: 16px;

				& > span {
					&:not(:last-child) {
						margin-right: 10px;
					}
				}
			}

			&__synopsis {
				.synopsis {
					font-size: 18px;
				}
			}
		}
	}

	// similar-contents
	&__similar-contents {
		position: relative;
		margin-bottom: 3rem;
		border-bottom: 1.5px solid rgba(255, 255, 255, 0.45);

		h3 {
			margin-bottom: 2.5rem;
			font-size: 2.75rem;
			line-height: 1em;
			font-weight: 500;
		}

		.similar-contents {
			overflow: hidden;
			max-height: 90rem;

			&.opened {
				max-height: none;
			}

			&:not(.opened) {
				position: relative;

				&:after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					height: 5rem;
					background: linear-gradient(to top, #181818, transparent);
					z-index: 1;
				}
			}

			// inner
			&__inner {
				padding-bottom: 8rem;
			}

			// list
			&__list {
				display: grid;
				column-gap: 2rem;
				row-gap: 2rem;
				grid-template-columns: repeat(3, 1fr);

				@include tablet {
					column-gap: 1.6rem;
					row-gap: 1.6rem;
					grid-template-columns: repeat(2, 1fr);
				}

				@include mobile {
					display: flex;
					flex-direction: column;
					column-gap: 0;
					row-gap: 0;
				}
			}

			&__item {
				@include mobile {
					&:not(:last-child) {
						margin-bottom: 1.6rem;
					}
				}

				.skeleton-box {
					border-radius: 4px;
				}

				.media-card {
					height: 100%;

					&__inner {
						display: flex;
						flex-direction: column;
						height: 100%;
					}

					&__backdrop-image {
						flex: 0;
					}

					&__info {
						flex: 1;
					}
				}
			}
		}

		// fold/unfold btn
		.btn--fold {
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translate(-50%, 50%);
			width: 6rem;
			height: 6rem;
			z-index: 1;

			input {
				display: none;
			}

			&:hover {
				border-color: white;
			}
		}
	}
}

@include mobile {
	.movie-modal {
		&.modal-mask {
			padding: 0;
		}

		.modal {
			&-container {
				width: 100vw;
				min-height: 100vh;
				margin: 0;
				border-radius: 0;
			}
		}

		&__movie {
			&-info {
				flex-direction: column;

				.movie-info {
					&__left,
					&__right {
						width: 100%;
					}

					&__left {
						margin: 0 0 2rem 0;
					}
				}
			}
		}
	}
}
</style>
