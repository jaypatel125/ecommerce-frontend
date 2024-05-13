import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 ring-2" : "top-5 right-7"
        } bg-[#151515] p-2 fixed rounded-lg`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes className="text-white" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-gray-100 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-100 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-100 my-1"></div>
          </>
        )}
      </button>
      {isMenuOpen && (
        <section className="bg-[#151515] p-4 top-5 right-7 fixed">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                to="/admin/dashboard"
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm "
                style={({ isActive }) => ({
                  color: isActive ? "#FF6363" : "#fff",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/categorylist"
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm "
                style={({ isActive }) => ({
                  color: isActive ? "#FF6363" : "#fff",
                })}
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/productlist"
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm "
                style={({ isActive }) => ({
                  color: isActive ? "#FF6363" : "#fff",
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/allproductslist"
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm "
                style={({ isActive }) => ({
                  color: isActive ? "#FF6363" : "#fff",
                })}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/userlist"
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm "
                style={({ isActive }) => ({
                  color: isActive ? "#FF6363" : "#fff",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orderlist"
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm "
                style={({ isActive }) => ({
                  color: isActive ? "#FF6363" : "#fff",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
