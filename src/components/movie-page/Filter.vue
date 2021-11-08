<template>
	<DropdownMenu
		:isOpen="isOpen"
		:activator="activator"
		class="filter"
		ref="menu"
	>
		<template v-slot:button>
			<button type="button" class="filter__selected">
				<span v-if="selectedFilter"> {{ selectedFilter.title }} </span>
			</button>
		</template>

		<template v-slot:content>
			<ul class="filter__menu">
				<li
					v-for="(filter, index) in filters"
					:key="index"
					class="filter__item"
					:class="{ active: filter.id === selectedId }"
					@click="selectFilter(filter.id)"
				>
					<span>
						{{ filter.title }}
					</span>
				</li>
			</ul>
		</template>
	</DropdownMenu>
</template>

<script>
// Components
import DropdownMenu from '@/components/common/DropdownMenu.vue';

export default {
	name: 'Filter',
	components: {
		DropdownMenu,
	},

	props: {
		filters: {
			type: Array,
			default: () => [],
			required: true,
		},

		selectedId: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			// dropdown menu options
			isOpen: false,
			activator: 'click',
		};
	},

	computed: {
		selectedFilter() {
			return this.filters.find(filter => filter.id === this.selectedId);
		},
	},

	methods: {
		selectFilter(filterId) {
			this.$emit('select-filter', filterId);

			this.$refs.menu.closeMenu();
		},
	},
};
</script>

<style lang="scss" scoped>
.filter {
	::v-deep .dropdown-menu {
		&__content {
			left: 0;
			min-width: 100%;
			z-index: 1;
		}
	}

	&__selected {
		position: relative;
		width: 150px;
		padding: 5px 50px 5px 10px;
		border: 1px solid $white;
		text-align: left;

		&::after {
			content: '';
			position: absolute;
			top: 50%;
			right: 10px;
			width: 10px;
			height: 5px;
			margin-top: -2.5px;
			background: url('#{$iconImages}caret-down.svg') no-repeat
				center/100% auto;
		}

		span {
			padding: 5px;
			color: $white;
			font-size: 1.25rem;
		}

		&:hover {
			background-color: rgba(255, 255, 255, 0.2);
		}
	}

	&__menu {
		padding: 10px;
		border: 1px solid rgba(255, 255, 255, 0.15);
	}

	&__item {
		padding: 5px;
		cursor: pointer;

		span {
			line-height: 1.2;
			font-size: 14px;
		}

		&:hover {
			span {
				text-decoration: underline;
			}
		}
	}
}
</style>
