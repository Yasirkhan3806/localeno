
import React from "react";
import { MapPin } from "lucide-react";

const SignupSellerFields = ({ formData, setFormData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Average Daily Order Volume
      </label>
      <input
        type="number"
        min="0"
        value={formData.dailyOrderVolume}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            dailyOrderVolume: e.target.value,
          }))
        }
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
        placeholder="e.g. 25"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Business Open Time
      </label>
      <input
        type="time"
        value={formData.businessOpenTime}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            businessOpenTime: e.target.value,
          }))
        }
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Business Close Time
      </label>
      <input
        type="time"
        value={formData.businessCloseTime}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            businessCloseTime: e.target.value,
          }))
        }
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
        required
      />
    </div>
    <div className="relative mt-7">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              required
              value={formData.shopName}
              onChange={(e) =>  setFormData((prev) => ({
            ...prev,
            shopName: e.target.value,
          }))}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter your Shop Name"
            />
          </div>
          <div className="relative mt-7 w-full">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) =>  setFormData((prev) => ({
            ...prev,
            address: e.target.value,
          }))}
              className="w-[40vw] pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter your address"
            />
          </div>
  </div>
);

export default SignupSellerFields;
