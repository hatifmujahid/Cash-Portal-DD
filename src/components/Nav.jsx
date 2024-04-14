import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoIcon.png";

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    console.log("logging out");
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navigateToSocial = () => {
    navigate("/social");
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  const navigateToSocialList = () => {
    navigate("/social-list");
  };

  return (
    <div className="w-full h-16 absolute top-0 md:flex md:justify-between p-3">
      <div className="flex text-white mx-4 md:mx-12 justify-between items-center">
        <div className="text-white">
          <img src={logo} alt="logo" className="h-16" />
        </div>
        <div className="md:hidden">
          {isMenuOpen ? (
            <button
              className="text-white p-2 rounded-xl bg-transparent focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : (
            <button
              className="text-white p-2 rounded-xl bg-transparent focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
        <div className={`md:flex flex-col md:flex-row ${isMenuOpen ? "flex" : "hidden"}`}>
          {isLoggedIn ? (
            <>
              <button
                className="text-white p-2 rounded-xl bg-[#297987] hover:bg-[#13a3bd] font-bold mb-2 md:mb-0 md:mr-4"
                onClick={navigateToRegister}
              >
                Comp Register
              </button>
              <button
                className="text-white p-2 rounded-xl bg-[#297987] hover:bg-[#13a3bd] font-bold mb-2 md:mb-0 md:mr-4"
                onClick={navigateToSocial}
              >
                Social Register
              </button>
              
              <button
                className="text-white p-2 rounded-xl bg-[#297987] hover:bg-[#13a3bd] font-bold mb-2 md:mb-0 md:mr-4"
                onClick={navigateToSocialList}
              >
                Social List
              </button>

              <button
                className="text-white p-2 rounded-xl bg-[#5c0f19] hover:bg-[#b01529]  font-bold"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
    </div>
  );
};

export default Nav;
