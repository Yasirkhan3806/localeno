
import React, { useState } from 'react';
import { X, Calendar, RotateCcw } from 'lucide-react';

const ExtendRentalModal = ({ isOpen, onClose, rental, onExtend }) => {
  const [extendDays, setExtendDays] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      onExtend(rental.id, extendDays);
      setIsProcessing(false);
      setExtendDays(1);
      onClose();
      alert(`Rental extended by ${extendDays} days successfully!`);
    }, 1500);
  };

  if (!isOpen || !rental) return null;

  const additionalCost = rental.dailyRate * extendDays;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-3xl p-6 lg:p-8 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <RotateCcw size={24} className="text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Extend Rental</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">{rental.productName}</h3>
          <p className="text-sm text-gray-600">Current end date: {new Date(rental.endDate).toLocaleDateString()}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extend by how many days?
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setExtendDays(Math.max(1, extendDays - 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max="30"
                value={extendDays}
                onChange={(e) => setExtendDays(Math.max(1, parseInt(e.target.value) || 1))}
                className="flex-1 p-3 border border-gray-300 rounded-xl text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setExtendDays(Math.min(30, extendDays + 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Daily Rate:</span>
              <span className="font-medium">${rental.dailyRate}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Extension Days:</span>
              <span className="font-medium">{extendDays}</span>
            </div>
            <div className="border-t border-blue-200 pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Additional Cost:</span>
                <span className="font-bold text-lg">${additionalCost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : `Extend ${extendDays} Days`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExtendRentalModal;
