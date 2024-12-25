import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';  // Import ProductProvider

createRoot(document.getElementById('root')).render(
    <UserProvider>
        <ProductProvider>  {/* Wrap the app with both providers */}
            <App />
        </ProductProvider>
    </UserProvider>
);
