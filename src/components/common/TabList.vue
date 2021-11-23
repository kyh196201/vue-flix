<template>
	<ul role="tablist" class="tab-list">
		<template v-for="(tab, index) in tabs" :key="`tab-${index}`">
			<li
				role="tab"
				class="tab-list__item"
				:class="{ active: modelValue === tab.id }"
				@click="$emit('update:modelValue', tab.id)"
			>
				<span class="tab-list__text">
					{{ tab.text }}
				</span>
			</li>
		</template>
	</ul>
</template>

<script>
export default {
	name: 'tab-list',

	emits: ['update:modelValue'],

	props: {
		tabs: {
			type: Array,
			default: () => [],
			required: true,
		},

		modelValue: {
			type: [String, Number],
			default: null,
		},
	},
};
</script>

<style lang="scss" scoped>
.tab-list {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	border-bottom: 2px solid $white;

	&__item {
		position: relative;
		padding: 1.25rem;
		border-radius: 0.2rem;
		cursor: pointer;
		transition: background-color 0.3s;

		&:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}

		&.active {
			background-color: rgba(255, 255, 255, 0.04);

			&::after {
				content: '';
				position: absolute;
				left: 0;
				bottom: -2px;
				width: 100%;
				height: 2px;
				background-color: #d81f26;
			}
		}
	}

	&__text {
		display: block;
		font-size: 1.8rem;
	}
}
</style>
