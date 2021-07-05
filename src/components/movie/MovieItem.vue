<template>
	<div class="movie-item">
		<a href="#" class="movie-item__link">
			<figure class="movie-item__image">
				<img
					v-if="useLazy"
					src=""
					:data-src="imageSrc"
					@error="onImageError"
					class="lazy"
					ref="lazy-img"
				/>
				<img
					:src="imageSrc"
					:alt="movieTitle"
					@error="onImageError"
					v-else
				/>
			</figure>
		</a>
	</div>
</template>

<script>
// Utils
import getImageUrl from '@/utils/common/getImageUrl.js';

import MyObserver from '@/utils/observer';

export default {
	name: 'movie-item',

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
	},

	data() {
		return {
			$observer: null,
		};
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

	created() {
		if (this.useLazy) {
			this.createObserver();
		}
	},

	mounted() {
		if (this.$observer instanceof IntersectionObserver) {
			this.$observer.observe(this.$el);
		}
	},

	methods: {
		// TODO 공통 믹스인으로 옮기기
		onImageError(e) {
			const $parent = e.target.closest('figure');

			if ($parent) $parent.style.backgroundColor = '#000';
		},

		createObserver() {
			this.$observer = new MyObserver(this.handleIntersect.bind(this));
		},

		/**
		 * observe 핸들러
		 */
		handleIntersect(entries, observer) {
			const [entry] = entries;
			const { isIntersecting, target } = entry;

			if (isIntersecting) {
				const $lazyImg = this.$refs['lazy-img'];
				const imageUrl = $lazyImg.dataset.src;
				$lazyImg.setAttribute('src', imageUrl);
				$lazyImg.classList.remove('lazy');
				observer.unobserve(target);
			}
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
			border: none;

			&.lazy {
				height: 100%;
				text-indent: -9999px;
				background-image: linear-gradient(
					$skeleton-color 100%,
					transparent 0
				);
			}
		}
	}
}
</style>
