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
            <div className="relative mx-auto w-full max-w-[300px] aspect-[9/19.5] bg-white rounded-[3rem] border-8 border-gray-900 p-2">
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
                <div className="h-full overflow-y-auto">
                  {/* Today Section */}
                  <div className="bg-[#FEF7E7] p-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span>Today</span>
                    </div>
                    <h2 className="text-lg font-semibold">Sha'ban 9, 1446 AH</h2>
                    <p className="text-sm text-gray-600">February 8, 2025</p>
                  </div>

                  {/* Ramadan Countdown */}
                  <div className="bg-[#F4EEFF] p-4">
                    <div className="flex items-center gap-2 text-purple-600">
                      <span className="font-semibold">Ramadan</span>
                    </div>
                    <p className="text-lg text-purple-600">21 days until Ramadan</p>
                  </div>

                  {/* Daily Verse */}
                  <div className="p-4 bg-white">
                    <p className="text-right mb-4 text-lg leading-relaxed" style={{ fontFamily: 'Traditional Arabic, serif' }}>
                      رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي * وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي * يَفْقَهُوا قَوْلِي
                    </p>
                    <div className="flex gap-2 mb-4">
                      <Button size="sm" variant="outline" className="bg-green-50">English</Button>
                      <Button size="sm" variant="outline">Urdu</Button>
                      <Button size="sm" variant="outline">Roman</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}