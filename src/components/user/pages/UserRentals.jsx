import React, { useEffect, useState } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackToHomeButton from '../BackToHomeButton';
import RentalCard from '../rentals/RentalCard';
import RentalStatusFilter from '../rentals/RentalStatusFilter';
import ExtendRentalModal from './ExtendRentalModal';
import { getRentalsByUser,updateRentalById ,updateRentalReturned} from '../../../Firebase Functions/RentalFunc';


const UserRentals = () => {
  const navigate = useNavigate();
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentalData = async () => {
      try {
        setLoading(true);
        const rentalData = await getRentalsByUser();
        console.log(rentalData);
        setRentals(rentalData || []); // Store the data in state
        setError(null);
      } catch (err) {
        console.error('Error fetching rentals:', err);
        setError('Failed to load rentals');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRentalData();
  }, []);

  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusIcon = (status, isOverdue) => {
    if (isOverdue) return <AlertTriangle className="text-red-500" size={20} />;
    
    switch (status) {
      case 'Active':
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
      case 'Active':
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

 const handleExtendRental = async (rentalId, days) => {
  const updatedRentals = rentals.map(rental => {
    if (rental.id === rentalId) {
      const newEndDate = new Date(rental.endDate);
      newEndDate.setDate(newEndDate.getDate() + days);
      const updatedRental = {
        ...rental,
        endDate: newEndDate.toISOString().split('T')[0],
        totalDays: rental.totalDays + days,
        totalAmount: rental.totalAmount + (rental.dailyRate * days)
      };
      
      // Call your function immediately with the updated rental
      const updatedRentalData = updatedRental;
      
      
      return updatedRental;
    }
    return rental;
  });
  console.log(updatedRentals[0])
  await updateRentalById(rentalId,updatedRentals[0]);
  setRentals(updatedRentals);
};

  const returnRental = async(rentalId) => {
    const confirmReturn = window.confirm('Are you sure you want to return this item?');
    if (confirmReturn) {
      const updatedRentals = rentals.map(rental => {
        if (rental.id === rentalId) {
          return {
            ...rental,
            status: 'returned',
            returnDate: new Date().toISOString().split('T')[0],
            isOverdue: false
          };
        }
        return rental;
      });
      console.log(rentals[0].rentalId)
      await updateRentalReturned(rentals[0].rentalId)
      setRentals(updatedRentals)
      alert('Item returned successfully!');
    }
  };

  const viewRentalDetails = (rentalId) => {
    navigate(`/user/rentals/${rentalId}`);
  };

  const filteredRentals = filterStatus === 'all' 
    ? rentals 
    : rentals.filter(rental => rental.status === filterStatus || (filterStatus === 'overdue' && rental.isOverdue));

  // Loading UI
  if (loading) {
    return (
      <div className="space-y-8">
        <BackToHomeButton />
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">My Rentals</h1>
        </div>
        
        <div className="bg-white rounded-2xl p-12 shadow-md border border-gray-200 text-center">
          <Loader2 size={64} className="mx-auto text-blue-500 mb-4 animate-spin" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading your rentals...</h3>
          <p className="text-gray-600">Please wait while we fetch your rental information</p>
        </div>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="space-y-8">
        <BackToHomeButton />
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">My Rentals</h1>
        </div>
        
        <div className="bg-white rounded-2xl p-12 shadow-md border border-red-200 text-center">
          <AlertTriangle size={64} className="mx-auto text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load rentals</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/user/home')}
              className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main UI (when data is loaded successfully)
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