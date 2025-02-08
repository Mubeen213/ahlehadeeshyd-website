import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <span className="font-bold text-xl text-primary cursor-pointer">PrayerTrack</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="#features">
            <Button variant="ghost" className="cursor-pointer">Features</Button>
          </Link>
          <Link href="#mosques">
            <Button variant="ghost" className="cursor-pointer">Mosques</Button>
          </Link>
          <Link href="#duas">
            <Button variant="ghost" className="cursor-pointer">Duas</Button>
          </Link>
          <a href="https://app.ahlehadeeshyd.com/" target="_blank" rel="noopener noreferrer">
            <Button variant="default" className="cursor-pointer">Login to App</Button>
          </a>
        </div>
      </div>
    </nav>
  );
}