"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BuyNowPage() {
  const { name } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    rentalDays: "",
    mode: "Rent",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `✅ ${form.mode} request submitted for ${decodeURIComponent(
        name as string
      )}\n\nCustomer: ${form.fullName}\nPhone: ${form.phone}\nDays: ${
        form.rentalDays || "N/A"
      }`
    );
    router.push("/equipment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 px-6 py-12">
      <Card className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {decodeURIComponent(name as string)} – Rent / Buy
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Rental Days (if renting)
              </label>
              <input
                type="number"
                name="rentalDays"
                value={form.rentalDays}
                onChange={handleChange}
                placeholder="Enter number of days"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Mode
              </label>
              <select
                name="mode"
                value={form.mode}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="Rent">Rent</option>
                <option value="Buy">Buy</option>
              </select>
            </div>

            <div className="flex justify-between mt-6">
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Confirm {form.mode}
              </Button>
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
