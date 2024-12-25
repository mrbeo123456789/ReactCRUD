import {useUserDispatch} from "../context/UserContext.jsx";
import {useState} from "react";
import SearchByText from "../components/User/SearchByText.jsx";
import SearchByRole from "../components/User/SearchByRole.jsx";
import Spinner from "../components/Spinner.jsx";
import UserTable from "../components/User/UserTable.jsx";
import Pagination from "../components/Pagination.jsx";
import UserModal from "../components/User/UserModal.jsx";
import useUsers from "../hooks/useUsers.js";
import {createUser, deleteUser, updateUser} from "../services/User.js";

function UserManagement() {
    const dispatch = useUserDispatch();
    const { users, roles, totalPages, currentPage, searchTerm, roleFilter, loading, refreshUsers } = useUsers();
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SET_SEARCH_TERM', payload: value });
    };

    const handleRoleChange = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SET_ROLE_FILTER', payload: value });
    };

    const handlePageChange = (page) => {
        dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            await refreshUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSubmitUser = async (user) => {
        try {
            let updatedUser;
            if (currentUser) {
                updatedUser = await updateUser(currentUser.id, user);
            } else {
                updatedUser = await createUser(user);
            }

            dispatch({
                type: currentUser ? 'UPDATE_USER_LIST' : 'ADD_USER',
                payload: updatedUser,
            });

            await refreshUsers();
            setShowModal(false);
            setCurrentUser(null);
        } catch (error) {
            console.error('Error in handleSubmitUser:', error);
        }
    };

    return (
        <div>
            <SearchByText searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <SearchByRole roles={roles} selectedRole={roleFilter} onRoleChange={handleRoleChange} />
            <div className="mt-8">
                <button
                    onClick={() => {
                        setShowModal(true);
                        setCurrentUser(null);
                    }}
                    className="mt-4 inline-flex items-center justify-center rounded-md bg-blue-600 py-2 px-4 font-medium text-sm text-white shadow-md shadow-blue-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                >
                    Add User
                </button>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <>
                    <UserTable
                        users={users}
                        onEdit={(user) => {
                            setCurrentUser(user);
                            setShowModal(true);
                        }}
                        onDelete={handleDeleteUser}
                    />
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                </>
            )}

            <UserModal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                }}
                user={currentUser}
                onSubmit={handleSubmitUser}
                roles={roles}
            />
        </div>
    );
}

export default UserManagement;
