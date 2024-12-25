import GenericModal from "../Common/Modal.jsx";


const UserModal = ({ show, onHide, user, onSubmit, roles = [] }) => {
    // Define schema for the user form
    const userSchema = [
        { name: 'name', label: 'Name', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone' },
        { name: 'role', label: 'Role', type: 'select', required: true }
    ];

    // Pass role options to GenericModal
    const roleOptions = { role: roles };

    return (
        <GenericModal
            show={show}
            onHide={onHide}
            data={user} // Pass existing user data to pre-fill the form
            onSubmit={onSubmit} // Handle form submission
            title={user ? 'Edit User' : 'Add User'} // Dynamic modal title
            schema={userSchema} // Form schema
            options={roleOptions} // Options for select fields
        />
    );
};

export default UserModal;
