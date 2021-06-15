// TODO '/configuration'을 통해서 기본 세팅하기
// TMDB API 이미지 base url
const baseUrl = 'https://image.tmdb.org/t/p/';

// image sizes
const imgSizes = {
	backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
	logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
	poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
	profile_sizes: ['w45', 'w185', 'h632', 'original'],
	still_sizes: ['w92', 'w185', 'w300', 'original'],
};

export default function getImageUrl(url, size = 2, type) {
	if (type === 'backdrop') {
		return baseUrl + imgSizes.backdrop_sizes[size] + url;
	} else {
		return baseUrl + imgSizes.poster_sizes[size] + url;
	}
}
