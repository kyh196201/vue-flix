<template>
	<label class="search-input">
		<span class="search-icon">
			<font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon>
		</span>
		<input type="text" class="search-input-form" ref="input" />
		<button type="button" class="close-btn" @click.stop="close">
			<font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
		</button>
	</label>
</template>

<script>
export default {
	name: 'search-input',

	data() {
		return {
			clickHandlerReference: this.handleClickOutside.bind(this),
		};
	},

	mounted() {
		this.focusInput();
		this.setClickOutside();
	},

	unmounted() {
		document.removeEventListener('click', this.clickHandlerReference);
	},

	methods: {
		// focus to input tag
		focusInput() {
			this.$refs.input?.focus();
		},

		setClickOutside() {
			// Ref: https://tahazsh.com/detect-outside-click-in-vue
			document.addEventListener('click', this.clickHandlerReference);
		},

		handleClickOutside(e) {
			const isInside = this.$el.contains(e.target);

			if (isInside) return false;

			this.close();
		},

		close() {
			this.$emit('close');
		},
	},
};
</script>

<style lang="scss" scoped>
.search-input {
	display: flex;
	height: 36px;
	background-color: $black;
	border: 1px solid $white;
	color: $white;

	@include clearfix;
}

.search-input-form {
	display: block;
	width: 212px;
	height: 100%;
	background: inherit;
	border: none;
	outline: none;
	color: $white;
	font-size: 14px;
}

.search-icon,
.close-btn {
	display: flex;
	align-items: center;
	padding: 0 10px;
	font-size: 22px;
	height: 100%;
}

.search-icon {
	font-size: 20px;
}

.close-btn {
	height: 100%;
	color: $white;
}

@include labtop-small {
	.search-input-form {
		width: 100px;
	}

	.search-icon,
	.close-btn {
		font-size: 14px;
	}
}

@include mobile {
	.search-input {
		height: 24px;
	}

	.search-input-form {
		width: 30px;
		font-size: 10px;
	}

	.search-icon,
	.close-btn {
		font-size: 10px;
		padding: 0 4px;
	}
}
</style>
