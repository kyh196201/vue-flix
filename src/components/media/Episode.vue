<template>
	<li
		class="episode"
		role="button"
		tabindex="0"
		:aria-label="episode.name"
		:data-episode-id="episode.id"
	>
		<strong class="episode__number">50</strong>
		<div class="episode__poster">
			<figure class="episode__figure">
				<img :src="posterImage" :alt="episode.name" />
			</figure>
		</div>
		<div class="episode__info">
			<div class="episode__header">
				<h5 class="episode__title">
					{{ episode.name }}
				</h5>
				<span class="episode__air-date">
					{{ episode.air_date }}
				</span>
			</div>
			<p class="episode__overview">
				{{ episode.overview || '줄거리가 등록되어 있지 않습니다. 😀' }}
			</p>
		</div>
	</li>
</template>

<script>
import { reactive, computed } from 'vue';

// Utils
import getImageUrl from '@/utils/common/getImageUrl.js';

export default {
	name: 'episode',

	props: {
		episode: {
			type: Object,
			default: () => ({}),
			required: true,
		},
	},

	setup(props) {
		const episode = reactive(props.episode);

		const posterImage = computed(() => {
			const { still_path } = episode;

			if (!still_path) return '';

			return getImageUrl(still_path, 2, 'still');
		});

		return {
			posterImage,
		};
	},
};
</script>

<style lang="scss" scoped>
.episode {
	display: flex;
	align-items: center;
	padding: 1.6rem;
	// font-size: 0.8em;
	// font-weight: normal;
	cursor: pointer;

	&__number,
	&__title,
	&__air-date,
	&__overview {
		line-height: 1.4;
	}

	&__number {
		font-size: 2.4rem;
	}

	&__poster {
		width: 18%;
		margin: 0 1.6rem;

		figure {
			overflow: hidden;
			position: relative;
			padding-top: 62.5%;
			border-radius: 0.5rem;
		}

		img {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	&__info {
		flex: 1;
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.8rem;
	}

	&__title,
	&__air-date {
		font-size: 1.6rem;
		font-weight: 600;
	}

	&__overview {
		font-size: 1.4rem;
		@include ellipsis(3);
	}
}
</style>
