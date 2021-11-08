// vue-router
import { createWebHistory, createRouter } from 'vue-router';

// 컴포넌트
import MovieModal from '@/components/movie/MovieModal.vue';
import TvModal from '@/components/tv/TvModal.vue';

// 스토어
import store from '@/store';

// 로그인 시 리다이렉트
const checkIsAuth = (to, from, next) => {
	const isAuthenticated = store.getters['auth/isAuthenticated'];

	// 로그인되어있을 경우 메인 페이지로 리다이렉트
	if (isAuthenticated) {
		next('/');
	} else {
		next();
	}
};

const routes = [
	{
		path: '/',
		name: 'HomePage',
		component: () => import('@/views/HomePage.vue'),
		children: [
			{
				path: 'detail/:movieId',
				name: 'MovieModal',
				component: MovieModal,
				// true로 적용할 경우, 파라미터를 props처럼 사용할 수 있다.
				props: true,
			},
		],

		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/login',
		name: 'LoginPage',
		component: () => import('@/views/LoginPage.vue'),

		beforeEnter: checkIsAuth,
	},
	{
		path: '/signup',
		name: 'SignupPage',
		component: () => import('@/views/SignupPage.vue'),

		beforeEnter: checkIsAuth,
	},
	{
		path: '/movie',
		name: 'MoviePage',
		component: () => import('@/views/MediaPage.vue'),
		children: [
			{
				path: 'detail/:movieId',
				name: 'MoviePageModal',
				component: MovieModal,
				// true로 적용할 경우, 파라미터를 props처럼 사용할 수 있다.
				props: true,
			},
		],

		meta: {
			requiresAuth: true,
			noStickyHeader: true,
		},
	},
	{
		path: '/tv',
		name: 'TvPage',
		component: () => import('@/views/MediaPage.vue'),
		children: [
			{
				path: 'detail/:tvId',
				name: 'TvPageModal',
				component: TvModal,
				// true로 적용할 경우, 파라미터를 props처럼 사용할 수 있다.
				props: true,
			},
		],

		meta: {
			requiresAuth: true,
			noStickyHeader: true,
			mediaType: 'tv',
		},
	},
	{
		path: '/search',
		name: 'SearchPage',
		component: () => import('@/views/SearchPage.vue'),
		children: [
			{
				path: 'detail/:movieId',
				name: 'SearchMovieModal',
				component: MovieModal,
				// true로 적용할 경우, 파라미터를 props처럼 사용할 수 있다.
				props: true,
			},
		],

		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/favorite',
		name: 'FavoritePage',
		component: () => import('@/views/FavoritePage.vue'),
		children: [
			{
				path: 'detail/movie/:movieId',
				name: 'FavoriteMovieModal',
				component: MovieModal,
				props: true,
			},
			{
				path: 'detail/tv/:tvId',
				name: 'FavoriteTvModal',
				component: TvModal,
				props: true,
			},
		],

		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/:catchAll(.*)',
		name: 'NotFound',
		component: () => import('@/views/NotFound.vue'),
	},
];

const router = createRouter({
	// window history 모드 사용
	history: createWebHistory(),
	routes,
});

// 라우터 글로벌 내비게이션 가드
router.beforeEach((to, from, next) => {
	// 로그인이 필요한 경우
	if (to.matched.some(record => record.meta.requiresAuth)) {
		const isAuthenticated = store.getters['auth/isAuthenticated'];

		// 로그인 한 경우
		if (isAuthenticated) {
			next();
		} else {
			// 로그인 하지 않은 경우 로그인 페이지로 리다이렉트
			next('/login');
		}
	} else {
		next();
	}
});

export default router;
