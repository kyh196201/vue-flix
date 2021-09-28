// Firebase Auth관련 로직
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

// 신규 사용자 가입
// https://firebase.google.com/docs/auth/web/start?authuser=0#sign_up_new_users
const signUpWithEmail = async (email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		);
		console.log('signup user', userCredential.user);

		return {
			data: userCredential,
			isError: false,
		};
	} catch (error) {
		const { code, message } = error;
		console.log(code, message);

		return {
			isError: true,
			errorData: {
				message,
				statusCode: code,
			},
		};
	}
};

export default { signUpWithEmail };
