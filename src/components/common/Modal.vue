<template>
	<div class="modal-mask" @click.self="handleClickMask">
		<div class="modal-container">
			<div class="modal">
				<slot name="close">
					<button
						type="button"
						class="modal__close-btn"
						@click="$emit('close')"
					>
						&times;
					</button>
				</slot>
				<div class="modal__body">
					<slot name="body"> Default Body </slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	mounted() {
		this.scrollLock(true);
	},

	unmounted() {
		this.scrollLock(false);
	},

	methods: {
		scrollLock(toggle = true) {
			if (toggle) {
				document.body.classList.add('scroll-lock');
			} else {
				document.body.classList.remove('scroll-lock');
			}
		},

		handleClickMask() {
			this.$emit('close');
		},
	},
};
</script>

<style lang="scss" scoped>
.modal {
	position: relative;

	// mask
	&-mask {
		overflow: auto;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: $modal-mask-color;
		z-index: 9999;
	}

	// container
	&-container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		min-width: 300px;
		min-height: 200px;
		background-color: $white;
		box-shadow: $modal-box-shadow;
	}

	// body

	// default close btn
	&__close-btn {
		position: absolute;
		top: 0;
		right: 0;
		width: 36px;
		height: 36px;
		background-color: $modal-color;
		color: rgba(255, 255, 255, 0.8);
		border-radius: 50%;
	}
}
</style>
