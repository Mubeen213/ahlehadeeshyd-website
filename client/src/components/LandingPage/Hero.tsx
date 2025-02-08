import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Track Prayer Times & Find Mosques in Hyderabad
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              PrayerTrack helps you find nearby mosques, track prayer times, and stay connected with your local Islamic community through our web platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://app.ahlehadeeshyd.com/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="text-lg">
                  Access Web App
                </Button>
              </a>
              <Button size="lg" variant="outline" className="text-lg" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-[600px] aspect-video rounded-lg border border-gray-200 shadow-xl overflow-hidden">
              <img
                src="https://placehold.co/1200x800/f0fdf4/1a7f37?text=Web+Interface+Preview"
                alt="PrayerTrack Web Interface"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}