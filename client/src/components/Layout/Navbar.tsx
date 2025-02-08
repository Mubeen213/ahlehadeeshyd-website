import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <span className="font-bold text-xl text-primary">PrayerTrack</span>
          </a>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="#features">Features</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#mosques">Mosques</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#duas">Duas</Link>
          </Button>
          <Button variant="default" asChild>
            <a href="#download">Download App</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
