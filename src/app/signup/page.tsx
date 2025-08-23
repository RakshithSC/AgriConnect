import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 flex justify-center">
        <div className="w-full max-w-md">
            <div className="flex flex-col items-center text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">
                    Create Your Account
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-balance">
                    Join AgriConnect as a Farmer or a Buyer.
                </p>
            </div>
            <SignupForm />
        </div>
    </div>
  );
}
