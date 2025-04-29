import routes from '../routes/sidebar';
import { NavLink, Link, useLocation } from 'react-router-dom';
import SidebarSubmenu from './SidebarSubmenu';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';

function LeftSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();

    const closeSidebar = () => {
        const drawerToggle = document.getElementById('left-sidebar-drawer');
        if (drawerToggle) {
            drawerToggle.checked = false; // closing the drawer
        }
    };

    return (
        <div className="drawer-side z-30">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label> 
            <ul className="menu pt-6 w-72 md:w-80 bg-base-100 min-h-full text-base-content relative">
                {/* Close Button for Mobile */}
                <button
                    className="btn btn-ghost bg-base-300 btn-circle absolute top-3 right-3 z-50 lg:hidden"
                    onClick={closeSidebar}
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

                {/* Logo / Brand */}
                <li className="mb-6 text-center">
                    <Link
                        to="/app/welcome"
                        className="text-2xl font-bold tracking-wide text-primary hover:text-primary-focus transition-all"
                        onClick={closeSidebar}
                    >
                        Tesod Technology
                    </Link>
                </li>

                {/* Navigation Items */}
                {routes.map((route, k) => (
                    <li key={k} className="mb-1">
                        {route.submenu ? (
                            <SidebarSubmenu {...route} closeSidebar={closeSidebar} />
                        ) : (
                            <NavLink
                                end
                                to={route.path}
                                onClick={closeSidebar}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-primary text-white font-semibold'
                                            : 'hover:bg-base-300 font-medium'
                                    }`
                                }
                            >
                                {route.icon} {route.name}
                                {location.pathname === route.path && (
                                    <span className="absolute inset-y-0 left-0 w-1 bg-primary rounded-tr-md rounded-br-md"></span>
                                )}
                            </NavLink>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LeftSidebar;
