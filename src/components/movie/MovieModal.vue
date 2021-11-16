<template>
	<Modal class="detail-modal" @close="handleClose">
		<template v-slot:body>
			<section class="detail-modal__body">
				<h2 class="visually-hidden">영화 상세 모달</h2>
				<!-- billboard -->
				<section class="detail-modal__billboard">
					<div class="billboard__back">
						<!-- 포스터 -->
						<figure class="billboard__poster">
							<img
								v-if="movieData"
								:src="backdropImage"
								:alt="movieData.title"
								@error="onImageError"
							/>
						</figure>

						<!-- 비디오 -->
					</div>
					<div class="billboard__front">
						<div class="billboard__info" v-if="movieData">
							<!-- 제목 -->
							<div class="billboard__title">
								{{ movieData.title }}
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
								<button class="btn btn--user">
									<font-awesome-icon
										class="btn__icon"
										:icon="['fas', 'volume-mute']"
									></font-awesome-icon>
								</button>
							</div>
						</div>
					</div>
				</section>

				<!-- main -->
				<section class="detail-modal__main">
					<h3 class="visually-hidden">영화 상세 메인 영역</h3>
					<!-- main > info -->
					<section class="detail-modal__movie-info">
						<div class="movie-info__left">
							<div class="movie-info__basic">
								<SkeletonBox :width="'50%'" v-if="isLoading" />
								<template v-else-if="isMovieDataLoaded">
									<span class="release-date">{{
										releaseDate
									}}</span>
									<span class="age-badge"></span>
									<span class="run-time">
										{{ runTime }}
									</span>
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
											v-for="genre in movieData.genres"
											:key="`genre-${genre.id}`"
										>
											<span>{{ genre.name }}</span>
										</li>
									</ul>
								</div>
							</template>
						</div>
					</section>

					<!-- main > similar -->
					<section class="detail-modal__similar-contents">
						<h3>비슷한 콘텐츠</h3>

						<section
							class="similar-contents"
							:class="{ opened: isSimilarContentsOpened }"
						>
							<div class="similar-contents__inner">
								<ul
									class="similar-contents__list"
									v-if="!isSimilarContentsLoaded"
								>
									<li
										class="similar-contents__item"
										v-for="i in 6"
										:key="i"
									>
										<SkeletonBox
											height="30rem"
										></SkeletonBox>
									</li>
								</ul>
								<ul
									class="similar-contents__list"
									v-else-if="
										isSimilarContentsLoaded &&
										isSimilarContents
									"
								>
									<li
										class="similar-contents__item"
										v-for="media in similarContents"
										:key="`similar-${media.id}`"
									>
										<MediaCard
											:mediaData="media"
										></MediaCard>
									</li>
								</ul>
							</div>
						</section>
						<!-- caret-up, down -->
						<label class="btn btn--user btn--fold">
							<input
								type="checkbox"
								v-model="isSimilarContentsOpened"
							/>
							<font-awesome-icon
								class="btn__icon"
								:icon="foldBtnIcon"
							></font-awesome-icon>
							<span class="btn__title">찜하기</span>
						</label>
					</section>

					<!-- main > detail -->
					<!-- <section class="detail-modal__detail">detail</section> -->
				</section>
			</section>
		</template>
	</Modal>
</template>

<script>
// Mixin
import movieDetailMixin from '@/mixins/movie';

// Component
import Modal from '@/components/common/Modal.vue';
import SkeletonBox from '@/components/common/loading/SkeletonBox.vue';
import SkeletonList from '@/components/common/loading/SkeletonList.vue';
import MediaCard from '@/components/MediaCard.vue';

// Vuex Module
import { createNamespacedHelpers } from 'vuex';

const authModule = createNamespacedHelpers('auth');

export default {
	name: 'MovieModal',

	extends: movieDetailMixin,

	components: {
		Modal,
		SkeletonBox,
		SkeletonList,
		MediaCard,
	},

	data() {
		return {
			isSimilarContentsOpened: false,
		};
	},

	computed: {
		...authModule.mapGetters(['favoriteList', 'likeList', 'hateList']),

		isFavoriteItem() {
			if (!this.favoriteList.length) return false;

			return (
				this.favoriteList.filter(item => item.id === +this.movieId)
					.length > 0
			);
		},

		isLikeItem() {
			if (!this.likeList.length) return false;

			return this.likeList.indexOf(Number(this.movieId)) > -1;
		},

		isHateItem() {
			if (!this.hateList.length) return false;

			return this.hateList.indexOf(Number(this.movieId)) > -1;
		},

		/**
		 * 비슷한 콘텐츠 fold 버튼 font-awesome 아이콘
		 * @returns array
		 */
		foldBtnIcon() {
			const icon = this.isSimilarContentsOpened
				? 'caret-up'
				: 'caret-down';

			return ['fas', icon];
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

		// 찜하기 목록에 추가 클릭 이벤트
		async handleAddFavorite() {
			try {
				const newMovieData = {
					...this.movieData,
					mediaType: 'movie',
				};

				await this.addFavoriteItem(newMovieData);
			} catch (error) {
				console.error('handleAddFavorite', error);
			}
		},

		// 찜하기 목록에서 제거 클릭 이벤트
		async handleRemoveFavorite() {
			try {
				await this.removeFavoriteItem(Number(this.movieId));
			} catch (error) {
				console.error('handleRemoveFavorite', error);
			}
		},

		// 좋아요 버튼 클릭 이벤트
		async handleClickLike() {
			try {
				const movieId = Number(this.movieId);

				if (this.isLikeItem) {
					await this.removeLikeItem(movieId);
				} else {
					await this.addLikeItem(movieId);
				}
			} catch (error) {
				console.error('handleClickLike', error);
			}
		},

		// 싫어요 버튼 클릭 이벤트
		async handleClickHate() {
			try {
				const movieId = Number(this.movieId);

				if (this.isHateItem) {
					await this.removeHateItem(movieId);
				} else {
					await this.addHateItem(movieId);
				}
			} catch (error) {
				console.error('handleClickHate', error);
			}
		},

		// close 이벤트 emit
		handleClose() {
			this.$router.back();
		},

		// 데이터 fetch
		async fetchData() {
			this.fetchMovieDetail();
			this.fetchMovieCredits();
			this.fetchSimilarMovies();
		},

		// 이미지 로드 에러
		onImageError(event) {
			event.target.style.visibility = 'hidden';
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/components/detail-modal.scss';
</style>
