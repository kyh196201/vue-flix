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

		const stateNames = {
			[UNSTARTED]: 'unstarted',
			[ENDED]: 'ended',
			[PLAYING]: 'playing',
			[PAUSED]: 'paused',
			[BUFFERING]: 'buffering',
			[CUED]: 'video cued',
		};

		// Computed
		const isMuted = computed(() => Boolean(playerVars.mute));

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

		const updatePlayer = function updatePlayer(newId) {
			// load new video
			console.log(newId);
		};

		// Event handlers
		const handleStageChange = function handleStageChange(event) {
			const state = stateNames[event.data];

			if (!state) return;
			context.emit('state-change', state);

			if (event.data == ENDED) {
				context.emit('end');
			}
		};

		const handleReady = function handleReady(event) {
			context.emit('ready', event.target);
		};

		const handleError = function handleError(event) {
			context.emit('error', event);
		};

		// Watch
		watch(isMuted, value => {
			if (!player.value) return;

			if (value) {
				player.value.mute();
			} else {
				player.value.unMute();
			}
		});

		watch(videoId, updatePlayer, { immediate: true });

		// Hooks
		onMounted(() => {
			player.value = YouTubePlayer('player', {
				height: height.value,
				width: width.value,
				videoId: videoId.value,
				playerVars: getPlayerVars(playerVars),
			});

			if (playerVars.autoplay) {
				player.value.playVideo();
			}

			player.value.on('ready', handleReady);
			player.value.on('stateChange', handleStageChange);
			player.value.on('error', handleError);
		});

		onBeforeUnmount(() => {
			if (player.value?.destroy) {
				player.value.destroy();
				player.value = null;
			}
		});
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
