import apiClient from './api.js';

export const getProducts = ({ page, itemsPerPage, search, sortBy, sortOrder }) => {
    return apiClient.get('/products', {
        params: {
            page,
            itemsPerPage,
            search,
            sortBy,
            sortOrder,
        },
    });
};

export const getProductById = (id) => {
    return apiClient.get(`/products/${id}`);
};

export const createProduct = (product) => {
    return apiClient.post('/products', product);
};

export const updateProduct = (id, updatedProduct) => {
    return apiClient.put(`/products/${id}`, updatedProduct);
};

export const deleteProduct = (id) => {
    return apiClient.delete(`/products/${id}`);
};
