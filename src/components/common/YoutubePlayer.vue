<template>
	<div class="video-player">
		<div id="player"></div>
	</div>
</template>

<script>
import {
	toRefs,
	onMounted,
	onBeforeUnmount,
	ref,
	reactive,
	computed,
	watch,
} from 'vue';

import YouTubePlayer from 'youtube-player';

const UNSTARTED = -1;
const ENDED = 0;
const PLAYING = 1;
const PAUSED = 2;
const BUFFERING = 3;
const CUED = 5;

export default {
	name: 'youtube-payer',

	emits: ['state-change', 'end', 'error', 'ready'],

	props: {
		videoId: {
			type: String,
			default: '',
			required: true,
		},

		playerVars: {
			type: Object,
			default: () => ({}),
			required: false,
		},

		height: {
			type: [String, Number],
			default: '100%',
			required: false,
		},

		width: {
			type: [String, Number],
			default: '100%',
			required: false,
		},
	},

	setup(props, context) {
		const { videoId, width, height } = toRefs(props);
		const playerVars = reactive({ ...toRefs(props.playerVars) });
		const player = ref(null);
		const playerState = ref(null);

		const stateNames = {
			[UNSTARTED]: 'unstarted',
			[ENDED]: 'ended',
			[PLAYING]: 'playing',
			[PAUSED]: 'paused',
			[BUFFERING]: 'buffering',
			[CUED]: 'video cued',
		};

		const isMuted = computed(() => Boolean(playerVars.mute));

		watch(isMuted, value => {
			if (!player.value) return;

			if (value) {
				player.value.mute();
			} else {
				player.value.unMute();
			}
		});

		// NOTE boolean -> 1, 0으로 어떻게 바꿨는지 참고하기
		const getPlayerVars = function getPlayerVars(vars = {}) {
			const defaultVars = {
				loop: true,
				mute: false,
				controls: false,
			};

			const mixedVars = Object.assign({}, defaultVars, vars);
			const resultVars = {};

			for (let key in mixedVars) {
				if (key !== 'autoplay') {
					// NOTE boolean -> number type으로 바꾸는 방법
					resultVars[key] = +mixedVars[key];
				}
			}

			return resultVars;
		};

		const loadVideo = function loadVideo() {
			player.value = YouTubePlayer('player', {
				height: height.value,
				width: width.value,
				videoId: videoId.value,
				playerVars: getPlayerVars(playerVars),
			});

			if (playerVars.autoplay) {
				player.value.playVideo();
			}

			player.value.on('stateChange', function ({ data }) {
				const state = stateNames[data];

				if (!state) return;

				playerState.value = data;
				context.emit('state-change', state);

				if (data == 0 && !playerVars.loop) {
					context.emit('end');
				}
			});
		};

		const initState = function initState() {
			playerState.value = null;
			player.value = null;
		};

		onMounted(() => {
			loadVideo();
		});

		onBeforeUnmount(() => {
			initState();
		});

		return {
			player,
			playerOptions: playerVars,
			isMuted,
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
