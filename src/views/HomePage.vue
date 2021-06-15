<template>
	<section class="home">
		<h1 class="visually-hidden">홈 페이지</h1>
		<!-- 빌보드 영역 -->
		<section class="home__billboard">
			<h2 class="visually-hidden">홈 페이지 메인 영화 정보</h2>
			<article class="billboard">
				<div class="billboard__inner">
					<template v-if="billBoard">
						<div class="billboard__back">
							<!-- 이미지 -->
							<div class="billboard__poster">
								<figure
									class="poster"
									v-if="billBoard.backdrop_path"
								>
									<!-- TODO 이미지 에러 -->
									<img
										:src="billBoardImage"
										:alt="billBoard.title"
									/>
								</figure>
							</div>
							<!-- 비디오 -->
							<!-- <div class="billboard__trailer"></div> -->
						</div>
						<div class="billboard__front">
							<div class="billboard__front__inner">
								<!-- 영화 정보 -->
								<div class="billboard__info">
									<div
										class="billboard__title"
										v-if="billBoard.title"
									>
										{{ billBoard.title }}
									</div>
									<div
										class="billboard__overview"
										v-if="billBoard.overview"
									>
										{{ billBoard.overview }}
									</div>
								</div>
								<!-- 비디오 버튼 및 연령 표시 -->
								<div class="billboard__control">
									<button type="button" class="btn btn--play">
										재생
									</button>
									<button type="button" class="btn btn--info">
										상세정보
									</button>
								</div>
							</div>
						</div>
					</template>
				</div>
			</article>
		</section>

		<!-- 장르별 영화 영역 -->
		<section class="home__programs">
			<h2 class="visually-hidden">홈 페이지 장르별 영화</h2>
		</section>
	</section>
</template>

<script>
// Api
import { getMovieDetail } from '@/api/movie.js';

// Utils
import getImageUrl from '@/utils/common/getImageUrl.js';

export default {
	name: 'home',
	data() {
		return {
			$tag: 'home-page',

			loading: {
				billBoard: false,
			},

			// 빌보드 데이터
			billBoard: null,

			// TODO 에러 처리 임시 데이터
			errorData: null,
		};
	},

	computed: {
		billBoardImage() {
			if (!this.billBoard?.backdrop_path) return '';

			return getImageUrl(this.billBoard.backdrop_path, 2, 'backdrop');
		},
	},

	created() {
		this.init();
	},

	methods: {
		init() {
			this.fetchBillBoard();
		},

		async fetchBillBoard() {
			this.loading.billBoard = true;

			const tempId = 337404;
			const result = await getMovieDetail(tempId);

			// 에러
			if (result.isError) {
				this.errorData = result.errorData;
			} else {
				this.billBoard = result.data;
			}

			this.loading.billBoard = false;
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/views/home.scss';
</style>
