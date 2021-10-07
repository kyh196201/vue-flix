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

			dialogs: {
				auth: {
					open: false,
					title: '',
					message: '',
				},
			},
		};
	},

	methods: {
		// 로그인, 회원가입 실패 에러 처리
		handleAuthError({ error, from }) {
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

			this.openDialog('auth', {
				title:
					from === 'login'
						? '로그인에 실패했습니다.'
						: '회원가입에 실패했습니다.',
				message: errorMessage,
			});
		},

		// Dialog 열기
		// TODO Composition API
		openDialog(id, options = {}) {
			if (!this.dialogs[id]) {
				return;
			}

			this.dialogs[id] = {
				...this.dialogs[id],
				...options,
			};

			this.dialogs[id].open = true;
		},

		// Dialog 닫기
		// TODO Composition API
		closeDialog(id) {
			if (!this.dialogs[id]) {
				return;
			}

			this.dialogs[id].open = false;
			this.dialogs[id].message = '';
		},
	},
};

export default authMixin;
