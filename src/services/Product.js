import axios from 'axios';

// Define the base API URL
const apiUrl = 'http://localhost:8080/api';

// Fetch products with optional search term and category filter
export const fetchProducts = (searchTerm, categoryFilter, currentPage) => {
    const params = {
        page: currentPage,
        size: 5
    };

    let url = '';

    if (searchTerm && categoryFilter) {
        // When both searchTerm and categoryFilter are provided
        url = `${apiUrl}/products/search`;  // Search by both name/description and category
        params.searchTerm = searchTerm;
        params.categoryName = categoryFilter;
    } else if (searchTerm) {
        // When only searchTerm is provided
        url = `${apiUrl}/products/search`;  // Search by name/description
        params.searchTerm = searchTerm;
    } else if (categoryFilter) {
        // When only categoryFilter is provided
        url = `${apiUrl}/products/search-by-category`;  // Search by category
        params.categoryName = categoryFilter;
    } else {
        // When no search term or category filter, fetch all products
        url = `${apiUrl}/products/all`;
    }

    return axios.get(url, { params })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching products:', error);
            throw error;
        });
};

// Fetch all categories (for filtering products by category)
export const fetchCategories = () => {
    return axios.get(`${apiUrl}/category/all`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching categories:', error);
            throw error;
        });
};

// Create a new product
export const createProduct = (product) => {
    return axios.post(`${apiUrl}/products/add`, product)
        .then(response => response.data)
        .catch(error => {
            console.error('Error creating product:', error);
            throw error;
        });
};

// Update an existing product
export const updateProduct = (id, updatedProduct) => {
    return axios.put(`${apiUrl}/products/${id}`, updatedProduct)
        .then(response => response.data)
        .catch(error => {
            console.error('Error updating product:', error);
            throw error;
        });
};

// Delete a product by ID
export const deleteProduct = (id) => {
    return axios.delete(`${apiUrl}/products/${id}`)
        .catch(error => {
            console.error('Error deleting product:', error);
            throw error;
        });
};
