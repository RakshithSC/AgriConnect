
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu, Leaf, User, Languages, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

const baseNavLinks = [
  { title: "Marketplace", href: "/marketplace" },
  { title: "Equipment", href: "/equipment" },
  { title: "Knowledge Hub", href: "/knowledge" },
];

const farmerNavLinks = [
  ...baseNavLinks,
  { title: "Price Calculator", href: "/calculator" },
  { title: "AI Recommendations", href: "/recommendations" },
];

const buyerNavLinks = [...baseNavLinks];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push("/");
  };

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-primary",
        pathname === href ? "text-primary font-semibold" : "text-muted-foreground"
      )}
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
    </Link>
  );
  
  const getNavLinks = () => {
    switch (role) {
      case 'farmer':
        return farmerNavLinks;
      case 'buyer':
        return buyerNavLinks;
      case 'admin':
        return []; // Admin has dashboard only
      default:
        return baseNavLinks;
    }
  }

  const navLinks = getNavLinks();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-7 w-7 text-primary" />
          <span className="font-bold text-lg font-headline">AgriConnect</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>{link.title}</NavLink>
          ))}
          {user && (
            <NavLink href="/dashboard">Dashboard</NavLink>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-2">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Local Language</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User Profile</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
                 <Button variant="ghost" asChild>
                    <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
          )}

        </div>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="p-4">
              <Link href="/" className="flex items-center gap-2 mb-8" onClick={() => setIsMenuOpen(false)}>
                 <Leaf className="h-7 w-7 text-primary" />
                <span className="font-bold text-lg font-headline">AgriConnect</span>
              </Link>
              <nav className="flex flex-col gap-6 text-lg font-medium">
                {navLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>{link.title}</NavLink>
                ))}
                {user && (
                  <NavLink href="/dashboard">Dashboard</NavLink>
                )}
              </nav>
               <div className="mt-8 border-t pt-6 flex flex-col gap-4">
                 {user ? (
                    <Button onClick={handleLogout} variant="destructive">Logout</Button>
                 ) : (
                    <>
                    <Button asChild variant="outline">
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>Log In</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                    </Button>
                    </>
                 )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
