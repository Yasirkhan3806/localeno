
import React from "react";
export default function SellerChat() {
  // Simulated basic layout: left conversation list, right chat window for desktop, tabbed for mobile
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row h-[65vh] md:h-[70vh] rounded-xl shadow bg-white overflow-hidden">
      {/* Left - conversations */}
      <div className="md:w-1/3 border-r bg-gray-50 h-16 md:h-auto flex md:flex-col md:items-stretch">
        <div className="p-4 font-semibold text-gray-700 hidden md:block">Conversations</div>
        <div className="flex-1 flex md:flex-col overflow-x-auto md:overflow-y-auto">
          <button className="p-3 w-full text-left hover:bg-gray-100 border-b md:border-b-0 md:border-r focus:bg-gray-200 outline-none text-gray-900 font-medium">
            John Doe
          </button>
        </div>
      </div>
      {/* Right - chat window */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-sm text-gray-600 mb-3">Chat with John Doe</div>
          <div className="bg-gray-100 p-3 rounded-xl mb-2 w-fit">Hi Seller!</div>
          <div className="bg-black text-white p-3 rounded-xl mb-2 ml-auto w-fit">Hello John, how can I help you?</div>
          <div className="italic text-xs text-gray-400 mt-4">Typing...</div>
        </div>
        <form className="flex p-3 border-t gap-2">
          <input className="flex-1 px-3 py-2 rounded-lg border focus:ring focus:ring-black outline-none" placeholder="Type message..." />
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">Send</button>
        </form>
      </div>
    </div>
  );
}
