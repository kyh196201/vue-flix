<template>
	<div class="skeleton-loader">
		<span
			class="loader"
			v-for="index in 7"
			:key="index"
			:style="{ animationDelay: `${index * 0.5}s` }"
		></span>
	</div>
</template>

<script>
export default {
	name: 'skeleton-loader',

	methods: {
		getAnimationDelay(index = 0) {
			return `${0.5 * index}s`;
		},
	},
};
</script>

<style lang="scss" scoped>
.skeleton-loader {
	display: flex;
	flex-wrap: nowrap;
	overflow: hidden;
	width: 100%;
	font-size: 0px;

	.loader {
		flex: 0 0 20%;
		background-color: #333;
		animation: loading 2.5s ease-in-out infinite;
		animation-delay: 0s;

		&:after {
			content: '';
			display: block;
			padding-top: 56.25%;
		}

		&:not(:last-child) {
			margin-right: 20px;
		}
	}
}

@keyframes loading {
	from {
		opacity: 0;
	}
	to {
		opacity: 0.8;
	}
}
</style>
