import firebaseAuth from '@/api/auth';

function setUserSession(idToken, refreshToken, userId, expireDate) {
	localStorage.setItem('idToken', idToken);
	localStorage.setItem('refreshToken', refreshToken);
	localStorage.setItem('userId', userId);
	localStorage.setItem('expireDate', String(expireDate));
}

function getUserSession() {
	const idToken = localStorage.getItem('idToken') ?? '';
	const refreshToken = localStorage.getItem('refreshToken') ?? '';
	const userId = localStorage.getItem('userId') ?? '';
	const expireDate = localStorage.getItem('expireDate');

	return {
		idToken,
		refreshToken,
		userId,
		expireDate: expireDate ? Number(expireDate) : '',
	};
}

function clearUserSession() {
	const keys = ['idToken', 'refreshToken', 'userId', 'expireDate'];

	keys.forEach(key => {
		localStorage.removeItem(key);
	});
}

function getExpireDate(expireIn = '3600') {
	return Date.now() + expireIn * 1000;
}

export default {
	namespaced: true,

	state: {
		// 유저 아이디
		userId: '',

		// 유저 토큰
		idToken: '',

		// 리프레시 토큰
		refreshToken: '',

		// 세션 만료 시간
		expireDate: '',

		// 유저 프로필
		userProfile: null,

		// 에러 메시지, 코드
		errorData: null,
	},

	getters: {
		/**
		 * 에러 여부
		 * @param {object} state
		 * @returns {boolean}
		 */
		isError: state => {
			return !!state.errorData;
		},

		/**
		 * 로그인/인증 여부
		 * @param {object} state
		 * @returns {boolean}
		 */
		isAuthenticated: state => {
			return !!state.idToken;
		},
	},

	mutations: {
		/**
		 * 유저 인증 정보 설정
		 * @param {object} state : store state
		 * @param {object} tokenResponse : firebase tokenResponse object
		 */
		setUserAuth(state, tokenResponse) {
			const { userId, idToken, refreshToken, expireDate } = tokenResponse;

			state.userId = userId;
			state.idToken = idToken;
			state.refreshToken = refreshToken;
			state.expireDate = expireDate;
		},

		/**
		 * 유저 프로필 설정
		 * @param {object} state : store state
		 * @param {object} user : firebase user object
		 */
		setUserProfile(state, user) {
			const { displayName, email, emailVerified, photoURL } = user;

			state.userProfile = {
				displayName,
				email,
				emailVerified,
				photoURL,
			};
		},

		/**
		 * 유저 인증 정보, 프로필 초기화
		 * @param {object} state : store state
		 */
		clearUserData(state) {
			state.userId = '';
			state.idToken = '';
			state.refreshToken = '';
			state.expireDate = '';

			state.userProfile = null;
		},

		setErrorData(state, errorData) {
			state.errorData = errorData;
		},
	},

	actions: {
		// 이메일 비밀번호를 이용한 회원가입
		async signUp({ commit, getters }, { email, password }) {
			const result = await firebaseAuth.signUpWithEmail(email, password);

			if (result.isError) {
				const { errorData } = result;

				commit('setErrorData', errorData);
				throw errorData;
			}

			// API 요청 성공했으므로 error 데이터 삭제
			if (getters.isError) {
				commit('setErrorData', null);
			}

			return result.data;
		},

		// 이메일 비밀번호를 이용한 로그인
		async signIn({ commit, getters }, { email, password }) {
			const result = await firebaseAuth.signInWithEmail(email, password);

			if (result.isError) {
				const { errorData } = result;

				commit('setErrorData', errorData);
				throw errorData;
			}

			const { user, _tokenResponse } = result.data;
			const { localId, idToken, refreshToken, expireIn } = _tokenResponse;
			const expireDate = getExpireDate(expireIn);

			commit('setUserAuth', {
				userId: localId,
				idToken,
				refreshToken,
				expireDate,
			});

			// 로그인 세션 유지를 위해 로컬스토리지에 유저 정보를 저장
			setUserSession(idToken, refreshToken, localId, expireDate);

			commit('setUserProfile', user);

			if (getters.isError) {
				commit('setErrorData', null);
			}

			return result.data;
		},

		/**
		 * 사용자 로그아웃
		 */
		async signOut({ commit }) {
			const result = await firebaseAuth.signOutUser();

			if (result.isError) {
				throw result.errorData;
			}

			commit('clearUserData');
			clearUserSession();

			return true;
		},

		/**
		 * 로그인 세션 확인
		 */
		tryOutLogin({ commit }) {
			const { idToken, userId, expireDate, refreshToken } =
				getUserSession();

			// idToken이 있는지 확인
			if (!idToken) return;

			// 토큰이 유효한지 확인
			if (Date.now() > expireDate) {
				// 토큰이 유효하지 않은 경우
				clearUserSession();
			} else {
				// 토큰이 유효한 경우
				commit('setUserAuth', {
					idToken,
					userId,
					expireDate,
					refreshToken,
				});
			}

			return true;
		},
	},
};
