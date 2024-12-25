import { useState, useEffect } from 'react';

const GenericModal = ({
                          show,
                          onHide,
                          data = null,
                          onSubmit,
                          schema = [],
                          title = "Form",
                          options = {} // Options for select fields
                      }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (data) {
            setFormData(data);
        } else {
            const defaultData = {};
            schema.forEach(field => {
                defaultData[field.name] = field.type === 'select' ? null : '';
            });
            setFormData(defaultData);
        }
    }, [data, schema]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const fieldSchema = schema.find(field => field.name === name);

        if (fieldSchema?.type === 'select') {
            const selectedOption = options[name]?.find(option => option.id === parseInt(value));
            setFormData({ ...formData, [name]: selectedOption });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        schema.forEach(field => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label || field.name} is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        show ? (
            <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <div className="modal-content bg-white dark:bg-gray-800 rounded-xl p-6 w-full md:w-3/4 lg:w-1/2">
                    <button onClick={onHide} className="close-button text-white text-xl font-bold absolute top-4 right-4">X</button>
                    <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">{title}</h2>
                    <form onSubmit={handleSubmit} className="mt-6">
                        {schema.map(field => (
                            <div key={field.name} className="mb-4">
                                <label
                                    htmlFor={field.name}
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    {field.label}
                                </label>
                                {field.type === 'select' ? (
                                    <select
                                        name={field.name}
                                        value={formData[field.name]?.id || ''}
                                        onChange={handleChange}
                                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    >
                                        <option value="">Select {field.label}</option>
                                        {options[field.name]?.map(option => (
                                            <option key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : field.type === 'textarea' ? (
                                    <textarea
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        placeholder={`Enter ${field.label.toLowerCase()}`}
                                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    />
                                ) : (
                                    <input
                                        type={field.type || 'text'}
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        placeholder={`Enter ${field.label.toLowerCase()}`}
                                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    />
                                )}
                                {errors[field.name] && <span className="text-red-500 text-sm">{errors[field.name]}</span>}
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200"
                        >
                            Save
                        </button>
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

export default GenericModal;
