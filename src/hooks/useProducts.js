import { useEffect, useCallback } from 'react';
import { fetchProducts, fetchCategories } from '../services/Product.js'; // Giả sử bạn đã có dịch vụ này
import { useProductDispatch, useProductState } from '../context/ProductContext';

const useProducts = () => {
    const dispatch = useProductDispatch(); // Lấy dispatch từ context
    const { searchTerm, categoryFilter, currentPage } = useProductState(); // Lấy searchTerm, categoryFilter, currentPage từ state

    useEffect(() => {
        const loadData = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const productsData = await fetchProducts(searchTerm, categoryFilter, currentPage); // Truyền categoryFilter vào fetchProducts
                dispatch({
                    type: 'SET_PRODUCTS',
                    payload: {
                        products: productsData.content,
                        totalPages: productsData.totalPages,
                    },
                });
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        const loadCategories = async () => {
            try {
                const categoriesData = await fetchCategories();
                dispatch({
                    type: 'SET_CATEGORIES',
                    payload: categoriesData,
                });
            } catch (error) {
                console.error('Error loading categories:', error);
            }
        };

        loadData();
        loadCategories();
    }, [searchTerm, categoryFilter, currentPage, dispatch]); // Thêm categoryFilter vào dependency array

    // Định nghĩa refreshProducts để tải lại danh sách sản phẩm
    const refreshProducts = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const productsData = await fetchProducts(searchTerm, categoryFilter, currentPage); // Truyền categoryFilter
            dispatch({
                type: 'SET_PRODUCTS',
                payload: {
                    products: productsData.content,
                    totalPages: productsData.totalPages,
                },
            });
        } catch (error) {
            console.error('Error refreshing products:', error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [dispatch, searchTerm, categoryFilter, currentPage]); // Thêm categoryFilter vào dependency array

    return {
        products: useProductState().products,
        categories: useProductState().categories,
        totalPages: useProductState().totalPages,
        currentPage,
        searchTerm,
        categoryFilter,
        loading: useProductState().loading,
        refreshProducts, // Trả về refreshProducts
    };
};

export default useProducts;
