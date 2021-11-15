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

export default {
	name: 'youtube-payer',

	emits: ['state-change', 'end'],

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
			'-1': 'unstarted',
			0: 'ended',
			1: 'playing',
			2: 'paused',
			3: 'buffering',
			5: 'video cued',
		};

		const isMuted = computed(() => Boolean(playerVars.mute));

		watch(
			() => isMuted.value,
			value => {
				if (!stateNames[playerState.value]) return;

				if (value) {
					player.value.mute();
				} else {
					player.value.unMute();
				}
			},
		);

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

			player.value.on('stateChange', function (event) {
				const state = stateNames[event.data];

				if (!state) return;

				playerState.value = event.data;
				context.emit('state-change', state);

				if (state === 'ended') {
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
