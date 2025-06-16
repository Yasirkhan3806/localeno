
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';

const RecentOrdersSection = ({ recentOrders }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Package size={24} className="text-gray-900" />
          <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
        </div>
        <button
          onClick={() => navigate('/user/orders')}
          className="text-black font-semibold hover:underline"
        >
          View All Orders
        </button>
      </div>

      <div>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium">{order.product}</td>
                  <td className="py-4 px-4 text-gray-600">{order.date}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="block md:hidden space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-2xl shadow-sm p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-900">{order.product}</span>
                <span className="font-bold">{order.amount}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{order.date}</span>
                <span className={`px-2 py-1 rounded-full font-medium text-xs ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersSection;
