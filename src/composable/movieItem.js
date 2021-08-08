import { computed } from 'vue';

import getImageUrl from '@/utils/common/getImageUrl.js';

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

		return getImageUrl(imageSrc, 2, type);
	});

	return {
		// Computed
		isMovieData,
		movieTitle,
		posterImage,
	};
};

export default movieItem;
