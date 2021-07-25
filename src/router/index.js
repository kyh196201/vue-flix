// vue-router
import { createWebHistory, createRouter } from 'vue-router';

import MovieModal from '@/components/movie/MovieModal.vue';

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
	},
	{
		path: '/movie',
		name: 'MoviePage',
		component: () => import('@/views/MoviePage.vue'),
	},
	{
		path: '/search',
		name: 'SearchPage',
		component: () => import('@/views/SearchPage.vue'),
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
