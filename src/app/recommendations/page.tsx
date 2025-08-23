import { RecommendationForm } from "@/components/recommendation-form";

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">
          AI Crop Recommendation
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-balance">
          Leverage the power of AI to discover the most suitable crops for your specific soil type and geographical region. Get tailored recommendations to maximize your yield and success.
        </p>
      </div>
      <div className="mt-12">
        <RecommendationForm />
      </div>
    </div>
  );
}
