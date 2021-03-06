<template>
	<div class="auth-form">
		<h3 class="auth-form__title">회원가입</h3>

		<form class="form" @submit.prevent="handleSubmit">
			<div class="form__row">
				<!-- 이메일 -->
				<div class="form-field" :class="{ 'is-error': !emailValid }">
					<input
						type="text"
						id="user-email"
						class="form-field__input"
						autocomplete="off"
						:class="emailClass"
						v-model="userEmail"
						@input="validateEmail"
						@blur="validateEmail"
					/>
					<label for="user-email" class="form-field__label"
						>이메일 주소</label
					>
				</div>
				<p class="form__error" v-if="!emailValid">
					{{ errorBag.userEmail[0] }}
				</p>
			</div>
			<div class="form__row">
				<!-- 비밀 번호 -->
				<div class="form-field" :class="{ 'is-error': !passwordValid }">
					<input
						type="password"
						id="user-password"
						class="form-field__input"
						:class="passwordClass"
						v-model="userPw"
						@input="validatePassword"
						@blur="validatePassword"
					/>
					<label for="user-password" class="form-field__label"
						>비밀번호</label
					>
				</div>
				<p class="form__error" v-if="!passwordValid">
					{{ errorBag.userPw[0] }}
				</p>
			</div>
			<div class="form__row">
				<!-- 비밀 번호 확인 -->
				<div
					class="form-field"
					:class="{ 'is-error': !passwordConfirmValid }"
				>
					<input
						type="password"
						id="user-password-confirm"
						class="form-field__input"
						:class="passwordConfirmClass"
						v-model="userPwConfirm"
						@blur="validatePasswordConfirm"
						@input="validatePasswordConfirm"
					/>
					<label for="user-password-confirm" class="form-field__label"
						>비밀번호 확인</label
					>
				</div>
				<p class="form__error" v-if="!passwordConfirmValid">
					비밀번호를 확인해주세요.
				</p>
			</div>
			<!-- 회원가입 버튼 -->
			<button
				type="submit"
				class="form__btn form__btn--signup"
				:class="{ loading: isLoading }"
			>
				<span> 회원가입 </span>
			</button>
		</form>
	</div>
</template>

<script>
// 스토어 Auth 모듈
import { createNamespacedHelpers } from 'vuex';

const authModule = createNamespacedHelpers('auth');

// 유틸
import { isValidEmail } from '@/utils/validate';

export default {
	name: 'signup-form',

	data() {
		return {
			userEmail: '',
			userPw: '',
			userPwConfirm: '',

			// 에러 담을 객체
			errorBag: {
				userEmail: [],
				userPw: [],
				userPwConfirm: [],
			},

			// 패스워드 최소/최대 길이
			passwordMinLength: 6,
			passwordMaxLength: 60,
		};
	},

	computed: {
		...authModule.mapState(['loading']),

		/**
		 * 회원가입 API 실행 중 여부
		 * @returns {boolean}
		 */
		isLoading() {
			return this.loading.signUp;
		},

		emailClass() {
			return this.userEmail.trim().length ? 'has-text' : '';
		},

		passwordClass() {
			return this.userPw.trim().length ? 'has-text' : '';
		},

		passwordConfirmClass() {
			return this.userPwConfirm.trim().length ? 'has-text' : '';
		},

		emailValid() {
			return !this.errorBag.userEmail.length;
		},

		passwordValid() {
			return !this.errorBag.userPw.length;
		},

		// FIXME 수정
		passwordConfirmValid() {
			return !this.errorBag.userPwConfirm.length;
		},

		isValidateSuccess() {
			return (
				this.emailValid &&
				this.passwordValid &&
				this.passwordConfirmValid
			);
		},
	},

	methods: {
		...authModule.mapActions(['signUp']),

		// 이메일 validation 검사
		validateEmail() {
			const email = this.userEmail.trim();

			this.errorBag.userEmail = [];

			if (!email) {
				this.errorBag.userEmail.push('이메일을 입력해주세요.');
			} else if (!isValidEmail(email)) {
				this.errorBag.userEmail.push('정확한 이메일을 입력해주세요.');
			}
		},

		// 비밀번호 validation 검사
		validatePassword() {
			const passwordLength = this.userPw.length;

			this.errorBag.userPw = [];

			if (
				passwordLength < this.passwordMinLength ||
				passwordLength > this.passwordMaxLength
			) {
				this.errorBag.userPw.push(
					'비밀번호는 6 ~ 60자 사이여야 합니다.',
				);
			}
		},

		// 비밀번호 확인 validation 검사
		validatePasswordConfirm() {
			this.errorBag.userPwConfirm = [];

			if (!this.userPwConfirm || this.userPwConfirm !== this.userPw) {
				this.errorBag.userPwConfirm.push('비밀번호를 확인해주세요');
			}
		},

		// 폼 Submit
		async handleSubmit() {
			try {
				this.validateEmail();
				this.validatePassword();
				this.validatePasswordConfirm();

				if (this.isValidateSuccess) {
					const userCredentail = await this.signUp({
						email: this.userEmail.trim(),
						password: this.userPw.trim(),
					});

					console.log(userCredentail);

					//  회원가입 성공하셨습니다. 메시지 띄우고
					//  로그인 페이지로 리다이렉트
					alert('회원가입이 완료되었습니다.');

					this.$router.push({
						name: 'LoginPage',
					});
				}
			} catch (error) {
				this.handleError(error);
			}
		},

		// 폼 에러 핸들링
		handleError(error) {
			this.$emit('auth-error', {
				error,
				from: 'login',
			});
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/components/auth/form.scss';
</style>
