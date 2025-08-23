import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

interface Buyer {
  name: string;
  email: string;
  contact: string;
}

export default function BuyerDashboard() {
  // Mock buyer data; replace with real data from your auth hook
  const buyer: Buyer = {
    name: "Dhanu",
    email: "dhankushree@gmail.com",
    contact: "+91 9876543210",
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Buyer Profile</h1>

      <Card className="max-w-md mx-auto bg-white/90 backdrop-blur-md shadow-lg rounded-2xl">
        <CardHeader className="flex items-center space-x-4">
          <User className="h-10 w-10 text-green-700" />
          <CardTitle className="text-xl font-semibold">{buyer.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-700">
          <p><span className="font-semibold">Email:</span> {buyer.email}</p>
          <p><span className="font-semibold">Contact:</span> {buyer.contact}</p>
        </CardContent>
      </Card>
    </div>
  );
}
