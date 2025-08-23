
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addCropListing } from "@/app/marketplace/actions";

const formSchema = z.object({
  name: z.string().min(2, "Crop name must be at least 2 characters long."),
  price: z.coerce.number().positive("Price must be a positive number."),
  unit: z.string().min(1, "Please specify a unit (e.g., kg, lb, bunch)."),
  image: z.string().url("Please enter a valid image URL."),
});

type AddCropFormValues = z.infer<typeof formSchema>;

interface AddCropListingFormProps {
  setOpen: (open: boolean) => void;
}

export function AddCropListingForm({ setOpen }: AddCropListingFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<AddCropFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Tomatoes",
      price: 1,
      unit: "kg",
      image: "https://placehold.co/600x400.png",
    },
  });

  async function onSubmit(values: AddCropFormValues) {
    setIsLoading(true);

    try {
      const result = await addCropListing(values);
      if (result.success) {
        toast({
          title: "Crop Listed!",
          description: "Your new crop has been successfully added to the marketplace.",
        });
        form.reset();
        setOpen(false);
      } else {
        throw new Error(result.error || "An unknown error occurred.");
      }
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Crop Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Organic Tomatoes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
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
                <FormControl>
                  <Input placeholder="e.g., kg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://your-image-url.com/image.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-2" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Listing Crop...
            </>
          ) : (
            "List Crop"
          )}
        </Button>
      </form>
    </Form>
  );
}
