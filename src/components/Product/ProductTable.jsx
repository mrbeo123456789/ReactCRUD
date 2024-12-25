const ProductTable = ({ products = [], onEdit, onDelete }) => {
    const validateValue = (value) => {
        return value ? value : 'No data'; // Display "No data" if the value is missing
    };

    if (!Array.isArray(products)) {
        console.error('Expected "products" to be an array, but received:', products);
        return <div>No data available</div>; // Show message if products is not an array
    }

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead>
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {products.length === 0 ? (
                <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No data</td>
                </tr>
            ) : (
                products.map(product => (
                    <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{validateValue(product.name)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{validateValue(product.price)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{validateValue(product.category?.name)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{validateValue(product.description)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button
                                onClick={() => onEdit(product)}
                                className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(product.id)}
                                className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))
            )}
            </tbody>
        </table>
    );
};

export default ProductTable;
