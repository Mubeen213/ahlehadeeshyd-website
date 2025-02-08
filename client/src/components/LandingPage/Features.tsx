import { motion } from "framer-motion";
import { Building2, Calendar, MapPin, Star, Book, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <Building2 className="h-8 w-8" />,
    title: "Mosque Tracking",
    description: "Keep track of mosques in Hyderabad with accurate prayer timings"
  },
  {
    icon: <Calendar className="h-8 w-8" />,
    title: "Events",
    description: "Stay updated with Islamic events and programs at local mosques"
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: "Mosque Finder",
    description: "Easily find mosques near you with our location-based search"
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "Favorites",
    description: "Save your favorite mosques for quick access"
  },
  {
    icon: <Book className="h-8 w-8" />,
    title: "Daily Verses",
    description: "Read and reflect on daily Quranic verses"
  },
  {
    icon: <Bell className="h-8 w-8" />,
    title: "Prayer Reminders",
    description: "Get notified for prayer times and jamaat timings"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Stay Connected
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            PrayerTrack offers a comprehensive set of features to help you maintain your daily prayers and stay connected with your local mosques.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}