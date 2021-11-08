<template>
	<div class="video-player" v-if="videoUrl">
		<iframe
			class="video-player__iframe"
			:src="videoUrl"
			frameborder="0"
		></iframe>
	</div>
</template>

<script>
import { toRefs, computed } from 'vue';

import getVideoUrl from '@/utils/common/getVideoUrl';

export default {
	name: 'video-payer',

	props: {
		video: {
			type: Object,
			default: () => {},
			required: true,
		},
	},

	setup(props) {
		const { video } = toRefs(props);

		// Computed
		const videoUrl = computed(() => {
			const { site, key } = video.value;
			return getVideoUrl(site, key) + '?autoplay=1&mute=1&controls=0';
		});

		return {
			videoUrl,
		};
	},
};
</script>

<style lang="scss" scoped>
.video-player {
	position: relative;
	width: 100%;
	height: 100%;

	&__iframe {
		width: 100%;
		height: 100%;
	}
}
</style>
