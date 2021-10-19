import { ref, computed } from 'vue';

export default function filterComposable(filterId = 'pd') {
	const filters = [
		{
			id: 'pd',
			title: '인기 높은순',
			queryValue: 'popularity.desc',
		},
		{
			id: 'rd',
			title: '최신',
			queryValue: 'release_date.desc',
		},
		{
			id: 'ra',
			title: '오래된',
			queryValue: 'release_date.asc',
		},
		{
			id: 'vd',
			title: '평점 높은순',
			queryValue: 'vote_average.desc',
		},
		{
			id: 'va',
			title: '평점 낮은순',
			queryValue: 'vote_average.asc',
		},
	];

	const selectedFilterId = ref('pd');

	if (filterId) {
		selectedFilterId.value = filterId;
	}

	const selectFilter = id => {
		selectedFilterId.value = id;
	};

	const selectedFilter = computed(() => {
		return filters.find(f => f.id === selectedFilterId.value);
	});

	return {
		filters,
		selectedFilter,
		selectedFilterId,

		selectFilter,
	};
}
