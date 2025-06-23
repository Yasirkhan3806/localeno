
import React from 'react';
import { Eye, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RentalCard = ({ 
  rental, 
  getStatusIcon, 
  getStatusColor, 
  getDaysRemaining, 
  extendRental, 
  returnRental, 
  viewRentalDetails 
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product Image */}
        <div className="lg:w-32 lg:h-32 w-full h-48 bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={rental.image}
            alt={rental.productName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Rental Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getStatusIcon(rental.status, rental.isOverdue)}
              <div>
                <h3 className="font-semibold text-gray-900">{rental.productName}</h3>
                <p className="text-sm text-gray-500">{rental.id}</p>
              </div>
            </div>
            
            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(rental.status, rental.isOverdue)}`}>
              {rental.isOverdue ? 'Overdue' : rental.status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{new Date(rental.startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="font-medium">{new Date(rental.endDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Daily Rate</p>
              <p className="font-medium">${rental.dailyRate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-bold text-lg">${rental.totalAmount}</p>
            </div>
          </div>

          {/* Status-specific information */}
          {rental.status === 'active' && (
            <div className="bg-blue-50 p-3 rounded-xl mb-4">
              <p className="text-sm text-blue-800">
                {getDaysRemaining(rental.endDate) > 0 
                  ? `${getDaysRemaining(rental.endDate)} days remaining`
                  : 'Due today'}
              </p>
            </div>
          )}

          {rental.isOverdue && (
            <div className="bg-red-50 p-3 rounded-xl mb-4">
              <p className="text-sm text-red-800">
                Overdue by {rental.overdueDays} days. Please return immediately to avoid additional charges.
              </p>
            </div>
          )}

          {rental.status === 'upcoming' && (
            <div className="bg-purple-50 p-3 rounded-xl mb-4">
              <p className="text-sm text-purple-800">
                Rental starts in {Math.abs(getDaysRemaining(rental.startDate))} days
              </p>
            </div>
          )}

          {rental.returnDate && (
            <div className="bg-green-50 p-3 rounded-xl mb-4">
              <p className="text-sm text-green-800">
                Returned on {new Date(rental.returnDate).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => viewRentalDetails(rental.id)}
              className="flex items-center space-x-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              <Eye size={16} />
              <span>View Details</span>
            </button>

            {(rental.status === 'Active' || rental.isOverdue) && (
              <>
                <button
                  onClick={() => extendRental(rental.id)}
                  className="flex items-center space-x-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-xl font-medium hover:bg-blue-200 transition-colors"
                >
                  <RotateCcw size={16} />
                  <span>Extend</span>
                </button>
                
                <button
                  onClick={() => returnRental(rental.id)}
                  className="bg-black text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-900 transition-colors"
                >
                  Return Item
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;
