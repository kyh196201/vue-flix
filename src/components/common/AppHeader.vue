<template>
	<header class="header">
		<div class="header__inner">
			<!-- left -->
			<section class="header__left">
				<h1 class="header__logo">
					<a href="#">
						<img :src="logo" alt="vue-flix" class="logo" />
					</a>
				</h1>
				<nav class="header__nav">
					<!-- Mobile -->
					<span class="nav-menu-btn">메뉴</span>

					<!-- PC -->
					<ul class="nav-list">
						<li class="nav-list__item">
							<a href="#" class="nav-link">홈</a>
						</li>
						<li class="nav-list__item">
							<a href="#" class="nav-link">영화</a>
						</li>
						<li class="nav-list__item">
							<a href="#" class="nav-link"
								>NEW! 요즘 대세 콘텐츠</a
							>
						</li>
						<li class="nav-list__item">
							<a href="#" class="nav-link">내가 찜한 콘텐츠</a>
						</li>
						<li class="nav-list__item">
							<a href="#" class="nav-link">영화</a>
						</li>
					</ul>

					<!-- Mobile Menu -->
					<div class="header__menu">
						<ul class="menu">
							<li class="menu__item">
								<a href="#" class="menu-link">gha</a>
							</li>
							<li class="menu__item">
								<a href="#" class="menu-link">영화</a>
							</li>
						</ul>
					</div>
				</nav>
			</section>
			<!-- right -->
			<section class="header__right">
				<div class="header__search header__right__item">
					<!-- search -->
					<button type="button" class="search-btn header__right__btn">
						<font-awesome-icon
							:icon="['fas', 'search']"
						></font-awesome-icon>
					</button>
				</div>
				<div class="header__notice header__right__item">
					<button class="notice-btn header__right__btn">
						<font-awesome-icon
							:icon="['fas', 'bell']"
						></font-awesome-icon>
					</button>
				</div>
				<div class="header__profile header__right__item">
					<!-- profile component -->
					<div class="profile">
						<div class="profile__avatar">
							<img
								:src="profileAvatar"
								alt="zootopia"
								class="profile__image"
							/>
							<span class="profile__caret"></span>
						</div>
						<div class="profile__status"></div>
					</div>

					<!-- config-menu -->
					<div class="header__config-menu">
						<article class="config-menu menu">
							<ul class="profile-menu">
								<li class="profile-menu__item">
									<a href="#" class="profile-menu__link">
										<!-- profile -->
										<div class="profile__avatar">
											<img
												:src="profileAvatar"
												alt="zootopia"
												class="profile__image"
											/>
											<span class="profile__name"
												>Sam</span
											>
										</div>
										<div class="profile__status">잠김</div>
									</a>
								</li>
								<li class="profile-menu__item">
									<a href="#" class="profile-menu__link">
										프로필 관리
									</a>
								</li>
							</ul>
							<ul class="config-menu__configs">
								<li class="config-menu__config">
									<a href="#" class="config-menu__link">
										계정
									</a>
								</li>
								<li class="config-menu__config">
									<a href="#" class="config-menu__link">
										고객 센터
									</a>
								</li>
								<li class="config-menu__config">
									<a href="#" class="config-menu__link">
										뷰플릭스에서 로그아웃
									</a>
								</li>
							</ul>
						</article>
					</div>
				</div>
			</section>
		</div>
	</header>
</template>

<script>
import headerLogo from '@/assets/images/common/logo-small.svg';
import profileAvatar from '@/assets/images/common/profile.jpg';

export default {
	name: 'app-header',

	data() {
		return {
			logo: headerLogo,
			profileAvatar: profileAvatar,
		};
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/components/header.scss';
</style>
