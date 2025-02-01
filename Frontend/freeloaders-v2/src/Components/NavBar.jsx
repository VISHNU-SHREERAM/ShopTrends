import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className="flex justify-between items-center h-16 bg-[#789DBC] text-black relative shadow-sm font-mono"
      role="navigation"
    >
      <div className="pl-8 text-white font-bold text-2xl">
        Data Analytics - ShopTrends
      </div>

      {/* Mobile menu button */}
      <div className="relative">
        <div
          className="px-4 cursor-pointer text-white"
          onClick={toggleDropdown}
        >
          Menu
        </div>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Option 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Option 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Option 3
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
