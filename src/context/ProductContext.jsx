import { createContext, useContext, useReducer } from 'react'; // import useReducer
import { initialState as productInitialState, productReducer } from '../reducers/productReducer';

// Tạo context cho cả state và dispatch
const ProductContext = createContext();

// Custom hooks để truy cập state và dispatch
export const useProductState = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductState must be used within a ProductProvider');
    }
    return context.state;
};

export const useProductDispatch = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductDispatch must be used within a ProductProvider');
    }
    return context.dispatch;
};

// ProductProvider component
export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, productInitialState); // Sử dụng useReducer thay vì gọi productReducer trực tiếp

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};
