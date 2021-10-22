import { computed, ref } from 'vue';

// Utils
import getImageUrl from '@/utils/common/getImageUrl.js';
import { getReleaseYear, formatRuntime } from '@/utils/movie';
import { isObject, isEmptyArray } from '@/utils/validate/';

export default function tvItem(data, imageType = 'poster') {
	const tvData = ref(data);

	const isTvData = computed(() => {
		return isObject(tvData.value);
	});

	// 출시일
	const firstAirDate = computed(() => {
		const date = tvData.value?.first_air_date;

		return date ? getReleaseYear(date) : '';
	});

	const title = computed(() => {
		if (!isTvData.value) return '';

		return tvData.value.name || tvData.value.original_name;
	});

	const posterImage = computed(() => {
		const type = `${imageType}_path`;

		if (!isTvData.value) return '';

		const imageSrc = tvData.value[type];

		return getImageUrl(imageSrc, 2, imageType);
	});

	const overview = computed(() => {
		if (!isTvData.value) return '';

		return tvData.value.overview;
	});

	const runTime = computed(() => {
		if (!isTvData.value) return '';

		const episodeRunTime = tvData.value.episode_run_time;

		return episodeRunTime && !isEmptyArray(episodeRunTime)
			? formatRuntime(episodeRunTime[0])
			: '';
	});

	return {
		tvData,

		// Computed
		isTvData,
		firstAirDate,
		title,
		posterImage,
		overview,
		runTime,

		// Functions
	};
}
