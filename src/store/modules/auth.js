import firebaseAuth from '@/api/auth';

export default {
	namespaced: true,

	state: {},

	getters: {},

	mutations: {},

	actions: {
		async signUp(context, { email, password }) {
			try {
				const result = await firebaseAuth.signUpWithEmail(
					email,
					password,
				);

				if (result.isError) {
					throw result.errorData;
				}

				return result.data;
			} catch (error) {
				console.log(error);
			}
		},
	},
};
