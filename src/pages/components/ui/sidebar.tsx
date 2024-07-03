import React, { useState } from 'react';
import { FaTachometerAlt, FaHamburger, FaBookOpen, FaStar, FaCog, FaMoneyCheckAlt, FaUserCircle, FaQuestionCircle, FaSearch, FaBars } from 'react-icons/fa';
// import './styles/sidebar.css';
// import "../../../styles/sidebar.css";



const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <FaBars onClick={toggleSidebar} className="toggle-icon" />
                {!isCollapsed && <span className="sidebar-logo">GoodFood</span>}
            </div>
            {!isCollapsed && (
                <div className="sidebar-search">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Search" />
                </div>
            )}
            <div className="sidebar-menu">
                <div className="sidebar-item">
                    <FaTachometerAlt className="sidebar-icon" />
                    {!isCollapsed && <span>Dashboard</span>}
                </div>
                <div className="sidebar-item">
                    <FaHamburger className="sidebar-icon" />
                    {!isCollapsed && <span>Food Order</span>}
                </div>
                <div className="sidebar-item">
                    <FaBookOpen className="sidebar-icon" />
                    {!isCollapsed && <span>Manage Menu</span>}
                </div>
                <div className="sidebar-item">
                    <FaStar className="sidebar-icon" />
                    {!isCollapsed && <span>Customer Review</span>}
                </div>
                <div className="sidebar-item">
                    <FaCog className="sidebar-icon" />
                    {!isCollapsed && <span>Settings</span>}
                </div>
                <div className="sidebar-item">
                    <FaMoneyCheckAlt className="sidebar-icon" />
                    {!isCollapsed && <span>Payment</span>}
                </div>
                <div className="sidebar-item">
                    <FaUserCircle className="sidebar-icon" />
                    {!isCollapsed && <span>Accounts</span>}
                </div>
                <div className="sidebar-item">
                    <FaQuestionCircle className="sidebar-icon" />
                    {!isCollapsed && <span>Help</span>}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
