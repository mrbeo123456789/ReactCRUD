import { useState, useEffect } from 'react';

const UserModal = ({ show, onHide, user, onSubmit, roles = [] }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: null // Lưu đối tượng role
    });
    const [errors, setErrors] = useState({}); // Track validation errors

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role || null // Gán trực tiếp role nếu đã có
            });
        } else {
            setFormData({ name: '', email: '', phone: '', role: null }); // Reset form khi user là null
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Đặc biệt xử lý nếu người dùng thay đổi role
        if (name === 'role') {
            const selectedRole = roles.find(role => role.id === parseInt(value));
            setFormData({ ...formData, role: selectedRole });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.role) newErrors.role = 'Role is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true nếu không có lỗi
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formattedData = {
                ...formData,
                role: formData.role // Lưu toàn bộ đối tượng role
            };
            onSubmit(formattedData);
        }
    };

    return (
        show ? (
            <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <div className="modal-content bg-white dark:bg-gray-800 rounded-xl p-6 w-full md:w-3/4 lg:w-1/2">
                    {/* Close Button */}
                    <button onClick={onHide} className="close-button text-white text-xl font-bold absolute top-4 right-4">X</button>
                    <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">{user ? 'Edit User' : 'Add User'}</h2>
                    <form onSubmit={handleSubmit} className="mt-6">
                        {/* Name */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter name"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                required
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                required
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                        </div>

                        {/* Phone */}
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                            />
                        </div>

                        {/* Role */}
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                            <select
                                name="role"
                                value={formData.role?.id || ''}
                                onChange={handleChange}
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                required
                            >
                                <option value="">Select Role</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                            {errors.role && <span className="text-red-500 text-sm">{errors.role}</span>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200"
                        >
                            Save
                        </button>

                        {/* Hide Button */}
                        <button
                            type="button"
                            onClick={onHide}
                            className="w-full bg-gray-500 text-white p-4 mt-4 rounded-lg text-lg font-semibold hover:bg-gray-600 transition duration-200"
                        >
                            Hide
                        </button>
                    </form>
                </div>
            </div>
        ) : null
    );
};

export default UserModal;
