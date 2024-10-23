<template>
    <div class="container">
        <h2 class="title">Product Details</h2>
        
        <div class="product-details" v-if="product">
            <div class="detail-item">
                <strong>ID:</strong> <span>{{ product.id }}</span>
            </div>
            <div class="detail-item">
                <strong>Name:</strong> <span>{{ product.name }}</span>
            </div>
            <div class="detail-item">
                <strong>Category:</strong> <span>{{ product.category }}</span>
            </div>
            <div class="detail-item">
                <strong>Active Ingredients:</strong> <span>{{ product.active_ingredients.join(', ') }}</span>
            </div>
            <div class="detail-item">
                <strong>Batch Number:</strong> <span>{{ product.batch_number }}</span>
            </div>
            <div class="detail-item">
                <strong>Research Status:</strong> <span>{{ product.research_status }}</span>
            </div>
            <div class="detail-item">
                <strong>Manufacturing Date:</strong> <span>{{ product.manufacturing_date }}</span>
            </div>
            <div class="detail-item">
                <strong>Expiration Date:</strong> <span>{{ product.expiration_date }}</span>
            </div>
        </div>
        <button class="back-btn" @click="goBack">← Back to Products</button>
    </div>
</template>

<script>
import { getProductById } from '../services/productService.js';

export default {
    props: {
        productId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            product: null,
        };
    },
    mounted() {
        this.fetchProductDetails();
    },
    methods: {
        async fetchProductDetails() {
            try {
                const response = await getProductById(this.productId);
                this.product = response.data;
            } catch (error) {
                console.error('Error fetching product details:', error.message);
            }
        },
        goBack() {
            this.$router.push({ name: 'ListProducts' });
        },
    },
};
</script>

<style scoped>
/* Container Styling */
.container {
    width: 80%;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Title Styling */
.title {
    text-align: center;
    margin-bottom: 20px;
    font-family: Arial, sans-serif;
}

/* Product Details Styling */
.product-details {
    margin-top: 20px;
}

.detail-item {
    margin: 10px 0;
    font-size: 16px;
}

/* Back Button Styling */
.back-btn {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #1a1a1a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.back-btn:hover {
    background-color: #333;
}
</style>
