// Custom Directive for image lazy loading

/**
 * TODO
 * 1. placeholder 엘리먼트 생성하기 (lazy 클래스는 MovieItem에만 있으므로 공통 적용 불가능)
 * 2. image load error 처리
 */

import placeholderImage from '@/assets/images/common/placeholder-image.jpg';

const lazyImage = {
	beforeMount(el, binding) {
		const { value } = binding;

		const imgSrc = value ?? '';

		el.classList.add('lazy');
		el.setAttribute('data-src', imgSrc);

		const observerOption = {
			root: null,
			rootMargin: '0px',
			threshold: 0,
		};

		el.observer = new IntersectionObserver(entries => {
			const [entry] = entries;
			const { target, intersectionRatio } = entry;

			if (intersectionRatio >= observerOption.threshold) {
				const imgSrc = target.getAttribute('data-src');
				target.setAttribute('src', imgSrc);
			}
		}, observerOption);
	},
	mounted(el) {
		let isError = false;

		el.classList.add('lazy-image');

		el.onload = function () {
			el.removeAttribute('data-src');
			el.classList.remove('lazy');
			el.observer.disconnect();

			if (!isError) {
				el.classList.remove('error');
			}
		};

		el.onerror = function () {
			isError = true;
			el.setAttribute('src', placeholderImage);
			el.classList.add('error');
			el.classList.remove('lazy');
			el.observer.disconnect();
		};

		if (el.observer instanceof IntersectionObserver) {
			el.observer.observe(el);
		}
	},
	beforeUpdate() {},
	updated() {},
	beforeUnmount() {},
	unmounted() {},
};

export default lazyImage;
