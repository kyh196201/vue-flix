<template>
	<div class="auth-form">
		<h3 class="auth-form__title">로그인</h3>

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
			<!-- 로그인 버튼 -->
			<button
				type="submit"
				class="form__btn form__btn--login"
				:class="{ loading: isLoading }"
			>
				<span> 로그인 </span>
			</button>
		</form>

		<div class="auth-form__info">
			<div class="auth-form__options">
				<div class="checkbox">
					<label class="checkbox__label">
						<input
							type="checkbox"
							class="checkbox__input"
							v-model="keepUserInfo"
						/>
						<span class="checkbox__title">로그인 정보 저장</span>
					</label>
				</div>
			</div>

			<div class="auth-form__sns">
				<ul class="sns__list">
					<li class="sns__item" v-if="false">
						<button
							type="button"
							class="sns-login sns-login--facebook"
						>
							<span class="sns-login__title"
								>Facebook으로 로그인</span
							>
						</button>
					</li>
					<li class="sns__item">
						<button
							type="button"
							class="sns-login sns-login--google"
						>
							<span class="sns-login__title"
								>Google로 로그인</span
							>
						</button>
					</li>
				</ul>
			</div>

			<div class="auth-form__signup-link">
				Vueflix 회원이 아니신가요?
				<router-link to="/signup" class="signup-link"
					>지금 가입하세요</router-link
				>
			</div>
		</div>
	</div>
</template>

<script>
// Vuex
import { createNamespacedHelpers } from 'vuex';

// 유틸
import { isValidEmail } from '@/utils/validate';
import {
	saveUserEmailToCookie,
	getUserEmailFromCookie,
	removeUserEmailFromCookie,
} from '@/utils/auth';

// AUTH 스토어 모듈
const authModule = createNamespacedHelpers('auth');

export default {
	name: 'login-form',

	data() {
		return {
			userEmail: '',
			userPw: '',

			// 에러 담을 객체
			errorBag: {
				userEmail: [],
				userPw: [],
			},

			// 비밀번호 최소/최대 길이
			passwordMinLength: 6,
			passwordMaxLength: 60,

			// 사용자 로그인 정보 저장
			keepUserInfo: false,
		};
	},

	computed: {
		...authModule.mapState(['loading']),

		/**
		 * 로그인 API 실행 중 여부
		 * @returns {boolean}
		 */
		isLoading() {
			return this.loading.signIn;
		},

		emailClass() {
			return this.userEmail.trim().length ? 'has-text' : '';
		},

		passwordClass() {
			return this.userPw.trim().length ? 'has-text' : '';
		},

		emailValid() {
			return !this.errorBag.userEmail.length;
		},

		passwordValid() {
			return !this.errorBag.userPw.length;
		},

		isValidateSuccess() {
			return this.emailValid && this.passwordValid;
		},
	},

	watch: {
		keepUserInfo: {
			handler(newValue) {
				// 체크 해제될 경우 쿠키에 저장된 이메일 삭제
				if (!newValue) {
					removeUserEmailFromCookie();
				}
			},

			immediate: false,
		},
	},

	created() {
		// 로그인 정보 저장 체크박스
		const userEmail = getUserEmailFromCookie();

		this.keepUserInfo = isValidEmail(userEmail);

		if (this.keepUserInfo) {
			this.userEmail = userEmail;
		}
	},

	methods: {
		...authModule.mapActions(['signIn']),

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

		// 폼 Submit
		async handleSubmit() {
			try {
				this.validateEmail();
				this.validatePassword();

				if (this.isValidateSuccess) {
					const email = this.userEmail.trim();
					const password = this.userPw.trim();

					const userCredentail = await this.signIn({
						email,
						password,
					});

					// 로그인 성공
					if (userCredentail) {
						if (this.keepUserInfo) {
							// 한달간 사용자 이메일을 쿠키에 저장
							saveUserEmailToCookie(email);
						}

						// 메인 페이지로 이동
						this.$router.push({
							name: 'HomePage',
						});
					}
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
