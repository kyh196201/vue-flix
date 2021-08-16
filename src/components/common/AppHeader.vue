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
					<DropdownMenu
						class="header__nav-dropdown"
						@toggle="toggleNavDropdown"
						v-bind="dropdowns.nav"
					>
						<template v-slot:button>
							<span class="nav-menu-btn">메뉴</span>
						</template>
						<template v-slot:content>
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
						</template>
					</DropdownMenu>
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
					<DropdownMenu
						class="header__account-dropdown"
						v-bind="dropdowns.account"
						@toggle="toggleAccountDropdown"
					>
						<template v-slot:button>
							<div class="account-dropdown__btn">
								<div class="avatar">
									<img :src="profileAvatar" alt="zootopia" />
								</div>
								<span class="caret-icon"></span>
							</div>
						</template>
						<template v-slot:content>
							<ul class="account-menu">
								<li class="account-menu__item">
									<a href="#" class="account-menu__link">
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
										</div>
									</a>
									<div class="lock-icon">잠김</div>
								</li>
								<li class="account-menu__item">
									<a href="#" class="account-menu__link"
										>프로필 관리</a
									>
								</li>
							</ul>
							<ul class="config-menu">
								<li class="config-menu__item">
									<a href="#">계정</a>
								</li>
								<li class="config-menu__item">
									<a href="#">고객 센터</a>
								</li>
								<li class="config-menu__item">
									<a href="#">뷰플릭스에서 로그아웃</a>
								</li>
							</ul>
						</template>
					</DropdownMenu>
				</div>
			</section>
		</div>
	</header>
</template>

<script>
import headerLogo from '@/assets/images/common/logo-small.svg';
import profileAvatar from '@/assets/images/common/profile.jpg';

import { routerLinks } from '@/utils/common/constants';

// Components
import DropdownMenu from '@/components/common/DropdownMenu.vue';

export default {
	name: 'app-header',

	components: {
		DropdownMenu,
	},

	data() {
		return {
			logo: headerLogo,
			profileAvatar,

			routerLinks,

			dropdowns: {
				nav: {
					isOpen: false,
					activator: 'hover',
				},
				account: {
					isOpen: false,
					activator: 'hover',
				},
			},
		};
	},

	watch: {
		$route: {
			handler() {
				const { nav } = this.dropdowns;

				if (!nav.isOpen) return;

				nav.isOpen = false;
			},
		},
	},

	methods: {
		toggleNavDropdown(toggle) {
			this.dropdowns.nav.isOpen = toggle;
		},

		toggleAccountDropdown(toggle) {
			this.dropdowns.account.isOpen = toggle;
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/components/header.scss';
</style>
