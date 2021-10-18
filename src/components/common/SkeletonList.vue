<template>
	<article class="skeleton-list">
		<SkeletonBox v-bind="options" v-for="i in rowsAsNumber" :key="i" />
	</article>
</template>

<script>
// Components
import SkeletonBox from '@/components/common/SkeletonBox.vue';

export default {
	name: 'skeleton-list',

	components: {
		SkeletonBox,
	},

	props: {
		options: {
			type: Object,
			default: () => {},
		},

		rows: {
			type: [Number, String],
			default: 1,
		},
	},

	data() {
		return {
			rowsAsNumber: Number(this.rows),
		};
	},
};
</script>

<style lang="scss" scoped>
.skeleton {
	&-list {
		width: 100%;
		padding: 0;
		margin: 0;
	}

	::v-deep &-box {
		&:not(:last-child) {
			margin-bottom: 0.5rem;
		}
	}
}
</style>
