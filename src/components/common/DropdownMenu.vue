<template>
	<article class="dropdown-menu" ref="wrapper">
		<div class="dropdown-menu__activator" ref="activator">
			<slot name="button">
				<button class="dropdown-menu__btn">dropdown</button>
			</slot>
		</div>
		<div
			class="dropdown-menu__content"
			:style="computedStyle"
			ref="content"
		>
			<slot name="content">menu content</slot>
		</div>
	</article>
</template>

<script>
/**
 * 1. open, close
 * 2. activator: click, hover
 * 3. isOpen props
 */

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
	},

	data() {
		return {
			open: false,
		};
	},

	computed: {
		// style
		computedStyle() {
			const style = {
				visibility: this.open ? 'visible' : 'hidden',
				opacity: this.open ? 1 : 0,
			};

			return { ...this.style, ...style };
		},

		// activator ref
		$activator() {
			return this.$refs.activator;
		},

		// wrapper ref
		$wrapper() {
			return this.$refs.wrapper;
		},
	},

	// TODO setup으로 변경하기
	created() {
		this.open = this.isOpen;
	},

	mounted() {
		this.bindEvents();
	},

	methods: {
		bindEvents() {
			if (this.activator === 'hover') {
				this.$wrapper.addEventListener('mouseenter', () => {
					this.open = true;
				});

				this.$wrapper.addEventListener('mouseleave', () => {
					this.open = false;
				});
			} else if (this.activator === 'click') {
				this.$activator.addEventListener(this.activator, () => {
					this.open = !this.open;
				});
			}
		},
	},
};
</script>

<style lang="scss">
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
