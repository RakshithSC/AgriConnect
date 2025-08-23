"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Loader2, AlertTriangle, Leaf } from "lucide-react";
import { getCropRecommendation } from "@/app/recommendations/actions";

const formSchema = z.object({
  soilType: z.string().min(3, "Soil type must be at least 3 characters long."),
  region: z.string().min(3, "Region must be at least 3 characters long."),
});

type FormData = z.infer<typeof formSchema>;

export function RecommendationForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      soilType: "",
      region: "",
    },
  });

  const onSubmit = (values: FormData) => {
    setError(null);
    setRecommendations([]);
    startTransition(async () => {
      const result = await getCropRecommendation(values);
      if (result.success && result.data) {
        setRecommendations(result.data.crops);
      } else {
        setError(result.error || "An unknown error occurred.");
      }
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary"/>
              AI Crop Recommendations
            </CardTitle>
            <CardDescription>
              Enter your soil type and region to get AI-powered crop suggestions.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="soilType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soil Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Loamy, Sandy, Clay" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Central Valley, California" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-stretch">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Recommendations...
                </>
              ) : (
                "Get Recommendations"
              )}
            </Button>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {recommendations.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold font-headline mb-2 text-center">Recommended Crops</h3>
                <div className="flex flex-wrap gap-2 justify-center rounded-lg bg-secondary p-4">
                  {recommendations.map((crop) => (
                    <Badge key={crop} variant="default" className="text-base bg-primary text-primary-foreground py-1 px-3 flex items-center gap-1">
                      <Leaf className="h-3 w-3"/>
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
