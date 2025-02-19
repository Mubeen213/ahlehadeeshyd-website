import { motion } from 'framer-motion'
import { Search, MapPin, Bookmark } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const sampleMosques = [
  {
    name: 'Masjid E Osman Zun Noorain Ahle Hadees',
    address: 'Rajan Colony, Tad Bun, Hyderabad, Telangana 500064, India',
    nextPrayer: 'Maghrib',
    prayerTime: 'X:XX PM',
  },
  {
    name: 'Jame Masjid Ahle Hadees Fateh Darwaza',
    address:
      'Fateh Darwaza Rd, Himmathpura, Shah Gunj, Hyderabad, Telangana 500065, India',
    nextPrayer: 'Isha',
    prayerTime: 'X:XX PM',
  },
]

export default function MosqueFinder() {
  return (
    <section id='mosques' className='py-24 bg-green-50'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-center mb-12'
          >
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Find Mosques Near You
            </h2>
            <p className='text-lg text-gray-600 mb-8'>
              Preview our mosque search functionality. The full feature is
              available in the web application at{' '}
              <a
                href='https://app.ahlehadeeshyd.com'
                className='text-primary hover:underline'
                target='_blank'
                rel='noopener noreferrer'
              >
                app.ahlehadeeshyd.com
              </a>
            </p>

            <Card className='bg-white shadow-md'>
              <CardContent className='p-6'>
                <div className='flex gap-4 mb-4'>
                  <div className='relative flex-1'>
                    <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                    <Input
                      placeholder='Search mosques by name or place'
                      className='pl-10'
                      disabled
                    />
                  </div>
                  <a
                    href='https://app.ahlehadeeshyd.com'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Button className='bg-green-100 text-primary hover:bg-green-200'>
                      <MapPin className='h-4 w-4 mr-2' />
                      Open Web App
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className='space-y-4'>
            {sampleMosques.map((mosque, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className='bg-white'>
                  <CardContent className='p-6'>
                    <div className='flex justify-between items-start mb-4'>
                      <div>
                        <h3 className='text-xl font-semibold mb-2'>
                          {mosque.name}
                        </h3>
                        <p className='text-gray-600 text-sm flex items-center'>
                          <MapPin className='h-4 w-4 mr-2 text-gray-400' />
                          {mosque.address}
                        </p>
                      </div>
                      <Button variant='ghost' size='icon' disabled>
                        <Bookmark className='h-5 w-5' />
                      </Button>
                    </div>
                    <div className='bg-green-50 p-4 rounded-lg mb-4'>
                      <p className='text-sm text-gray-600'>
                        Next Prayer: {mosque.nextPrayer} at {mosque.prayerTime}
                      </p>
                    </div>
                    <div className='flex justify-between items-center'>
                      <a
                        href='https://app.ahlehadeeshyd.com'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Button variant='outline'>Open in Web App</Button>
                      </a>
                      <Button variant='ghost' size='icon' disabled>
                        <MapPin className='h-5 w-5' />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
