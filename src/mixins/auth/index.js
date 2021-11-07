/* 로그인, 회원가입 믹스인 */
// 로고 이미지
import logo from '@/assets/images/common/logo-small.svg';

// 컴포넌트
import Dialog from '@/components/common/dialog/Dialog.vue';

// 코드
import codes from '@/configs/codes';

const authMixin = {
	components: {
		Dialog,
	},

	data() {
		return {
			logo,

			backgroundImages: {
				small: require('../../assets/images/common/login-bg_small.jpg'),
				medium: require('../../assets/images/common/login-bg_medium.jpg'),
				large: require('../../assets/images/common/login-bg_large.jpg'),
			},

			dialog: {
				open: false,
				transition: 'from-bottom', // from-top, from-bottom, scale
			},
		};
	},

	methods: {
		// 로그인, 회원가입 실패 에러 처리
		handleAuthError({ error }) {
			const { AUTH } = codes;
			const { statusCode, message } = error;

			let errorMessage = '';

			switch (statusCode) {
				case AUTH.WRONG_PASSWORD:
					errorMessage = '잘못된 비밀번호입니다.';
					break;

				case AUTH.USER_NOT_FOUND:
					errorMessage = '존재하지 않는 사용자/이메일입니다.';
					break;

				case AUTH.TOO_MANY_REQUEST:
					errorMessage =
						'로그인 시도 횟수를 초과했습니다. 잠시뒤에 다시 시도해주세요.';
					break;

				case AUTH.ALREADY_EXISTS:
					errorMessage = '이미 존재하는 사용자/이메일입니다.';
					break;

				case AUTH.ALREADY_IN_USE:
					errorMessage = '이미 존재하는 사용자/이메일입니다.';
					break;

				default:
					errorMessage = message;
					break;
			}

			this.dialog.message = errorMessage;
			this.dialog.open = true;
		},

		closeDialog() {
			this.dialog.open = false;

			this.$nextTick(() => {
				document.getElementById('user-email')?.focus();
			});
		},
	},
};

export default authMixin;
