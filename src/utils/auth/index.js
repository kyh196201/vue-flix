// Utils
import { getCookie, setCookie, eraseCookie } from '@/utils/common/cookie';

/**
 * 쿠키에 유저 이메일 저장
 * @param {string} userEmail : 유저 이메일
 * @returns {boolean}
 */
const saveUserEmailToCookie = userEmail => {
	setCookie('userEmail', userEmail, 30);

	return true;
};

/**
 * 쿠키에 저장된 유저 이메일 가져오기
 * @returns {string} : 유저 이메일
 */
const getUserEmailFromCookie = () => {
	return getCookie('userEmail');
};

/**
 * 쿠키에 저장된 유저 이메일 삭제
 * @returns {boolean}
 */
const removeUserEmailFromCookie = () => {
	eraseCookie('userEmail');

	return true;
};

/**
 * 로컬스토리지 유저 세션 정보 저장
 * @param {string} idToken : firebase 토큰
 * @param {string} refreshToken
 * @param {string} userId : 유저 아이디
 * @param {number} expireDate : 세션 만료 timestamp
 * @returns {boolean}
 */
function setUserSession(idToken, refreshToken, userId, expireDate) {
	localStorage.setItem('idToken', idToken);
	localStorage.setItem('refreshToken', refreshToken);
	localStorage.setItem('userId', userId);
	localStorage.setItem('expireDate', String(expireDate));

	return true;
}

/**
 * 로컬 스토리지 유저 세션 정보 가져오기
 * @returns {object}
 */
function getUserSession() {
	const idToken = localStorage.getItem('idToken') ?? '';
	const refreshToken = localStorage.getItem('refreshToken') ?? '';
	const userId = localStorage.getItem('userId') ?? '';
	const expireDate = localStorage.getItem('expireDate') ?? 0;

	return {
		idToken,
		refreshToken,
		userId,
		expireDate: Number(expireDate),
	};
}

/**
 * 로컬 스토리지 유저 세션 정보 삭제하기
 * @returns {boolean}
 */
function clearUserSession() {
	const keys = ['idToken', 'refreshToken', 'userId', 'expireDate'];

	keys.forEach(key => {
		localStorage.removeItem(key);
	});

	return true;
}

export {
	// 쿠키
	saveUserEmailToCookie,
	getUserEmailFromCookie,
	removeUserEmailFromCookie,
	// 로컬 스토리지 세션
	setUserSession,
	getUserSession,
	clearUserSession,
};
