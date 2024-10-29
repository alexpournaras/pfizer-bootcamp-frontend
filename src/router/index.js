import { createRouter, createWebHistory } from 'vue-router';
import ListProducts from '../components/ListProducts.vue';
import ShowProduct from '../components/ShowProduct.vue';
import Home from '../components/Home.vue';

const routes = [
	{ path: '/', name: 'Home', component: Home },
	{ path: '/products', name: 'ListProducts', component: ListProducts },
	{ path: '/products/show/:productId', name: 'ShowProduct', component: ShowProduct, props: true }
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
