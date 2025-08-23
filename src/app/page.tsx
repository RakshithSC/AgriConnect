import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherWidget } from "@/components/weather-widget";
import { ArrowRight, Tractor, Wheat, BookOpen } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Wheat className="w-8 h-8 text-primary" />,
    title: "Transparent Marketplace",
    description:
      "Sell your crops directly to buyers and ensure you always receive the fair value you deserve.",
    link: "/marketplace",
  },
  {
    icon: <Tractor className="w-8 h-8 text-primary" />,
    title: "Smart Equipment Rentals",
    description:
      "Rent tractors, harvesters, and tools on-demand without the heavy investment burden.",
    link: "/equipment",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    title: "Knowledge Hub",
    description:
      "Learn sustainable methods, boost productivity, and grow with expert-driven guides.",
    link: "/knowledge",
  },
];

const mockCrops = [
  {
    name: "Organic Tomatoes",
    price: "₹ 45 / kg",
    image:
      "https://i.pinimg.com/736x/e7/24/a7/e724a7be6f97df8f5434618448293bad.jpg",
  },
  {
    name: "Golden Corn",
    price: "₹ 35 / kg",
    image:
      "https://i.pinimg.com/736x/90/d1/49/90d1494f660484471db1c82a25144ff5.jpg",
  },
  {
    name: "Fresh Potatoes",
    price: "₹ 30 / kg",
    image:
      "https://i.pinimg.com/736x/f7/dd/d3/f7ddd3d0a3cee29c11ce9a26c6262560.jpg",
  },
  {
    name: "Crisp Lettuce",
    price: "₹ 70 / kg",
    image:
      "https://i.pinimg.com/1200x/e8/15/b8/e815b8f8285d460a197852538db8c2f6.jpg",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 flex items-center justify-center text-center px-6">
        <div className="relative z-20 text-white max-w-3xl animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-md">
            Transforming Farming for a Smarter Tomorrow
          </h1>
          <p className="mt-4 text-lg md:text-xl opacity-90">
            AgriConnect brings farmers, buyers, and resources together on one
            platform — fair trade, smarter rentals, and practical knowledge.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-700 font-bold shadow-xl hover:scale-105 transition-transform"
            >
              <Link href="/marketplace">
                Explore Marketplace <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-green-800/50 backdrop-blur-md text-white border border-white/40 hover:bg-green-900/70"
            >
              <Link href="/equipment">Rent Equipment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Empowering Farmers with Tools That Matter
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
              From selling produce to renting equipment — we make farming
              smarter, simpler, and more rewarding.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="text-center bg-white/80 backdrop-blur-md shadow-md hover:shadow-2xl transition-transform hover:scale-105 duration-300"
              >
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit shadow-inner">
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                  <Button asChild variant="link" className="mt-4 text-primary">
                    <Link href={feature.link}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section className="py-20 bg-gradient-to-br from-green-100 via-white to-green-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground">
                Fresh Harvests, Fair Prices
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Browse the freshest crops from local farmers in your community.
              </p>
            </div>
            <Button className="mt-4 md:mt-0 shadow-lg hover:scale-105 transition-transform">
              <Link href="/marketplace">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockCrops.map((crop) => (
              <Card
                key={crop.name}
                className="overflow-hidden group rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-48 w-full">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-4 bg-white/80 backdrop-blur-md">
                  <h3 className="text-lg font-semibold">{crop.name}</h3>
                  <p className="text-muted-foreground">{crop.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Weather Widget */}
      <section className="py-20 bg-gradient-to-tr from-green-50 via-white to-green-50">
        <div className="container mx-auto px-4 flex justify-center">
          <WeatherWidget />
        </div>
      </section>
    </div>
  );
}
