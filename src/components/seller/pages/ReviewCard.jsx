
import React, { useState } from "react";
import { Heart, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function ReviewCard({ review }) {
  const [likes, setLikes] = useState(review.likes || 0);
  const [liked, setLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState(review.replies || []);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    toast({
      title: liked ? "You unliked this review." : "You liked this review!",
      description: "",
    });
  };

  const handleReply = () => setShowReply((s) => !s);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setReplies((prev) => [...prev, reply]);
    setReply("");
    setShowReply(false);
    toast({
      title: "Reply sent!",
      description: "Your reply has been added below the review.",
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center md:gap-4">
        <img
          src={review.product.image}
          alt={review.product.name}
          className="w-16 h-16 object-cover rounded-lg border mb-2 md:mb-0"
        />
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-lg text-gray-900">{review.product.name}</span>
            <span className="flex items-center gap-1">
              {[...Array(review.product.rating)].map((_, k) => (
                <Star key={k} size={18} className="text-yellow-400 fill-yellow-400" />
              ))}
              {review.product.rating < 5 &&
                [...Array(5 - review.product.rating)].map((_, k) => (
                  <Star key={`empty-${k}`} size={18} className="text-gray-200" />
                ))}
            </span>
            <span className="ml-2 text-xs text-gray-500">{review.product.ratingsText}</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <img
              src={review.customer.avatar}
              alt={review.customer.name}
              className="w-8 h-8 rounded-full object-cover border"
            />
            <span className="font-semibold text-gray-800 text-sm">{review.customer.name}</span>
            <span className="text-gray-400 text-xs flex items-center gap-1">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" className="inline-block">
                <rect x="3" y="4" width="18" height="18" rx="4" strokeWidth="2"/>
                <path strokeWidth="2" d="M16 2v4" />
                <path strokeWidth="2" d="M8 2v4" />
                <path strokeWidth="2" d="M3 10h18" />
              </svg>
              {review.date}
            </span>
          </div>
        </div>
        {/* Like button */}
        <button
          type="button"
          aria-label="Like review"
          onClick={handleLike}
          className={`ml-auto flex items-center gap-1 px-2 py-1 rounded-full font-medium ${
            liked
              ? "bg-red-50 text-red-500 border border-red-200"
              : "text-gray-500 hover:bg-gray-100"
          } transition`}
        >
          <Heart size={18} strokeWidth={2} className={liked ? "fill-red-400 text-red-400" : "text-red-400"} />
          {likes}
        </button>
      </div>
      {/* Review Body */}
      <div className="pl-1 pr-1 text-gray-700">{review.text}</div>
      {/* Review Images (if any) */}
      {review.images && (
        <div className="flex gap-2 flex-wrap mt-2">
          {review.images.map((img, idx) => (
            <img key={idx} src={img} alt="review" className="w-20 h-20 rounded-lg object-cover border" />
          ))}
        </div>
      )}
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2 items-center">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleReply}
          className="flex items-center gap-2 text-sm"
        >
          <svg height={17} width={17} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7 17v2 a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H9L7 9v8Zm0 0V7a2 2 0 0 1 2-2h8" strokeWidth="2"/></svg>
          Reply to this review
        </Button>
      </div>
      {/* Reply input */}
      {showReply && (
        <form className="flex items-center gap-2 mt-2" onSubmit={handleReplySubmit}>
          <label htmlFor={`reply-input-${review.id}`} className="text-sm text-gray-500">Your Reply:</label>
          <Textarea
            id={`reply-input-${review.id}`}
            placeholder="Write a reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="flex-1 px-2 py-1 border rounded bg-gray-50 text-sm"
            rows={2}
            required
          />
          <Button
            type="submit"
            size="sm"
            className="ml-2 px-3 py-1 bg-black text-white rounded text-xs font-medium"
          >
            Send
          </Button>
        </form>
      )}
      {/* Render replies */}
      {replies && replies.length > 0 && (
        <div className="flex flex-col gap-2 mt-2 bg-gray-50 p-2 px-4 rounded">
          {replies.map((rep, idx) => (
            <div key={idx} className="text-xs text-gray-800 border-l-2 border-black pl-3">
              <span className="font-medium text-gray-500">You:</span> {rep}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
