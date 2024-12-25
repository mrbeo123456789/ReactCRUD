import { useEffect, useCallback } from 'react';
import { fetchUsers, fetchRoles } from '../services/User.js';
import { useUserDispatch, useUserState } from '../context/UserContext';

const useUsers = () => {
    const dispatch = useUserDispatch(); // Access dispatch from the context
    const { searchTerm, roleFilter, currentPage } = useUserState(); // Get roleFilter from state

    useEffect(() => {
        const loadData = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const usersData = await fetchUsers(searchTerm, roleFilter, currentPage); // Pass roleFilter to fetchUsers
                dispatch({
                    type: 'SET_USERS',
                    payload: {
                        users: usersData.content,
                        totalPages: usersData.totalPages,
                    },
                });
            } catch (error) {
                console.error('Error loading users:', error);
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        const loadRoles = async () => {
            try {
                const rolesData = await fetchRoles();
                dispatch({
                    type: 'SET_ROLES',
                    payload: rolesData,
                });
            } catch (error) {
                console.error('Error loading roles:', error);
            }
        };

        loadData();
        loadRoles();
    }, [searchTerm, roleFilter, currentPage, dispatch]); // Add roleFilter to the dependency array

    // Define refreshUsers to reload the list of users
    const refreshUsers = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const usersData = await fetchUsers(searchTerm, roleFilter, currentPage); // Again, pass roleFilter
            dispatch({
                type: 'SET_USERS',
                payload: {
                    users: usersData.content,
                    totalPages: usersData.totalPages,
                },
            });
        } catch (error) {
            console.error('Error refreshing users:', error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [dispatch, searchTerm, roleFilter, currentPage]); // Add roleFilter to the dependency array

    return {
        users: useUserState().users,
        roles: useUserState().roles,
        totalPages: useUserState().totalPages,
        currentPage,
        searchTerm,
        roleFilter,
        loading: useUserState().loading,
        refreshUsers, // Return refreshUsers
    };
};

export default useUsers;
