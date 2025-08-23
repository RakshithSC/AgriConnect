"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Loader2 } from "lucide-react";

const formSchema = z.object({
  cropType: z.string().min(1, "Please select a crop type."),
  quantity: z.coerce.number().min(0.1, "Quantity must be at least 0.1."),
  unit: z.string().min(1, "Please select a unit."),
});

const cropTypes = ["Tomatoes", "Corn", "Potatoes", "Lettuce", "Wheat", "Soybeans"];
const units = ["kg", "ton", "bushel"];

export function PriceCalculatorForm() {
  const [suggestedPrice, setSuggestedPrice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropType: "",
      quantity: 100,
      unit: "kg",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestedPrice(null);

    // Mock API call
    setTimeout(() => {
      const basePrice = Math.random() * 50 + 20; // Mock base price from market data
      const finalPrice = basePrice * values.quantity;
      setSuggestedPrice(
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(finalPrice)
      );
      setIsLoading(false);
    }, 1500);
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary"/>
              Fair Price Calculator
            </CardTitle>
            <CardDescription>
              Get a fair market price estimate for your crops based on current trends.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="cropType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crop Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a crop" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cropTypes.map((crop) => (
                        <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                "Calculate Fair Price"
              )}
            </Button>
            {suggestedPrice && (
              <div className="mt-6 text-center bg-secondary p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Suggested Fair Price:</p>
                <p className="text-3xl font-bold font-headline text-primary">{suggestedPrice}</p>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
