<template>
	<section class="seasons" :class="{ opened: open }">
		<h3 class="sr-only">시즌 및 회차 정보</h3>

		<header class="seasons__header">
			<h4 class="seasons__title">회차</h4>

			<!-- 시즌 선택 메뉴 영역 -->
			<dropdown-menu class="seasons__menu">
				<template #title>
					<span v-if="currentSeason">
						{{ currentSeason.name }}
					</span>
				</template>

				<template #content>
					<ul class="season-list" role="menu">
						<template
							v-for="season in seasons"
							:key="`season-${season.id}`"
						>
							<li
								class="season-list__season"
								role="menuitem"
								tabindex="0"
								:data-season-id="season.id"
								@click="currentSeasonId = season.id"
							>
								<strong class="season-list__name">
									{{ season.name }}
								</strong>
								<span class="season-list__episodes">
									({{ season.episode_count }}개 에피소드)
								</span>
							</li>
						</template>
					</ul>
				</template>
			</dropdown-menu>
		</header>

		<div class="seasons__box">
			<div class="seasons__content">
				<ul class="seasons__episodes">
					<template v-if="loading">
						<template
							v-for="(i, index) in 6"
							:key="`skeleton-${index}`"
						>
							<skeleton-box height="10rem"></skeleton-box>
						</template>
					</template>
					<template
						v-else
						v-for="(episode, index) in episodes"
						:key="`episode-${index}`"
					>
						<episode
							role="button"
							tabindex="0"
							:episode="episode"
						></episode>
					</template>
				</ul>
			</div>
		</div>

		<!-- caret-up, down -->
		<button class="btn btn--user btn--fold" @click="open = !open">
			<span class="sr-only">찜하기</span>
			<font-awesome-icon
				v-if="open"
				class="btn__icon"
				:icon="['fas', 'caret-up']"
			></font-awesome-icon>
			<font-awesome-icon
				v-else
				class="btn__icon"
				:icon="['fas', 'caret-down']"
			></font-awesome-icon>
		</button>
	</section>
</template>

<script>
import { toRefs, ref, watch, computed } from 'vue';

// 컴포넌트
import DropdownMenu from '@/components/common/DropdownMenu.vue';
import SkeletonBox from '@/components/common/loading/SkeletonBox.vue';
import Episode from './Episode.vue';

// API
import { getSeasonDetail } from '@/api/tv';

export default {
	name: 'season-list',

	components: {
		DropdownMenu,
		SkeletonBox,
		Episode,
	},

	props: {
		// 티비 Id
		id: {
			type: [Number, String],
			required: true,
		},

		// 티비 시즌 정보
		seasons: {
			type: Array,
			default: () => [],
			required: false,
		},
	},

	setup(props) {
		const { seasons, id } = toRefs(props);

		// 시즌 리스트 영역 펼침 여부
		const open = ref(false);

		// 시즌 회차 리스트
		const episodes = ref([]);

		const loading = ref(false);

		// 현재 선택된 시즌 아이디
		const currentSeasonId = ref(null);

		// 현재 선택된 시즌
		const currentSeason = computed(() => {
			if (!currentSeasonId.value) return null;

			return seasons.value.find(({ id }) => id === currentSeasonId.value);
		});

		// 최초 컴포넌튼 생성 시 선택된 시즌 id 설정
		if (seasons.value.length) {
			currentSeasonId.value = seasons.value[0].id;
		}

		// 시즌 정보 조회
		const fetchSeasonDetail = async () => {
			loading.value = true;

			const seasonNumber = currentSeason.value.season_number;

			const result = await getSeasonDetail(id.value, seasonNumber);

			if (result.isError) {
				console.error(result.errorData);
			}

			episodes.value = result.data.episodes;

			loading.value = false;
		};

		// 선택된 시즌 넘버 변경 감지
		watch(
			currentSeasonId,
			newId => {
				if (newId !== null) {
					fetchSeasonDetail();
				}
			},
			{ immediate: true },
		);

		return {
			open,
			loading,
			currentSeason,
			currentSeasonId,
			episodes,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/season-list.scss';
</style>
