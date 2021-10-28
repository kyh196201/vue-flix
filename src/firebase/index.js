// Firebase 앱 초기화
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
	getFirestore,
	collection,
	getDocs,
	doc,
	setDoc,
} from 'firebase/firestore';

import store from '@/store/';

const {
	VUE_APP_FIREBASE_API_KEY,
	VUE_APP_FIREBASE_AUTH_DOMAIN,
	VUE_APP_FIREBASE_PROJECT_ID,
	VUE_APP_FIREBASE_STORAGE_BUCKET,
	VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
	VUE_APP_FIREBASE_APP_ID,
	VUE_APP_FIREBASE_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
	apiKey: VUE_APP_FIREBASE_API_KEY,
	authDomain: VUE_APP_FIREBASE_AUTH_DOMAIN,
	projectId: VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: VUE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: VUE_APP_FIREBASE_APP_ID,
	measurementId: VUE_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

onAuthStateChanged(auth, async user => {
	try {
		// 유저 로그인
		if (user) {
			let isUserExists = false;
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			const { uid, email } = user.toJSON();

			const querySnapshot = await getDocs(collection(db, 'users'));
			querySnapshot.forEach(({ id }) => {
				if (id === uid) {
					isUserExists = true;
				}
			});

			if (!isUserExists) {
				const userData = {
					id: uid,
					email,
					favorites: [],
					likes: [],
					hates: [],
				};

				await setDoc(doc(db, 'users', uid), userData);
				await store.dispatch('auth/getUserData');

				console.log(`new user document created !! uid: ${uid}`);
			} else {
				await store.dispatch('auth/getUserData');
			}
		} else {
			// 유저 로그아웃
			if (store.state.auth.idToken) {
				store.commit('auth/initUserData');
			}
		}
	} catch (error) {
		console.error(error);
	}
});

export { app, auth, db };
