<template>
	<div class="spinner"></div>
</template>

<script>
export default {
	name: 'spinner',
};
</script>

<style lang="scss" scoped>
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

.spinner {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	border: 10px solid rgba(255, 255, 255, 0.2);
	border-top-color: $white;

	animation: spin 1.5s linear 0s infinite;
}
</style>
