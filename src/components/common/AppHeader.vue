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
						<li
							class="nav-list__item"
							v-for="(route, index) in routerLinks"
							:key="index"
						>
							<router-link :to="route.path" class="nav-link">{{
								route.name
							}}</router-link>
						</li>
					</ul>

					<!-- Mobile Menu -->
					<div class="header__nav-dropdown">
						<article class="nav-dropdown dropdown">
							<ul class="nav-dropdown__list">
								<li
									class="nav-dropdown__item"
									v-for="(route, index) in routerLinks"
									:key="index"
								>
									<router-link :to="route.path">{{
										route.name
									}}</router-link>
								</li>
							</ul>
						</article>
					</div>
				</nav>
			</section>
			<!-- right -->
			<section class="header__right">
				<div class="header__nav-item">
					<div class="header__search">
						<!-- search -->
						<button type="button" class="nav-icon">
							<font-awesome-icon
								:icon="['fas', 'search']"
							></font-awesome-icon>
						</button>
					</div>
				</div>
				<!-- notice-dropdown -->
				<div class="header__nav-item">
					<div class="header__notice-dropdown">
						<button class="nav-icon">
							<font-awesome-icon
								:icon="['fas', 'bell']"
							></font-awesome-icon>
						</button>
					</div>
				</div>
				<!-- account-dropdown -->
				<div class="header__nav-item">
					<div class="header__account-dropdown">
						<a href="#" class="dropdown-btn">
							<div class="avatar">
								<img :src="profileAvatar" alt="zootopia" />
							</div>
							<span class="caret-icon"></span>
						</a>

						<!-- config-menu -->
						<article class="account-dropdown dropdown">
							<section class="account-dropdown__top">
								<ul class="account-list">
									<li>
										<a href="">
											<div class="profile">
												<div class="profile__info">
													<div class="avatar">
														<img
															:src="profileAvatar"
															alt="zootopia"
														/>
													</div>
													<span class="profile__name">
														승우
													</span>
												</div>
												<div class="profile__status">
													잠김
												</div>
											</div>
										</a>
									</li>
									<li>
										<a href="#">
											<div class="profile">
												<div class="profile__info">
													<div class="avatar">
														<img
															:src="profileAvatar"
															alt="zootopia"
														/>
													</div>
													<span class="profile__name">
														승우
													</span>
												</div>
												<div class="profile__status">
													잠김
												</div>
											</div>
										</a>
									</li>
								</ul>
								<a href="#" class="profile-link">프로필 관리</a>
							</section>
							<ul class="config-list">
								<li>
									<a href="#">계정</a>
								</li>
								<li>
									<a href="#">고객 센터</a>
								</li>
								<li>
									<a href="#">뷰플릭스에서 로그아웃</a>
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

import { routerLinks } from '@/utils/common/constants';

export default {
	name: 'app-header',

	data() {
		return {
			logo: headerLogo,
			profileAvatar,

			routerLinks,
		};
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/components/header.scss';
</style>
