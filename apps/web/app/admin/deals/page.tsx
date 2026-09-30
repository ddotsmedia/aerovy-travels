"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus } from "lucide-react";

type Deal = {
  id: string;
  experience: string;
  discount: number;
  startDate: string;
  endDate: string;
  active: boolean;
};

const MOCK_DEALS: Deal[] = [
  {
    id: "1",
    experience: "Desert Safari & BBQ",
    discount: 20,
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    active: true,
  },
  {
    id: "2",
    experience: "Ferrari Experience",
    discount: 15,
    startDate: "2024-09-15",
    endDate: "2024-09-25",
    active: false,
  },
];

export default function AdminDealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    experience: "",
    discount: 10,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("admin-deals");
    setDeals(stored ? JSON.parse(stored) : MOCK_DEALS);
  }, []);

  const addDeal = () => {
    if (!formData.experience || !formData.startDate || !formData.endDate) return;

    const newDeal: Deal = {
      id: Date.now().toString(),
      ...formData,
      discount: Number(formData.discount),
      active: true,
    };

    const updated = [...deals, newDeal];
    setDeals(updated);
    localStorage.setItem("admin-deals", JSON.stringify(updated));
    setFormData({ experience: "", discount: 10, startDate: "", endDate: "" });
    setShowModal(false);
  };

  const deleteDeal = (id: string) => {
    const updated = deals.filter((d) => d.id !== id);
    setDeals(updated);
    localStorage.setItem("admin-deals", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Deals Management</h1>
            <p className="mt-2 text-gray-600">Create and manage promotional deals</p>
          </div>
          <button
            className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            onClick={() => setShowModal(true)}
          >
            <Plus className="h-4 w-4" />
            Add Deal
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md rounded-lg bg-white p-8"
            >
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Add New Deal</h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold">Experience</label>
                  <input
                    type="text"
                    placeholder="Experience name"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Discount %</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded border border-gray-300 px-4 py-2 font-medium transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={addDeal}
                  className="flex-1 rounded bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Create Deal
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Deals List */}
        <div className="space-y-4">
          {deals.map((deal, idx) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6"
            >
              <div>
                <h3 className="font-bold text-gray-900">{deal.experience}</h3>
                <div className="mt-2 flex gap-4 text-sm text-gray-600">
                  <span>{deal.discount}% off</span>
                  <span>
                    {deal.startDate} → {deal.endDate}
                  </span>
                  <span className={deal.active ? "font-semibold text-green-600" : "text-gray-400"}>
                    {deal.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => deleteDeal(deal.id)}
                className="rounded border border-red-300 px-3 py-2 text-red-600 transition-colors hover:bg-red-50"
                title="Delete deal"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
