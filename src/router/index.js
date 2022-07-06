import {
	createRouter,
	createWebHistory,
	//createWebHashHistory
} from 'vue-router'
import Home from '../views/Home.vue'
const routes = [{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			show: true
		}
	},
	{
		path: '/Area',
		name: 'Area',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/Area.vue'),
		meta: {
			show: true
		}
	},
	{
		path: '/Login',
		name: 'Login',
		component: () => import('../views/Login.vue'),
		meta: {
			show: false
		}
	},
	{
		path: '/User/Myself',
		name: 'Myself',
		component: () => import('../views/Menu/Myself.vue'),
		meta: {
			show: false
		}
	},
	{
		path: '/User/Modify',
		name: 'Modify',
		component: () => import('../views/Menu/Modify.vue'),
		meta: {
			show: false
		}
	},
	{
		path: '/Pageview',
		name: 'pageview',
		component: () => import('../views/pageview.vue'),
		meta: {
			show: true
		}
	},
	{
		path: '/Editor',
		name: 'Editor',
		component: () => import('../views/Editor.vue'),
		meta: {
			show: false
		}
	},
	{
		path: '/search',
		name: 'search',
		component: () => import('../views/search.vue'),
		meta: {
			show: false
		}
	},
	{
		path: '/News',
		name: 'News',
		component: () => import('../views/News.vue'),
		meta: {
			show: false
		}
	},
	{
		path: '/search',
		name: 'search',
		component: () => import('../views/search.vue'),
		meta: {
			show: false
		}
	},
	{
		path: '/Heself',
		name: 'Heself',
		component: () => import('../views/Heself.vue'),
		meta: {
			show: false
		}
	},
	{
		path: '/ForgetPwd',
		naem: '/ForgetPwd',
		component: () => import('../views/ForgetPwd.vue'),
		meta: {
			show: false
		}
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
