<template>
    <div class="container">
        <h2 class="title">Add Product</h2>

        <form @submit.prevent="submitProduct">
            <div class="form-group">
                <label for="name">Product Name:</label>
                <input type="text" v-model="product.name" id="name" class="form-input" required />
            </div>

            <div class="form-group">
                <label for="category">Category:</label>
                <input type="text" v-model="product.category" id="category" class="form-input" required />
            </div>

            <div class="form-group">
                <label for="active_ingredients">Active Ingredients (comma-separated):</label>
                <input type="text" v-model="product.active_ingredients" id="active_ingredients" class="form-input" required />
            </div>

            <div class="form-group">
                <label for="batch_number">Batch Number:</label>
                <input type="text" v-model="product.batch_number" id="batch_number" class="form-input" required />
            </div>

            <div class="form-group">
                <label for="research_status">Research Status:</label>
                <input type="text" v-model="product.research_status" id="research_status" class="form-input" required />
            </div>

            <div class="form-group">
                <label for="manufacturing_date">Manufacturing Date:</label>
                <input type="date" v-model="product.manufacturing_date" id="manufacturing_date" class="form-input" required />
            </div>

            <div class="form-group">
                <label for="expiration_date">Expiration Date:</label>
                <input type="date" v-model="product.expiration_date" id="expiration_date" class="form-input" required />
            </div>

            <button type="submit" class="add-btn">Submit</button>
        </form>
    </div>
</template>

<script>
import { createProduct } from '../services/productService.js';

export default {
    data() {
        return {
            product: {
                name: '',
                category: '',
                active_ingredients: '',
                batch_number: '',
                research_status: '',
                manufacturing_date: '',
                expiration_date: '',
            },
        };
    },
    methods: {
        async submitProduct() {
            try {
                const productData = {
                    ...this.product,
                    active_ingredients: this.product.active_ingredients.split(',').map(ingredient => ingredient.trim()),
                };
                await createProduct(productData);
                this.$router.push({ name: 'ListProducts' });
            } catch (error) {
                console.error('Error adding product:', error.message);
            }
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

/* Form Group Styling */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-size: 16px;
}

.form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

/* Button Styling */
.add-btn {
    display: block;
    width: 100%;
    padding: 10px 0;
    background-color: #1a1a1a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.add-btn:hover {
    background-color: #333;
}
</style>
