<template>
	<div
		class="skeleton-box"
		:style="computedStyle"
		:class="computedClass"
	></div>
</template>

<script>
export default {
	name: 'skeleton-box',

	props: {
		width: {
			type: String,
			default: '100%',
		},

		height: {
			type: String,
			default: '2rem',
		},

		backgroundColor: {
			type: String,
			default: 'rgba(73, 80, 87, 0.7)',
		},

		animation: {
			type: Boolean,
			default: true,
		},
	},

	computed: {
		computedStyle() {
			return {
				width: this.width,
				height: this.height,
			};
		},

		computedClass() {
			return {
				shine: this.animation,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
$bg-color: rgba(73, 80, 87, 0.7);

.skeleton-box {
	display: flex;
	width: 100%;
	height: 2rem;
	margin: 0;
	padding: 0;
	font-size: 0px;
	border-radius: 0.2rem;
	background-color: $bg-color;

	&.shine {
		// animation
		animation: shine 2s infinite;
	}
}

@keyframes shine {
	0%,
	100% {
		opacity: 0.3;
	}

	50% {
		opacity: 0.8;
	}
}
</style>
