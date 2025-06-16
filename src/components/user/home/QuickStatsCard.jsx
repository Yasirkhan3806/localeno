
import React from 'react';
import { TrendingUp } from 'lucide-react';

const QuickStatsCard = ({ stat, onClick }) => {
  return (
    <div 
      className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`${stat.color} p-3 rounded-2xl`}>
          <stat.icon className="text-white" size={24} />
        </div>
        <TrendingUp size={16} className="text-green-500" />
      </div>
      <div>
        <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
        <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
        <p className="text-xs text-gray-500">{stat.trend}</p>
      </div>
    </div>
  );
};

export default QuickStatsCard;
