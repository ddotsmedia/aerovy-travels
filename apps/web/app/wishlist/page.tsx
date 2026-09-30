"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem("wishlist-items");
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  // Mock experiences for demo
  const mockExperiences = {
    "desert-safari": {
      title: "Desert Safari & BBQ",
      price: 350,
      rating: 4.8,
      image: "🏜️",
    },
    "ferrari-drive": {
      title: "Ferrari Experience",
      price: 1200,
      rating: 4.9,
      image: "🏎️",
    },
    "yacht-cruise": {
      title: "Private Yacht Cruise",
      price: 600,
      rating: 4.7,
      image: "🛥️",
    },
  };

  const wishlistItems = wishlist
    .filter((slug) => slug in mockExperiences)
    .map((slug) => ({
      slug,
      ...mockExperiences[slug as keyof typeof mockExperiences],
    }));

  const removeFromWishlist = (slug: string) => {
    const updated = wishlist.filter((s) => s !== slug);
    setWishlist(updated);
    localStorage.setItem("wishlist-items", JSON.stringify(updated));
  };

  if (wishlistItems.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-md text-center">
          <div className="mb-4 text-6xl">💔</div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Your Wishlist is Empty</h1>
          <p className="mb-8 text-gray-600">
            Start adding your favorite experiences to create the perfect trip.
          </p>
          <Link
            href="/experiences"
            className="inline-block rounded-lg bg-pink-600 px-6 py-3 font-medium text-white transition-colors hover:bg-pink-700"
          >
            Browse Experiences
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">My Wishlist</h1>
          <p className="mb-12 text-lg text-gray-600">
            {wishlistItems.length} experience{wishlistItems.length !== 1 ? "s" : ""} saved
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item, idx) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
              >
                {/* Image placeholder */}
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-pink-200 to-red-200 text-6xl">
                  {item.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h3>

                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">
                      {item.rating} ({Math.floor(Math.random() * 100) + 50} reviews)
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-2xl font-bold text-gray-900">AED {item.price}</span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/experiences/${item.slug}`}
                      className="block flex-1 rounded bg-pink-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-pink-700"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item.slug)}
                      className="flex-1 rounded border border-gray-300 px-4 py-2 font-medium transition-colors hover:bg-gray-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Save total */}
          <div className="mt-12 rounded-lg border border-pink-200 bg-pink-50 p-6 text-center">
            <p className="mb-2 text-gray-600">Estimated total for all experiences</p>
            <p className="mb-4 text-4xl font-bold text-pink-600">
              AED {wishlistItems.reduce((sum, item) => sum + item.price, 0)}
            </p>
            <Link
              href="/checkout"
              className="inline-block rounded-lg bg-pink-600 px-6 py-3 font-medium text-white transition-colors hover:bg-pink-700"
            >
              Book All Experiences
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
