import { ref, computed } from 'vue';
import getGenres from '@/api/genres';

/**
 * 영화, TV 장르 composition api
 * @param {string} type : media type -> movie|tv
 */
export default function genreListComposable(type = 'movie', genreId = null) {
	const genres = ref([]);

	const selectedGenreId = ref(null);

	if (genreId) {
		selectedGenreId.value = genreId;
	}

	const fetchGenres = async () => {
		const result = await getGenres(type);

		if (result.isError) {
			console.error(result.errorData);
		}

		genres.value = result.data.genres;
	};

	const selectGenre = id => {
		selectedGenreId.value = id;
	};

	const selectedGenre = computed(() => {
		return genres.value.length
			? genres.value.find(({ id }) => id === selectedGenreId.value)
			: null;
	});

	return {
		genres,
		selectedGenreId,
		selectedGenre,
		fetchGenres,
		selectGenre,
	};
}
