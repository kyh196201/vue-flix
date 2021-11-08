import { computed, ref } from 'vue';

// Utils
import getImageUrl from '@/utils/common/getImageUrl.js';
import { getReleaseYear, formatRuntime } from '@/utils/movie';

const movieItem = (data, imageType = 'poster') => {
	const movieData = ref(data);

	const isMovieData = computed(() => !!movieData.value);

	// movie title
	const title = computed(() => movieData.value?.title);

	// movie image
	const posterImage = computed(() => {
		const type = `${imageType}_path`;

		if (!isMovieData.value) {
			return '';
		}

		const imageSrc = movieData.value[type];
		return getImageUrl(imageSrc, 2, imageType);
	});

	// movie overview
	const overview = computed(() => movieData.value?.overview);

	// movie releaseDate
	const releaseDate = computed(() => {
		if (!movieData.value?.release_date) return '';

		return getReleaseYear(movieData.value.release_date);
	});

	// movie runTime
	const runTime = computed(() => {
		if (!movieData.value?.runtime) return '';

		return formatRuntime(movieData.value.runtime);
	});

	return {
		// Computed
		isMovieData,
		title,
		posterImage,
		overview,
		releaseDate,
		runTime,
	};
};

export default movieItem;
