// Tv Similar Contents Composable
import { ref, computed } from 'vue';

import { getSimilarTvPrograms } from '@/api/tv';

export default function similarProgramsComposable(id) {
	const similarContents = ref([]);

	const loading = ref(false);

	// 비슷한 TV 프로그램 조회
	const fetchSimilarContents = async () => {
		try {
			loading.value = true;

			const result = await getSimilarTvPrograms(id);

			if (result.isError) {
				throw result.errorData;
			}

			similarContents.value = result.data?.results || [];
		} catch (error) {
			console.error('fetchSimilarTvPrograms error', error.message);
		} finally {
			loading.value = false;
		}
	};

	const isSimilarContents = computed(() => {
		return !!similarContents.value.length;
	});

	return {
		similarContents,
		loadingSimilarContents: loading,
		isSimilarContents,

		// Functions
		fetchSimilarContents,
	};
}
