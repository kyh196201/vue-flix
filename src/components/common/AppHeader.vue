<template>
	<header class="app-header">
		<div class="app-header__inner">App Header</div>
	</header>
</template>

<script>
export default {
	name: 'app-header',
};
</script>

<style lang="scss">
.app-header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 70px;

	&__inner {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;

		// Reference: netflix 스타일
		background-image: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.7) 10%,
			rgba(0, 0, 0, 0)
		);
	}
}
</style>
