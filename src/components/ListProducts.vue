<template>
    <div class="container">
        <h2 class="title">Products Management</h2>


        <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="Search products..." class="search-bar" />
            <button class="search-btn" @click="performSearch">Search</button>
            <button v-if="searchResultsExist && !noResultsMessage" class="go-back-btn" @click="goBackToList">Go Back to List</button>
        </div>


        <button class="add-btn" @click="goToAddPage">+ Add Product</button>

        <!-- Show message if no products match the search query -->
        <p v-if="noResultsMessage" class="error-message">
            {{ noResultsMessage }}
            <button class="go-back-btn" @click="goBackToList">Go Back to List</button>

        </p>

        <table class="product-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Active Ingredients</th>
                    <th>Batch Number</th>
                    <th>Research Status</th>
                    <th>Manufacturing Date</th>
                    <th>Expiration Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td @click="goToShowPage(product.id)" class="clickable">
                        {{ product.name }}
                    </td>
                    <td>{{ product.category }}</td>
                    <td>{{ product.active_ingredients.join(', ') }}</td>
                    <td>{{ product.batch_number }}</td>
                    <td>{{ product.research_status }}</td>
                    <td>{{ product.manufacturing_date }}</td>
                    <td>{{ product.expiration_date }}</td>
                    <td>
                        <button class="edit-btn" @click="goToEditPage(product.id)">✏️</button>
                        <button class="delete-btn" @click="deleteProduct(product.id)">🗑️</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { getProducts, deleteProduct } from '../services/productService.js';

export default {
    data() {
        return {
            products: [],
            searchQuery: '',
            noResultsMessage: '', 
            searchResultsExist: false, 
            allProducts: [], 
        };
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await getProducts(); // Fetch all products
                this.allProducts = response.data; // Store all fetched products
                this.products = [...this.allProducts]; // Initialize products with all products
                this.noResultsMessage = ''; // Reset no results message
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        },

        performSearch() {
           
            const query = this.searchQuery.toLowerCase();
            const matchingProducts = this.allProducts.filter(product => {
                return (
                    product.name.toLowerCase().includes(query) ||
                    product.batch_number.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query) ||
                    product.active_ingredients.some(ingredient =>
                        ingredient.toLowerCase().includes(query)
                    ) ||
                    product.research_status.toLowerCase().includes(query) ||
                    product.id.toString().includes(query) ||
                    product.manufacturing_date.includes(query) ||
                    product.expiration_date.includes(query)
                );
            });

            this.products = matchingProducts;

            // Update products to match only the filtered products
            if (matchingProducts.length > 0) {
                this.noResultsMessage = ''; 

                this.searchResultsExist = true; 

            } else {
                this.noResultsMessage = `❌ ERROR: No products found matching your search query. 
                Please check your input and try again or go back to the full list`; 

                this.searchResultsExist = false; 
            }
            
            this.products = matchingProducts;
        },
        goToAddPage() {
            this.$router.push({ name: 'AddProduct' });
        },
        goToEditPage(productId) {
            this.$router.push({ name: 'EditProduct', params: { productId }, props: true });
        },
        goToShowPage(productId) {
            this.$router.push({ name: 'ShowProduct', params: { productId }, props: true });
        },
        goBackToList() {
            this.fetchProducts().then(() => { 
            this.searchQuery = ''; 
            this.noResultsMessage = ''; 
            this.searchResultsExist = false; 
    });
        },
        async deleteProduct(productId) {
            if (confirm('Are you sure you want to delete this product?')) {
                try {
                    await deleteProduct(productId);
                    this.fetchProducts();
                } catch (error) {
                    console.error('Error deleting product:', error);
                }
            }
        },
    },


    computed: {
        filteredProducts() {
            const query = this.searchQuery.toLowerCase();
            return this.allProducts.filter(product => {
                return (
                    product.name.toLowerCase().includes(query) ||
                    product.batch_number.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query) ||
                    product.active_ingredients.some(ingredient =>
                        ingredient.toLowerCase().includes(query)
                    ) ||
                    product.research_status.toLowerCase().includes(query) ||
                    product.id.toString().includes(query) ||
                    product.manufacturing_date.includes(query) ||
                    product.expiration_date.includes(query)
                );
            });
        }
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

.search-container {
    display: flex;
    justify-content: center; 
    align-items: center;
    margin-bottom: 20px; 
}

/* Search Bar Styling */
.search-bar {
    display: block;
    padding: 10px;
    width: 50%;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

/* Button Styling */
.search-btn {
    display: block;
    margin-left: 10px; 
    border: none;
    padding: 10px 20px;
    background-color: #1a1a1a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.search-btn:hover {
    background-color: #333;
}

.go-back-btn{
    display: block;
    margin: 10px 10px;
    padding: 10px 20px;
    background-color: #e61515;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

}

.go-back-btn:hover {
    background-color: #d88787;
}

/* Button Styling */
.add-btn {
    display: block;
    margin: 10px auto;
    padding: 10px 20px;
    background-color: #1a1a1a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.add-btn:hover {
    background-color: #333;
}

.error-message {
    color: red;
    font-weight: bold;
    background-color: #f8d7da; 
    padding: 5px;  
    border: 1px solid red; 
    border-radius: 5px;  
    display: flex; 
    align-items: center; 
    margin-bottom: 10px; 
}

/* Table Styling */
.product-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.product-table th,
.product-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
}

.product-table th {
    background-color: #f4f4f4;
}

/* Product name as clickable link */
.clickable {
    cursor: pointer;
    color: #007bff;
}

.clickable:hover {
    text-decoration: underline;
}

/* Button Styles for Edit and Delete */
.edit-btn {
    background-color: #ffc107;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    margin-right: 5px;
    border-radius: 5px;
}

.delete-btn {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
}

.edit-btn:hover {
    background-color: #e0a800;
}

.delete-btn:hover {
    background-color: #c82333;
}
</style>
