<template>
	<div class="app">
		<AppHeader v-if="isAuth" />
		<main class="app-main">
			<router-view></router-view>
		</main>
		<AppFooter v-if="isAuth" />

		<!-- FIXME 모바일 경고 페이지 -->
		<div class="warn-mobile">
			<p class="warn-mobile__text">
				모바일은 지원하지 않습니다.<br />
				PC 혹은 태블릿에서 이용해주세요. 😊
			</p>
		</div>
	</div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue';
import AppFooter from '@/components/common/AppFooter.vue';

export default {
	name: 'App',
	components: {
		AppHeader,
		AppFooter,
	},

	computed: {
		// FIXME 로그인 페이지인지 체크
		isAuth() {
			const { name } = this.$route;

			return !(name === 'LoginPage' || name === 'SignupPage');
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/views/app.scss';
</style>
