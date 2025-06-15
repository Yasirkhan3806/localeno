
import React, { useState } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle, Eye, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserRentals = () => {
  const navigate = useNavigate();
  
  // Mock rentals data
  const [rentals] = useState([
    {
      id: "RNT-2024-001",
      productName: "Canon DSLR Camera",
      startDate: "2024-06-01",
      endDate: "2024-06-15",
      returnDate: null,
      status: "active",
      dailyRate: 25.99,
      totalDays: 14,
      totalAmount: 363.86,
      image: "/placeholder.svg",
      deposit: 200.00,
      isOverdue: false
    },
    {
      id: "RNT-2024-002",
      productName: "Electric Drill Set",
      startDate: "2024-06-05",
      endDate: "2024-06-12",
      returnDate: "2024-06-12",
      status: "returned",
      dailyRate: 15.99,
      totalDays: 7,
      totalAmount: 111.93,
      image: "/placeholder.svg",
      deposit: 50.00,
      isOverdue: false
    },
    {
      id: "RNT-2024-003",
      productName: "Projector Screen",
      startDate: "2024-06-08",
      endDate: "2024-06-10",
      returnDate: null,
      status: "overdue",
      dailyRate: 12.99,
      totalDays: 2,
      totalAmount: 25.98,
      image: "/placeholder.svg",
      deposit: 30.00,
      isOverdue: true,
      overdueDays: 5
    },
    {
      id: "RNT-2024-004",
      productName: "Sound System",
      startDate: "2024-06-20",
      endDate: "2024-06-25",
      returnDate: null,
      status: "upcoming",
      dailyRate: 35.99,
      totalDays: 5,
      totalAmount: 179.95,
      image: "/placeholder.svg",
      deposit: 100.00,
      isOverdue: false
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusIcon = (status, isOverdue) => {
    if (isOverdue) return <AlertTriangle className="text-red-500" size={20} />;
    
    switch (status) {
      case 'active':
        return <Clock className="text-blue-500" size={20} />;
      case 'returned':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'upcoming':
        return <Calendar className="text-purple-500" size={20} />;
      case 'overdue':
        return <AlertTriangle className="text-red-500" size={20} />;
      default:
        return <Calendar className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status, isOverdue) => {
    if (isOverdue) return 'bg-red-100 text-red-800';
    
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'returned':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-purple-100 text-purple-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const extendRental = (rentalId) => {
    console.log('Extending rental:', rentalId);
    // Add extend rental logic here
  };

  const returnRental = (rentalId) => {
    console.log('Returning rental:', rentalId);
    // Add return rental logic here
  };

  const filteredRentals = filterStatus === 'all' 
    ? rentals 
    : rentals.filter(rental => rental.status === filterStatus || (filterStatus === 'overdue' && rental.isOverdue));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Rentals</h1>
        <div className="text-sm text-gray-500">
          {filteredRentals.length} rentals
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {['all', 'upcoming', 'active', 'overdue', 'returned'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl font-medium transition-colors capitalize ${
                filterStatus === status
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'All Rentals' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Rentals List */}
      {filteredRentals.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-md border border-gray-200 text-center">
          <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No rentals found</h3>
          <p className="text-gray-600 mb-6">
            {filterStatus === 'all' 
              ? "You haven't rented any items yet" 
              : `No ${filterStatus} rentals found`}
          </p>
          <button
            onClick={() => navigate('/user/home')}
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors"
          >
            Browse Rentals
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRentals.map((rental) => (
            <div key={rental.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
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
                      onClick={() => navigate(`/user/rentals/${rental.id}`)}
                      className="flex items-center space-x-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      <Eye size={16} />
                      <span>View Details</span>
                    </button>

                    {(rental.status === 'active' || rental.isOverdue) && (
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
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRentals;
