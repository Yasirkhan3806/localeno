
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Package, Clock, CheckCircle, Star, User, MessageCircle, Truck } from 'lucide-react';
import BackToHomeButton from '../BackToHomeButton';

const UserRentalDetail = () => {
  const { rentalId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');

  // Mock rental data - in real app, fetch by rentalId
  const rental = {
    id: rentalId || "RNT-2024-001",
    productName: "Professional Camera Kit",
    productImage: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=400&q=80",
    rentalPeriod: "7 days",
    startDate: "2024-06-15",
    endDate: "2024-06-22",
    status: "active",
    dailyRate: "PKR 2,800",
    totalAmount: "PKR 19,600",
    securityDeposit: "PKR 28,000",
    seller: {
      name: "TechRent Pro",
      rating: 4.8,
      phone: "+92 300 1234567",
      email: "support@techrentpro.com"
    },
    pickupLocation: "123 Tech Street, Karachi, Pakistan",
    returnLocation: "123 Tech Street, Karachi, Pakistan",
    specifications: [
      "Canon EOS R5 Camera Body",
      "24-70mm f/2.8 L Lens",
      "50mm f/1.8 Prime Lens",
      "Camera Bag & Accessories",
      "Extra Batteries & Charger"
    ],
    terms: [
      "Handle with care - equipment is fragile",
      "Return in original condition",
      "Report any damage immediately",
      "Late return charges: PKR 500/day",
      "Security deposit refunded after inspection"
    ],
    timeline: [
      { status: "Rental Confirmed", date: "2024-06-10", time: "2:30 PM", completed: true },
      { status: "Equipment Prepared", date: "2024-06-14", time: "10:00 AM", completed: true },
      { status: "Ready for Pickup", date: "2024-06-15", time: "9:00 AM", completed: true },
      { status: "Equipment Picked Up", date: "2024-06-15", time: "11:30 AM", completed: true },
      { status: "Rental Active", date: "2024-06-15", time: "11:30 AM", completed: true, current: true },
      { status: "Return Due", date: "2024-06-22", time: "6:00 PM", completed: false },
      { status: "Equipment Returned", date: "", time: "", completed: false }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'completed':
        return <Package className="text-blue-500" size={24} />;
      case 'overdue':
        return <Clock className="text-red-500" size={24} />;
      default:
        return <Calendar className="text-gray-500" size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/user/rentals')}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-black transition"
          >
            <ArrowLeft size={20} />
            Back to Rentals
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Rental Details</h1>
              <p className="text-gray-600 mt-2">Rental ID: {rental.id}</p>
            </div>
            <div className="flex items-center gap-3">
              {getStatusIcon(rental.status)}
              <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusColor(rental.status)}`}>
                {rental.status}
              </span>
            </div>
          </div>
        </div>

        {/* Product Overview */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3">
              <img
                src={rental.productImage}
                alt={rental.productName}
                className="w-full h-64 object-cover rounded-2xl"
              />
            </div>
            <div className="lg:w-2/3 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">{rental.productName}</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Daily Rate</span>
                  <p className="font-semibold text-lg">{rental.dailyRate}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Rental Period</span>
                  <p className="font-semibold text-lg">{rental.rentalPeriod}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Total Amount</span>
                  <p className="font-semibold text-lg text-green-600">{rental.totalAmount}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Security Deposit</span>
                  <p className="font-semibold text-lg">{rental.securityDeposit}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate(`/user/chat/${rental.seller.name}`)}
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  <MessageCircle size={18} />
                  Contact Seller
                </button>
                <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                  <Calendar size={18} />
                  Extend Rental
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {['details', 'timeline', 'terms'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-b-2 border-black text-black'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Rental Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">Rental Information</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Start Date:</span>
                      <span className="font-medium">{new Date(rental.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">End Date:</span>
                      <span className="font-medium">{new Date(rental.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Pickup Location:</span>
                      <span className="font-medium text-right">{rental.pickupLocation}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Return Location:</span>
                      <span className="font-medium text-right">{rental.returnLocation}</span>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-gray-900 mt-6">Equipment Included</h4>
                  <ul className="space-y-2">
                    {rental.specifications.map((spec, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-gray-700">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Seller Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">Seller Information</h3>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <User size={24} className="text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{rental.seller.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{rental.seller.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <strong>Phone:</strong> {rental.seller.phone}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Email:</strong> {rental.seller.email}
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => navigate(`/user/chat/${rental.seller.name}`)}
                        className="flex-1 bg-black text-white py-2 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                      >
                        Message
                      </button>
                      <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
                        Call
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Rental Timeline</h3>
                <div className="space-y-4">
                  {rental.timeline.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${
                        step.completed ? 'bg-green-500' : step.current ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className={`font-medium ${
                            step.completed ? 'text-gray-900' : step.current ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {step.status}
                          </span>
                          {step.date && (
                            <span className="text-sm text-gray-500">
                              {step.date} {step.time && `at ${step.time}`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Rental Terms & Conditions</h3>
                <ul className="space-y-3">
                  {rental.terms.map((term, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{term}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mt-6">
                  <h4 className="font-semibold text-yellow-800 mb-2">Important Reminders</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Return equipment on time to avoid late fees</li>
                    <li>• Report any issues immediately</li>
                    <li>• Security deposit will be refunded after inspection</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRentalDetail;
