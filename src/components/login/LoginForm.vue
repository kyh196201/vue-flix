<template>
	<div class="login-form">
		<h3 class="login-form__title">로그인</h3>

		<form class="form">
			<div class="form__row">
				<!-- 이메일 -->
				<div class="form-field">
					<input
						type="text"
						id="user-email"
						class="form-field__input"
					/>
					<label for="user-email" class="form-field__label"
						>이메일 주소</label
					>
				</div>
				<p class="form__error">정확한 이메일 주소를 입력하세요.</p>
			</div>
			<div class="form__row">
				<!-- 비밀 번호 -->
				<div class="form-field">
					<input
						type="text"
						id="user-password"
						class="form-field__input"
					/>
					<label for="user-password" class="form-field__label"
						>비밀번호</label
					>
				</div>
				<p class="form__error">비밀번호는 4 ~ 60자 사이여야 합니다.</p>
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
					<li class="sns__item">
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
				<a href="#" class="signup-link">지금 가입하세요</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'login-form',
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

		&__input {
			display: block;
			width: 100%;
			height: 100%;
			color: $white;
			font-size: 16px;
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

		&.focus {
			.form-field {
				&__label {
					font-size: 11px;
					top: 4px;
					transform: translateY(0);
				}
			}
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
			color: $form-error-color;
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
		}
	}
}
</style>
