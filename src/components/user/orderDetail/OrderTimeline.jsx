
import React from 'react';

const OrderTimeline = ({ orderTimeline }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Timeline</h2>
      <div className="space-y-4">
        {orderTimeline.map((step, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className={`w-4 h-4 rounded-full ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.status}
                </span>
                <span className="text-sm text-gray-500">
                  {step.date} at {step.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTimeline;
