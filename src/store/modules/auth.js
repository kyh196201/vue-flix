import firebaseAuth from '@/api/auth';

export default {
	namespaced: true,

	state: {
		// 유저 정보
		user: null,

		// 에러 메시지, 코드
		errorData: null,
	},

	getters: {
		// 에러 여부
		isError: state => {
			return !!state.errorData;
		},
	},

	mutations: {
		signIn(state, user) {
			state.user = user;
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

			commit('signIn', result.data.user);

			if (getters.isError) {
				commit('setErrorData', null);
			}

			return result.data;
		},
	},
};
