// vue-router
import { createWebHistory, createRouter } from 'vue-router';

// 컴포넌트
import MovieModal from '@/components/movie/MovieModal.vue';

// 스토어
import store from '@/store';

// 로그인 체크
const requireAuth = (to, from, next) => {
	const isAuthenticated = store.getters['auth/isAuthenticated'];

	if (isAuthenticated) {
		next();
	} else {
		next('/login');
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

		beforeEnter: requireAuth,
	},
	{
		path: '/login',
		name: 'LoginPage',
		component: () => import('@/views/LoginPage.vue'),
	},
	{
		path: '/signup',
		name: 'SignupPage',
		component: () => import('@/views/SignupPage.vue'),
	},
	{
		path: '/movie',
		name: 'MoviePage',
		component: () => import('@/views/MoviePage.vue'),

		beforeEnter: requireAuth,
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

		beforeEnter: requireAuth,
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

export default router;
