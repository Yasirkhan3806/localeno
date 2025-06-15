
import React from "react";
import { ShoppingBag, Building } from "lucide-react";

const SignupAccountTypeSelection = ({ accountType, setAccountType }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Account Type</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => setAccountType("customer")}
        className={`p-4 border-2 rounded-xl transition-all ${
          accountType === "customer"
            ? "border-black bg-black text-white"
            : "border-gray-300 hover:border-gray-400"
        }`}
        data-testid="signup-customer"
      >
        <ShoppingBag className="mx-auto mb-2" size={24} />
        <div className="font-semibold">Customer</div>
        <div className="text-sm opacity-75">Buy and rent products</div>
      </button>
      <button
        type="button"
        onClick={() => setAccountType("seller")}
        className={`p-4 border-2 rounded-xl transition-all ${
          accountType === "seller"
            ? "border-black bg-black text-white"
            : "border-gray-300 hover:border-gray-400"
        }`}
        data-testid="signup-seller"
      >
        <Building className="mx-auto mb-2" size={24} />
        <div className="font-semibold">Seller</div>
        <div className="text-sm opacity-75">Sell your products</div>
      </button>
    </div>
  </div>
);

export default SignupAccountTypeSelection;
