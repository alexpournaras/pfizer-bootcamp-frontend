import { createRouter, createWebHistory } from 'vue-router';
import ListProducts from '../components/ListProducts.vue';
import AddProduct from '../components/AddProduct.vue';
import EditProduct from '../components/EditProduct.vue';
import ShowProduct from '../components/ShowProduct.vue';

const routes = [
	{ path: '/', redirect: '/products' },
	{ path: '/products', name: 'ListProducts', component: ListProducts },
	{ path: '/products/add', name: 'AddProduct', component: AddProduct },
	{ path: '/products/edit/:productId', name: 'EditProduct', component: EditProduct, props: true },
	{ path: '/products/show/:productId', name: 'ShowProduct', component: ShowProduct, props: true }
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
