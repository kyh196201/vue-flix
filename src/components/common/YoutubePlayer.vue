<template>
	<div class="video-player">
		<div id="player"></div>
	</div>
</template>

<script>
import { toRefs, onMounted, ref } from 'vue';

import YouTubePlayer from 'youtube-player';

export default {
	name: 'video-payer',

	props: {
		videoId: {
			type: String,
			default: '',
			required: true,
		},
	},

	setup(props) {
		const { videoId } = toRefs(props);
		const player = ref(null);

		onMounted(() => {
			player.value = YouTubePlayer('player', {
				height: '100%',
				width: '100%',
				videoId: videoId.value,
			});
		});

		return {
			player,
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
