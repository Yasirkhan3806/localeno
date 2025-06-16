
import React from 'react';
import { BarChart3 } from 'lucide-react';

const DashboardOverview = ({ dashboardOverview }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 size={24} className="text-gray-900" />
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {dashboardOverview.map((section, index) => (
          <div key={index} className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">{section.title}</h3>
            <div className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                  <span className="text-gray-700">{item.label}</span>
                  <span className={`font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
