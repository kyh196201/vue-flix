<template>
	<div class="dropdown-menu" ref="wrapper" :class="{ open: open }">
		<div class="dropdown-menu__activator" ref="activator">
			<slot name="button">
				<button class="dropdown-menu__btn">
					<slot name="title">dropdown</slot>
				</button>
			</slot>
		</div>
		<div
			class="dropdown-menu__content"
			:style="computedStyle"
			ref="content"
		>
			<slot name="content">menu content</slot>
		</div>
	</div>
</template>

<script>
/**
 * 1. open, close
 * 2. activator: click, hover
 * 3. isOpen props
 */
import { toRefs, computed, ref } from 'vue';

export default {
	name: 'dropdown-menu',

	props: {
		// menu style
		style: {
			type: Object,
			default() {
				return {};
			},
		},

		// is open
		isOpen: {
			type: Boolean,
			default: false,
		},

		activator: {
			type: String,
			default: 'click',
		},

		useClickOutside: {
			type: Boolean,
			default: true,
		},
	},

	setup(props) {
		const { style } = toRefs(props);

		const open = ref(props.isOpen);

		const computedStyle = computed(() => {
			return {
				...style,
				visibility: open.value ? 'visible' : 'hidden',
				opacity: open.value ? 1 : 0,
			};
		});

		return {
			computedStyle,
			open,
		};
	},

	computed: {
		// activator ref
		$activator() {
			return this.$refs.activator;
		},

		// wrapper ref
		$wrapper() {
			return this.$refs.wrapper;
		},
	},

	watch: {
		open: {
			handler(value) {
				if (this.activator === 'click') {
					if (value) {
						document.addEventListener(
							'click',
							this.handleClickOutside,
						);
					} else {
						document.removeEventListener(
							'click',
							this.handleClickOutside,
						);
					}
				}
			},
		},
	},

	mounted() {
		this.bindEvents();
	},

	methods: {
		bindEvents() {
			if (this.activator === 'hover') {
				this.$wrapper.addEventListener('mouseenter', () => {
					this.openMenu();
				});

				this.$wrapper.addEventListener('mouseleave', () => {
					this.closeMenu();
				});
			} else if (this.activator === 'click') {
				this.$activator.addEventListener('click', () => {
					this.open = !this.open;
				});
			}
		},

		handleClickOutside(event) {
			event.stopPropagation();

			const $target = event.target;

			const isInside = this.$el.contains($target);

			if (isInside) return false;

			if (this.open) {
				this.closeMenu();
			}
		},

		closeMenu() {
			this.open = false;
		},

		openMenu() {
			this.open = true;
		},
	},
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
	position: relative;

	// content
	&__content {
		position: absolute;
		background-color: $dim-color;
		transition: opacity 0.3s ease;
		will-change: opacity;
	}
}
</style>
