import { RouterProvider } from 'react-router-dom';
import router from './AppRouter'; // Import the router configuration

function App() {
    return <RouterProvider router={router} />;
}

export default App;
