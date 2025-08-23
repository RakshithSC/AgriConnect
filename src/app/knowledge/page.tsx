"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ArrowRight, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* -------------------------
   Content arrays
------------------------- */
const ARTICLES = [
  {
    title: "The Benefits of No-Till Farming",
    category: "Sustainability",
    image:
      "https://i.pinimg.com/1200x/83/82/a8/8382a8d569f09e86e25ed5d829af0775.jpg",
    link: "https://en.wikipedia.org/wiki/No-till_farming",
  },
  {
    title: "Mastering Drip Irrigation for Small Farms",
    category: "Irrigation",
    image:
      "https://i.pinimg.com/1200x/f8/40/87/f84087424ffc2eb2efd09f755adbaa9a.jpg",
    link: "https://en.wikipedia.org/wiki/Drip_irrigation",
  },
  {
    title: "Organic Pest Control: Safe Methods",
    category: "Organic",
    image:
      "https://i.pinimg.com/1200x/4a/4e/20/4a4e202ee431eaeb80b89a0f2127b97e.jpg",
    link: "https://en.wikipedia.org/wiki/Integrated_pest_management",
  },
  {
    title: "Soil Health 101 — Practical Guide",
    category: "Soil",
    image:
      "https://i.pinimg.com/736x/a8/0d/8a/a80d8a9d0375a8be4b67c5d66be82980.jpg",
    link: "https://en.wikipedia.org/wiki/Soil_health",
  },
];

const TUTORIALS = [
  {
    title: "Build a Raised Garden Bed (Step-by-step)",
    category: "DIY",
    image:
      "https://i.pinimg.com/1200x/d2/24/52/d224525b3a31515f94f3e1f05728f40c.jpg",
    steps: [
      "Choose and mark a 4×8 ft area; level ground.",
      "Use hardwood planks or treated wood for the frame.",
      "Screw the frame, line with cardboard, fill with quality soil + compost.",
      "Plant and mulch; water thoroughly.",
    ],
    link: "https://www.wikihow.com/Build-a-Raised-Garden-Bed",
  },
  {
    title: "Composting for Beginners",
    category: "Sustainability",
    image:
      "https://i.pinimg.com/1200x/d3/3b/67/d33b67912876f781044e6484568c6c14.jpg",
    steps: [
      "Mix greens (kitchen scraps) and browns (dry leaves) — 1:2 ratio.",
      "Keep pile moist (like a wrung sponge).",
      "Turn pile every 1–2 weeks for aeration.",
      "When dark & crumbly, compost is ready (6–8 weeks).",
    ],
    link: "https://en.wikipedia.org/wiki/Compost",
  },
  {
    title: "Calibrating Seed Spreaders",
    category: "Equipment",
    image:
      "https://i.pinimg.com/1200x/83/f5/62/83f5627ed9c5d3a9a09a0af4948bf153.jpg",
    steps: [
      "Measure a test strip length (e.g., 50 m).",
      "Run the spreader and collect output.",
      "Weigh output and adjust rate to target label.",
      "Repeat until calibration matches the desired application rate.",
    ],
    link: "https://extension.psu.edu/calibrating-broadcast-seeders-and-spreaders",
  },
];

const VIDEOS = [
  {
    title: "A Tour of a Modern Vertical Farm",
    category: "Technology",
    youtubeId: "hCQHwimJFGM",
  },
  {
    title: "Interview with a Regenerative Farmer",
    category: "Insights",
    youtubeId: "PndqPNoRkMY",
  },
  {
    title: "The Science of Crop Rotation",
    category: "Techniques",
    youtubeId: "xIYsB_2_6go",
  },
  {
    title: "Harvesting Techniques for Maximum Yield",
    category: "Harvest",
    youtubeId: "wLncjI6PrFc",
  },
];

const GOV_SCHEMES = [
  {
    title: "PM-Kisan Samman Nidhi (PM-Kisan)",
    description:
      "Income support ₹6,000 per year to eligible farmers (three instalments).",
    image:
      "https://i.pinimg.com/736x/41/c8/56/41c856445c13d7a21a2050f99abe96cb.jpg",
    link: "https://pmkisan.gov.in/",
  },
  {
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description:
      "Nationwide crop insurance scheme for protection against crop losses.",
    image:
      "https://i.pinimg.com/736x/33/2e/81/332e8177bae48b5832baba3630522658.jpg",
    link: "https://pmfby.gov.in/",
  },
  {
    title: "Soil Health Card Scheme",
    description:
      "Soil testing & advisory to improve fertility and productivity.",
    image:
      "https://i.pinimg.com/736x/11/2e/d2/112ed241f46e2e2ef0a3d487cda769a3.jpg",
    link: "https://soilhealth.dac.gov.in/",
  },
  {
    title: "Kisan Credit Card (KCC)",
    description:
      "Affordable credit for farmers for cultivation & allied activities.",
    image:
      "https://i.pinimg.com/1200x/b1/a7/af/b1a7af6f44dc1f5aa8671fc5c4b8f59e.jpg",
    link: "https://www.india.gov.in/spotlight/pradhan-mantri-kisan-samman-nidhi-pm-kisan",
  },
];

/* -------------------------
   Card Components
------------------------- */
const ArticleCard = ({ title, category, image, link }: any) => (
  <Card className="overflow-hidden group bg-white/80 backdrop-blur-md shadow-md rounded-2xl transition-transform hover:-translate-y-1 hover:shadow-2xl">
    <div className="h-44 w-full overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <CardContent className="p-4">
      <Badge variant="secondary">{category}</Badge>
      <h3 className="mt-3 text-lg font-headline font-bold">{title}</h3>
    </CardContent>
    <CardFooter className="px-4 pb-4">
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-primary font-semibold flex items-center gap-2"
      >
        Read More <ArrowRight className="w-4 h-4" />
      </a>
    </CardFooter>
  </Card>
);

const TutorialCard = ({ title, category, image, steps, link }: any) => (
  <Card className="overflow-hidden group bg-white/85 backdrop-blur-md shadow-md rounded-2xl transition-transform hover:-translate-y-1 hover:shadow-2xl">
    <div className="h-40 w-full overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <CardContent className="p-4">
      <Badge variant="secondary">{category}</Badge>
      <h3 className="mt-3 text-lg font-headline font-bold">{title}</h3>
      <details className="mt-3 bg-white/60 p-3 rounded-md border">
        <summary className="font-medium cursor-pointer">Show quick steps</summary>
        <ol className="mt-2 list-decimal list-inside text-sm text-muted-foreground space-y-1">
          {steps.map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <div className="mt-2 text-sm">
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-primary font-semibold flex items-center gap-2"
          >
            Open full tutorial <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </details>
    </CardContent>
  </Card>
);

const VideoCard = ({ title, category, youtubeId }: any) => (
  <Card className="overflow-hidden group bg-white/80 backdrop-blur-md shadow-md rounded-2xl transition-transform hover:-translate-y-1 hover:shadow-2xl">
    <div className="relative w-full aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
    <CardContent className="p-4">
      <Badge variant="secondary">{category}</Badge>
      <h3 className="mt-3 text-lg font-headline font-bold">{title}</h3>
    </CardContent>
  </Card>
);

const SchemeCard = ({ title, description, image, link }: any) => (
  <Card className="overflow-hidden group bg-white/90 backdrop-blur-md shadow-md rounded-2xl transition-transform hover:-translate-y-1 hover:shadow-2xl">
    <div className="h-44 w-full overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <CardContent className="p-4">
      <h3 className="text-lg font-headline font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </CardContent>
    <CardFooter className="px-4 pb-4">
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 text-sm text-primary font-semibold"
      >
        Visit Official Site <ExternalLink className="w-4 h-4" />
      </a>
    </CardFooter>
  </Card>
);

/* -------------------------
   Page Component
------------------------- */
export default function KnowledgeHubPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">
      <div className="pointer-events-none absolute -top-28 -left-28 w-80 h-80 rounded-full bg-gradient-to-tr from-green-300/30 to-teal-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-28 w-96 h-96 rounded-full bg-gradient-to-tr from-yellow-200/30 to-green-200/10 blur-3xl" />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <div className="mx-auto inline-flex items-center justify-center rounded-xl bg-white/80 backdrop-blur p-3 shadow">
            <BookOpen className="h-8 w-8 text-green-700" />
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900">
            Knowledge Hub
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Articles, tutorials, videos and government schemes — curated to help Indian farmers adopt smarter, sustainable practices.
          </p>
          <div className="mt-4">
            <Button asChild variant="outline">
              <Link href="/equipment">Explore Equipment</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid max-w-4xl mx-auto grid-cols-4 gap-2 bg-white/70 backdrop-blur rounded-lg p-1 mb-8">
            <TabsTrigger value="articles" className="py-3">Articles</TabsTrigger>
            <TabsTrigger value="tutorials" className="py-3">Tutorials</TabsTrigger>
            <TabsTrigger value="videos" className="py-3">Videos</TabsTrigger>
            <TabsTrigger value="schemes" className="py-3">Govt Schemes</TabsTrigger>
          </TabsList>

          <TabsContent value="articles">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {ARTICLES.map((a) => (
                <ArticleCard key={a.title} {...a} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tutorials">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {TUTORIALS.map((t) => (
                <TutorialCard key={t.title} {...t} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {VIDEOS.map((v) => (
                <VideoCard key={v.youtubeId} {...v} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schemes">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {GOV_SCHEMES.map((s) => (
                <SchemeCard key={s.title} {...s} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
