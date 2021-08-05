/**
 * IntersectionObserver Custom Class
 */
class MyObserver {
	$observer = null;

	constructor(handler, options) {
		this.setup(handler, options);
	}

	get defaultOptions() {
		return {
			root: null,
			rootMargin: '0px',
			threshold: 0,
		};
	}

	/**
	 * @param {Object} options
	 * @returns new options
	 */
	createOptions(options = {}) {
		return Object.assign({}, this.defaultOptions, options);
	}

	/**
	 * @param {Function} handler
	 * @param {Object} options
	 * @returns IntersectionObserver Instance
	 */
	setup(handler, options = {}) {
		if (typeof handler !== 'function') {
			throw new Error('handler must be function');
		}

		const observerOption = this.createOptions(options);

		this.$observer = new IntersectionObserver(handler, observerOption);
	}

	/**
	 * @param  {...any} elements : DOM elements
	 * @returns
	 */
	observe(...elements) {
		elements.forEach(el => {
			this.$observer.observe(el);
		});

		return this;
	}
}

export default MyObserver;
