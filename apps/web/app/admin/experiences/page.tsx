"use client";

import { useState } from "react";
import { Card, CardContent, Button } from "@aerovy/ui";
import { Search, Plus, Edit2, Eye, Power } from "lucide-react";
import { experiences, fromPrice } from "@/lib/catalog";
import { fmtAED } from "@/lib/site";

export default function ExperiencesPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setategoryFilter] = useState("All");

  const filtered = experiences.filter((e) => {
    const matchesSearch = e.titleEn.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || e.categorySlug === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...new Set(experiences.map((e) => e.categorySlug))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Experiences</h1>
          <p className="mt-1 text-sm text-white/60">{filtered.length} experiences available</p>
        </div>
        <Button className="bg-[#CDA020] text-black hover:bg-[#CDA020]/90">
          <Plus className="mr-2 size-4" />
          Add Experience
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search experiences..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-[#161B22] py-2 pr-4 pl-10 text-white placeholder:text-white/40 focus:border-[#CDA020] focus:outline-none"
            />
          </div>
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setategoryFilter(e.target.value)}
          className="rounded-md border border-white/10 bg-[#161B22] px-4 py-2 text-white focus:border-[#CDA020] focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "All" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <Card className="border border-white/10 bg-[#161B22]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs font-medium tracking-wide text-white/60 uppercase">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Duration</th>
                  <th className="px-6 py-3">Price (AED)</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filtered.map((exp) => (
                  <tr key={exp.slug} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-medium text-white">{exp.titleEn}</td>
                    <td className="px-6 py-4 text-white/70 capitalize">{exp.categorySlug}</td>
                    <td className="px-6 py-4 text-white/70">
                      {exp.durationMinutes >= 1440
                        ? `${Math.round(exp.durationMinutes / 1440)} day(s)`
                        : `${Math.round(exp.durationMinutes / 60)} hour(s)`}
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">{fmtAED(fromPrice(exp))}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-green-400">
                        <Power className="size-3" />
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="text-white/60 hover:text-[#CDA020]">
                          <Edit2 className="size-4" />
                        </button>
                        <button className="text-white/60 hover:text-[#CDA020]">
                          <Eye className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
