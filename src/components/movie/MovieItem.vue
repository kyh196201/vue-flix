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
			this.createLazyObserver();
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

		/**
		 * IntersectionObserver 인스턴스 생성
		 */
		createObserver(handler, options = {}) {
			if (typeof handler !== 'function') {
				throw new Error('handler must be function');
			}

			return new IntersectionObserver(handler, options);
		},

		/**
		 * IntersectionObserver 옵션 생성
		 */
		createObserverOption({ root, rootMargin, threshold }) {
			return {
				root,
				rootMargin,
				threshold,
			};
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

		/**
		 * lazy-loading IntersectionObserver 인스턴스 생성
		 */
		createLazyObserver() {
			const options = this.createObserverOption({
				root: null,
				rootMargin: '0px',
				threshold: 0.5,
			});
			this.$observer = this.createObserver(this.handleIntersect, options);
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
