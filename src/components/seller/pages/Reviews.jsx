
import React from "react";
import { Star, Heart } from "lucide-react";
import ReviewCard from "./ReviewCard";

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

// Example reviews, ideally would be fetched from an API
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
  // More reviews as needed ...
];

export default function SellerReviews() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-3">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
        {reviewStats.map((stat) => (
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
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </div>
  );
}
