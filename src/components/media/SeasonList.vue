<template>
	<section class="seasons">
		<h3 class="sr-only">시즌 및 회차 정보</h3>

		<header class="seasons__header">
			<h4 class="seasons__title">회차</h4>

			<!-- 드롭다운 영역 -->
			<dropdown-menu class="seasons__menu">
				<template #title>
					<span v-if="currentSeason">
						{{ currentSeason.name }}
					</span>
				</template>

				<template #content>
					<ul class="season-list" role="menu">
						<template
							v-for="(season, index) in seasons"
							:key="`season-${index}`"
						>
							<li
								class="season-list__season"
								role="menuitem"
								tabindex="0"
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
					<li
						class="episode"
						role="button"
						tabindex="0"
						aria-label="시작의 마을"
					>
						<strong class="episode__number">50</strong>
						<div class="episode__poster">
							<figure class="episode__figure">
								<img
									src="https://image.tmdb.org/t/p/w342/uacNwki3PqXEFk9Pal9Ng5NwwAI.jpg"
									alt="123"
								/>
							</figure>
						</div>
						<div class="episode__info">
							<div class="episode__header">
								<h5 class="episode__title">시작의 마을</h5>
								<span class="episode__air-date"
									>2021-09-17</span
								>
							</div>
							<p class="episode__overview">
								Lorem ipsum dolor sit, amet consectetur
								adipisicing elit. Nemo tempora debitis sapiente
								modi omnis doloribus laudantium voluptatibus
								esse obcaecati reiciendis nostrum, laboriosam
								fuga, quod facilis quia recusandae in adipisci
								suscipit!
							</p>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<!-- caret-up, down -->
		<label class="btn btn--user btn--fold">
			<input type="checkbox" />
			<font-awesome-icon
				class="btn__icon"
				:icon="['fas', 'caret-up']"
			></font-awesome-icon>
			<span class="btn__title">찜하기</span>
		</label>
	</section>
</template>

<script>
import { toRefs, ref, watch, computed } from 'vue';

// 컴포넌트
import DropdownMenu from '@/components/common/DropdownMenu.vue';

// API
import { getSeasonDetail } from '@/api/tv';

export default {
	name: 'season-list',

	components: {
		DropdownMenu,
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

		// 시즌 회차 리스트
		const episodes = ref([]);

		// 현재 선택된 시즌 아이디
		const currentSeasonId = ref(null);

		// 현재 선택된 시즌
		const currentSeason = computed(() => {
			if (!currentSeasonId.value) return null;

			return seasons.value.find(({ id }) => id === currentSeasonId.value);
		});

		if (seasons.value.length) {
			currentSeasonId.value = seasons.value[0].id;
		}

		// 시즌 정보 조회
		const fetchSeasonDetail = async () => {
			const seasonNumber = currentSeason.value.season_number;

			const result = await getSeasonDetail(id.value, seasonNumber);

			if (result.isError) {
				console.error(result.errorData);
			}

			episodes.value = result.data.episodes;
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
			currentSeason,
			episodes,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/season-list.scss';
</style>
