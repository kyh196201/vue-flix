<template>
	<section class="search-page">
		<h1 class="visually-hidden">검색 페이지</h1>
	</section>
</template>

<script>
export default {
	name: 'search-page',
	data() {
		return {
			message: 'This is Search page.',
		};
	},

	created() {
		console.log('SearchPage.vue created!', this.message);
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/views/home.scss';
</style>
