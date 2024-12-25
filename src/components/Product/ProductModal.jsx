import { useState, useEffect } from 'react';

const ProductModal = ({ show, onHide, product, onSubmit, categories = [] }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: null, // Lưu đối tượng category
        description: '',
    });
    const [errors, setErrors] = useState({}); // Track validation errors

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price,
                category: product.category || null, // Gán trực tiếp category nếu đã có
                description: product.description || '',
            });
        } else {
            setFormData({ name: '', price: '', category: null, description: '' }); // Reset form khi product là null
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Đặc biệt xử lý nếu người dùng thay đổi category
        if (name === 'category') {
            const selectedCategory = categories.find(category => category.id === parseInt(value));
            setFormData({ ...formData, category: selectedCategory });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.price || isNaN(formData.price)) newErrors.price = 'Valid price is required';
        if (!formData.category) newErrors.category = 'Category is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true nếu không có lỗi
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formattedData = {
                ...formData,
                category: formData.category // Lưu toàn bộ đối tượng category
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
                    <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">{product ? 'Edit Product' : 'Add Product'}</h2>
                    <form onSubmit={handleSubmit} className="mt-6">
                        {/* Name */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                required
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                            <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter product price"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                required
                            />
                            {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
                        </div>

                        {/* Category */}
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                            <select
                                name="category"
                                value={formData.category?.id || ''}
                                onChange={handleChange}
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter product description"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                            />
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

export default ProductModal;
