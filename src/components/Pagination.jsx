const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pages = [];

    // Create page buttons
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <a
                key={i}
                href="#"
                className={`mx-1 px-3 py-2 font-medium rounded-md ${i === currentPage ? 'bg-blue-500 text-gray-200' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-gray-200'}`}
                onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    onPageChange(i);
                }}
                disabled={i === currentPage} // Disable the button if it's the current page
            >
                {i}
            </a>
        );
    }

    // Check if we have more than 1 page to show pagination controls
    if (totalPages <= 1) {
        return null; // If there's only one page, no pagination needed
    }

    return (
        <div className="mt-8">
            <div className="flex">
                <a
                    href="#"
                    className={`mx-1 px-3 py-2 font-medium rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-gray-200'}`}
                    onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) onPageChange(currentPage - 1);
                    }}
                    disabled={currentPage === 1} // Disable if we're on the first page
                >
                    Previous
                </a>

                {pages}

                <a
                    href="#"
                    className={`mx-1 px-3 py-2 font-medium rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-gray-200'}`}
                    onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) onPageChange(currentPage + 1);
                    }}
                    disabled={currentPage === totalPages} // Disable if we're on the last page
                >
                    Next
                </a>
            </div>
        </div>
    );
};

export default Pagination;
