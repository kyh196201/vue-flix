<template>
	<div class="modal-mask">
		<div class="modal-container">
			<div class="modal">
				<button type="button" @click="$emit('close')">close</button>
				<div class="modal__content">
					<slot name="content"> Default Content </slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	mounted() {
		document.body.classList.add('scroll-lock');
	},

	unmounted() {
		document.body.classList.remove('scroll-lock');
	},
};
</script>

<style lang="scss" scoped>
.modal {
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
		min-width: 100px;
		min-height: 50px;
		background-color: $white;
		box-shadow: $modal-box-shadow;
	}

	// content
}
</style>
