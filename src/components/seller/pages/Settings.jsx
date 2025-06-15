
import React, { useState, useRef } from "react";
export default function SellerSettings() {
  const [logo, setLogo] = useState(null);
  const fileRef = useRef();

  function handleLogo(e) {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  }
  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-xl shadow space-y-5">
      <h2 className="font-bold text-xl text-gray-900">Store Settings</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Store Name</label>
          <input className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-black outline-none" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Store Description</label>
          <textarea className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-black outline-none" rows={2} />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Store Logo</label>
          <input type="file" accept="image/*" className="w-full" ref={fileRef} onChange={handleLogo} />
          {logo && <img src={logo} className="w-16 h-16 mt-2 rounded border object-cover" alt="Logo preview" />}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Change Password</label>
          <input type="password" className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-black outline-none" placeholder="New Password" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Notifications</label>
          <div className="flex items-center gap-3">
            <input type="checkbox" className="accent-black scale-125" />
            <span>Email updates</span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-3 bg-black text-white rounded-xl py-2 font-semibold transition hover:bg-gray-900 animate-pulse"
        >
          Save Settings
        </button>
      </form>
      <div className="pt-3 border-t flex items-center">
        <button className="ml-auto px-4 py-2 rounded-md bg-red-50 text-red-700 hover:bg-red-100 transition">Delete Account</button>
      </div>
    </div>
  );
}
