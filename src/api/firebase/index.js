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

/**
 * 좋아요 목록에 추가
 * @param {string} userId : user uid
 * @param {string} id : movie, tv id
 * @returns {object}
 */
const addToLikes = async (userId, id) => {
	try {
		return await runTransaction(db, async transaction => {
			if (typeof id === 'string') {
				id = Number(id);
			}

			const userRef = getUserRef(userId);
			const userDoc = await transaction.get(userRef);

			if (!userDoc.exists()) {
				throw new Error('document does not exist!');
			}

			const userData = userDoc.data();

			const { likes, hates } = userData;

			likes.push(id);

			const newUserData = {
				likes,
			};

			const indexInHates = Array.prototype.indexOf.call(hates, id);

			// 싫어요 목록에 있는 경우
			if (indexInHates > -1) {
				const newHates = [
					...hates.slice(0, indexInHates),
					...hates.slice(indexInHates + 1),
				];

				newUserData.hates = newHates;
			}

			transaction.update(userRef, newUserData);

			return {
				data: newUserData,
				isError: false,
			};
		});
	} catch (error) {
		console.error('addToLikes', error);
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
 * 좋아요 목록에서 제거
 * @param {string} userId : user uid
 * @param {string} id : movie, tv id
 * @returns {object}
 */
const removeFromLikes = async (userId, id) => {
	try {
		return await runTransaction(db, async transaction => {
			if (typeof id === 'string') {
				id = Number(id);
			}

			const userRef = getUserRef(userId);
			const userDoc = await transaction.get(userRef);

			if (!userDoc.exists()) {
				throw new Error('document does not exist!');
			}

			const userData = userDoc.data();

			const { likes } = userData;

			const index = Array.prototype.indexOf.call(likes, id);

			if (index < 0) {
				throw new Error(
					'TV 또는 영화가 좋아요 목록에 존재하지 않습니다.',
				);
			}

			const newLikes = [
				...likes.slice(0, index),
				...likes.slice(index + 1),
			];

			transaction.update(userRef, {
				likes: newLikes,
			});

			return {
				data: newLikes,
				isError: false,
			};
		});
	} catch (error) {
		console.error('removeFromLikes', error);
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
 * 싫어요 목록에 추가
 * @param {string} userId : user uid
 * @param {string} id : movie, tv id
 * @returns {object}
 */
const addToHates = async (userId, id) => {
	try {
		return await runTransaction(db, async transaction => {
			if (typeof id === 'string') {
				id = Number(id);
			}

			const userRef = getUserRef(userId);
			const userDoc = await transaction.get(userRef);

			if (!userDoc.exists()) {
				throw new Error('document does not exist!');
			}

			const userData = userDoc.data();

			const { likes, hates } = userData;

			hates.push(id);

			const newUserData = {
				hates,
			};

			const indexInLikes = Array.prototype.indexOf.call(likes, id);

			// 좋아요 목록에 있는 경우
			if (indexInLikes > -1) {
				const newLikes = [
					...likes.slice(0, indexInLikes),
					...likes.slice(indexInLikes + 1),
				];

				newUserData.likes = newLikes;
			}

			transaction.update(userRef, newUserData);

			return {
				data: newUserData,
				isError: false,
			};
		});
	} catch (error) {
		console.error('addToHates', error);
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
 * 싫어요 목록에서 제거
 * @param {string} userId : user uid
 * @param {string} id : movie, tv id
 * @returns {object}
 */
const removeFromHates = async (userId, id) => {
	try {
		return await runTransaction(db, async transaction => {
			if (typeof id === 'string') {
				id = Number(id);
			}

			const userRef = getUserRef(userId);
			const userDoc = await transaction.get(userRef);

			if (!userDoc.exists()) {
				throw new Error('document does not exist!');
			}

			const userData = userDoc.data();

			const { hates } = userData;

			const index = Array.prototype.indexOf.call(hates, id);

			if (index < 0) {
				throw new Error(
					'TV 또는 영화가 싫어요 목록에 존재하지 않습니다.',
				);
			}

			const newHates = [
				...hates.slice(0, index),
				...hates.slice(index + 1),
			];

			transaction.update(userRef, {
				hates: newHates,
			});

			return {
				data: newHates,
				isError: false,
			};
		});
	} catch (error) {
		console.error('removeFromHates', error);
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

export {
	fetchUserData,
	addToFavorites,
	removeFromFavorites,
	addToLikes,
	removeFromLikes,
	addToHates,
	removeFromHates,
};
