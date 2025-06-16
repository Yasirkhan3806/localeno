
import React from 'react';

const ROLES = [
  { key: 'customer', label: 'Sign in as Customer' },
  { key: 'seller', label: 'Sign in as Seller' },
  { key: 'admin', label: 'Sign in as Admin' },
];

const LoginModeToggle = ({ mode, setMode }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-2 mb-6 w-full max-w-md mx-auto">
      {ROLES.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => setMode(key)}
          className={`w-full sm:flex-1 px-3 py-2.5 sm:px-4 sm:py-2 rounded-full font-semibold transition-colors text-xs sm:text-sm border
            ${
              mode === key
                ? "bg-black text-white border-black shadow"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }
            focus:outline-none focus:ring-2 focus:ring-black whitespace-nowrap`}
          data-testid={`login-mode-${key}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LoginModeToggle;
