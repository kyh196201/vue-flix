<template>
	<label class="search-input">
		<span class="search-icon">
			<font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon>
		</span>
		<input
			type="text"
			class="search-input-form"
			v-model="inputText"
			ref="input"
		/>
		<button
			type="button"
			class="close-btn"
			v-if="isInputText"
			@click.stop="clearInputText"
		>
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

			inputText: '',
		};
	},

	computed: {
		isInputText() {
			return !!this.inputText.length;
		},
	},

	watch: {
		inputText(newValue, oldValue) {
			console.log(newValue, oldValue);

			if (newValue.length <= 0) {
				// FIXME 이전 페이지로 이동하도록 수정
				if (this.$route.name === 'SearchPage') {
					this.$router.push({
						name: 'HomePage',
					});
				} else {
					this.close();
				}
			} else {
				this.$router.push({
					name: 'SearchPage',
					query: {
						q: this.inputText,
					},
				});
			}
		},
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

			if (isInside || this.isInputText) return false;

			this.close();
		},

		clearInputText() {
			this.inputText = '';
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
	position: relative;
	height: 36px;
	padding-right: 34px;
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
	position: absolute;
	top: 0;
	right: 0;
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
