<template>
    <v-container class="container" max-width="1200px">
        <v-row>
            <v-col cols="12" class="text-center">
                <h2 class="title">Products Management</h2>
            </v-col>

             <!-- Add Product Button that activates the modal -->
             <v-col cols="12" class="text-center">
                <v-btn prepend-icon="mdi-plus-circle" color="primary" @click="dialog = true">Add Product</v-btn>
            </v-col>

             <!-- Modal for adding a new product -->
             <v-dialog v-model="dialog" max-width="600">
                <v-card>
                    <v-card-title class="headline">Add Product</v-card-title>

                    <v-card-text>
                        <v-form @submit.prevent="submitProduct">
                            <v-text-field v-model="product.name" label="Product Name" required></v-text-field>
                            
                            <v-select
                                v-model="product.category"
                                :items="['Capsule', 'Tablet', 'Injection']"
                                label="Category*"
                                required
                                >
                            
                            </v-select>

                            <v-text-field
                                v-model="product.active_ingredients"
                                label="Active Ingredients (comma-separated)"
                                required
                            ></v-text-field>

                            <v-text-field 
                            v-model="product.batch_number" 
                            label="Batch Number"
                            required>

                            </v-text-field>
                            <v-select
                                v-model="product.research_status"
                                :items="['Completed', 'Under Development', 'In clinical Trials']"
                                label="Research Status"
                                return-object
                                required>
                            ></v-select>
                            <v-text-field
                                v-model="product.manufacturing_date"
                                label="Manufacturing Date"
                                type="date"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="product.expiration_date"
                                label="Expiration Date"
                                type="date"
                                required
                            ></v-text-field>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="dialog = false">Close</v-btn>
                        <v-btn color="primary" @click="submitProduct">Submit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-snackbar
                v-model="snackbar"
                multi-line
                :color="snackbarColor" 
            >
                {{ snackbarText }}

                <template v-slot:actions>
                <v-btn
                    color="white"
                    variant="text"
                    @click="snackbar = false"
                >
                    Close
                </v-btn>
                </template>
            </v-snackbar>

            <v-col cols="12" sm="12" class="mx-auto">
                <v-text-field v-model="searchQuery" append-inner-icon="mdi-magnify" density="compact"
                    label="Search products" variant="solo" hide-details single-line></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
                    :items-length="totalItems" :loading="loading" :search="searchQuery" item-value="name"
                    @update:options="loadItems">
                    <template v-slot:item.name="{ item }">
                        <v-btn color="blue" variant="text" @click="goToShowPage(item.id)">
                            {{ item.name }}
                        </v-btn>
                    </template>

                    <template v-slot:item.category="{ item }">
                        <v-chip label :color="getCategoryColor(item.category)">
                            {{ item.category }}
                        </v-chip>
                    </template>

                    <template v-slot:item.batch_number="{ item }">
                        <v-chip label>{{ item.batch_number }}</v-chip>
                    </template>

                    <template v-slot:item.research_status="{ item }">
                        <v-chip label :color="getStatusColor(item.research_status)">
                            {{ item.research_status }}
                        </v-chip>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <div class="action-buttons">
                            <v-btn variant="tonal" color="blue" @click="goToShowPage(item.id)">
                                <v-icon icon="mdi-pencil"></v-icon>
                            </v-btn>
                            <v-btn variant="tonal" class="ma-2" color="red" @click="deleteProduct(item.id)">
                                <v-icon icon="mdi-delete"></v-icon>
                            </v-btn>
                        </div>
                    </template>
                </v-data-table-server>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getProducts, deleteProduct,createProduct  } from "../services/productService.js";

export default {
    data() {
        return {
            dialog: false,  // Controls the dialog visibility
            itemsPerPage: 10,
            headers: [
                { title: "ID", key: "id", sortable: true },
                { title: "Name", key: "name", align: "start", sortable: true },
                { title: "Category", key: "category", align: "center", sortable: true },
                { title: "Batch Number", key: "batch_number", align: "center", sortable: true },
                { title: "Research Status", key: "research_status", align: "center", sortable: true },
                { title: "Actions", key: "actions", align: "center", sortable: false },
            ],
            serverItems: [],
            totalItems: 0,
            searchQuery: "",
            loading: true,
            product: {  // Holds the form data
                name: '',
                category: '',
                active_ingredients: '',
                batch_number: '',
                research_status: '',
                manufacturing_date: '',
                expiration_date: '',
            },
            snackbar: false,          // Snackbar visibility
            snackbarText: '',        // Snackbar message
            snackbarColor: 'green',  // Snackbar color
            selectedCategory: '',   
            selectedResearchStatus: '',  
        };
    },
    mounted() {
        this.loadItems({ page: 1, itemsPerPage: this.itemsPerPage });
    },
    methods: {
        async loadItems({ page, itemsPerPage, sortBy }) {
            this.loading = true;

            try {
                const response = await getProducts({
                    page,
                    itemsPerPage,
                    search: this.searchQuery,
                    sortBy: sortBy && sortBy[0] ? sortBy[0]['key'] : 'id',
                    sortOrder: sortBy && sortBy[0] ? sortBy[0]['order'] : 'asc',
                });
                this.serverItems = response.data.items;
                this.totalItems = response.data.total;
            } catch (error) {
                console.error("Error fetching products:", error.message);
            }

            this.loading = false;
        },

        async submitProduct() {
            try {
                const productData = {
                    name: this.product.name,
                    category: this.product.category, // Make sure this is bound correctly
                    active_ingredients: this.product.active_ingredients.split(',').map(ingredient => ingredient.trim()), // Convert to array
                    batch_number: this.product.batch_number,
                    research_status: this.product.research_status, // Ensure this is bound correctly
                    manufacturing_date: this.product.manufacturing_date,
                    expiration_date: this.product.expiration_date,
                };

                console.log('Submitting product data:', productData); // Add this line

                await createProduct(productData);

                // Close the modal and reload the product list if successful
                this.dialog = false;
                this.loadItems({ page: 1, itemsPerPage: this.itemsPerPage });
                this.resetForm();
                // Show success snackbar
                this.snackbarText = 'Submission successful!';
                this.snackbarColor = 'green';
                this.snackbar = true;
            } catch (error) {

                console.error('Error adding product:', error.message);
                if (error.response && error.response.status === 422) {
                    const validationErrors = error.response.data.errors;

                    if (validationErrors.name) {
                        this.snackbarText = 'Product name already exists.';
                    } else if (validationErrors.batch_number) {
                        this.snackbarText = 'Batch number already exists.Batch number needs to be unique';
                    } 
                    else if (error.response.data.message === 'The expiration date must be after the manufacturing date.') {
                        this.snackbarText = 'The expiration date must be after the manufacturing date.';
                    } else {
                        this.snackbarText = "Couldn't submit the data.";
                    }

                    this.snackbarColor = 'red';
                    this.snackbar = true;
                    }
            }
        },

        resetForm() {
            this.product = {
                name: '',
                category: '',
                active_ingredients: '',
                batch_number: '',
                research_status: '',
                manufacturing_date: '',
                expiration_date: '',
            };
        },
        
        goToEditPage(productId) {
            this.$router.push({
                name: "EditProduct",
                params: { productId },
                props: true,
            });
        },
        goToShowPage(productId) {
            this.$router.push({
                name: "ShowProduct",
                params: { productId },
                props: true,
            });
        },
        async deleteProduct(productId) {
            if (confirm("Are you sure you want to delete this product?")) {
                try {
                    await deleteProduct(productId);
                    this.loadItems({ page: 1, itemsPerPage: this.itemsPerPage });
                } catch (error) {
                    console.error("Error deleting product:", error);
                }
            }
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
                    return "success";
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
.action-buttons {
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: nowrap;
    align-items: center;
}

.action-buttons .v-btn {
    min-width: 40px;
}

@media (max-width: 600px) {
    .action-buttons {
        justify-content: space-around;
    }
}
</style>
