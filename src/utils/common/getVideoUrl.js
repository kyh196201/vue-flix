const PLATFOMRS = {
	vimeo: 'https://vimeo.com/',
	youtube: 'https://www.youtube.com/embed/',
};

// 플랫폼별 비디오 URL 가져오기
// Ref: https://www.themoviedb.org/talk/5955219ec3a3680d73048c7e
export default function getVideoUrl(site, key) {
	const platform = PLATFOMRS[site.toLowerCase()];

	return platform ? platform + key : '';
}
