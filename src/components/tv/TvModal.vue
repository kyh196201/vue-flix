<template>
	<Modal class="detail-modal tv-modal" @close="handleClose">
		<template v-slot:body>
			<section class="detail-modal__body">
				<h2 class="visually-hidden">TV 상세 모달</h2>
				<!-- billboard -->
				<section class="detail-modal__billboard">
					<div class="billboard__back">
						<!-- 포스터 -->
						<figure class="billboard__poster">
							<img
								v-if="backdropImage"
								:src="backdropImage"
								:alt="title"
								@error="onImageError"
							/>
						</figure>

						<!-- 비디오 -->
						<div class="billboard__trailer" v-if="videos.length">
							<youtube-player
								v-if="false"
								:video-id="videos[0].key"
								:player-vars="playerVars"
								@state-change="playerState = $event"
								@end="handleVideoEnd"
							/>
						</div>
					</div>
					<div class="billboard__front">
						<div class="billboard__info" v-if="isDetail">
							<!-- 제목 -->
							<div class="billboard__title">
								{{ title }}
							</div>

							<!-- 버튼 -->
							<div class="billboard__interface">
								<ul class="billboard__buttons">
									<li>
										<button
											type="button"
											class="btn btn--play"
										>
											<font-awesome-icon
												class="btn__icon"
												:icon="['fas', 'play']"
											></font-awesome-icon>
											<span class="btn__title">재생</span>
										</button>
									</li>
									<!-- +, 좋아요, 싫어요 버튼 -->
									<li>
										<button
											type="button"
											class="btn btn--user active"
											@click="handleRemoveFavorite"
											v-if="isFavoriteItem"
										>
											<font-awesome-icon
												class="btn__icon"
												:icon="['fas', 'check']"
											></font-awesome-icon>
											<span class="btn__title">
												찜하기 목록에서 제거
											</span>
										</button>
										<button
											type="button"
											class="btn btn--user"
											@click="handleAddFavorite"
											v-else
										>
											<font-awesome-icon
												class="btn__icon"
												:icon="['fas', 'plus']"
											></font-awesome-icon>
											<span class="btn__title">
												찜하기 목록에 추가
											</span>
										</button>
									</li>
									<li>
										<button
											type="button"
											class="btn btn--user btn--like"
											:class="{ active: isLikeItem }"
											@click="handleClickLike"
										>
											<font-awesome-icon
												class="btn__icon"
												:icon="['fas', 'thumbs-up']"
											></font-awesome-icon>
											<span class="btn__title"
												>좋아요 목록에 추가/제거</span
											>
										</button>
									</li>
									<li>
										<button
											type="button"
											class="btn btn--user btn--dislike"
											:class="{ active: isHateItem }"
											@click="handleClickHate"
										>
											<font-awesome-icon
												class="btn__icon"
												:icon="['fas', 'thumbs-down']"
											></font-awesome-icon>
											<span class="btn__title"
												>싫어요 목록에 추가/제거</span
											>
										</button>
									</li>
								</ul>
								<button
									class="btn btn--user"
									v-if="playerState"
									@click="playerVars.mute = !playerVars.mute"
								>
									<font-awesome-icon
										v-if="isMuted"
										class="btn__icon"
										:icon="['fas', 'volume-mute']"
									></font-awesome-icon>
									<font-awesome-icon
										v-else
										class="btn__icon"
										:icon="['fas', 'volume-up']"
									></font-awesome-icon>
								</button>
							</div>
						</div>
					</div>
				</section>

				<!-- main -->
				<section class="detail-modal__main">
					<h3 class="visually-hidden">TV 상세 메인 영역</h3>
					<!-- main > info -->
					<section class="detail-modal__movie-info">
						<div class="movie-info__left">
							<div class="movie-info__basic">
								<SkeletonBox :width="'50%'" v-if="isLoading" />
								<template v-else-if="isDetailLoaded">
									<span class="release-date">{{
										firstAirDate
									}}</span>
									<span class="age-badge"></span>
									<!-- FIXME 클래스 명 수정 -->
									<span class="run-time">
										시즌 {{ seasonLength }}개
									</span>
									<StarRating size="large" :value="vote" />
								</template>
							</div>
							<div class="movie-info__synopsis">
								<SkeletonBox
									:height="'10rem'"
									v-if="isLoading"
								/>
								<p
									class="synopsis"
									v-else-if="!isLoading && overview"
								>
									{{ overview }}
								</p>
							</div>
						</div>
						<div class="movie-info__right">
							<SkeletonList v-if="isLoading" :rows="2" />
							<template v-else>
								<div class="info-row" v-if="castList.length">
									<span class="info-row__title">출연</span>
									<ul class="info-row__list">
										<li
											class="info-row__item"
											v-for="cast in castList"
											:key="`cast-${cast.id}`"
										>
											<span>{{ cast.name }}</span>
										</li>
										<li class="info-row__item">
											<a
												href="#"
												class="info-row__more-btn"
											>
												더 보기
											</a>
										</li>
									</ul>
								</div>
								<div class="info-row" v-if="false">
									<span class="info-row__title"
										>프로그램 특징</span
									>
									<ul class="info-row__list">
										<li class="info-row__item">
											<span>긴장감 넘치는</span>
										</li>
									</ul>
								</div>

								<!-- 장르 -->
								<div class="info-row" v-if="isGenres">
									<span class="info-row__title">장르</span>
									<ul class="info-row__list">
										<li
											class="info-row__item"
											v-for="genre in detail.genres"
											:key="`genre-${genre.id}`"
										>
											<span>{{ genre.name }}</span>
										</li>
									</ul>
								</div>
							</template>
						</div>
					</section>

					<nav class="detail-modal__tabs">
						<TabList :tabs="tabs" v-model="currentTabId"></TabList>
					</nav>

					<!-- 메인 > 컨텐츠 영역 -->
					<section class="detail-modal__contents">
						<keep-alive>
							<component
								:is="currentTabComponent"
								v-bind="currentTabProps"
							></component>
						</keep-alive>
					</section>

					<!-- main > detail -->
					<!-- <section class="detail-modal__detail">detail</section> -->
				</section>
			</section>
		</template>
	</Modal>
</template>

<script>
// Composable
import detailComposable from '@/composable/common/detail';
import creditsComposable from '@/composable/common/credits';

// Component
import Modal from '@/components/common/Modal.vue';
import SkeletonBox from '@/components/common/loading/SkeletonBox.vue';
import SkeletonList from '@/components/common/loading/SkeletonList.vue';
import YoutubePlayer from '@/components/common/YoutubePlayer.vue';
import StarRating from '@/components/common/StarRating.vue';
import TabList from '@/components/common/TabList.vue';
import SimilarContents from '@/components/media/SimilarContents.vue';

import { ref, reactive, computed } from 'vue';

// Vuex Module
import { createNamespacedHelpers } from 'vuex';

const authModule = createNamespacedHelpers('auth');

export default {
	name: 'tv-modal',

	components: {
		Modal,
		SkeletonBox,
		SkeletonList,
		YoutubePlayer,
		StarRating,
		TabList,
		SimilarContents,
	},

	props: {
		id: {
			type: [Number, String],
			required: true,
		},
	},

	setup(props) {
		const id = ref(props.id);
		const mediaType = ref('tv');

		if (typeof id.value === 'string') {
			id.value = Number(id.value);
		}

		//#region 시즌, 비슷한 컨텐츠 탭
		const tabs = ref([
			{
				id: 1,
				text: '비슷한 콘텐츠',
				component: 'similar-contents',
			},
			{
				id: 2,
				text: '시즌 및 회차',
				component: '',
			},
		]);

		// 현재 선택된 탭 아이디
		const currentTabId = ref(tabs.value[0].id);

		// 현재 선택된 탭 컴포넌트
		const currentTabComponent = computed(() => {
			const currentTab = tabs.value.find(
				({ id }) => currentTabId.value === id,
			);

			// FIXME 시즌 컴포넌트 추가하기
			return currentTab?.component || 'similar-contents';
		});

		// 현재 선택된 탭 props
		const currentTabProps = computed(() => ({
			id: id.value,
			mediaType: mediaType.value,
		}));

		//#endregion

		// Detail Composable
		const {
			detail,
			loadingDetail,
			firstAirDate,
			title,
			vote,
			backdropImage,
			overview,
			seasonLength,
			isGenres,
			isDetail,
			isDetailLoaded,
			videos,

			fetchDetail,
			fetchVideos,
			deleteVideos,
		} = detailComposable(id.value, mediaType.value);

		// Credits Composable
		const { castList, loadingCredits, fetchTvCredits } = creditsComposable(
			id.value,
			mediaType.value,
		);

		//#region
		const playerVars = reactive({
			mute: true,
			autoplay: true,
			loop: false,
			controls: false,
		});

		const playerState = ref('');

		const isMuted = computed(() => Boolean(playerVars.mute));

		const handleVideoEnd = function handleVideoEnd() {
			// player.destroy();
			deleteVideos();
			playerState.value = '';
		};
		//#endregion

		fetchDetail();
		fetchVideos();
		fetchTvCredits();

		return {
			// Tabs
			tabs,
			currentTabId,
			currentTabComponent,
			currentTabProps,

			// Video Vars
			playerVars,
			playerState,
			isMuted,
			handleVideoEnd,

			// Tv Detail
			detail,
			loadingDetail,
			firstAirDate,
			title,
			vote,
			backdropImage,
			overview,
			seasonLength,
			isGenres,
			isDetail,
			isDetailLoaded,
			videos,

			// Tv Credits
			castList,
			loadingCredits,

			// Functions
			fetchDetail,
			fetchTvCredits,
		};
	},

	computed: {
		...authModule.mapGetters(['favoriteList', 'likeList', 'hateList']),

		isLoading() {
			return this.loadingDetail || this.loadingCredits;
		},

		isFavoriteItem() {
			if (!this.favoriteList.length) return false;

			return (
				this.favoriteList.filter(item => item.id === +this.id).length >
				0
			);
		},

		isLikeItem() {
			if (!this.likeList.length) return false;

			return this.likeList.indexOf(Number(this.id)) > -1;
		},

		isHateItem() {
			if (!this.hateList.length) return false;

			return this.hateList.indexOf(Number(this.id)) > -1;
		},
	},

	methods: {
		...authModule.mapActions([
			'addFavoriteItem',
			'removeFavoriteItem',
			'addLikeItem',
			'removeLikeItem',
			'addHateItem',
			'removeHateItem',
		]),

		// close 이벤트 emit
		handleClose() {
			this.$router.back();
		},

		// 이미지 로드 에러
		onImageError(event) {
			event.target.style.visibility = 'hidden';
		},

		// 찜하기 목록에 추가 클릭 이벤트
		async handleAddFavorite() {
			try {
				const newTvData = {
					...this.detail,
					mediaType: 'tv',
				};

				await this.addFavoriteItem(newTvData);
			} catch (error) {
				console.error('handleAddFavorite', error);
			}
		},

		// 찜하기 목록에서 제거 클릭 이벤트
		async handleRemoveFavorite() {
			try {
				await this.removeFavoriteItem(Number(this.id));
			} catch (error) {
				console.error('handleRemoveFavorite', error);
			}
		},

		// 좋아요 버튼 클릭 이벤트
		async handleClickLike() {
			try {
				const id = Number(this.id);

				if (this.isLikeItem) {
					await this.removeLikeItem(id);
				} else {
					await this.addLikeItem(id);
				}
			} catch (error) {
				console.error('handleClickLike', error);
			}
		},

		// 싫어요 버튼 클릭 이벤트
		async handleClickHate() {
			try {
				const id = Number(this.id);

				if (this.isHateItem) {
					await this.removeHateItem(id);
				} else {
					await this.addHateItem(id);
				}
			} catch (error) {
				console.error('handleClickHate', error);
			}
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/components/detail-modal.scss';
</style>
