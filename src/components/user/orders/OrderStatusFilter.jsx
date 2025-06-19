
import React from 'react';

const OrderStatusFilter = ({ filterStatus, setFilterStatus }) => {
  const statusOptions = ['all', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl font-medium transition-colors capitalize ${
              filterStatus === status
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? 'All Orders' : status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusFilter;
