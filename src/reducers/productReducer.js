// Initial state for products
export const initialState = {
    products: [],
    categories: [],
    searchTerm: '',
    categoryFilter: '',
    currentPage: 1,
    loading: false,
    totalPages: 0,
};

// Reducer function for managing product-related state
export const productReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload.products,
                totalPages: action.payload.totalPages
            };
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload };
        case 'SET_CATEGORY_FILTER':
            return { ...state, categoryFilter: action.payload };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
};
