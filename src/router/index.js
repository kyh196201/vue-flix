// vue-router
import { createWebHistory, createRouter } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Home.vue'),
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
