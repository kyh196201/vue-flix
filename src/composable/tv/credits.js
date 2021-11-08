// Tv Credit Composable
import { ref, computed } from 'vue';

import { getTvCredits } from '@/api/tv';

export default function creditsComposable(id) {
	const credits = ref(null);

	const loading = ref(false);

	/**
	 * 대표 출연진
	 * @returns {array}
	 */
	const castList = computed(() => {
		if (!credits.value?.cast?.length) {
			return [];
		}

		return credits.value.cast.slice(0, 4);
	});

	// 영화 출연진 조회
	const fetchTvCredits = async () => {
		try {
			loading.value = true;
			const result = await getTvCredits(id);

			if (result.isError) {
				throw result.errorData;
			}

			credits.value = result.data;
		} catch (error) {
			console.error('fetchTvCredits error', error.message);
		} finally {
			loading.value = false;
		}
	};

	return {
		credits,
		loadingCredits: loading,
		castList,

		// Functions
		fetchTvCredits,
	};
}
