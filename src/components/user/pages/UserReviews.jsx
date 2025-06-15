import React, { useState } from 'react';
import { Star, Edit, Trash2, Camera, Send } from 'lucide-react';
import BackToHomeButton from '../BackToHomeButton';

const UserReviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productName: "Wireless Bluetooth Headphones",
      productId: 1,
      rating: 5,
      title: "Excellent sound quality!",
      comment: "These headphones exceeded my expectations. The sound quality is amazing and the battery life is great.",
      date: "2024-06-10",
      images: ["/placeholder.svg"],
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      productName: "Smart Fitness Watch",
      productId: 2,
      rating: 4,
      title: "Good but could be better",
      comment: "Nice watch with good features, but the battery could last longer. Overall satisfied with the purchase.",
      date: "2024-06-08",
      images: [],
      helpful: 8,
      verified: true
    }
  ]);

  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    images: []
  });

  const [editingReview, setEditingReview] = useState(null);

  const handleSubmitReview = () => {
    if (!newReview.title || !newReview.comment) {
      alert('Please fill in all required fields');
      return;
    }

    const review = {
      id: Date.now(),
      productName: "Sample Product",
      productId: 1,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      images: newReview.images,
      helpful: 0,
      verified: true
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, title: '', comment: '', images: [] });
    setShowWriteReview(false);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setNewReview({
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      images: review.images
    });
    setShowWriteReview(true);
  };

  const handleUpdateReview = () => {
    setReviews(reviews.map(review => 
      review.id === editingReview.id 
        ? { ...review, ...newReview }
        : review
    ));
    setEditingReview(null);
    setNewReview({ rating: 5, title: '', comment: '', images: [] });
    setShowWriteReview(false);
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(review => review.id !== reviewId));
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    // In a real app, you'd upload these to a server
    setNewReview({
      ...newReview,
      images: [...newReview.images, ...files.map(file => URL.createObjectURL(file))]
    });
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              size={20}
              className={`${
                star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <BackToHomeButton />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Reviews</h1>
        <button
          onClick={() => setShowWriteReview(true)}
          className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors"
        >
          Write Review
        </button>
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingReview ? 'Edit Review' : 'Write a Review'}
            </h2>

            <div className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                {renderStars(newReview.rating, true, (rating) => 
                  setNewReview({ ...newReview, rating })
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Title *
                </label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  placeholder="Summarize your experience"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review *
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Share details about your experience with this product"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <Camera className="mx-auto text-gray-400 mb-2" size={48} />
                  <p className="text-gray-600 mb-4">Upload photos of your product</p>
                  <label className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                    Choose Files
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {newReview.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {newReview.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Review ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setNewReview({
                            ...newReview,
                            images: newReview.images.filter((_, i) => i !== index)
                          })}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={editingReview ? handleUpdateReview : handleSubmitReview}
                  className="flex-1 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors"
                >
                  {editingReview ? 'Update Review' : 'Submit Review'}
                </button>
                <button
                  onClick={() => {
                    setShowWriteReview(false);
                    setEditingReview(null);
                    setNewReview({ rating: 5, title: '', comment: '', images: [] });
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-md border border-gray-200 text-center">
          <Star size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
          <p className="text-gray-600 mb-6">Start writing reviews for products you've purchased</p>
          <button
            onClick={() => setShowWriteReview(true)}
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors"
          >
            Write Your First Review
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{review.productName}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditReview(review)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
              <p className="text-gray-700 mb-4">{review.comment}</p>

              {review.images.length > 0 && (
                <div className="flex space-x-2 mb-4">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Review ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <div className="text-sm text-gray-500">
                {review.helpful} people found this helpful
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReviews;
