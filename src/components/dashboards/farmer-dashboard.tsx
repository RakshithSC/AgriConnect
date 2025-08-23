"use client";

import React, { useState } from "react";
import { User, History, Heart, Bell, Settings, TrendingUp } from "lucide-react";

// Placeholder Weather widget
const WeatherWidget = () => (
  <div className="bg-blue-100 p-4 rounded-lg shadow-md">
    <h3 className="font-semibold mb-2">🌤 Weather Advisory</h3>
    <p className="text-gray-700">Current: 28°C, Sunny, Humidity: 60%</p>
    <p className="text-gray-700">Best time to irrigate: Morning</p>
  </div>
);

interface Transaction {
  id: number;
  type: "buy" | "sell";
  item: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "cancelled";
}

interface SavedItem {
  id: number;
  name: string;
  type: "crop" | "equipment";
  price: number;
  image: string;
}

const cropData: Record<string, any> = {
  wheat: { marketPrice: "₹2,100/quintal", soilType: "Loamy", waterRequirement: "30-35cm/season", fertilizer: "N-rich", season: "Rabi" },
  paddy: { marketPrice: "₹1,800/quintal", soilType: "Clayey", waterRequirement: "1200-1500mm", fertilizer: "Balanced NPK", season: "Kharif" },
  maize: { marketPrice: "₹1,500/quintal", soilType: "Loamy-Sandy", waterRequirement: "50-75cm", fertilizer: "N&P rich", season: "Rabi/Kharif" },
};

export default function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [cropName, setCropName] = useState("");
  const [cropInfo, setCropInfo] = useState<any>(null);

  const handleCropCheck = () => {
    const key = cropName.trim().toLowerCase();
    if (!key) return setCropInfo({ error: "Enter a valid crop name." });
    const info = cropData[key];
    setCropInfo(info || { error: "No data available for this crop." });
  };

  const user = { name: "Rajesh Kumar", location: "Punjab, India", type: "Farmer", avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150" };
  const stats = { totalSales: 125000, totalPurchases: 45000, activeListings: 8, completedTransactions: 23 };

  const transactions: Transaction[] = [
    { id: 1, type: "sell", item: "Basmati Rice (100kg)", amount: 4500, date: "2024-12-20", status: "completed" },
    { id: 2, type: "buy", item: "Seed Drill Machine (Rental)", amount: 1500, date: "2024-12-18", status: "completed" },
    { id: 3, type: "sell", item: "Fresh Tomatoes (50kg)", amount: 1750, date: "2024-12-15", status: "pending" },
    { id: 4, type: "buy", item: "Organic Fertilizer (25kg)", amount: 800, date: "2024-12-12", status: "completed" },
    { id: 5, type: "sell", item: "Premium Wheat (200kg)", amount: 5000, date: "2024-12-10", status: "completed" },
  ];

  const savedItems: SavedItem[] = [
    { id: 1, name: "John Deere Tractor", type: "equipment", price: 650000, image: "https://i.pinimg.com/1200x/bb/9a/f7/bb9af77bbac1afd29a5eaa60ca38c5ca.jpg" },
    { id: 2, name: "Organic Carrots", type: "crop", price: 30, image: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { id: 3, name: "Spraying Equipment", type: "equipment", price: 45000, image: "https://i.pinimg.com/1200x/cd/96/9b/cd969b900c00e366bf316d8886ab6e5b.jpg" },
  ];

  const notifications = [
    { id: 1, message: "Your rice listing received 5 new inquiries", time: "2 hours ago", unread: true },
    { id: 2, message: "Price alert: Tomato prices increased by 8%", time: "4 hours ago", unread: true },
    { id: 3, message: "Equipment rental reminder: Return by Dec 25", time: "1 day ago", unread: false },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "transactions", label: "Transactions", icon: History },
    { id: "saved", label: "Saved Items", icon: Heart },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full" />
            <div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.type}</p>
              <p className="text-xs text-gray-500">{user.location}</p>
            </div>
          </div>
          <nav className="bg-white rounded-lg shadow-md">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-green-50 text-green-700 border-r-4 border-green-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {tab.label}
                  {tab.id === "notifications" && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {notifications.filter((n) => n.unread).length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === "overview" && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
                  <p className="text-2xl font-bold text-green-600">₹{stats.totalSales.toLocaleString()}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-sm font-medium text-gray-500">Total Purchases</h3>
                  <p className="text-2xl font-bold text-blue-600">₹{stats.totalPurchases.toLocaleString()}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-sm font-medium text-gray-500">Active Listings</h3>
                  <p className="text-2xl font-bold text-yellow-600">{stats.activeListings}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-sm font-medium text-gray-500">Completed Orders</h3>
                  <p className="text-2xl font-bold text-purple-600">{stats.completedTransactions}</p>
                </div>
              </div>

              {/* Weather Widget */}
              <WeatherWidget />

              {/* Crop Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">🌱 Check Crop Info</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    placeholder="Wheat, Paddy, Maize..."
                    className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleCropCheck}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Check Info
                  </button>
                </div>
                {cropInfo && (
                  <div className="mt-4 bg-green-50 p-4 rounded-lg shadow-inner">
                    {cropInfo.error ? (
                      <p className="text-red-600">{cropInfo.error}</p>
                    ) : (
                      <ul className="space-y-1 text-gray-700">
                        <li><strong>Market Price:</strong> {cropInfo.marketPrice}</li>
                        <li><strong>Soil Type:</strong> {cropInfo.soilType}</li>
                        <li><strong>Water Requirement:</strong> {cropInfo.waterRequirement}</li>
                        <li><strong>Fertilizer Info:</strong> {cropInfo.fertilizer}</li>
                        <li><strong>Season:</strong> {cropInfo.season}</li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "transactions" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${tx.type === "sell" ? "bg-green-500" : "bg-blue-500"}`}></div>
                      <div>
                        <p className="font-medium">{tx.item}</p>
                        <p className="text-sm text-gray-500">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${tx.type === "sell" ? "text-green-600" : "text-blue-600"}`}>
                        {tx.type === "sell" ? "+" : "-"}₹{tx.amount.toLocaleString()}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        tx.status === "completed" ? "bg-green-100 text-green-800" :
                        tx.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>{tx.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "saved" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Saved Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                      <p className="text-lg font-semibold text-green-600 mt-2">₹{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-4 rounded-lg border ${n.unread ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}>
                    <p className={`${n.unread ? "font-medium" : ""}`}>{n.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-6">Profile</h3>
              <div className="space-y-4">
                <input type="text" defaultValue={user.name} className="w-full px-3 py-2 border rounded-md" />
                <input type="text" defaultValue={user.location} className="w-full px-3 py-2 border rounded-md" />
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Update Profile</button>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-6">Settings</h3>
              <div className="space-y-4">
                <label className="flex items-center"><input type="checkbox" className="mr-2" defaultChecked />Email notifications</label>
                <label className="flex items-center"><input type="checkbox" className="mr-2" />SMS alerts</label>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Save Settings</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
