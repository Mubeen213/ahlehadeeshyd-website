import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MosqueFinder() {
  return (
    <section id="mosques" className="py-24 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Find Mosques Near You
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Easily search for mosques in Hyderabad by name or location. Get accurate prayer times and stay updated with mosque events.
            </p>
            
            <Card className="p-6 max-w-md">
              <div className="flex gap-4 mb-4">
                <Input
                  placeholder="Search mosques by name or area..."
                  className="flex-1"
                />
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              <Button variant="outline" className="w-full">
                Find Mosques Near Me
              </Button>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://placehold.co/600x400/f0fdf4/1a7f37?text=Mosque+Finder+Preview"
              alt="Mosque Finder"
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
