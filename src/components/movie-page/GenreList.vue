<template>
	<DropdownMenu v-bind="options" class="genre-list">
		<template v-slot:button>
			<button type="button" class="genre-list__selected">
				<span> 장르 </span>
			</button>
		</template>

		<template v-slot:content>
			<ul class="genre-list__menu">
				<li
					v-for="(genre, index) in genres"
					:key="index"
					class="genre-list__item"
				>
					{{ genre }}
				</li>
			</ul>
		</template>
	</DropdownMenu>
</template>

<script>
import DropdownMenu from '@/components/common/DropdownMenu.vue';

export default {
	name: 'GenreList',
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

			genres: ['미국 영화'],
		};
	},
};
</script>

<style lang="scss" scoped>
.genre-list {
	::v-deep .dropdown-menu {
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
