
import React from 'react';
import { useNavigate } from 'react-router-dom';

const navTabs = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "About Us", link: "/about" }
];

const Navigation = () => {
  const navigate = useNavigate();

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
            className="px-4 py-2 rounded-lg bg-background hover:bg-accent text-foreground hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
          >
            {tab.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
