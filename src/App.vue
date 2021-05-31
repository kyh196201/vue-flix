<template>
	<div class="app">
		<AppHeader />
		<main class="app-main">
			<router-view></router-view>
		</main>
		<AppFooter />
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
};
</script>

<style lang="scss">
@import '@/assets/scss/layout.scss';
</style>
