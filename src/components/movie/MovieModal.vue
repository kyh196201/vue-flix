<template>
	<Modal class="movie-modal">
		<template v-slot:body>
			<section class="movie-modal__body">
				<h2 class="visually-hidden">영화 상세 모달</h2>
				<!-- billboard -->
				<section class="movie-modal__billboard">
					<div class="billboard__back">
						<!-- 포스터 -->
						<figure class="billboard__poster">
							<img
								:src="posterImage"
								alt="너의 이름은"
								style="width: 100%"
							/>
						</figure>

						<!-- 비디오 -->
					</div>
					<div class="billboard__front">
						<div class="billboard__info">
							<!-- 제목 -->
							<div class="billboard__title">너의 이름은</div>

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
								<button class="btn btn--user">mute</button>
							</div>
						</div>
						<div class="billboard__blur"></div>
					</div>
				</section>

				<!-- main -->
				<section class="movie-modal__main">
					<h3 class="visually-hidden">영화 상세 메인 영역</h3>
					<!-- main > info -->
					<section class="movie-modal__movie-info">
						<div class="movie-info__left">
							<div class="movie-info__basic">
								<span class="release-date">2017</span>
								<span class="age-badge"></span>
								<span class="running-time"> 2시간 13분 </span>
							</div>
							<div class="movie-info__synopsis">
								<p class="synopsis">
									악명 높은 폭탄 테러범 유나바머. 그의
									희생자는 늘어가는데 단서는 찾을 수가 없다.
									대중 사이에 퍼져나가는 공포. 마침내 FBI는
									새로운 타입의 프로파일러를 불러온다.
								</p>
							</div>
						</div>
						<div class="movie-info__right">
							<div class="info-row">
								<span class="info-row__title">출연</span>
								<ul class="info-row__list">
									<li class="info-row__item">
										<span>샘 워딩턴</span>
									</li>
									<li class="info-row__item">
										<span>토비 맥과이어</span>
									</li>
									<li class="info-row__item">
										<span>로버트 다우니 주니어</span>
									</li>
									<li class="info-row__item">
										<span>휴고 위빙</span>
									</li>
									<li class="info-row__item">
										<a href="#" class="info-row__more-btn">
											더 보기
										</a>
									</li>
								</ul>
							</div>
							<div class="info-row">
								<span class="info-row__title"
									>프로그램 특징</span
								>
								<ul class="info-row__list">
									<li class="info-row__item">
										<span>긴장감 넘치는</span>
									</li>
								</ul>
							</div>

							<div class="info-row">
								<span class="info-row__title">장르</span>
								<ul class="info-row__list">
									<li class="info-row__item">
										<span> 미스터리</span>
									</li>
								</ul>
							</div>
						</div>
					</section>

					<!-- main > similar -->
					<section class="movie-modal__similar">similar</section>

					<!-- main > detail -->
					<section class="movie-modal__detail">detail</section>
				</section>
			</section>
		</template>
	</Modal>
</template>

<script>
import Modal from '@/components/common/Modal.vue';
import poster from '@/assets/images/common/poster.jpg';

export default {
	components: {
		Modal,
	},

	data() {
		return {
			posterImage: poster,
		};
	},
};
</script>

<style lang="scss">
$modal-padding: 48px;

.movie-modal {
	.modal {
		// 컨테이너
		&-container {
			overflow: hidden;
			top: 30px;
			width: 90vw;
			max-width: 1200px;
			height: auto;
			background-color: $modal-color;
			border-radius: 12px;
			transform: translate(-50%, 0);
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
				z-index: 0;
			}

			// poster
			&__poster {
				width: 100%;

				img {
					display: block;
					width: 100%;
					height: auto;
				}
			}

			// front
			&__front {
				height: 100%;
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
				line-height: 50px;
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

			// billboard > blur
			&__blur {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				padding-top: 50px;
				background-image: $blur-gradient;
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
}
</style>
