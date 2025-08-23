import { Leaf } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  { title: "Marketplace", href: "/marketplace" },
  { title: "Equipment", href: "/equipment" },
  { title: "Knowledge Hub", href: "/knowledge" },
  { title: "About Us", href: "#" },
  { title: "Contact", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border/40">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">AgriConnect</span>
            </Link>
            <p className="text-muted-foreground text-center md:text-left text-sm max-w-xs">
              Connecting farmers and buyers for a sustainable future.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="font-headline font-semibold mb-4">Platform</h3>
                <ul className="space-y-2">
                  {footerLinks.slice(0, 3).map((link) => (
                    <li key={link.title}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-headline font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                   {footerLinks.slice(3).map((link) => (
                    <li key={link.title}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-headline font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AgriConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
