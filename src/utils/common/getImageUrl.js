import { baseImageUrl } from '@/configs';

// image sizes
const imgSizes = {
	backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
	logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
	poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
	profile_sizes: ['w45', 'w185', 'h632', 'original'],
	still_sizes: ['w92', 'w185', 'w300', 'original'],
};

export default function getImageUrl(url, size = 2, type = 'poster') {
	let imageSize = '';

	if (type === 'backdrop') {
		imageSize = imgSizes.backdrop_sizes[size];
	} else if (type === 'still') {
		imageSize = imgSizes.still_sizes[size];
	} else {
		imageSize = imgSizes.poster_sizes[size];
	}

	return baseImageUrl + imageSize + url;
}
