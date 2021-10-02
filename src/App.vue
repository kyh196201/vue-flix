<template>
	<div class="app">
		<AppHeader v-if="isAuthenticated" />
		<main class="app-main">
			<router-view></router-view>
		</main>
		<AppFooter v-if="isAuthenticated" />

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
// 컴포넌트
import AppHeader from '@/components/common/AppHeader.vue';
import AppFooter from '@/components/common/AppFooter.vue';

// Vuex
import { createNamespacedHelpers } from 'vuex';
const authModule = createNamespacedHelpers('auth');

export default {
	name: 'App',
	components: {
		AppHeader,
		AppFooter,
	},

	computed: {
		...authModule.mapGetters(['isAuthenticated']),
	},

	created() {
		// 세션 확인
		this.tryOutLogin();
	},

	methods: {
		...authModule.mapActions(['tryOutLogin']),
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/views/app.scss';
</style>
