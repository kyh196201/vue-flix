import firebaseAuth from '@/api/auth';

export default {
	namespaced: true,

	state: {
		// 유저 아이디
		userId: '',

		// 유저 토큰
		userToken: '',

		// 유저 프로필
		userProfile: {},

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
			return !!state.userToken;
		},
	},

	mutations: {
		/**
		 * 유저 아이디, 토큰 설정
		 * @param {object} state : store state
		 * @param {object} user : firebase auth object
		 */
		setUserAuth(state, user) {
			const { uid, accessToken } = user;

			state.userId = uid;
			state.userToken = accessToken;
		},

		/**
		 * 유저 프로필 설정
		 * @param {object} state : store state
		 * @param {object} user : firebase auth object
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

			console.log(result.data.user);

			commit('setUserAuth', result.data.user);
			commit('setUserProfile', result.data.user);

			if (getters.isError) {
				commit('setErrorData', null);
			}

			return result.data;
		},
	},
};
