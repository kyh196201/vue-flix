<template>
	<section class="season-list">
		<h3 class="sr-only">시즌 및 회차 정보</h3>

		<div>
			<h4>시즌 정보</h4>
			<pre>
				{{ seasons }}
			</pre
			>
		</div>

		<div>
			<h4>회차 정보</h4>
			<pre></pre>
		</div>
	</section>
</template>

<script>
import { toRefs, ref, watch } from 'vue';

// API
import { getSeasonDetail } from '@/api/tv';

export default {
	name: 'season-list',

	props: {
		id: {
			type: [Number, String],
			required: true,
		},

		seasons: {
			type: Array,
			default: () => [],
			required: false,
		},
	},

	setup(props) {
		const { seasons, id } = toRefs(props);

		const fetchSeasonDetail = async () => {
			const result = await getSeasonDetail(
				id.value,
				currentSeasonNumber.value,
			);

			if (result.isError) {
				console.error(result.errorData);
			}

			console.log('result.data', result.data);
		};

		// 현재 선택된 시즌 넘버
		const currentSeasonNumber = ref(null);

		if (seasons.value.length) {
			currentSeasonNumber.value = seasons.value[0].season_number;
		}

		// 선택된 시즌 넘버 변경 감지
		watch(
			currentSeasonNumber,
			(newNumber, oldNumber) => {
				console.log(newNumber, oldNumber);
				fetchSeasonDetail();
			},
			{ immediate: true },
		);

		return {
			currentSeasonNumber,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/season-list.scss';
</style>
