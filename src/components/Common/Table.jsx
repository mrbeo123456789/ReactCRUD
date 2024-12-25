const GenericTable = ({ data = [], columns = [], onEdit, onDelete }) => {
    const validateValue = (value) => {
        return value ? value : 'No data'; // Display "No data" if the value is missing
    };

    if (!Array.isArray(data)) {
        console.error('Expected "data" to be an array, but received:', data);
        return <div>No data available</div>; // Show message if data is not an array
    }

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead>
            <tr>
                {columns.map((col, index) => (
                    <th
                        key={index}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        {col.header}
                    </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
                <tr>
                    <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-gray-500">No data</td>
                </tr>
            ) : (
                data.map((item) => (
                    <tr key={item.id}>
                        {columns.map((col, index) => (
                            <td key={index} className="px-6 py-4 whitespace-nowrap">
                                {validateValue(col.accessor ? col.accessor(item) : item[col.key])}
                            </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button
                                onClick={() => onEdit(item)}
                                className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(item.id)}
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

export default GenericTable;
