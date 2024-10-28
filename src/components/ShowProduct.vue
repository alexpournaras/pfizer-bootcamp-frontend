<template>
    <v-container max-width="800px">
        <v-row>
            <v-col cols="12" class="text-center">
                <h2 class="title">Edit Product</h2>
            </v-col>

            <!-- Edit Product Form -->
            <v-form class="edit-form" v-if="product" @submit.prevent="validateAndSubmit" ref="form">
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

                <!-- Manufacturing Date -->
                <v-col cols="12" md="12">
                    <v-text-field
                        label="Manufacturing Date"
                        v-model="product.manufacturing_date"
                        type="date"
                        outlined
                        required
                    ></v-text-field>
                </v-col>

                <!-- Expiration Date -->
                <v-col cols="12" md="12">
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

            <!-- Snackbar Notification -->
            <v-snackbar
                v-model="snackbar"
                multi-line
                :color="snackbarColor"
            >
                {{ snackbarText }}

                <template v-slot:actions>
                    <v-btn color="white" variant="text" @click="snackbar = false">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
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
                required: (value) => !!value || "This field is required",
            },
            snackbar: false,
            snackbarText: '',
            snackbarColor: '',
        };
    },
    mounted() {
        this.fetchProductDetails();
    },
    methods: {
        async fetchProductDetails() {
            try {
                const response = await getProductById(this.productId);
                const productData = response.data;

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
            const date = new Date(isoDate);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        async validateAndSubmit() {
            const isFormValid = this.$refs.form.validate();
            if (isFormValid) {
                if (new Date(this.product.manufacturing_date) > new Date(this.product.expiration_date)) {
                    this.snackbarText = 'Manufacturing date must be before expiration date.';
                    this.snackbarColor = 'red';
                    this.snackbar = true;
                    return;
                }
                await this.updateProduct();
            }
        },
        async updateProduct() {
            try {
                const updatedProduct = {
                    ...this.product,
                    active_ingredients: Array.isArray(this.product.active_ingredients)
                        ? this.product.active_ingredients
                        : this.product.active_ingredients.split(",").map((ingredient) => ingredient.trim()),
                };

                await updateProduct(this.productId, updatedProduct);
                this.snackbarText = 'Product updated successfully!';
                this.snackbarColor = 'green';
                this.snackbar = true;
                setTimeout(() => {
                    this.$router.push({ name: "ListProducts" });
                }, 2000);
            } catch (error) {
                console.error("Error updating product:", error.message);

                if (error.response && error.response.status === 422) {
                    const validationErrors = error.response.data.errors;

                    if (validationErrors.name) {
                        this.snackbarText = 'Product name already exists.';
                    } else if (validationErrors.batch_number) {
                        this.snackbarText = 'Batch number already exists.';
                    } else if (validationErrors.manufacturing_date || validationErrors.expiration_date) {
                        this.snackbarText = "Manufacturing date must be before expiration date.";
                    } else {
                        this.snackbarText = "Couldn't submit the data.";
                    }
                    this.snackbarColor = 'red';
                    this.snackbar = true;
                }
            }
        },
        cancelEdit() {
            this.$router.push({ name: "ListProducts" });
        },
        getCategoryColor(category) {
            switch (category) {
                case "Capsule": return "purple";
                case "Tablet": return "green";
                case "Injection": return "orange";
                default: return "grey";
            }
        },
        getStatusColor(status) {
            switch (status) {
                case "In Clinical Trials": return "red";
                case "Completed": return "green";
                case "Under Development": return "orange";
                default: return "grey";
            }
        },
    },
};
</script>

<style scoped>
.edit-form {
    width: 100%;
}

.title {
    font-family: Arial, sans-serif;
    margin-bottom: 20px;
}
</style>

