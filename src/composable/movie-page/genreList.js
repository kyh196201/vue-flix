import { ref } from 'vue';
import getGenres from '@/api/genres';

/**
 * 영화, TV 장르 composition api
 * @param {string} type : movie|tv
 */
export default function genreListComposable(type = 'movie') {
	const genres = ref([]);

	const selectedGenreId = ref(null);

	const fetchGenres = async () => {
		const result = await getGenres(type);

		if (result.isError) {
			throw result.errorData;
		}

		genres.value = result.data.genres;
	};

	const selectGenre = id => {
		selectedGenreId.value = id;
	};

	return {
		genres,
		selectedGenreId,
		fetchGenres,
		selectGenre,
	};
}
