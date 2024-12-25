import GenericTable from "../Common/Table.jsx";


const ProductTable = ({ products = [], onEdit, onDelete }) => {
    const columns = [
        { header: 'Name', key: 'name' },
        { header: 'Price', key: 'price' },
        { header: 'Category', accessor: (product) => product.category?.name },
        { header: 'Description', key: 'description' },
    ];

    return (
        <GenericTable
            data={products}
            columns={columns}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    );
};

export default ProductTable;
