<template>
	<section class="similar-contents" :class="{ opened: isOpen }">
		<h3 class="similar-contents__title">비슷한 콘텐츠</h3>
		<div class="similar-contents__inner">
			<ul class="similar-contents__list" v-if="loadingSimilarContents">
				<li class="similar-contents__item" v-for="i in 6" :key="i">
					<SkeletonBox height="30rem"></SkeletonBox>
				</li>
			</ul>
			<ul
				class="similar-contents__list"
				v-else-if="!loadingSimilarContents && isSimilarContents"
			>
				<li
					class="similar-contents__item"
					v-for="media in similarContents"
					:key="`similar-${media.id}`"
				>
					<MediaCard mediaType="tv" :mediaData="media"></MediaCard>
				</li>
			</ul>
		</div>

		<!-- caret-up, down -->
		<label class="btn btn--user btn--fold">
			<input type="checkbox" v-model="isOpen" />
			<font-awesome-icon
				class="btn__icon"
				:icon="foldBtnIcon"
			></font-awesome-icon>
			<span class="btn__title">찜하기</span>
		</label>
	</section>
</template>

<script>
import { toRefs, ref, computed } from 'vue';

// Composables
import similarContentsComposable from '@/composable/media/similarContents';

// Components
import SkeletonBox from '@/components/common/loading/SkeletonBox.vue';
import MediaCard from '@/components/MediaCard.vue';

export default {
	name: 'similar-contents',

	components: {
		SkeletonBox,
		MediaCard,
	},

	props: {
		id: {
			type: [Number, String],
			required: true,
		},

		mediaType: {
			type: String,
			default: 'movie',
		},
	},

	setup(props) {
		const { id, mediaType } = toRefs(props);

		// 비슷한 콘텐츠 펼침 여부
		const isOpen = ref(false);

		/**
		 * 비슷한 콘텐츠 fold 버튼 font-awesome 아이콘
		 * @returns array
		 */
		const foldBtnIcon = computed(() => {
			const icon = isOpen.value ? 'caret-up' : 'caret-down';

			return ['fas', icon];
		});

		const {
			similarContents,
			isSimilarContents,
			loadingSimilarContents,
			fetchSimilarContents,
		} = similarContentsComposable(id.value, mediaType.value);

		fetchSimilarContents();

		return {
			isOpen,
			foldBtnIcon,
			similarContents,
			isSimilarContents,
			loadingSimilarContents,
		};
	},
};
</script>

<style lang="scss" scoped>
.similar-contents {
	position: relative;
	margin-bottom: 3rem;
	border-bottom: 1.5px solid rgba(255, 255, 255, 0.45);

	&__title {
		margin-bottom: 2.5rem;
		font-size: 2.75rem;
		line-height: 1em;
		font-weight: 500;
	}

	// inner
	&__inner {
		overflow: hidden;
		max-height: 90rem;
		padding-bottom: 8rem;
	}

	&.opened {
		.similar-contents {
			&__inner {
				max-height: none;
			}
		}
	}

	&:not(.opened) {
		&:after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 5rem;
			background: linear-gradient(to top, #181818, transparent);
			z-index: 1;
		}
	}

	// list
	&__list {
		display: grid;
		column-gap: 2rem;
		row-gap: 2rem;
		grid-template-columns: repeat(3, 1fr);

		@include tablet {
			column-gap: 1.6rem;
			row-gap: 1.6rem;
			grid-template-columns: repeat(2, 1fr);
		}

		@include mobile {
			display: flex;
			flex-direction: column;
			column-gap: 0;
			row-gap: 0;
		}
	}

	&__item {
		@include mobile {
			&:not(:last-child) {
				margin-bottom: 1.6rem;
			}
		}

		.skeleton-box {
			border-radius: 4px;
		}

		&::v-deep .media-card {
			height: 100%;

			&__inner {
				display: flex;
				flex-direction: column;
				height: 100%;
			}

			&__backdrop-image {
				flex: 0;
			}

			&__info {
				flex: 1;
			}
		}
	}

	// fold/unfold btn
	.btn--fold {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 50%);
		width: 6rem;
		height: 6rem;
		z-index: 2;

		input {
			display: none;
		}

		&:hover {
			border-color: white;
		}
	}
}
</style>
