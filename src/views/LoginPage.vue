<template>
	<section class="login-page">
		<!-- 배경 이미지 -->

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
	</section>
</template>

<script>
// Images
import headerLogo from '@/assets/images/common/logo-small.svg';
import introBg from '@/assets/images/common/login-bg.jpg';

export default {
	name: 'LoginPage',

	data() {
		return {
			logo: headerLogo,
			introBg,
		};
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/views/login-page.scss';
</style>
