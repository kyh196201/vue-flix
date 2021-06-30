<template>
	<div class="movie-item">
		<a href="#" class="movie-item__link">
			<figure class="movie-item__image">
				<img :src="imageSrc" :alt="movieTitle" @error="onImageError" />
			</figure>
		</a>
	</div>
</template>

<script>
// Utils
import getImageUrl from '@/utils/common/getImageUrl.js';

export default {
	name: 'movie-item',

	props: {
		movieData: {
			type: Object,
			required: true,
		},
	},

	computed: {
		imageSrc() {
			return (
				this.movieData &&
				getImageUrl(this.movieData.backdrop_path, 1, 'backdrop')
			);
		},

		movieTitle() {
			return this.movieData?.title;
		},
	},

	methods: {
		// TODO 공통 믹스인으로 옮기기
		onImageError(e) {
			const $parent = e.target.closest('figure');

			if ($parent) $parent.style.backgroundColor = '#000';
		},
	},
};
</script>

<style lang="scss" scoped>
.movie-item {
	// 이미지
	&__image {
		overflow: hidden;
		position: relative;
		width: 100%;
		padding-bottom: 56.25%;
		border-radius: 5px;

		img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: auto;
			max-height: 100%;
			background-color: $oc-gray-6;
		}
	}
}
</style>
