// Initial state
export const initialState = {
    users: [],
    roles: [],
    searchTerm: '',
    roleFilter: '',
    currentPage: 1,
    loading: false,
    totalPages: 0,
};

// Reducer function
export const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, users: action.payload.users, totalPages: action.payload.totalPages };
        case 'SET_ROLES':
            return { ...state, roles: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload };
        case 'SET_ROLE_FILTER':
            return { ...state, roleFilter: action.payload };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
};
