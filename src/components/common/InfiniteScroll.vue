<template>
	<div class="infinite-scroll">
		<Spinner class="infinite-scroll__spinner" v-if="isLoading" />
	</div>
</template>

<script>
// TODO
/**
 * 1. 현재는 v-if를 통해 라이프 사이클 훅이 다시 실행되어야만 observer를 갱신할 수 있다.
 * 2. slot을 통해 spinner 변경하기
 * 3. 로직 분리하기
 */

import Spinner from '@/components/common/Spinner.vue';

class ObserverState {
	constructor() {
		this.status = '';
	}

	loading() {
		this.status = 'loading';
	}

	complete() {
		this.status = 'complete';
	}

	error() {
		this.status = 'error';
	}

	loaded() {
		this.status = 'loaded';
	}
}

export default {
	name: 'infinite-scroll',

	components: {
		Spinner,
	},

	data() {
		return {
			// 옵저버 상태
			state: new ObserverState(),

			// 옵저버 인스턴스
			observer: null,

			// 옵저버 옵션
			options: {
				threshold: 0.5,
			},
		};
	},

	computed: {
		isLoading() {
			return this.state.status === 'loading';
		},

		isComplete() {
			return this.state.status === 'complete';
		},

		isError() {
			return this.state.status === 'error';
		},

		isLoaded() {
			return this.state.status === 'loaded';
		},
	},

	watch: {
		state: {
			handler(newState) {
				if (newState.status === 'loaded') {
					this.refresh();
				}
			},

			deep: true,
		},
	},

	created() {
		// 옵저버 인스턴스 생성
		this.createInstance();
	},

	mounted() {
		if (this.observer instanceof IntersectionObserver) {
			// observe 시작
			this.observer.observe(this.$el);
		}
	},

	methods: {
		// 옵저버 인스턴스 생성
		createInstance() {
			const observer = new IntersectionObserver(
				this.observeHandler,
				this.options,
			);

			this.observer = observer;
		},

		// intersect 콜백
		observeHandler([entry]) {
			const { intersectionRatio } = entry;

			if (intersectionRatio >= this.options.threshold) {
				const { status } = this.state;

				// 로딩 중이거나 실행이 완료되었을 경우 함수 종료
				if (status === 'loading' || status === 'complete') return;

				this.state.loading();
				this.$emit('infinite', this.state);
			}
		},

		/**
		 * https://stackoverflow.com/questions/51402840/force-intersectionobserver-update
		 */
		refresh() {
			if (this.observer instanceof IntersectionObserver) {
				this.observer.unobserve(this.$el);
				this.observer.observe(this.$el);
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
