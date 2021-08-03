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
						<font-awesome-icon
							class="btn__icon"
							:icon="['fas', 'times']"
						></font-awesome-icon>
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
		display: flex;
		justify-content: center;
		align-items: center;
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
		min-width: 100px;
		min-height: 100px;
		background-color: $white;
		box-shadow: $modal-box-shadow;
	}

	// body

	// default close btn
	&__close-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0;
		right: 0;
		width: 3.6rem;
		height: 3.6rem;
		background-color: $modal-color;
		color: rgba(255, 255, 255, 0.8);
		border-radius: 50%;

		.btn__icon {
			font-size: 1em;
		}
	}
}
</style>
