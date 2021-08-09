import { computed } from 'vue';

// Utils
import getImageUrl from '@/utils/common/getImageUrl.js';
import { getReleaseYear, formatRuntime } from '@/utils/movie';

const movieItem = props => {
	const { movieData, imageType } = props;

	const isMovieData = computed(() => !!movieData);

	// movie title
	const movieTitle = computed(() => movieData?.title);

	// movie image
	const posterImage = computed(() => {
		const type = `${imageType}_path`;

		if (!isMovieData.value) {
			return '';
		}

		const imageSrc = movieData[type];
		return getImageUrl(imageSrc, 2, imageType);
	});

	// movie overview
	const overview = computed(() => movieData?.overview);

	// movie releaseDate
	const releaseDate = computed(() => {
		if (!movieData?.release_date) return '';

		return getReleaseYear(movieData.release_date);
	});

	// movie runTime
	const runTime = computed(() => {
		if (!movieData?.runtime) return '';

		return formatRuntime(movieData.runtime);
	});

	return {
		// Computed
		isMovieData,
		movieTitle,
		posterImage,
		overview,
		releaseDate,
		runTime,
	};
};

export default movieItem;
