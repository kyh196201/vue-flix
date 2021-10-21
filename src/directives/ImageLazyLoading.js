// Custom Directive for image lazy loading

/**
 * TODO
 * 1. placeholder 엘리먼트 생성하기 (lazy 클래스는 MovieItem에만 있으므로 공통 적용 불가능)
 * 2. image load error 처리
 */

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
		el.onload = function () {
			el.removeAttribute('data-src');
			el.classList.remove('lazy');
			el.closest('.movie-item')?.classList.remove('error');

			el.observer.disconnect();
		};

		el.onerror = function (event) {
			console.log('image load error', event);

			// FIXME 임시 error 처리
			el.closest('.movie-item')?.classList.add('error');
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
