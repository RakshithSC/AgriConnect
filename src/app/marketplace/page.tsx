"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

/* -------------------------
   Crop Type
------------------------- */
type Crop = {
  id: number;
  name: string;
  quantity: number; // total available
  price: number;
  certificateLink: string;
  cropImageLink: string;
  location: string;
  certified: boolean;
};

/* -------------------------
   Crop Card
------------------------- */
const CropCard = ({
  crop,
  onBuy,
}: {
  crop: Crop;
  onBuy?: (crop: Crop, buyQty: number) => void;
}) => {
  const [buyQuantity, setBuyQuantity] = useState<number>(1);

  return (
    <Card className="overflow-hidden bg-white/90 shadow-md rounded-2xl hover:shadow-xl transition-transform hover:-translate-y-1">
      <div className="h-44 w-full overflow-hidden">
        <img
          src={crop.cropImageLink}
          alt={crop.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{crop.name}</h3>
          {crop.certified && <Badge variant="secondary">Certified</Badge>}
        </div>
        <p className="text-sm text-muted-foreground">
          Available: {crop.quantity} kg
        </p>
        <p className="text-sm text-muted-foreground">Price: ₹{crop.price}/kg</p>
        <p className="text-sm text-muted-foreground">Location: {crop.location}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <a
          href={crop.certificateLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-sm text-primary font-semibold"
        >
          View Certificate <ExternalLink className="w-4 h-4" />
        </a>

        {onBuy && (
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min={1}
              max={crop.quantity}
              value={buyQuantity}
              onChange={(e) => setBuyQuantity(Number(e.target.value))}
              className="w-20 p-1 border rounded-md"
            />
            <Button
              size="sm"
              onClick={() => onBuy(crop, buyQuantity)}
            >
              Buy
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

/* -------------------------
   Marketplace Page
------------------------- */
export default function MarketplacePage() {
  const [crops, setCrops] = useState<Crop[]>(() => {
    const savedCrops = localStorage.getItem("crops");
    return savedCrops ? JSON.parse(savedCrops) : [];
  });

  const [searchSell, setSearchSell] = useState("");
  const [searchBuy, setSearchBuy] = useState("");
  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    price: 0,
    certificateLink: "",
    cropImageLink: "",
    location: "",
  });

  /* -------------------------
     Handle Input Change
  ------------------------- */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "quantity" || name === "price") {
      setForm({ ...form, [name]: Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* -------------------------
     Sell Crop
  ------------------------- */
  const handleSell = () => {
    const { name, quantity, price, certificateLink, cropImageLink, location } = form;
    if (!name || !quantity || !price || !certificateLink || !cropImageLink || !location) {
      alert("Please fill all fields and provide links for certificate & crop image!");
      return;
    }
    const newCrop: Crop = {
      id: Date.now(),
      name,
      quantity,
      price,
      certificateLink,
      cropImageLink,
      location,
      certified: true,
    };
   setCrops([...crops, newCrop]);
localStorage.setItem("crops", JSON.stringify([...crops, newCrop]));;
    alert("Crop successfully listed!");
  };

  /* -------------------------
     Buy Crop
  ------------------------- */
  const handleBuy = (crop: Crop, buyQty: number) => {
    if (buyQty > crop.quantity) {
      alert("Quantity exceeds available stock!");
      return;
    }
    alert(`You bought ${buyQty} kg of ${crop.name}!`);
    const newTransaction = {
  id: Date.now(),
  type: "buy",
  item: `${crop.name} (${buyQty}kg)`,
  amount: crop.price * buyQty,
  date: new Date().toISOString().split("T")[0],
  status: "completed",
};
const existingTransactions = JSON.parse(
  localStorage.getItem("transactions") || "[]"
);

localStorage.setItem(
  "transactions",
  JSON.stringify([newTransaction, ...existingTransactions])
);
const updatedCrops = crops.map((c) =>
      c.id === crop.id ? { ...c, quantity: c.quantity - buyQty } : c
    );
    setCrops(updatedCrops);
  };

  /* -------------------------
     Filtered Crops for Search
  ------------------------- */
  const filteredSellCrops = crops.filter((c) =>
    c.name.toLowerCase().includes(searchSell.toLowerCase())
  );
  const filteredBuyCrops = crops.filter((c) =>
    c.name.toLowerCase().includes(searchBuy.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-green-900">Marketplace</h1>

      <Tabs defaultValue="sell" className="w-full">
        <TabsList className="grid grid-cols-2 max-w-lg mx-auto gap-2 bg-white/70 backdrop-blur rounded-lg p-1 mb-8">
          <TabsTrigger value="sell">Sell Crops</TabsTrigger>
          <TabsTrigger value="buy">Buy Crops</TabsTrigger>
        </TabsList>

        {/* ------------------- SELL TAB ------------------- */}
        <TabsContent value="sell">
          <div className="max-w-lg mx-auto bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md space-y-3">
            <h2 className="text-xl font-bold mb-2">List Your Crop</h2>
            <input type="text" name="name" placeholder="Crop Name" value={form.name} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
            <input type="number" name="quantity" placeholder="Quantity (kg)" value={form.quantity} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
            <input type="number" name="price" placeholder="Price per kg (₹)" value={form.price} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
            <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
            <input type="text" name="cropImageLink" placeholder="Crop Image URL" value={form.cropImageLink} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
            <input type="text" name="certificateLink" placeholder="Certificate URL" value={form.certificateLink} onChange={handleInputChange} className="w-full p-2 border rounded-md" />

            <Button className="w-full mt-2" onClick={handleSell}>Sell Crop</Button>

            <input type="text" placeholder="Search your crops..." value={searchSell} onChange={(e) => setSearchSell(e.target.value)} className="w-full p-2 border rounded-md mt-4" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {filteredSellCrops.map((crop) => (
                <CropCard key={crop.id} crop={crop} />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ------------------- BUY TAB ------------------- */}
        <TabsContent value="buy">
          <div className="max-w-3xl mx-auto">
            <input type="text" placeholder="Search crops..." value={searchBuy} onChange={(e) => setSearchBuy(e.target.value)} className="w-full p-2 border rounded-md mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBuyCrops.map((crop) => (
                <CropCard key={crop.id} crop={crop} onBuy={handleBuy} />
              ))}
              {filteredBuyCrops.length === 0 && <p className="text-center text-muted-foreground">No crops found</p>}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
