
import React from "react";
import { Star, Heart } from "lucide-react";

const reviewStats = [
  {
    label: "Total Reviews",
    value: 4,
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" className="text-gray-400">
        <path d="M21 6.5A4.5 4.5 0 0 0 12 7.5V8A4 4 0 0 0 7 12.5V15a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4v-.5a4.5 4.5 0 0 0 4.5-4.5ZM17.5 5A4.5 4.5 0 0 1 22 9.5V13a2 2 0 1 1-4 0V7.5A4.5 4.5 0 0 1 17.5 5z" />
      </svg>
    ),
  },
  {
    label: "Average Rating",
    value: 4.3,
    icon: (
      <span className="flex items-center gap-1">
        {[...Array(4)].map((_, idx) => (
          <Star key={idx} size={20} className="text-yellow-400 fill-yellow-400" />
        ))}
        <Star size={20} className="text-yellow-400" />
      </span>
    ),
  },
  {
    label: "Total Likes",
    value: 40,
    icon: <Heart size={20} className="text-red-400" />,
  },
];

const reviews = [
  {
    id: 1,
    product: {
      name: "MacBook Pro 16-inch",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=128&q=80",
      rating: 5,
      ratingsText: "5 out of 5 stars",
    },
    customer: {
      name: "John Smith",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    date: "6/10/2024",
    text: "Excellent laptop! Works perfectly for my video editing needs. The seller was very responsive and helpful.",
    likes: 12,
    replies: [],
  },
  {
    id: 2,
    product: {
      name: "Canon EOS R Camera",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=128&q=80",
      rating: 4,
      ratingsText: "4 out of 5 stars",
    },
    customer: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    date: "6/8/2024",
    text: "Great camera quality! Had some minor issues with the lens cap but overall satisfied with the rental experience.",
    likes: 8,
    replies: [],
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=128&q=80"
    ]
  },
  // More reviews as desired ...
];

export default function SellerReviews() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-3">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
        {reviewStats.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-5 flex items-center gap-4 shadow border"
          >
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-50 border">{stat.icon}</div>
            <div>
              <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-900 flex items-center gap-1 mt-1">
                {stat.value}
                {stat.label === "Average Rating" && (
                  <span className="ml-1 flex items-center">
                    {[...Array(Math.floor(stat.value))].map((_, j) => (
                      <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                    {stat.value % 1 !== 0 && <Star size={16} className="text-yellow-400" />}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews List */}
      <div className="flex flex-col gap-6">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col gap-4"
          >
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              {/* Product Image */}
              <img
                src={r.product.image}
                alt={r.product.name}
                className="w-16 h-16 object-cover rounded-lg border mb-2 md:mb-0"
              />
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-lg text-gray-900">{r.product.name}</span>
                  <span className="flex items-center gap-1">
                    {[...Array(r.product.rating)].map((_, k) => (
                      <Star key={k} size={18} className="text-yellow-400 fill-yellow-400" />
                    ))}
                    {r.product.rating < 5 && [...Array(5 - r.product.rating)].map((_, k) => (
                      <Star key={`empty-${k}`} size={18} className="text-gray-200" />
                    ))}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">{r.product.ratingsText}</span>
                </div>

                {/* User section */}
                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={r.customer.avatar}
                    alt={r.customer.name}
                    className="w-8 h-8 rounded-full object-cover border"
                  />
                  <span className="font-semibold text-gray-800 text-sm">{r.customer.name}</span>
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" className="inline-block">
                      <rect x="3" y="4" width="18" height="18" rx="4" strokeWidth="2"/>
                      <path strokeWidth="2" d="M16 2v4" />
                      <path strokeWidth="2" d="M8 2v4" />
                      <path strokeWidth="2" d="M3 10h18" />
                    </svg>
                    {r.date}
                  </span>
                </div>
              </div>
              {/* Like button */}
              <button className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full text-gray-500 hover:bg-gray-100 transition font-medium">
                <Heart size={18} strokeWidth={2} className="text-red-400" /> {r.likes}
              </button>
            </div>

            {/* Review Body */}
            <div className="pl-1 pr-1 text-gray-700">{r.text}</div>
            {/* Review Images (if any) */}
            {r.images && (
              <div className="flex gap-2 flex-wrap mt-2">
                {r.images.map((img, idx) => (
                  <img key={idx} src={img} alt="review" className="w-20 h-20 rounded-lg object-cover border" />
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 items-center">
              <button className="flex items-center gap-2 text-sm text-gray-700 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">
                <svg height={17} width={17} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7 17v2 a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H9L7 9v8Zm0 0V7a2 2 0 0 1 2-2h8" strokeWidth="2"/></svg>
                Reply to this review
              </button>
            </div>
            {/* Optional: Reply input (on click, can show input for reply) */}
            {/* Example of showing reply UI as in the reference image */}
            {/* <div className="flex items-center gap-2 mt-2">
              <label htmlFor="reply-input" className="text-sm text-gray-500">Your Reply:</label>
              <input
                id="reply-input"
                placeholder="Write a reply..."
                className="flex-1 px-2 py-1 border rounded bg-gray-50 text-sm"
              />
              <button className="ml-2 px-3 py-1 bg-black text-white rounded text-xs font-medium">Send</button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
