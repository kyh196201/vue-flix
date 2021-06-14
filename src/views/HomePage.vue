<template>
	<section class="home">
		<h1 class="visually-hidden">홈 페이지</h1>
		<!-- 빌보드 영역 -->
		<section class="home__billboard">
			<h2 class="visually-hidden">홈 페이지 메인 영화 정보</h2>
			<article class="billboard">
				<div class="billboard__inner">
					<div class="billboard__back">
						<!-- 이미지 -->
						<div class="billboard__poster">
							<figure class="poster">
								<img :src="posterImage" alt="천사와 악마" />
							</figure>
						</div>
						<!-- 비디오 -->
						<!-- <div class="billboard__trailer"></div> -->
					</div>
					<div class="billboard__front">
						<div class="billboard__front__inner">
							<!-- 영화 정보 -->
							<div class="billboard__info">
								<div class="billboard__title">너의 이름은</div>
								<div class="billboard__overview">
									새로운 교황 선출을 앞두고 일루미나티가
									나타난다. 이들이 원하는 건 피의 복수뿐.
									비극을 막으려면 단서를 찾아 해독해야 한다.
									위험한 반물질에 바티칸이 파괴되기 전에.
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
// FIXME 임시 포스터 이미지
import posterImage from '@/assets/images/common/poster.jpg';

export default {
	name: 'home',
	data() {
		return {
			message: 'This is Home page.',
			// FIXME 임시 포스터 이미지
			posterImage: posterImage,

			// 빌보드 데이터
			billBoard: {},
		};
	},

	created() {
		console.log('Home.vue created!', this.message);
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/views/home.scss';
</style>
