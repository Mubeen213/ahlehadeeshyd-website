import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function DailyVerse() {
  return (
    <section id="duas" className="py-24 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white">
              <CardContent className="p-8">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-6" />
                <div className="mb-6">
                  <p className="text-2xl mb-4 leading-relaxed text-right font-arabic">
                    رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي * وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي * يَفْقَهُوا قَوْلِي
                  </p>
                  <p className="text-lg text-gray-600 mb-4">
                    "My Lord, expand my breast for me, ease my task for me, and remove the impediment from my tongue so people may understand my speech."
                  </p>
                  <p className="text-sm text-gray-500">Quran 20:25-28</p>
                </div>
                <Button variant="outline">
                  Explore More Duas
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
