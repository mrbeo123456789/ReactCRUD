import { useProductDispatch } from "../context/ProductContext.jsx";
import { useState } from "react";
import SearchByText from "../components/Common/SearchByText.jsx";
import Spinner from "../components/Common/Spinner.jsx";
import ProductTable from "../components/Product/ProductTable.jsx";
import Pagination from "../components/Common/Pagination.jsx";
import ProductModal from "../components/Product/ProductModal.jsx";
import useProducts from "../hooks/useProducts.js";
import { createProduct, deleteProduct, updateProduct } from "../services/Product.js";

function ProductManagement() {
    const dispatch = useProductDispatch();
    const {
        products,
        categories, // Lấy danh sách danh mục
        totalPages,
        currentPage,
        searchTerm,
        loading,
        refreshProducts,
    } = useProducts();
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    // Tìm kiếm sản phẩm
    const handleSearchChange = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SET_SEARCH_TERM', payload: value });
    };

    // Lọc theo danh mục
// Chuyển trang
    const handlePageChange = (page) => {
        dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    };

    // Xóa sản phẩm
    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            await refreshProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Thêm/Sửa sản phẩm
    const handleSubmitProduct = async (product) => {
        try {
            let updatedProduct;
            if (currentProduct) {
                updatedProduct = await updateProduct(currentProduct.id, product);
            } else {
                updatedProduct = await createProduct(product);
            }

            dispatch({
                type: currentProduct ? 'UPDATE_PRODUCT_LIST' : 'ADD_PRODUCT',
                payload: updatedProduct,
            });

            await refreshProducts();
            setShowModal(false);
            setCurrentProduct(null);
        } catch (error) {
            console.error('Error in handleSubmitProduct:', error);
        }
    };

    return (
        <div>
            <SearchByText searchTerm={searchTerm} onSearchChange={handleSearchChange} />

            <div className="mt-8">
                <button
                    onClick={() => {
                        setShowModal(true);
                        setCurrentProduct(null);
                    }}
                    className="mt-4 inline-flex items-center justify-center rounded-md bg-blue-600 py-2 px-4 font-medium text-sm text-white shadow-md shadow-blue-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                >
                    Add Product
                </button>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <>
                    <ProductTable
                        products={products}
                        onEdit={(product) => {
                            setCurrentProduct(product);
                            setShowModal(true);
                        }}
                        onDelete={handleDeleteProduct}
                    />
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                </>
            )}

            <ProductModal
                show={showModal}
                onHide={() => setShowModal(false)}
                product={currentProduct}
                onSubmit={handleSubmitProduct}
                categories={categories} // Truyền danh mục vào modal
            />
        </div>
    );
}

export default ProductManagement;
