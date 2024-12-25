import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout'; // Import Layout component
import UserManagement from './Page/UserManagement'; // Import UserManagement component
import ProductManagement from './Page/ProductManagement'; // Import ProductManagement component

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // Use Layout component to wrap the child routes
        children: [
            {
                path: "/user", // This route will render the UserManagement component inside Layout
                element: <UserManagement />
            },
            {
                path: "/product", // This will render the ProductManagement component inside Layout
                element: <ProductManagement />
            }
        ]
    }
]);

export default router;
