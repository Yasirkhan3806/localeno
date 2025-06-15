
import React from "react";
export default function SellerReviews() {
  // Staggered fade in for reviews (map i to animationDelay)
  const reviews = [
    { id: 1, name: "Sarah", rating: 5, text: "Amazing product quality!" },
    { id: 2, name: "Mike", rating: 4, text: "Fast shipping." },
    { id: 3, name: "Raj", rating: 3, text: "Good but arrived late." },
  ];
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="font-bold text-xl mb-6 text-gray-900">Reviews</h2>
      <div className="flex flex-col gap-4">
        {reviews.map((r, i) => (
          <div
            key={r.id}
            className="bg-white p-5 rounded-xl shadow animate-fade-in"
            style={{
              animationDelay: `${i * 100}ms`,
              animationFillMode: "backwards"
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              {[...Array(5)].map((_, s) =>
                <span key={s} className={s < r.rating ? "text-yellow-400 text-lg" : "text-gray-300 text-lg"}>★</span>
              )}
              <span className="ml-2 text-xs text-gray-400">{r.name}</span>
            </div>
            <div className="text-gray-700 mb-2">{r.text}</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs">Reply</button>
              <button className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-xs text-red-700">Report</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
