
import React from 'react';

const ROLES = [
  { key: 'customer', label: 'Sign in as Customer' },
  { key: 'seller', label: 'Sign in as Seller' },
  { key: 'admin', label: 'Sign in as Admin' },
];

const LoginModeToggle = ({ mode, setMode }) => {
  return (
    <div className="flex justify-center gap-2 mb-6">
      {ROLES.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => setMode(key)}
          className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm border
            ${
              mode === key
                ? "bg-black text-white border-black shadow"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }
            focus:outline-none focus:ring-2 focus:ring-black`}
          style={{ minWidth: 140 }}
          data-testid={`login-mode-${key}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LoginModeToggle;
