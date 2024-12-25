import GenericTable from "../Common/Table.jsx";


const UserTable = ({ users = [], onEdit, onDelete }) => {
    const columns = [
        { header: 'Name', key: 'name' },
        { header: 'Email', key: 'email' },
        { header: 'Phone', key: 'phone' },
        { header: 'Role', accessor: (user) => user.role?.name },
    ];

    return (
        <GenericTable
            data={users}
            columns={columns}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    );
};

export default UserTable;
