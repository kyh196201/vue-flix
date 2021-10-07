<template>
	<section class="login-page">
		<h2 class="visually-hidden">로그인 페이지</h2>

		<!-- 배경 이미지 -->
		<div class="login-page__background">
			<img
				:src="backgroundImages.large"
				:srcset="`
					${backgroundImages.small} 500w,
					${backgroundImages.medium} 1000w,
					${backgroundImages.large} 1500w
				`"
				class="background"
				alt="로그인 페이지 배경 이미지"
			/>
		</div>

		<!-- 헤더 -->
		<header class="login-page__header">
			<!-- 헤더 로고 -->
			<h1 class="login-page__logo">
				<router-link to="/">
					<img :src="logo" alt="vue-flix" />
				</router-link>
			</h1>
		</header>

		<!-- 로그인 폼 -->
		<div class="login-page__form">
			<LoginForm @auth-error="handleAuthError" />
		</div>

		<!-- 로그인 실패 메시지 -->
		<Dialog
			v-if="dialogs.auth.open"
			:title="dialogs.auth.title"
			:message="dialogs.auth.message"
			@close="closeDialog('auth')"
		></Dialog>
	</section>
</template>

<script>
// 컴포넌트
import LoginForm from '@/components/auth/LoginForm.vue';

// 믹스인
import authMixin from '@/mixins/auth';

export default {
	name: 'LoginPage',

	mixins: [authMixin],

	components: {
		LoginForm,
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/views/login-page.scss';
</style>
