import { doc, getDoc, runTransaction } from 'firebase/firestore';

import { db } from '@/firebase';

const getUserRef = userId => doc(db, 'users', userId);

/**
 * 유저 정보
 * @param {string} userId : 현재 사용자 uid
 * @returns {object}
 */
const fetchUserData = async userId => {
	try {
		const userRef = getUserRef(userId);
		const docSnap = await getDoc(userRef);

		if (docSnap.exists()) {
			const userData = docSnap.data();

			return {
				data: userData,
				isError: false,
			};
		} else {
			// doc.data() will be undefined in this case
			throw new Error('No such document!');
		}
	} catch (error) {
		console.error(error);

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

/**
 * 찜하기 목록에 추가
 * @param {string} userId : user uid
 * @param {object} media : movie, tv data
 * @returns {object}
 */
const addToFavorites = async (userId, media) => {
	try {
		// https://stackoverflow.com/questions/46757614/how-to-update-an-array-of-objects-with-firestore
		return await runTransaction(db, async transaction => {
			const userRef = getUserRef(userId);
			const userDoc = await transaction.get(userRef);

			if (!userDoc.exists()) {
				throw new Error('document does not exist!');
			}

			const newFavorites = userDoc.data().favorites;

			newFavorites.push(media);

			transaction.update(userRef, {
				favorites: newFavorites,
			});

			return {
				data: newFavorites,
				isError: false,
			};
		});
	} catch (error) {
		console.error('addToFavorites', error);
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

/**
 * 찜하기 목록에서 제거
 * @param {string} userId : user uid
 * @param {string} id : movie, tv id
 * @returns {object}
 */
const removeFromFavorites = async (userId, id) => {
	try {
		// https://stackoverflow.com/questions/46757614/how-to-update-an-array-of-objects-with-firestore
		return await runTransaction(db, async transaction => {
			const userRef = getUserRef(userId);
			const userDoc = await transaction.get(userRef);

			if (!userDoc.exists()) {
				throw new Error('document does not exist!');
			}

			const favorites = userDoc.data().favorites;

			const newFavorites = favorites.filter(item => {
				return item.id !== +id;
			});

			transaction.update(userRef, {
				favorites: newFavorites,
			});

			return {
				data: newFavorites,
				isError: false,
			};
		});
	} catch (error) {
		console.error('removeFromFavorites', error);
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

export { fetchUserData, addToFavorites, removeFromFavorites };
