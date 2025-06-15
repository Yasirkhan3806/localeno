
import React, { useState } from "react";
import { Menu, X, ChevronDown, Search, User, LogIn, UserPlus } from "lucide-react";

const categories = [
  { name: "Electronics" },
  { name: "Clothing" },
  { name: "Accessories" },
  { name: "Home & Living" },
];

const navTabs = [
  { name: "Home", link: "#" },
  { name: "Products", link: "#" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);

  // Only show categories dropdown on desktop
  const handleCategoriesClick = (e) => {
    e.preventDefault();
    setCategoriesDropdown((c) => !c);
  };

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur font-inter shadow-none border-b border-neutral-200">
      <nav className="container mx-auto flex items-center justify-between h-20 relative">
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold">
          <a href="#" className="text-foreground tracking-tight">
            <span className="rounded bg-neutral-900 text-white px-2 py-1 font-bold text-xl">Shoply</span>
          </a>
        </div>
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-2 items-center text-base font-medium">
          {navTabs.map((tab) => (
            <li key={tab.name}>
              <a
                href={tab.link}
                className="px-4 py-2 rounded hover:bg-neutral-100 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              >
                {tab.name}
              </a>
            </li>
          ))}
          {/* Categories Dropdown */}
          <li className="relative">
            <button
              onClick={handleCategoriesClick}
              className="px-4 py-2 rounded inline-flex items-center gap-1 hover:bg-neutral-100 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            >
              Categories
              <ChevronDown size={18} />
            </button>
            {categoriesDropdown && (
              <ul className="absolute w-56 left-0 top-14 rounded shadow bg-white py-2 z-50 border font-normal animate-fade-in">
                {categories.map((cat) => (
                  <li key={cat.name}>
                    <a href="#" className="block px-4 py-2 hover:bg-neutral-100">
                      {cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <a href="#" className="px-4 py-2 rounded hover:bg-neutral-100 transition-all">
              About Us
            </a>
          </li>
          <li>
            <a href="#contact" className="px-4 py-2 rounded hover:bg-neutral-100 transition-all">
              Contact Us
            </a>
          </li>
        </ul>
        {/* Action Buttons */}
        <div className="hidden md:flex gap-2 items-center">
          <button className="px-4 py-2 bg-black text-white font-semibold rounded-lg hover:scale-105 hover:bg-neutral-900 transition-all focus:ring-2 focus:ring-neutral-400 focus:outline-none">
            <LogIn size={18} className="inline-block mr-1 -mt-1" />
            Login
          </button>
          <button className="px-4 py-2 bg-neutral-100 text-neutral-900 font-semibold rounded-lg hover:scale-105 hover:bg-neutral-200 transition-all focus:ring-2 focus:ring-neutral-400 focus:outline-none">
            <UserPlus size={18} className="inline-block mr-1 -mt-1" />
            Sign Up
          </button>
        </div>
        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden p-2 rounded border border-neutral-200 hover:bg-neutral-100 transition focus:outline-none"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Open mobile navigation"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        {/* Slide-Out Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed top-0 left-0 w-full h-full z-50 bg-black/30 animate-fade-in">
            <div className="fixed top-0 right-0 w-80 max-w-full h-full bg-white shadow-lg px-5 py-6 flex flex-col gap-4">
              <div className="flex justify-between items-center pb-4 border-b mb-2">
                <span className="font-bold text-xl text-black">Shoply</span>
                <button
                  className="p-2 rounded hover:bg-neutral-100"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={28} />
                </button>
              </div>
              <ul className="flex flex-col gap-2">
                {navTabs.map((tab) => (
                  <li key={tab.name}>
                    <a
                      href={tab.link}
                      className="block px-3 py-2 rounded hover:bg-neutral-100 text-base"
                    >
                      {tab.name}
                    </a>
                  </li>
                ))}
                <li>
                  {/* Categories dropdown in mobile - built as nested submenu */}
                  <details>
                    <summary className="px-3 py-2 rounded cursor-pointer flex items-center gap-1 hover:bg-neutral-100 select-none">
                      Categories <ChevronDown size={16} />
                    </summary>
                    <ul className="pl-4 flex flex-col gap-1 mt-1">
                      {categories.map((cat) => (
                        <li key={cat.name}>
                          <a href="#" className="block px-3 py-1 rounded hover:bg-neutral-100">
                            {cat.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
                <li>
                  <a href="#" className="block px-3 py-2 rounded hover:bg-neutral-100 text-base">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="block px-3 py-2 rounded hover:bg-neutral-100 text-base">
                    Contact Us
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex flex-col gap-2">
                <button className="w-full px-4 py-2 bg-black text-white font-semibold rounded-lg hover:scale-105 hover:bg-neutral-900 transition-all mb-1 focus:ring-2 focus:ring-neutral-400">
                  <LogIn size={18} className="inline-block mr-1 -mt-1" />
                  Login
                </button>
                <button className="w-full px-4 py-2 bg-neutral-100 text-neutral-900 font-semibold rounded-lg hover:scale-105 hover:bg-neutral-200 transition-all focus:ring-2 focus:ring-neutral-400">
                  <UserPlus size={18} className="inline-block mr-1 -mt-1" />
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Centered Search Bar */}
      <div className="hidden md:flex justify-center w-full bg-white py-3 border-b border-neutral-200">
        <form className="flex items-center gap-0 w-full max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search products, categories, brands…"
            className="w-full px-4 py-2 border border-neutral-200 rounded-l-lg bg-neutral-50 font-roboto outline-none text-[15px] focus:ring-2 focus:ring-neutral-300"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-r-lg font-semibold hover:scale-105 transition-all focus:ring-2 focus:ring-neutral-400"
          >
            <Search size={18} />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
