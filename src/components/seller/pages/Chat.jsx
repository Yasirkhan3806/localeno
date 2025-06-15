
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

const mockConversations = [
  {
    id: 1,
    user: {
      name: "John Smith",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    product: {
      name: "MacBook Pro 16-inch",
      icon: "💻",
    },
    date: "6/10/2024",
    lastMessage: "Hi! I'm interested in renting this MacBook. Is it still available?",
    unread: 2,
    messages: [
      {
        id: 0,
        sender: "buyer",
        text: "Hi! I'm interested in renting this MacBook. Is it still available?",
        time: "10:03",
      },
      {
        id: 1,
        sender: "seller",
        text: "Hi John, yes, the MacBook is available for rent.",
        time: "10:05",
      }
    ],
  },
  {
    id: 2,
    user: {
      name: "Sarah Johnson",
      avatar: "", // No avatar: fallback to initials
    },
    product: {
      name: "Canon EOS R Camera",
      icon: "📷",
    },
    date: "6/9/2024",
    lastMessage: "Thank you! The camera works perfectly.",
    unread: 0,
    messages: [
      {
        id: 0,
        sender: "buyer",
        text: "Thank you! The camera works perfectly.",
        time: "14:10",
      },
      {
        id: 1,
        sender: "seller",
        text: "Glad to hear! Let me know if you need any help.",
        time: "14:13",
      }
    ],
  },
  {
    id: 3,
    user: {
      name: "Mike Chen",
      avatar: "https://randomuser.me/api/portraits/men/73.jpg",
    },
    product: {
      name: "Professional Tripod",
      icon: "📸",
    },
    date: "6/8/2024",
    lastMessage: "What's the rental price for a week?",
    unread: 1,
    messages: [
      {
        id: 0,
        sender: "buyer",
        text: "What's the rental price for a week?",
        time: "9:01",
      }
    ],
  },
];

function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .substring(0, 2);
}

export default function SellerChat() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedId, setSelectedId] = useState(null);
  const selected = conversations.find((c) => c.id === selectedId);

  // Counts
  const activeConvs = conversations.length;
  const unreadCount = conversations.reduce((sum, c) => sum + (c.unread || 0), 0);

  // Messaging state
  const [reply, setReply] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!selectedId || !reply.trim()) return;
    const updated = conversations.map((conv) =>
      conv.id === selectedId
        ? {
            ...conv,
            messages: [
              ...conv.messages,
              {
                id: Date.now(),
                sender: "seller",
                text: reply,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ],
            lastMessage: reply,
            unread: 0, // always 0 after seller sends
          }
        : conv
    );
    setConversations(updated);
    setReply("");
  };

  // NEW: Mark conversation as read on selection
  const handleSelectConversation = (id) => {
    setSelectedId(id);
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === id
          ? {
              ...conv,
              unread: 0, // mark as read when opened
            }
          : conv
      )
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-2 md:mt-4">
      {/* Top: Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="col-span-2 sm:col-span-1 bg-white border rounded-xl shadow flex flex-col items-center justify-center p-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="text-gray-400" />
            <span className="text-gray-500 text-sm font-medium">Active Conversations</span>
          </div>
          <div className="text-2xl font-bold text-black mt-1">{activeConvs}</div>
        </div>
        <div className="col-span-2 sm:col-span-1 bg-white border rounded-xl shadow flex flex-col items-center justify-center p-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="text-red-400" />
            <span className="text-gray-500 text-sm font-medium">Unread Messages</span>
          </div>
          <div className="text-2xl font-bold text-red-500 mt-1">{unreadCount}</div>
        </div>
      </div>
      {/* Main chat area */}
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow border overflow-hidden min-h-[400px]">
        {/* Sidebar: Conversations list */}
        <div className="md:w-1/3 border-r bg-gray-50">
          <div className="font-semibold text-gray-700 p-4 border-b bg-white">Conversations</div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectConversation(conv.id)}
                className={`w-full text-left px-4 py-3 border-b last:border-b-0 flex gap-3 items-center hover:bg-gray-100 transition ${
                  selectedId === conv.id ? "bg-blue-50" : ""
                }`}
              >
                <span className="relative w-10 h-10 flex items-center justify-center rounded-full overflow-hidden bg-gray-100 border">
                  {conv.user.avatar ? (
                    <img src={conv.user.avatar} alt={conv.user.name} className="object-cover w-10 h-10" />
                  ) : (
                    <span className="w-10 h-10 flex items-center justify-center font-bold text-lg text-gray-800">
                      {getInitials(conv.user.name)}
                    </span>
                  )}
                  {/* Unread badge */}
                  {!!conv.unread && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                      {conv.unread}
                    </span>
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{conv.user.name}</span>
                    <span className="text-xs text-gray-400">{conv.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-gray-400 text-sm">{conv.product.icon}</span>
                    <span className="text-[13px] text-gray-600 font-medium truncate">{conv.product.name}</span>
                  </div>
                  <div className="text-sm text-gray-700 truncate">{conv.lastMessage}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* Main chat panel */}
        <div className="flex-1 flex flex-col">
          {selected ? (
            <>
              <div className="p-4 border-b flex items-center gap-3 bg-gray-50">
                <span className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 border">
                  {selected.user.avatar ? (
                    <img src={selected.user.avatar} alt={selected.user.name} className="object-cover w-9 h-9" />
                  ) : (
                    <span className="w-9 h-9 flex items-center justify-center font-bold text-lg text-gray-800">{getInitials(selected.user.name)}</span>
                  )}
                </span>
                <span className="font-semibold text-gray-900">{selected.user.name}</span>
                <span className="text-gray-400 text-xs">| {selected.product.name}</span>
              </div>
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-white min-h-[220px]">
                {selected.messages.map((msg, i) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "seller" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[65%] px-4 py-2 rounded-2xl ${
                        msg.sender === "seller"
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="text-sm">{msg.text}</div>
                      <div className={`text-xs mt-1 ${msg.sender === "seller" ? "text-gray-300" : "text-gray-500"}`}>{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <form className="flex px-4 py-3 border-t bg-gray-50 gap-2" onSubmit={handleSend}>
                <input
                  className="flex-1 px-3 py-2 rounded-lg border focus:ring focus:ring-black outline-none"
                  placeholder="Type message..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={!reply.trim()}
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-gray-400 flex-col text-[17px] gap-2">
              <MessageCircle size={56} className="mb-2 text-gray-200" />
              <span>Select a conversation to start chatting</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------- END OF FILE -----------------
