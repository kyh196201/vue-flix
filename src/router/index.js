// vue-router
import { createWebHistory, createRouter } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'HomePage',
		component: () => import('@/views/HomePage.vue'),
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
