import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Sunset } from "lucide-react";

const prayers = [
  { name: "Fajr", time: "5:30 AM", icon: Sun },
  { name: "Dhuhr", time: "1:15 PM", icon: Sun },
  { name: "Asr", time: "4:45 PM", icon: Sun },
  { name: "Maghrib", time: "6:14 PM", icon: Sunset },
  { name: "Isha", time: "7:30 PM", icon: Sunset }
];

export default function PrayerTimes() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Track Prayer Times
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay on time with accurate prayer timings for both Adhan and Jamaat from your local mosques.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-green-50">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-5 gap-4">
                {prayers.map((prayer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-4 bg-white rounded-lg shadow-sm"
                  >
                    <prayer.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold mb-1">{prayer.name}</h3>
                    <p className="text-gray-600">{prayer.time}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
