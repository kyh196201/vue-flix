// tv 영화 공통 Similar Contents Composable
import { ref, computed } from 'vue';

// Api
import createMediaApi from '@/api/media';

export default function similarProgramsComposable(id, mediaType = 'movie') {
	const similarContents = ref([]);
	const loading = ref(false);

	const api = createMediaApi(mediaType);

	// 비슷한 TV 프로그램 조회
	const fetchSimilarContents = async () => {
		loading.value = true;
		const result = await api.getSimilarPrograms(id);

		if (result.isError) {
			throw result.errorData;
		}

		similarContents.value = result.data?.results || [];
		loading.value = false;
	};

	const isSimilarContents = computed(() => {
		return similarContents.value.length > 0;
	});

	return {
		similarContents,
		loadingSimilarContents: loading,
		isSimilarContents,

		// Functions
		fetchSimilarContents,
	};
}
