<template>
	<DropdownMenu v-bind="options" class="genre-list" ref="menu">
		<template v-slot:button>
			<button type="button" class="genre-list__selected">
				<span>
					<template v-if="selectedGenre">
						{{ selectedGenre.name }}
					</template>
					<template v-else>장르</template>
				</span>
			</button>
		</template>

		<template v-slot:content>
			<ul class="genre-list__menu">
				<li
					v-for="(genre, index) in genres"
					:key="index"
					class="genre-list__item"
					@click.self="selectGenre(genre.id)"
				>
					{{ genre.name }}
				</li>
			</ul>
		</template>
	</DropdownMenu>
</template>

<script>
import { toRefs, ref } from 'vue';

// Components
import DropdownMenu from '@/components/common/DropdownMenu.vue';

export default {
	name: 'GenreList',
	components: {
		DropdownMenu,
	},

	props: {
		// 장르 리스트
		list: {
			type: Array,
			default: () => [],
		},

		// 선택된 장르 Id
		selectedId: {
			default: null,
		},
	},

	setup(props) {
		const { list } = toRefs(props);

		const genres = ref(list);

		const findGenre = id => {
			return genres.value.find(genre => genre.id === id);
		};

		return {
			genres,
			findGenre,
		};
	},

	data() {
		return {
			// dropdown menu options
			options: {
				isOpen: false,
				activator: 'click',
			},
		};
	},

	computed: {
		/**
		 * 선택된 장르
		 * @returns {object}
		 */
		selectedGenre() {
			return this.findGenre(this.selectedId);
		},
	},

	methods: {
		selectGenre(id) {
			this.$emit('select-genre', id);

			this.$refs.menu.closeMenu();
		},
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
		width: 130px;
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
