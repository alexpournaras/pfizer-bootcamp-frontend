<template>
    <v-container class="container" max-width="1200px">
        <v-row>
            <v-col cols="12" class="text-center">
                <h2 class="title">Products Management</h2>
            </v-col>

            <v-col cols="12" class="text-center">
                <v-btn prepend-icon="mdi-plus-circle" color="primary" @click="goToAddPage">Add Product</v-btn>
            </v-col>

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
import { getProducts, deleteProduct } from "../services/productService.js";

export default {
    data() {
        return {
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
        goToAddPage() {
            this.$router.push({ name: "AddProduct" });
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
