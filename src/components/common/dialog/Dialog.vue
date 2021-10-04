<template>
	<!-- alert, confirm 공통 컴포넌트 -->
	<div class="dialog-wrapper">
		<div class="dialog">
			<!-- 헤더 -->
			<div class="dialog__header">
				<h2 class="dialog__title">
					{{ title }}
				</h2>

				<!-- 기본 닫기 버튼 -->
				<button class="dialog__close-btn" v-if="useCloseBtn">
					<span>닫기</span>
					<font-awesome-icon
						:icon="['fas', 'times']"
					></font-awesome-icon>
				</button>
			</div>

			<!-- 바디 -->
			<div class="dialog__body">
				<slot name="body"> </slot>
				<div class="dialog__content">
					{{ message }}
				</div>
			</div>

			<!-- 푸터 -->
			<div class="dialog__footer">
				<slot name="footer"> </slot>

				<!-- 기본 확인 버튼 -->
				<button
					type="button"
					class="dialog__confirm-btn"
					@click="close"
					v-if="useConfirmBtn"
				>
					{{ confirmBtnTitle }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Dialog',

	props: {
		// 제목
		title: {
			type: String,
			default: '타이틀을 입력해주세요.',
		},

		// 헤더 닫기 버튼 사용 여부
		useCloseBtn: {
			type: Boolean,
			default: true,
		},

		// 메시지
		message: {
			type: String,
			default: '메시지를 입력해주세요.',
		},

		// 푸터 확인 버튼 사용 여부
		useConfirmBtn: {
			type: Boolean,
			default: true,
		},

		// 푸터 확인 버튼 제목
		confirmBtnTitle: {
			type: String,
			default: '확인',
		},
	},

	methods: {
		close() {
			this.$emit('close');
		},
	},
};
</script>

<style lang="scss">
.dialog {
	min-width: 300px;
	background-color: $white;
	color: $dialog-font-color;
	border-radius: 5px;
	box-shadow: 0px 0px 5px #757575;

	&-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: 30;
		background-color: $dim-color;
	}

	&__header {
		position: relative;
		padding: 10px 50px 10px 14px;
		border-bottom: 1px solid #ddd;
	}

	&__title {
		font-size: 1.8rem;
		font-weight: 500;
		line-height: 1.5;
	}

	&__close-btn {
		position: absolute;
		top: 50%;
		right: 0;
		padding: 1rem;
		font-size: 1.8rem;
		transform: translateY(-50%);
		transition: opacity 0.2s;
		will-change: opacity;

		span {
			font-size: 0;
		}

		&:hover {
			opacity: 0.7;
		}
	}

	&__body {
		padding: 30px 14px;
		background-color: $white;
	}

	&__content {
		text-align: center;
		line-height: 1.5;
	}

	&__footer {
		padding: 14px;
	}

	&__confirm-btn {
		height: 40px;
		padding: 0 10px;
		font-size: 20px;
		line-height: 40px;
		background-color: #00a65f;
		color: $white;
		border-radius: 4px;
		transition: background-color 0.2s;
		will-change: background-color;

		&:hover {
			background-color: #00c471;
		}
	}
}
</style>
