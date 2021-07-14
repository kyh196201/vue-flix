<template>
	<Modal class="movie-modal">
		<template v-slot:body>
			<div class="movie-modal__body">
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
							<ul class="billboard__buttons">
								<li>
									<button type="button" class="btn btn--play">
										재생
									</button>
								</li>
								<!-- +, 좋아요, 싫어요 버튼 -->
							</ul>
						</div>
					</div>
				</section>

				<!-- main -->
				<section class="movie-modal__main">
					main

					<!-- main > info -->
					<div class="movie-modal__info">info</div>

					<!-- main > similar -->
					<div class="movie-modal__similar">similar</div>

					<!-- main > detail -->
					<div class="movie-modal__detail">detail</div>
				</section>
			</div>
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
$modal-padding: 3em;

.movie-modal {
	.modal {
		// 컨테이너
		&-container {
			overflow: hidden;
			top: 30px;
			width: 900px;
			height: auto;
			background-color: $modal-color;
			border-radius: 12px;
			transform: translate(-50%, 0);
		}

		// close 버튼
		&__close-btn {
			top: 10px;
			right: 10px;
		}
	}

	// 빌보드

	// main
	&__main {
		padding: 0 $modal-padding 10px;
	}

	// 빌보드 버튼
	.btn {
		padding: 0.4rem 0.8rem;
		border-radius: 4px;
		transition: opacity 0.3s ease;
		font-size: 16px;
		font-weight: 500;

		@include labtop {
			font-size: 12px;
		}

		@include mobile {
			font-size: 10px;
		}

		&:first-child {
			margin-right: 1rem;
		}

		&:hover {
			opacity: 0.7;
		}
	}
}
</style>
