import React from "react";
import { Star } from "lucide-react";
import ReviewCard from "./ReviewCard";

// Updated reviewStats: remove "Total Likes", simplify "Average Rating"
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
    // icon removed! We'll handle dynamic stars in the card rendering below.
  },
];

// Example reviews, all referencing products from the main categories ("Electronics", "Clothing", "Accessories", "Home & Living")
const reviews = [
  {
    id: 1,
    product: {
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=128&q=80",
      rating: 5,
      ratingsText: "5 out of 5 stars",
    },
    customer: {
      name: "John Smith",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    date: "6/10/2024",
    text: "Excellent headphones! Noise cancellation is amazing and the battery lasts all day.",
    likes: 12,
    replies: [],
  },
  {
    id: 2,
    product: {
      name: "Denim Jacket",
      category: "Clothing",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=128&q=80",
      rating: 4,
      ratingsText: "4 out of 5 stars",
    },
    customer: {
      name: "Ella Rose",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    date: "6/05/2024",
    text: "The jacket fit as expected, and the material feels premium. Love wearing it on cool days.",
    likes: 8,
    replies: [],
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=128&q=80"
    ]
  },
  {
    id: 3,
    product: {
      name: "Gold Analog Watch",
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=128&q=80",
      rating: 5,
      ratingsText: "5 out of 5 stars",
    },
    customer: {
      name: "Chris Evans",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    },
    date: "6/02/2024",
    text: "Really elegant and comfortable, received plenty of compliments. Fast shipping as well.",
    likes: 14,
    replies: [],
    images: []
  },
  {
    id: 4,
    product: {
      name: "Table Lamp",
      category: "Home & Living",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=128&q=80",
      rating: 3,
      ratingsText: "3 out of 5 stars",
    },
    customer: {
      name: "Samira Patel",
      avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    date: "5/28/2024",
    text: "Lamp looks good but is a bit smaller than I expected. Works fine for reading.",
    likes: 5,
    replies: [],
  }
];

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const fraction = rating - fullStars;
  let halfStar = false;
  if (fraction >= 0.25 && fraction < 0.75) halfStar = true;
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={"full-" + i} size={20} className="text-yellow-400 fill-yellow-400" />);
  }
  if (halfStar) {
    // Render a half star by overlaying a filled star and an empty star
    stars.push(
      <span key="half" style={{ position: "relative", display: "inline-block", width: 20, height: 20 }}>
        <Star size={20} className="text-yellow-400 fill-yellow-400" style={{ position: "absolute", left: 0, clipPath: "inset(0 50% 0 0)" }} />
        <Star size={20} className="text-gray-200" style={{ position: "absolute", left: 0, clipPath: "inset(0 0 0 50%)" }} />
      </span>
    );
  }
  // Fill up to 5 stars
  const total = halfStar ? fullStars + 1 : fullStars;
  for (let i = total; i < 5; i++) {
    stars.push(<Star key={"empty-" + i} size={20} className="text-gray-200" />);
  }
  return <span className="flex items-center gap-1">{stars}</span>;
}

export default function SellerReviews() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-3">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
        {reviewStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-5 flex items-center gap-4 shadow border"
          >
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-50 border">
              {stat.icon}
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-900 flex items-center gap-1 mt-1">
                {stat.value}
                {stat.label === "Average Rating" && (
                  <span className="ml-2">{renderStars(stat.value)}</span>
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
