"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  onSnapshot,
  getDoc,
  DocumentData,
  QueryDocumentSnapshot
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { Wheat, Loader2 } from "lucide-react";

// Crop interface
interface Crop {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  farmerName: string;
  rating: number;
  location?: string;
  harvestDate?: string;
  organic?: boolean;
}

export default function Marketplace() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [marketData, setMarketData] = useState<any>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  // Fetch crops from Firebase
  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(collection(db, "crops"), async (snapshot) => {
      const cropsData: Crop[] = await Promise.all(
        snapshot.docs.map(async (docSnap: QueryDocumentSnapshot<DocumentData>) => {
          const data = docSnap.data();
          let farmerName = "Unknown Farmer";
          if (data.farmerId) {
            const userDoc = await getDoc(doc(db, "users", data.farmerId));
            if (userDoc.exists()) farmerName = userDoc.data().fullName || "Unknown Farmer";
          }
          return {
            id: docSnap.id,
            name: data.name,
            price: data.price,
            unit: data.unit,
            image: data.image,
            farmerName,
            rating: data.rating || 4.5,
            location: data.location || "Unknown",
            harvestDate: data.harvestDate || "N/A",
            organic: data.organic || false,
          };
        })
      );
      setCrops(cropsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Fetch market trend from API (dummy example)
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // Replace with a real API
        const res = await fetch("https://api.example.com/market-trends?crop=bottle-gourd");
        const data = await res.json();
        setMarketData(data);
      } catch (e) {
        console.error("Error fetching market data", e);
      }
    };
    fetchMarketData();
  }, []);

  // Filtered crops
  const filteredCrops = crops.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Dial to sell simulation
  const dialToSell = (crop: Crop) => {
    alert(`Auto-selling ${crop.name} at market price ₹${crop.price}`);
    // Add Firebase transaction logic here if needed
  };

  if (loading || authLoading || !user)
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <Wheat className="mx-auto h-12 w-12 text-green-600" />
        <h1 className="text-3xl font-bold">Farmer Marketplace</h1>
        <p>Buy or sell crops directly, check live market trends</p>
      </div>

      {/* Search and category */}
      <div className="flex gap-4 mb-8">
        <Input placeholder="Search crops..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded">
          <option value="all">All</option>
          <option value="grains">Grains</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="organic">Organic</option>
        </select>
      </div>

      {/* Market Trend Graph */}
      {marketData && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Market Price Trend</h2>
          <Line
            data={{
              labels: marketData.dates,
              datasets: [
                {
                  label: "Price",
                  data: marketData.prices,
                  borderColor: "green",
                  backgroundColor: "rgba(34,197,94,0.2)",
                },
              ],
            }}
          />
        </div>
      )}

      {/* Crop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCrops.map(crop => (
          <Card key={crop.id} className="overflow-hidden shadow hover:shadow-lg transition">
            <div className="relative h-48 w-full">
              <Image src={crop.image} alt={crop.name} fill className="object-cover" />
            </div>
            <CardContent>
              <h3 className="text-lg font-bold">{crop.name}</h3>
              <p className="text-gray-600">{crop.farmerName}</p>
              <p>₹{crop.price} / {crop.unit}</p>
              <div className="flex gap-2 mt-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => dialToSell(crop)}>Dial to Sell</Button>
                <Button className="flex-1 border border-green-600 text-green-600">Add to Cart</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
