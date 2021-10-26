<template>
	<header class="header" :class="headerClass">
		<div class="header__inner">
			<!-- left -->
			<section class="header__left">
				<h1 class="header__logo">
					<router-link to="/">
						<img :src="logo" alt="vue-flix" class="logo" />
					</router-link>
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
						<!-- search-form -->
						<transition name="slide-fade">
							<SearchInput v-if="isSearchForm"></SearchInput>
						</transition>
						<!-- search icon -->
						<button
							v-if="!isSearchForm"
							type="button"
							class="nav-icon"
							@click.stop="openSearchForm"
						>
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
									<a href="#" @click.prevent="handleSignOut"
										>뷰플릭스에서 로그아웃</a
									>
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
// 이미지
import headerLogo from '@/assets/images/common/logo-small.svg';
import profileAvatar from '@/assets/images/common/profile.jpg';

import { routerLinks } from '@/utils/common/constants';

// 컴포넌트
import DropdownMenu from '@/components/common/DropdownMenu.vue';
import SearchInput from '@/components/common/SearchInput.vue';

// Vuex
import { mapMutations, createNamespacedHelpers, mapGetters } from 'vuex';

const authModule = createNamespacedHelpers('auth');

export default {
	name: 'app-header',

	components: {
		DropdownMenu,
		SearchInput,
	},

	data() {
		return {
			// static image
			logo: headerLogo,
			profileAvatar,

			routerLinks,

			// dropdown options
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

	computed: {
		...mapGetters(['isSearchForm', 'isHeaderSticky', 'isHeaderScroll']),

		//  Header Class
		headerClass() {
			return {
				sticky: this.isHeaderSticky,
				'is-scroll': this.isHeaderScroll,
			};
		},
	},

	watch: {
		$route: {
			handler(newRoute) {
				const { nav } = this.dropdowns;

				if (nav.isOpen) {
					nav.isOpen = false;
				}

				const { noStickyHeader } = newRoute?.meta;

				if (noStickyHeader) {
					this.setIsHeaderSticky(false);
				} else {
					this.setIsHeaderSticky(true);
				}
			},
		},
	},

	mounted() {
		window.addEventListener('scroll', () => {
			if (!this.isHeaderSticky) return false;

			if (window.scrollY > 0) {
				if (!this.isHeaderScroll) {
					this.setIsHeaderScroll(true);
				}
			} else {
				if (this.isHeaderScroll) {
					this.setIsHeaderScroll(false);
				}
			}
		});
	},

	methods: {
		...mapMutations([
			'openSearchForm',
			'setIsHeaderScroll',
			'setIsHeaderSticky',
		]),
		...authModule.mapActions(['signOut']),

		// 로그아웃 클릭 이벤트
		async handleSignOut() {
			try {
				await this.signOut();

				this.$router.push({
					name: 'LoginPage',
				});
			} catch (error) {
				console.error(error);
				alert(error.message);
			}
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/components/header.scss';
</style>
