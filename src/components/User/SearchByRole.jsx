import { useState } from 'react';

const SearchByRole = ({ roles, selectedRole, onRoleChange }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleRoleChange = (roleName) => {
        onRoleChange(roleName); // Update the selected role
        setIsDropdownVisible(false); // Close the dropdown after selecting a role
    };

    return (
        <div className="flex justify-start w-full"> {/* Added wrapper div for left alignment */}
            <div className="relative w-40 group"> {/* Adjusted width */}
                <label className="text-xs text-gray-400">Filter by Role</label>
                <button
                    className="py-1.5 px-2 w-full text-xs text-site bg-transparent border border-dimmed focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded font-semibold"
                    onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                >
                    {selectedRole || 'All'}
                </button>
                {isDropdownVisible && (
                    <div className="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] rounded-md overflow-hidden shadow-lg min-w-[160px] w-max peer-focus:visible peer-focus:opacity-100 opacity-100 visible duration-200 p-1 bg-gray-100 dark:bg-gray-800 border border-dimmed text-xs">
                        <div
                            className="w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-2 py-1 rounded-md"
                            onClick={() => handleRoleChange('')}
                        >
                            All
                        </div>
                        {roles.map((role) => (
                            <div
                                key={role.id}
                                className="w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-2 py-1 rounded-md"
                                onClick={() => handleRoleChange(role.name)}
                            >
                                {role.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchByRole;
