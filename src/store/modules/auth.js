import firebaseAuth from '@/api/auth';

export default {
	namespaced: true,

	state: {
		user: null,
	},

	getters: {},

	mutations: {
		signIn(state, user) {
			state.user = user;
		},
	},

	actions: {
		// 이메일 비밀번호를 이용한 회원가입
		async signUp(context, { email, password }) {
			const result = await firebaseAuth.signUpWithEmail(email, password);

			if (result.isError) {
				throw result.errorData;
			}

			return result.data;
		},

		// 이메일 비밀번호를 이용한 로그인
		async signIn({ commit }, { email, password }) {
			const result = await firebaseAuth.signInWithEmail(email, password);

			if (result.isError) {
				throw result.errorData;
			}

			commit('signIn', result.data.user);
		},
	},
};
