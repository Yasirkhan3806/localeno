import React, { useState } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackToHomeButton from '../BackToHomeButton';
import RentalCard from '../rentals/RentalCard';
import RentalStatusFilter from '../rentals/RentalStatusFilter';
import ExtendRentalModal from './ExtendRentalModal';

const UserRentals = () => {
  const navigate = useNavigate();
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  
  // Mock rentals data
  const [rentals, setRentals] = useState([
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
    const rental = rentals.find(r => r.id === rentalId);
    setSelectedRental(rental);
    setShowExtendModal(true);
  };

  const handleExtendRental = (rentalId, days) => {
    setRentals(rentals.map(rental => {
      if (rental.id === rentalId) {
        const newEndDate = new Date(rental.endDate);
        newEndDate.setDate(newEndDate.getDate() + days);
        return {
          ...rental,
          endDate: newEndDate.toISOString().split('T')[0],
          totalDays: rental.totalDays + days,
          totalAmount: rental.totalAmount + (rental.dailyRate * days)
        };
      }
      return rental;
    }));
  };

  const returnRental = (rentalId) => {
    const confirmReturn = window.confirm('Are you sure you want to return this item?');
    if (confirmReturn) {
      setRentals(rentals.map(rental => {
        if (rental.id === rentalId) {
          return {
            ...rental,
            status: 'returned',
            returnDate: new Date().toISOString().split('T')[0],
            isOverdue: false
          };
        }
        return rental;
      }));
      alert('Item returned successfully!');
    }
  };

  const viewRentalDetails = (rentalId) => {
    navigate(`/user/rentals/${rentalId}`);
  };

  const filteredRentals = filterStatus === 'all' 
    ? rentals 
    : rentals.filter(rental => rental.status === filterStatus || (filterStatus === 'overdue' && rental.isOverdue));

  return (
    <div className="space-y-8">
      <BackToHomeButton />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Rentals</h1>
        <div className="text-sm text-gray-500">
          {filteredRentals.length} rentals
        </div>
      </div>

      <RentalStatusFilter 
        filterStatus={filterStatus} 
        setFilterStatus={setFilterStatus} 
      />

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
            <RentalCard
              key={rental.id}
              rental={rental}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
              getDaysRemaining={getDaysRemaining}
              extendRental={extendRental}
              returnRental={returnRental}
              viewRentalDetails={viewRentalDetails}
            />
          ))}
        </div>
      )}

      <ExtendRentalModal
        isOpen={showExtendModal}
        onClose={() => {
          setShowExtendModal(false);
          setSelectedRental(null);
        }}
        rental={selectedRental}
        onExtend={handleExtendRental}
      />
    </div>
  );
};

export default UserRentals;
