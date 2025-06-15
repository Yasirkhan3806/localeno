
import React from 'react';
import BackToHomeButton from '../BackToHomeButton';

const UserOrderDetail = () => {
  return (
    <div className="space-y-8 relative">
      {/* Absolute Back to Home Icon Top-Left */}
      <BackToHomeButton />
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold text-gray-900 mt-2">Order Details</h1>
      </div>
      <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200">
        <p className="text-gray-600">Order detail page coming soon...</p>
      </div>
    </div>
  );
};

export default UserOrderDetail;
