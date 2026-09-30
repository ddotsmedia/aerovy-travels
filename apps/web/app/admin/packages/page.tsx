"use client";

import { Card, CardContent, Button } from "@aerovy/ui";
import { Plus, Edit2 } from "lucide-react";
import { fmtAED } from "@/lib/site";

const mockPackages = [
  { id: 1, name: "Classic Dubai", duration: "3 days", price: 2499, bookings: 147 },
  { id: 2, name: "Desert Paradise", duration: "4 days", price: 3299, bookings: 203 },
  { id: 3, name: "Coastal Escape", duration: "5 days", price: 4499, bookings: 89 },
  { id: 4, name: "Ultimate Abu Dhabi", duration: "7 days", price: 6999, bookings: 156 },
];

export default function PackagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Packages</h1>
          <p className="mt-1 text-sm text-white/60">Curated travel packages</p>
        </div>
        <Button className="bg-[#CDA020] text-black hover:bg-[#CDA020]/90">
          <Plus className="mr-2 size-4" />
          Add Package
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {mockPackages.map((pkg) => (
          <Card key={pkg.id} className="overflow-hidden border border-white/10 bg-[#161B22]">
            <div className="h-40 bg-gradient-to-br from-[#CDA020]/20 to-[#CDA020]/5" />
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white">{pkg.name}</h3>
              <p className="mt-2 text-sm text-white/60">{pkg.duration}</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/60">Price</p>
                  <p className="text-2xl font-bold text-[#CDA020]">{fmtAED(pkg.price)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/60">Bookings</p>
                  <p className="text-2xl font-bold text-white">{pkg.bookings}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                <Edit2 className="mr-2 size-4" />
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
