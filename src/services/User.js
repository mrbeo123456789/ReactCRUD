import axios from 'axios';

// Định nghĩa URL API cơ bản của bạn
const apiUrl = 'http://localhost:8080/api';

export const fetchUsers = (searchTerm, roleFilter, currentPage) => {
    const params = {
        page: currentPage,
        size: 5
    };

    let url = '';

    if (searchTerm && roleFilter) {
        // Khi cả searchTerm và roleFilter đều có
        url = `${apiUrl}/users/search`;  // Chỉ tìm kiếm theo từ khóa
        params.searchTerm = searchTerm;
        params.roleName = roleFilter;
    } else if (searchTerm) {
        // Khi chỉ có searchTerm
        url = `${apiUrl}/users/search`;  // Tìm kiếm theo từ khóa
        params.searchTerm = searchTerm;
    } else if (roleFilter) {
        // Khi chỉ có roleFilter
        url = `${apiUrl}/users/search-by-role`;  // Tìm kiếm theo vai trò
        params.roleName = roleFilter;
    } else {
        // Khi không có searchTerm và roleFilter, lấy tất cả người dùng
        url = `${apiUrl}/users/all`;
    }

    return axios.get(url, { params })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching users:', error);
            throw error;
        });
};

export const fetchRoles = () => {
    return axios.get(`${apiUrl}/roles/all`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching roles:', error);
            throw error;
        });
};

export const createUser = (user) => {
    return axios.post(`${apiUrl}/users/add`, user)
        .then(response => response.data)
        .catch(error => {
            console.error('Error adding user:', error);
            throw error;
        });
};

export const updateUser = (id, updatedUser) => {
    return axios.put(`${apiUrl}/users/${id}`, updatedUser)
        .then(response => response.data)
        .catch(error => {
            console.error('Error updating user:', error);
            throw error;
        });
};

export const deleteUser = (id) => {
    return axios.delete(`${apiUrl}/users/${id}`)
        .catch(error => {
            console.error('Error deleting user:', error);
            throw error;
        });
};
