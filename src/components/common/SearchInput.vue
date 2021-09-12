<template>
	<label class="search-input">
		<span class="search-icon">
			<font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon>
		</span>
		<input
			type="text"
			class="search-input-form"
			:value="searchText"
			@input="handleInput"
			ref="input"
		/>
		<button
			type="button"
			class="close-btn"
			v-if="searchText"
			@click.stop="clearSearchText"
		>
			<font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
		</button>
	</label>
</template>

<script>
import { mapMutations, createNamespacedHelpers } from 'vuex';

const searchModule = createNamespacedHelpers('search');

export default {
	name: 'search-input',

	data() {
		return {
			clickHandlerReference: this.handleClickOutside.bind(this),

			inputText: '',
		};
	},

	computed: {
		...searchModule.mapState(['searchText']),
	},

	watch: {
		$route: {
			handler(newRoute, oldRoute) {
				if (!oldRoute) return false;

				// 검색 페이지에서 다른 페이지로 이동할 경우 검색어 제거
				if (
					oldRoute.name === 'SearchPage' &&
					oldRoute.name !== newRoute.name
				) {
					this.clearSearchText();
				}
			},
		},

		searchText(newValue) {
			const { name } = this.$route;

			if (this.validateSearchText(newValue)) {
				const query = {
					q: encodeURIComponent(this.searchText),
				};

				if (name === 'SearchPage') {
					this.$router.replace({
						name: 'SearchPage',
						query,
					});
				} else {
					this.$router.push({
						name: 'SearchPage',
						query,
					});
				}
			} else {
				// FIXME 이전 페이지로 이동하도록 수정
				if (name === 'SearchPage') {
					this.$router.push({
						name: 'HomePage',
					});
				} else {
					this.close();
				}
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
		...mapMutations(['closeSearchForm']),
		...searchModule.mapMutations(['setSearchText']),

		// 입력창으로 포커스 이동
		focusInput() {
			this.$refs.input?.focus();
		},

		handleInput(event) {
			this.setSearchText(event.target.value);
		},

		setClickOutside() {
			// Ref: https://tahazsh.com/detect-outside-click-in-vue
			document.addEventListener('click', this.clickHandlerReference);
		},

		handleClickOutside(e) {
			const isInside = this.$el.contains(e.target);

			if (isInside || this.searchText) return false;

			this.close();
		},

		clearSearchText() {
			this.setSearchText('');
		},

		validateSearchText(value) {
			return value?.trim().length > 0;
		},

		close() {
			this.closeSearchForm();
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
