// Custom Directive for image lazy loading
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

			/**
			 * onerror 이벤트 핸들러가 실행되고, placeholder 이미지가 src로 세팅될 때
			 * 다시 onload 이벤트 핸들러가 실행되는데, 에러가 발생했을 경우에는 error 클래스를 지우지 않기위함
			 */
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
