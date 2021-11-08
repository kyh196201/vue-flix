const PLATFOMRS = {
	vimeo: 'https://vimeo.com/',
	youtube: 'https://www.youtube.com/watch?v=',
};

// 플랫폼별 비디오 URL 가져오기
export default function getVideoUrl(video) {
	const { site, key } = video;

	return PLATFOMRS[site] ? PLATFOMRS[site] + key : '';
}
