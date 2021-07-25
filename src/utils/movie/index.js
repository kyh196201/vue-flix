// 영화 데이터 관련 함수
/**
 * 영화 출시일에서 년도만 가져오기
 * @param {string} releaseDate : '2021-11-11'
 * @returns {string} : '2011'
 */
const getReleaseYear = releaseDate => {
	if (!releaseDate) {
		throw new Error(`releaseDate가 필요합니다. ${releaseDate}`);
	}

	if (typeof releaseDate !== 'string') {
		throw new TypeError(
			`releaseDate의 타입이 문자열이 아닙니다. ${typeof releaseDate}`,
		);
	}

	return releaseDate.split('-')[0];
};

/**
 * 영화 러닝 타임 00시간 00분 포맷으로 변환하기
 * @param {number} runTime : 150
 * @returns {string} : '2시간 30분'
 */
const formatRuntime = runTime => {
	if (!runTime) {
		throw new Error(`runTime가 필요합니다. ${runTime}`);
	}

	if (typeof runTime !== 'number') {
		throw new TypeError(
			`runTime의 타입이 숫자가 아닙니다. ${typeof runTime}`,
		);
	}

	const minutes = runTime % 60;
	const hours = parseInt(runTime / 60);

	return `${hours > 0 ? `${hours}시간 ` : ''} ${minutes}분`;
};

export { getReleaseYear, formatRuntime };
