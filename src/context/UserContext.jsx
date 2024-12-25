import { createContext, useContext, useReducer } from 'react';
import {initialState, userReducer} from "../reducers/userReducer.js";

// Create context for both state and dispatch
const UserContext = createContext();

// Custom hooks to access state and dispatch
export const useUserState = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserState must be used within a UserProvider');
    }
    return context.state; // Directly return the state from context
};

export const useUserDispatch = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserDispatch must be used within a UserProvider');
    }
    return context.dispatch; // Directly return the dispatch function from context
};

// UserProvider component
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
