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
				<div class="billboard__blur"></div>
			</article>
		</section>

		<!-- 장르별 영화 영역 -->
		<section class="home__movies">
			<h2 class="visually-hidden">홈 페이지 장르별 영화</h2>

			<div class="home__movies__inner">
				<!-- 영화 > 행 -->
				<template v-for="(type, index) in releaseTypes" :key="index">
					<div class="home__movies__row">
						<MovieRow v-bind="type"></MovieRow>
					</div>
				</template>
			</div>
		</section>
	</section>
</template>

<script>
// Api
import { getMovieDetail } from '@/api/movie.js';

// Utils
import getImageUrl from '@/utils/common/getImageUrl.js';
import { RELEASE_TYPES } from '@/utils/common/constants.js';

// Components
import MovieRow from '@/components/home/MovieRow.vue';

export default {
	name: 'home',

	components: {
		MovieRow,
	},

	data() {
		return {
			$tag: 'home-page',

			// 로딩 상태
			loading: {
				billBoard: false,
			},

			// 빌보드 영화 ID 리스트
			movieIds: [257211, 337404, 372058, 13],

			// 영화 release type
			releaseTypes: [...RELEASE_TYPES],

			// 빌보드 데이터
			billBoard: null,

			// TODO 에러 처리 임시 데이터 => 공통으로 처리
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

		// 빌보드 영화 ID 랜덤하게 가져오기
		getRandomBillBoardId() {
			const randomIndex = Math.floor(
				Math.random() * this.movieIds.length,
			);

			return this.movieIds[randomIndex];
		},

		// 빌보드 API 요청
		async fetchBillBoard() {
			this.loading.billBoard = true;

			const movieId = this.getRandomBillBoardId();
			const result = await getMovieDetail(movieId);

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
