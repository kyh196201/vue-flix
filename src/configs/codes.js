// 앱 코드
const codes = {
	// https://firebase.google.com/docs/auth/admin/errors
	AUTH: {
		// 너무 많은 로그인 시도
		TOO_MANY_REQUEST: 'auth/too-many-requests',

		WRONG_PASSWORD: 'auth/wrong-password',

		USER_NOT_FOUND: 'auth/user-not-found',

		ALREADY_IN_USE: 'auth/email-already-in-use',

		ALREADY_EXISTS: 'auth/email-already-exists',
	},
};

export default Object.freeze(codes);
