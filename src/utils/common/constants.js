// 영화 API 조회 > release-type
export const RELEASE_TYPES = [
	{
		releaseType: 'now_playing',
		title: '지금 상영중인 영화',
	},
	{
		releaseType: 'upcoming',
		title: '곧 개봉하는 영화',
	},
	{
		releaseType: 'top_rated',
		title: '높은 평점을 받은 영화',
	},
	{
		releaseType: 'popular',
		title: '인기 있는 영화',
	},
	// {
	// 	releaseType: 'latest',
	// 	title: '최신 영화',
	// },
];

// tmdb image type
export const IMAGE_TYPES = {
	backdrop: 'backdrop',
	poster: 'poster',
};

// router links
export const routerLinks = [
	{
		path: '/',
		name: '홈',
	},
	{
		path: '/movie',
		name: '영화',
	},
	{
		path: 'favorite',
		name: '내가 찜한 콘텐츠',
	},
];

export const KEYS = {
	esc: 'Escape',
};
