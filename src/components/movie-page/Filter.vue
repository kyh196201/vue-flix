<template>
	<DropdownMenu v-bind="options" class="filter">
		<template v-slot:button>
			<button type="button" class="filter__selected">
				<span> 추천 콘텐츠 </span>
			</button>
		</template>

		<template v-slot:content>
			<ul class="filter__menu">
				<li
					v-for="(filter, index) in filters"
					:key="index"
					class="filter__item"
				>
					{{ filter }}
				</li>
			</ul>
		</template>
	</DropdownMenu>
</template>

<script>
import DropdownMenu from '@/components/common/DropdownMenu.vue';

export default {
	name: 'Filter',
	components: {
		DropdownMenu,
	},

	data() {
		return {
			// dropdown menu options
			options: {
				isOpen: true,
				activator: 'click',
			},

			filters: ['인기순'],
		};
	},
};
</script>

<style lang="scss" scoped>
.filter {
	/deep/ .dropdown-menu {
		&__content {
			left: 0;
			min-width: 100%;
		}
	}

	&__selected {
		position: relative;
		padding: 5px 50px 5px 10px;
		border: 1px solid $white;

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
		line-height: 1.2;
		font-size: 14px;
	}
}
</style>
