"use client";

import { useState } from "react";
import { Card, CardContent, Button } from "@aerovy/ui";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    siteName: "Aerovy Travels",
    email: "hello@aerovy.travel",
    whatsapp: "+971 50 123 4567",
    address: "Corniche Road, Al Markaziyah, Abu Dhabi, UAE",
    logo: "",
    emailAlerts: true,
    reviewAlerts: true,
    bookingAlerts: true,
    primaryColor: "#CDA020",
  });

  const handleChange = (field: string, value: string | boolean) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    localStorage.setItem("admin_settings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-white/60">Manage site configuration</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {[
          { id: "general", label: "General" },
          { id: "notifications", label: "Notifications" },
          { id: "appearance", label: "Appearance" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-[#CDA020] text-[#CDA020]"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <Card className="border border-white/10 bg-[#161B22]">
          <CardContent className="space-y-6 p-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleChange("siteName", e.target.value)}
                className="w-full rounded-md border border-white/10 bg-[#0D1117] px-4 py-2 text-white focus:border-[#CDA020] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white">Contact Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full rounded-md border border-white/10 bg-[#0D1117] px-4 py-2 text-white focus:border-[#CDA020] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white">WhatsApp Number</label>
              <input
                type="tel"
                value={settings.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className="w-full rounded-md border border-white/10 bg-[#0D1117] px-4 py-2 text-white focus:border-[#CDA020] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white">Address</label>
              <textarea
                value={settings.address}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={3}
                className="w-full rounded-md border border-white/10 bg-[#0D1117] px-4 py-2 text-white focus:border-[#CDA020] focus:outline-none"
              />
            </div>
            <Button className="bg-[#CDA020] text-black hover:bg-[#CDA020]/90" onClick={handleSave}>
              <Save className="mr-2 size-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Notifications */}
      {activeTab === "notifications" && (
        <Card className="border border-white/10 bg-[#161B22]">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Email Alerts on New Booking</p>
                <p className="text-sm text-white/60">Receive notifications for each new booking</p>
              </div>
              <input
                type="checkbox"
                checked={settings.bookingAlerts}
                onChange={(e) => handleChange("bookingAlerts", e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-[#0D1117]"
              />
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div>
                <p className="font-medium text-white">Email Alerts on New Enquiry</p>
                <p className="text-sm text-white/60">
                  Receive notifications for customer inquiries
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={(e) => handleChange("emailAlerts", e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-[#0D1117]"
              />
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div>
                <p className="font-medium text-white">Email Alerts on New Review</p>
                <p className="text-sm text-white/60">
                  Receive notifications for new customer reviews
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.reviewAlerts}
                onChange={(e) => handleChange("reviewAlerts", e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-[#0D1117]"
              />
            </div>
            <Button
              className="mt-6 bg-[#CDA020] text-black hover:bg-[#CDA020]/90"
              onClick={handleSave}
            >
              <Save className="mr-2 size-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Appearance */}
      {activeTab === "appearance" && (
        <Card className="border border-white/10 bg-[#161B22]">
          <CardContent className="space-y-6 p-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">Primary Color</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => handleChange("primaryColor", e.target.value)}
                  className="h-10 w-20 cursor-pointer rounded-md border border-white/10"
                />
                <input
                  type="text"
                  value={settings.primaryColor}
                  onChange={(e) => handleChange("primaryColor", e.target.value)}
                  className="flex-1 rounded-md border border-white/10 bg-[#0D1117] px-4 py-2 text-white focus:border-[#CDA020] focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white">Logo URL</label>
              <input
                type="url"
                value={settings.logo}
                onChange={(e) => handleChange("logo", e.target.value)}
                placeholder="https://..."
                className="w-full rounded-md border border-white/10 bg-[#0D1117] px-4 py-2 text-white placeholder:text-white/40 focus:border-[#CDA020] focus:outline-none"
              />
            </div>
            <Button className="bg-[#CDA020] text-black hover:bg-[#CDA020]/90" onClick={handleSave}>
              <Save className="mr-2 size-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
