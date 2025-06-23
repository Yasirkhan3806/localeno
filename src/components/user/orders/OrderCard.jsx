
import React from 'react';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { convertToPKR, formatPKR } from '../../../utils/currency';

const OrderCard = ({ order, getStatusIcon, getStatusColor }) => {
  const navigate = useNavigate();

  const viewOrderDetails = (orderId) => {
    navigate(`/user/orders/${orderId}`);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
        <div className="flex items-center space-x-4 mb-4 lg:mb-0">
          {getStatusIcon(order.status)}
          <div>
            <h3 className="font-semibold text-gray-900">{order.id}</h3>
            <p className="text-sm text-gray-500">Placed on {new Date(order.orderPlaced).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
          <span className="font-bold text-lg">{order.total}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Items</p>
          <p className="font-medium">{(order.productInfo).length} item(s)</p>
        </div>
        {order.estimatedDelivery && (
          <div>
            <p className="text-sm text-gray-500">Estimated Delivery</p>
            <p className="font-medium">{new Date(order.estimatedDelievery).toLocaleDateString()}</p>
          </div>
        )}
        {order.trackingNumber && (
          <div>
            <p className="text-sm text-gray-500">Tracking Number</p>
            <p className="font-medium">{order.tracingNumber}</p>
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium text-gray-900 mb-2">Order Items:</h4>
        <div className="space-y-2">
          {order.productInfo.map((product, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span>{product?.productsData.name} x{product.quantity}</span>
              <span className="font-medium">{formatPKR(convertToPKR(product?.productsData.price))}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-4">
        <button
          onClick={() => viewOrderDetails(order.id)}
          className="flex items-center space-x-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          <Eye size={16} />
          <span>View Details</span>
        </button>
        
        {order.status === 'delivered' && (
          <button
            onClick={() => navigate('/user/reviews')}
            className="bg-black text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-900 transition-colors"
          >
            Write Review
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
