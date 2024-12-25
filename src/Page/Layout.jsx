import { Outlet } from 'react-router-dom'; // Used to render nested routes
import Header from '../components/Common/Header.jsx';
import Sidebar from '../components/Common/Sidebar.jsx';
import Footer from '../components/Common/Footer.jsx';

function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 ml-64 p-4"> {/* Adjust left margin based on sidebar width */}
                    <Outlet /> {/* This will render the specific page content */}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
