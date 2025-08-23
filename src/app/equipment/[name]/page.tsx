"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EquipmentDetailsPage() {
  const { name } = useParams();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-200 px-6 py-12">
      <Card className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {decodeURIComponent(name as string)}
          </h1>

          <p className="text-lg text-gray-700 mb-4">
            Detailed specifications and usage guide will be shown here.  
            You can rent or buy this equipment easily.
          </p>

          <div className="flex gap-4">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() =>
                router.push(`/equipment/${encodeURIComponent(name as string)}/buy`)
              }
            >
              Rent / Buy
            </Button>
            <Button variant="outline" onClick={() => router.push("/equipment")}>
              Back to Equipment List
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
