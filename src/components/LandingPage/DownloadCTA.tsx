import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SiGoogleplay, SiAppstore } from "react-icons/si";

export default function DownloadCTA() {
  return (
    <section id="download" className="py-24 bg-primary text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Download PrayerTrack Today
          </h2>
          <p className="text-lg text-green-100 max-w-2xl mx-auto mb-12">
            Join thousands of Muslims in Hyderabad who use PrayerTrack to stay connected with their local mosques and maintain their daily prayers.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-green-50"
            >
              <SiGoogleplay className="mr-2 h-5 w-5" />
              Get on Play Store
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-green-50"
            >
              <SiAppstore className="mr-2 h-5 w-5" />
              Download on App Store
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
