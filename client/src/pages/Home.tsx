import Hero from "@/components/LandingPage/Hero";
import Features from "@/components/LandingPage/Features";
import MosqueFinder from "@/components/LandingPage/MosqueFinder";
import PrayerTimes from "@/components/LandingPage/PrayerTimes";
import DailyVerse from "@/components/LandingPage/DailyVerse";

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />
      <Features />
      <MosqueFinder />
      <PrayerTimes />
      <DailyVerse />
    </main>
  );
}