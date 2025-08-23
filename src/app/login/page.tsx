import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200">
      {/* Decorative virtual gradient circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-300/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200/40 rounded-full blur-3xl animate-pulse" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-balance">
            Log in to your <span className="font-semibold text-green-600">AgriConnect</span> account.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

