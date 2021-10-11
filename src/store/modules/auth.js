/**
 * 로그인, 회원가입 스토어
 */
// Firebase Auth API
import firebaseAuth from '@/api/auth';

// 로컬스토리지 유저 세션 세팅
function setUserSession(idToken, refreshToken, userId, expireDate) {
	localStorage.setItem('idToken', idToken);
	localStorage.setItem('refreshToken', refreshToken);
	localStorage.setItem('userId', userId);
	localStorage.setItem('expireDate', String(expireDate));
}

// 로컬 스토리지 유저 세션 정보 가져오기
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

// 로컬 스토리지 유저 세션 정보 삭제하기
function clearUserSession() {
	const keys = ['idToken', 'refreshToken', 'userId', 'expireDate'];

	keys.forEach(key => {
		localStorage.removeItem(key);
	});
}

// 토큰 만료일 계산
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

		// 로딩
		loading: {
			signIn: false,
			signUp: false,
		},
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
		initUserData(state) {
			state.userId = '';
			state.idToken = '';
			state.refreshToken = '';
			state.expireDate = '';

			state.userProfile = null;
		},

		setAuthError(state, errorData) {
			state.errorData = errorData;
		},

		/**
		 * 유저 인증 정보, 프로필 초기화
		 * @param {object} state : store state
		 * @param {string} key : state.loading 키 값
		 * @param {boolean} loading : true/false 값
		 */
		setLoading(state, { key, loading }) {
			state.loading[key] = loading;
		},
	},

	actions: {
		// 이메일 비밀번호를 이용한 회원가입
		async signUp({ commit, getters }, { email, password }) {
			commit('setLoading', {
				key: 'signUp',
				loading: true,
			});

			const result = await firebaseAuth.signUpWithEmail(email, password);

			if (result.isError) {
				const { errorData } = result;

				commit('setAuthError', errorData);

				commit('setLoading', {
					key: 'signUp',
					loading: false,
				});
				throw errorData;
			}

			// API 요청 성공했으므로 error 데이터 삭제
			if (getters.isError) {
				commit('setAuthError', null);
			}

			commit('setLoading', {
				key: 'signUp',
				loading: false,
			});

			return result.data;
		},

		// 이메일 비밀번호를 이용한 로그인
		async signIn({ commit, getters }, { email, password }) {
			commit('setLoading', {
				key: 'signIn',
				loading: true,
			});

			const result = await firebaseAuth.signInWithEmail(email, password);

			if (result.isError) {
				const { errorData } = result;

				commit('setAuthError', errorData);
				commit('setLoading', {
					key: 'signIn',
					loading: false,
				});
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

			commit('setUserProfile', user);

			commit('setLoading', {
				key: 'signIn',
				loading: false,
			});

			// 로그인 세션 유지를 위해 로컬스토리지에 유저 정보를 저장
			setUserSession(idToken, refreshToken, localId, expireDate);

			if (getters.isError) {
				commit('setAuthError', null);
			}

			return result.data;
		},

		/**
		 * 사용자 로그아웃
		 */
		async signOut({ commit }) {
			const result = await firebaseAuth.signOutUser();

			if (result.isError) {
				commit('setAuthError', result.errorData);
				throw result.errorData;
			}

			commit('initUserData');
			clearUserSession();

			return true;
		},

		/**
		 * 로그인 세션 있을 경우 재 로그인
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
