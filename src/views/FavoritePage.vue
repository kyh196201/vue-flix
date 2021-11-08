<template>
	<section class="favorite-page">
		<h2 class="visually-hidden">찜한 목록 페이지</h2>
		<section class="favorite-page__movie-list" v-if="isFavoriteList">
			<ul class="movie-list">
				<li
					v-for="(media, index) in favoriteList"
					:key="`${index}-${media.id}`"
				>
					<MediaItem
						:mediaType="media.mediaType"
						:mediaData="media"
						:targetPath="getTargetPath(media.mediaType, media.id)"
					></MediaItem>
				</li>
			</ul>
		</section>

		<section class="favorite-page__empty" v-else>
			<h3>찜한 프로그램이 없습니다. 🙂</h3>
		</section>

		<!-- router-view -->
		<router-view v-slot="{ Component }">
			<transition name="modal" mode="out-in">
				<component :is="Component"></component>
			</transition>
		</router-view>
	</section>
</template>

<script>
// Components
import MediaItem from '@/components/MediaItem.vue';

import { createNamespacedHelpers } from 'vuex';

const authModule = createNamespacedHelpers('auth');

export default {
	name: 'favorite-page',

	components: {
		MediaItem,
	},

	computed: {
		...authModule.mapGetters(['favoriteList']),

		isFavoriteList() {
			return !!this.favoriteList?.length;
		},
	},

	methods: {
		/**
		 * MediaItem child route 경로 커스텀 지정
		 */
		getTargetPath(type, id) {
			let path = '/detail/';

			if (type === 'tv') {
				path += `tv/${id}`;
			} else if (type === 'movie') {
				path += `movie/${id}`;
			}

			return path;
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/views/favorite-page.scss';
</style>
