<template>
	<section class="movie-page">
		<h1 class="visually-hidden">영화 페이지</h1>
	</section>
</template>

<script>
export default {
	name: 'movie-page',
	data() {
		return {
			message: 'This is Movie page.',
		};
	},

	created() {
		console.log('MoviePage.vue created!', this.message);
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/views/home.scss';
</style>
