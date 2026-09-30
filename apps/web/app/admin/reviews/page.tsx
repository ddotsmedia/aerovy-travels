"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Review = {
  id: string;
  author: string;
  experience: string;
  rating: number;
  text: string;
  date: string;
  approved: boolean;
};

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    author: "Sarah Al-Mazrouei",
    experience: "Desert Safari & BBQ",
    rating: 5,
    text: "Amazing experience! The guide was very knowledgeable and the sunset was breathtaking.",
    date: "2024-09-28",
    approved: true,
  },
  {
    id: "2",
    author: "Ahmed Khalifa",
    experience: "Ferrari Experience",
    rating: 4,
    text: "Great drive, but the briefing was a bit rushed.",
    date: "2024-09-27",
    approved: false,
  },
  {
    id: "3",
    author: "Layla Al-Ketbi",
    experience: "Yacht Cruise",
    rating: 5,
    text: "Absolutely incredible! Will definitely book again.",
    date: "2024-09-26",
    approved: true,
  },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("admin-reviews");
    setReviews(stored ? JSON.parse(stored) : MOCK_REVIEWS);
  }, []);

  const toggleApproval = (id: string) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r));
    setReviews(updated);
    localStorage.setItem("admin-reviews", JSON.stringify(updated));
  };

  const deleteReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    localStorage.setItem("admin-reviews", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
          <p className="mt-2 text-gray-600">Approve or reject customer reviews</p>
        </div>

        <div className="space-y-4">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-lg border border-gray-200 bg-white p-6"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">{review.author}</h3>
                  <p className="text-sm text-gray-600">{review.experience}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <p className="mb-4 text-gray-700">{review.text}</p>

              <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
                <span>{review.date}</span>
                <span
                  className={
                    review.approved
                      ? "font-semibold text-green-600"
                      : "font-semibold text-orange-600"
                  }
                >
                  {review.approved ? "Published" : "Pending Review"}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleApproval(review.id)}
                  className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                    review.approved
                      ? "bg-orange-600 text-white hover:bg-orange-700"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {review.approved ? "Unpublish" : "Approve"}
                </button>
                <button
                  onClick={() => deleteReview(review.id)}
                  className="rounded border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
