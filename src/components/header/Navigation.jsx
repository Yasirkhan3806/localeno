
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navTabs = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "About Us", link: "/about" }
];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (tabLink) => {
    if (tabLink === '/' && location.pathname === '/') {
      return true;
    }
    return location.pathname.startsWith(tabLink) && tabLink !== '/';
  };

  return (
    <ul className="hidden md:flex gap-2 items-center text-base font-medium">
      {navTabs.map((tab) => (
        <li key={tab.name}>
          <button
            onClick={() => {
              if (tab.name === "Home") {
                navigate('/');
              } else {
                navigate(tab.link);
              }
            }}
            className={`px-4 py-2 rounded-lg bg-background hover:bg-accent text-foreground hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 relative ${
              isActive(tab.link) ? 'text-primary' : ''
            }`}
          >
            {tab.name}
            {isActive(tab.link) && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"></div>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
