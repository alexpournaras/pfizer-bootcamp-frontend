<template>
    <v-container max-width="800px">
        <v-row>
        <v-col cols="12" class="text-center">
            <h2 class="title">Edit Product</h2>
        </v-col>
    
        <!-- Edit Product Form -->
        <v-form v-if="product" @submit.prevent="validateAndSubmit" ref="form">
            <!-- Product Name -->
            <v-col cols="12">
            <v-text-field
                label="Product Name"
                v-model="product.name"
                outlined
                required
                :rules="[rules.required]"
            ></v-text-field>
            </v-col>
    
            <!-- Category -->
            <v-col cols="12">
            <v-select
                label="Category"
                :items="['Capsule', 'Tablet', 'Injection']"
                v-model="product.category"
                :color="getCategoryColor(product.category)"
                outlined
                required
            ></v-select>
            </v-col>
    
            <!-- Active Ingredients -->
            <v-col cols="12">
            <v-text-field
                label="Active Ingredients (comma-separated)"
                v-model="product.active_ingredients"
                outlined
                required
                :rules="[rules.required]"
            ></v-text-field>
            </v-col>
    
            <!-- Batch Number -->
            <v-col cols="12">
            <v-text-field
                label="Batch Number"
                v-model="product.batch_number"
                outlined
                required
                :rules="[rules.required]"
            ></v-text-field>
            </v-col>
    
            <!-- Research Status -->
            <v-col cols="12">
            <v-select
                label="Research Status"
                :items="['In Clinical Trials', 'Completed', 'Under Development']"
                v-model="product.research_status"
                :color="getStatusColor(product.research_status)"
                outlined
                required
            ></v-select>
            </v-col>
    
    
            <!-- //  Manufacturing Date -->
            <v-col cols="12" md="6">
            <v-text-field
                label="Manufacturing Date"
                v-model="product.manufacturing_date"
                type="date"
                outlined
                required
            ></v-text-field>
            </v-col>
    
            <!-- // Expiration Date -->
            <v-col cols="12" md="6">
            <v-text-field
                label="Expiration Date"
                v-model="product.expiration_date"
                type="date"
                outlined
                required
            ></v-text-field>
            </v-col> 
            
    
            <!-- Action Buttons -->
            <v-col cols="12" class="text-center">
            <v-btn color="primary" @click="validateAndSubmit" class="mr-4">Save Changes</v-btn>
            <v-btn color="red" @click="cancelEdit">Cancel</v-btn>
            </v-col>
        </v-form>
        </v-row>
    </v-container>
    </template>
    
    <script>
    import { getProductById, updateProduct } from "../services/productService.js";
    
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
        rules: {
            required: (value) => !!value || "This field is required", // Validation rule for all required fields
        },
        };
    },
    mounted() {
        this.fetchProductDetails(); // Fetch product details when component is mounted
    },
    methods: {
        async fetchProductDetails() {
            try {
                const response = await getProductById(this.productId); // Fetch product details
                
                // Extract product data from the response
                const productData = response.data;
    
                // Format the dates from ISO to YYYY-MM-DD
                this.product = {
                    ...productData,
                    manufacturing_date: this.formatDate(productData.manufacturing_date),
                    expiration_date: this.formatDate(productData.expiration_date),
                };
            } catch (error) {
                console.error("Error fetching product details:", error.message);
            }
        },
    
        formatDate(isoDate) {
            const date = new Date(isoDate); // Create a Date object from the ISO string
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and pad with zero
            const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero
            return `${year}-${month}-${day}`; // Format to YYYY-MM-DD
        },
        async validateAndSubmit() {
        const isFormValid = this.$refs.form.validate(); // Validate the form
        if (isFormValid) {
            await this.updateProduct(); // Proceed to update the product if valid
        }
        },
        async updateProduct() {
        try {
            const updatedProduct = {
            ...this.product,
    
    
            active_ingredients: Array.isArray(this.product.active_ingredients)
            ? this.product.active_ingredients
            : this.product.active_ingredients.split(",").map((ingredient) => ingredient.trim()), // Keep this just in case
            };
    
            await updateProduct(this.productId, updatedProduct); // This line sends data to the backend
            
            alert("Product updated successfully!"); // or use a nicer UI alert system
    
            // Redirect to the list of products after successful update
            this.$router.push({ name: "ListProducts" });
        } catch (error) {
            console.error("Error updating product:", error.message);
        }
        },
        cancelEdit() {
        this.$router.push({ name: "ListProducts" }); // Navigate back to the list
        },
        getCategoryColor(category) {
        switch (category) {
            case "Capsule":
            return "purple";
            case "Tablet":
            return "green";
            case "Injection":
            return "orange";
            default:
            return "grey";
        }
        },
        getStatusColor(status) {
        switch (status) {
            case "In Clinical Trials":
            return "red";
            case "Completed":
            return "green";
            case "Under Development":
            return "orange";
            default:
            return "grey";
        }
        },
    },
    };
    </script>
    
    <style scoped>
    .title {
    font-family: Arial, sans-serif;
    margin-bottom: 20px;
    }
    </style>
      
  