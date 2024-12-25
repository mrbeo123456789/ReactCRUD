import GenericModal from "../Common/Modal.jsx";


const ProductModal = ({ show, onHide, product, onSubmit, categories = [] }) => {
    // Define schema for the product form
    const productSchema = [
        { name: 'name', label: 'Name', required: true },
        { name: 'price', label: 'Price', type: 'number', required: true },
        { name: 'category', label: 'Category', type: 'select', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
    ];

    // Pass category options to GenericModal
    const categoryOptions = { category: categories };

    return (
        <GenericModal
            show={show}
            onHide={onHide}
            data={product} // Pass existing product data to pre-fill the form
            onSubmit={onSubmit} // Handle form submission
            title={product ? 'Edit Product' : 'Add Product'} // Dynamic modal title
            schema={productSchema} // Form schema
            options={categoryOptions} // Options for select fields
        />
    );
};

export default ProductModal;
