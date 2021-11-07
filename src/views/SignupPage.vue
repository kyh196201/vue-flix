<template>
	<section class="signup-page">
		<h2 class="visually-hidden">회원가입 페이지</h2>

		<!-- 배경 이미지 -->
		<div class="signup-page__background">
			<img
				:src="backgroundImages.large"
				:srcset="`
					${backgroundImages.small} 500w,
					${backgroundImages.medium} 1000w,
					${backgroundImages.large} 1500w
				`"
				class="background"
				alt="회원가입 페이지 배경 이미지"
			/>
		</div>

		<!-- 헤더 -->
		<header class="signup-page__header">
			<!-- 헤더 로고 -->
			<h1 class="signup-page__logo">
				<router-link to="/">
					<img :src="logo" alt="vue-flix" />
				</router-link>
			</h1>
		</header>

		<!-- 회원가입 폼 -->
		<div class="signup-page__form">
			<SignupForm @auth-error="handleAuthError" />
		</div>

		<!-- 회원가입 실패 메시지 -->
		<!-- 로그인 실패 메시지 -->
		<Dialog v-bind="dialog" @close="closeDialog">
			<template #title>
				<h2>회원가입에 실패했습니다.</h2>
			</template>
			<p>{{ dialog.message }}</p>
		</Dialog>
	</section>
</template>

<script>
// 컴포넌트
import SignupForm from '@/components/auth/SignupForm.vue';

// 믹스인
import authMixin from '@/mixins/auth';

export default {
	name: 'SignupPage',

	mixins: [authMixin],

	components: {
		SignupForm,
	},

	data() {
		return {};
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/views/login-page.scss';
</style>
