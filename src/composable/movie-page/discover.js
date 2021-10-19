import { ref, computed } from 'vue';

// Api
import discover from '@/api/discover';

export default function discoverComposable(type = 'movie') {
	const movieList = ref([]);
	const loadingDiscover = ref(false);
	const page = ref(1);
	const totalPages = ref(0);

	// Convert route query to api params
	const queryToParams = (query = {}) => {
		const params = {};
		const keyMap = {
			genre: 'with_genres',
			filter: 'sort_by',
		};

		for (const [key, paramsKey] of Object.entries(keyMap)) {
			if (Object.prototype.hasOwnProperty.call(query, key)) {
				params[paramsKey] = query[key];
			}
		}

		return params;
	};

	// Discover tv or movie programs
	const discoverPrograms = async (query = {}, page = 1) => {
		const params = queryToParams(query);

		loadingDiscover.value = true;
		const result = await discover(type, { ...params, page });

		// NOTE composition api 에러 핸들링 찾아보기
		if (result.isError) {
			console.error(result.errorData);
			return false;
		}

		const { results, total_pages } = result.data;

		movieList.value = [...results];
		totalPages.value = total_pages;

		loadingDiscover.value = false;
		return results;
	};

	// Discover more tv or movie programs
	const discoverMorePrograms = async (query = {}, page = 1) => {
		try {
			const params = queryToParams(query);

			const result = await discover(type, { ...params, page });

			if (result.isError) {
				throw new Error(result.errorData);
			}

			const { results, total_pages } = result.data;

			movieList.value = [...movieList.value, ...results];

			totalPages.value = total_pages;

			return results;
		} catch (error) {
			console.error(error.message);
			return [];
		}
	};

	const isMovieList = computed(() => movieList.value.length > 0);

	return {
		loadingDiscover,
		movieList,
		totalPages,
		page,
		isMovieList,

		discoverPrograms,
		discoverMorePrograms,
	};
}
