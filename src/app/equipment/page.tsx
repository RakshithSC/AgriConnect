"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const equipmentList = [
  {
    name: "Mahindra Tractor 575",
    type: "Tractor",
    price: "₹1,500/day",
    image:
      "https://i.pinimg.com/1200x/bb/9a/f7/bb9af77bbac1afd29a5eaa60ca38c5ca.jpg",
    description:
      "Mahindra 575 DI XP Plus, powerful tractor for ploughing, sowing, and transport.",
  },
  {
    name: "Sonalika Harvester",
    type: "Harvester",
    price: "₹3,500/day",
    image:
      "https://i.pinimg.com/736x/63/68/89/6368891588b41cd7524f1d124d9fdc4c.jpg", // ✅ fixed pin url
    description:
      "Efficient multi-crop combine harvester suitable for paddy and wheat.",
  },
  {
    name: "Boom Sprayer",
    type: "Sprayer",
    price: "₹800/day",
    image:
      "https://i.pinimg.com/1200x/cd/96/9b/cd969b900c00e366bf316d8886ab6e5b.jpg",
    description:
      "Used for uniform spraying of pesticides and fertilizers across crops.",
  },
  {
    name: "Disc Plough",
    type: "Plough",
    price: "₹600/day",
    image:
      "https://i.pinimg.com/1200x/47/4e/07/474e075cedbb0629c4f78f04adb63965.jpg",
    description: "Durable disc plough for breaking soil and field preparation.",
  },
  {
    name: "Seed Drill Machine",
    type: "Seeder",
    price: "₹700/day",
    image:
      "https://i.pinimg.com/736x/42/e1/ac/42e1ac4b1ca510f539850b1f7071bbcd.jpg",
    description:
      "Ensures uniform seed placement and better crop yield efficiency.",
  },
  {
    name: "Baler Machine",
    type: "Baler",
    price: "₹1,200/day",
    image:
      "https://i.pinimg.com/1200x/91/46/dd/9146dd26031e26489903ac12c68c79ea.jpg",
    description:
      "Used for making compact bales of straw and fodder for storage.",
  },
];

export default function EquipmentPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
        किराये पर कृषि उपकरण (Farm Equipment on Rent)
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {equipmentList.map((item, idx) => (
          <Card
            key={idx}
            className="bg-white shadow-lg rounded-2xl overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-52 object-cover"
            />
            <CardContent className="p-5">
              <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
              <p className="text-green-700 font-medium">{item.type}</p>
              <p className="mt-2 text-gray-600 text-sm">{item.description}</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                {item.price}
              </p>

              <div className="flex justify-between mt-4">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() =>
                    router.push(`/equipment/${encodeURIComponent(item.name)}`)
                  } // ✅ fixed with backticks
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(
                      `/equipment/${encodeURIComponent(item.name)}/buy`
                    )
                  } // ✅ fixed with backticks
                >
                  Rent / Buy
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
