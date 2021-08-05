<template>
	<article class="movie-card">
		<a href="#">
			<div class="movie-card__inner">
				<!-- backdrop-image -->
				<section class="movie-card__backdrop-image">
					<figure class="backdrop-image">
						<img :src="tempPoster" alt="너의 이름은" />
					</figure>
				</section>
				<section class="movie-card__info">
					<div class="movie-card__info__top">
						<span class="age-badge"></span>
						<span class="release-date">2011</span>
					</div>
					<div class="synopsis">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Accusamus accusantium enim, officiis sunt, alias
						molestiae ipsam facilis, architecto quidem nobis quasi
						nihil illo tenetur minus natus eos corporis porro aut!
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
import posterImage from '@/assets/images/common/poster.jpg';

export default {
	name: 'movie-card',

	data() {
		return {
			tempPoster: posterImage,
		};
	},
};
</script>

<style lang="scss">
.movie-card {
}
</style>
