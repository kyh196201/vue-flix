// Firebase Auth관련 로직
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

import { auth } from '@/firebase';

// 신규 사용자 가입
// https://firebase.google.com/docs/auth/web/start?authuser=0#sign_up_new_users
const signUpWithEmail = async (email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		);

		return {
			data: userCredential,
			isError: false,
		};
	} catch (error) {
		const { code, message } = error;

		return {
			isError: true,
			errorData: {
				message,
				statusCode: code,
			},
		};
	}
};

// 사용자 로그인
const signInWithEmail = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password,
		);

		return {
			data: userCredential,
			isError: false,
		};
	} catch (error) {
		const { code, message } = error;

		return {
			isError: true,
			errorData: {
				message,
				statusCode: code,
			},
		};
	}
};

// 사용자 로그아웃
const signOutUser = async () => {
	try {
		await signOut(auth);

		return {
			isError: false,
			data: null,
		};
	} catch (error) {
		const { code, message } = error;

		return {
			isError: true,
			errorData: {
				message,
				statusCode: code,
			},
		};
	}
};

export default { signUpWithEmail, signInWithEmail, signOutUser };
