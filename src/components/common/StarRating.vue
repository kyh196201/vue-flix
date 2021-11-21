<template>
	<div
		class="star-rating"
		v-bind="$attrs"
		:class="{
			'star-rating--sm': size === 'small',
			'star-rating--lg': size === 'large',
		}"
	>
		<div
			class="star-rating__on"
			:style="{
				width: activeWidth + '%',
			}"
		>
			{{ rating }}
		</div>
	</div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
	name: 'star-rating',

	props: {
		value: {
			type: Number,
			required: false,
			default: 0.0,
		},

		size: {
			type: String,
			required: false,
			default: '', // small, large
		},
	},

	setup(props) {
		const rating = ref(props.value);

		const activeWidth = computed(() => {
			return rating.value * 10;
		});

		return {
			rating,
			activeWidth,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/star-rating.scss';
</style>
