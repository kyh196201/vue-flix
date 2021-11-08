<template>
	<!-- alert, confirm 공통 컴포넌트 -->
	<div class="dialog-mask" :class="{ active: open }">
		<div class="dialog" :class="transitionClass" ref="dialog">
			<!-- 헤더 -->
			<div class="dialog__header">
				<slot name="title" :title="title">
					<h2 class="dialog__title">
						{{ title }}
					</h2>
				</slot>
			</div>

			<!-- 바디 -->
			<div class="dialog__body" ref="body">
				<slot> modal body </slot>
			</div>

			<!-- 푸터 -->
			<div class="dialog__footer">
				<slot name="footer">
					<!-- 기본 확인 버튼 -->
					<button
						type="button"
						class="dialog__confirm-btn"
						@click.stop="$emit('close')"
					>
						확인
					</button>
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
import { KEYS } from '@/utils/common/constants';

export default {
	name: 'Dialog',

	props: {
		open: {
			type: Boolean,
			default: false,
			required: false,
		},
		// 제목
		title: {
			type: String,
			default: '타이틀',
			required: false,
		},

		transition: {
			type: String,
			default: '',
			required: false,
		},
	},

	data() {
		return {
			transitions: ['from-bottom', 'from-top', 'scale'],
		};
	},

	computed: {
		transitionClass() {
			const transitionName = this.transition.trim();

			if (transitionName && this.transitions.includes(transitionName)) {
				return ['animate', transitionName];
			} else {
				return [];
			}
		},
	},

	watch: {
		open(newValue) {
			const self = this;

			if (newValue) {
				document.addEventListener('click', handleClickOutside);
				document.addEventListener('keydown', handleKeydown);
			} else {
				document.removeEventListener('click', handleClickOutside);
				document.removeEventListener('keydown', handleKeydown);
			}

			function handleKeydown(event) {
				if (event.code === KEYS.esc) {
					self.$emit('close');
				}
			}
			function handleClickOutside(event) {
				const $dialog = self.$refs.dialog;

				if ($dialog?.contains(event.target)) return false;
				self.$emit('close');
			}
		},
	},

	methods: {
		close() {
			this.$emit('close');
		},

		focusToConfirm() {
			this.$refs['confirm-btn'].focus();
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/dialog.scss';
</style>
