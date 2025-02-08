import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DailyVerse() {
  return (
    <section id="duas" className="py-24 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white">
              <CardContent className="p-8">
                <div className="mb-8">
                  <p className="text-2xl leading-relaxed text-right font-arabic mb-6">
                    رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي * وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي * يَفْقَهُوا قَوْلِي
                  </p>
                  <p className="text-lg text-gray-600 mb-4">
                    "My Lord, expand my breast for me, ease my task for me, and remove the impediment from my tongue so people may understand my speech."
                  </p>
                  <p className="text-sm text-gray-500">Quran 20:25-28</p>
                </div>
                <div className="flex gap-2 mb-6">
                  <Button variant="outline" size="sm" className="bg-green-50">
                    English
                  </Button>
                  <Button variant="outline" size="sm">
                    Urdu
                  </Button>
                  <Button variant="outline" size="sm">
                    Roman
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}