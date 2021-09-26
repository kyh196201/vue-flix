<template>
	<div class="login-form">
		<h3 class="login-form__title">로그인</h3>

		<form class="form" @submit.prevent="handleLogin">
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
			<button type="submit" class="form__btn form__btn--login">
				로그인
			</button>
		</form>

		<div class="login-form__info">
			<div class="login-form__options">
				<div class="checkbox">
					<label class="checkbox__label">
						<input type="checkbox" class="checkbox__input" />
						<span class="checkbox__title">로그인 정보 저장</span>
					</label>
				</div>
			</div>

			<div class="login-form__sns">
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

			<div class="login-form__signup-link">
				Vueflix 회원이 아니신가요?
				<router-link to="/signup" class="signup-link"
					>지금 가입하세요</router-link
				>
			</div>
		</div>
	</div>
</template>

<script>
import { isValidEmail } from '@/utils/validate';

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
		};
	},

	computed: {
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
	},

	methods: {
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

			if (passwordLength < 4 || passwordLength > 60) {
				this.errorBag.userPw.push(
					'비밀번호는 4 ~ 60자 사이여야 합니다.',
				);
			}
		},

		handleLogin() {
			this.validateEmail();
			this.validatePassword();

			const isValid = this.emailValid && this.passwordValid;

			if (isValid) {
				console.log('로그인!!');
			}
		},
	},
};
</script>

<style lang="scss">
.login-form {
	width: 100%;
	padding: 60px 68px;
	background-color: rgba(0, 0, 0, 0.9);

	&__title {
		margin-bottom: 28px;
		font-size: 32px;
		font-weight: bold;
		color: $white;
	}

	.form-field {
		position: relative;
		height: 50px;
		padding: 16px 20px 0;
		background-color: #333;
		border-radius: 4px;

		&.is-error {
			border-bottom: 2px solid $form-warn-color;
		}

		&__input {
			display: block;
			width: 100%;
			height: 100%;
			color: $white;
			font-size: 16px;

			&:focus + label,
			&.has-text + label {
				font-size: 11px;
				top: 4px;
				transform: translateY(0);
			}
		}

		&__label {
			position: absolute;
			top: 50%;
			left: 20px;
			font-size: 16px;
			color: #8c8c8c;
			transform: translateY(-50%);
			transition: all 0.15s ease;
		}
	}

	.form {
		margin-bottom: 10px;

		&__row {
			position: relative;
			margin-bottom: 20px;
		}

		&__error {
			margin-top: 8px;
			font-size: 14px;
			color: $form-warn-color;
		}

		&__btn {
			display: flex;
			width: 100%;
			height: 50px;
			margin-top: 24px;
			align-items: center;
			justify-content: center;
			border-radius: 4px;

			&--login {
				background-color: #e50914;
				color: $white;
				font-size: 16px;
				font-weight: bold;
			}

			&:hover {
				opacity: 0.7;
			}
		}
	}

	&__options {
		margin-bottom: 10px;
		font-size: 13px;
	}

	&__sns {
		margin-bottom: 10px;

		.sns {
			&__item {
				&:not(:last-child) {
					margin-bottom: 4px;
				}
			}

			&-login {
				font-size: 13px;
				color: #737373;
			}
		}
	}

	&__signup-link {
		color: #737373;

		.signup-link {
			color: $white;

			&:hover {
				text-decoration: underline;
			}
		}
	}
}
</style>
