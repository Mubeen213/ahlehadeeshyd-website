import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className='min-h-[90vh] pt-4 flex items-center bg-gradient-to-b from-green-50 to-white'>
      <div className='container mx-auto px-4'>
        <div className='grid lg:grid-cols-2 gap-12 text-center items-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='space-y-8 max-w-2xl mx-auto lg:mx-0'
          >
            {/* Main Heading */}
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
              <span className='bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent'>
                Connect with Mosques
              </span>
            </h1>

            {/* Description */}
            <p className='text-base sm:text-lg text-muted-foreground leading-relaxed'>
              Join thousands of Muslims in Hyderabad who use PrayerTrack to:
            </p>
            <ul className='space-y-3 flex flex-col items-center text-muted-foreground'>
              <li className='flex items-center gap-2'>
                <span className='text-primary'>✓</span>
                Find nearest mosques and prayer times
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-primary'>✓</span>
                Stay updated with local Islamic events
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-primary'>✓</span>
                Keep track of your favorite mosques
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-primary'>✓</span>
                Access daily verses and duas
              </li>
            </ul>
            {/* CTA Buttons */}
            <div className='flex flex-col  sm:flex-row gap-4 pt-6'>
              <Button
                size='lg'
                className='text-base px-8 py-6 rounded-full hover:scale-105 transition-transform shadow-lg'
                asChild
              >
                <a
                  href='https://app.ahlehadeeshyd.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Get Started Now
                  <ArrowRight className='ml-2 h-5 w-5' />
                </a>
              </Button>

              <Button
                size='lg'
                variant='outline'
                className='text-base px-8 py-6 rounded-full hover:bg-primary/5'
                onClick={() =>
                  document
                    .getElementById('features')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                See How It Works
                <ChevronDown className='ml-2 h-5 w-5' />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='relative'
          >
            <div className='relative mx-auto w-full max-w-[300px] aspect-[9/19.5] bg-white rounded-[3rem] border-8 border-gray-900 p-2'>
              <div className='absolute inset-0 rounded-[2.5rem] overflow-hidden'>
                <div className='h-full overflow-y-auto'>
                  {/* Today Section */}
                  <div className='bg-[#FEF7E7] p-4'>
                    <div className='flex items-center gap-2 text-gray-700'>
                      <span>Today</span>
                    </div>
                    <h2 className='text-lg font-semibold'>
                      Sha'ban 9, 1446 AH
                    </h2>
                    <p className='text-sm text-gray-600'>February 8, 2025</p>
                  </div>

                  {/* Daily Verse */}
                  <div className='p-4 bg-white'>
                    <p
                      className='text-right mb-4 text-lg leading-relaxed'
                      style={{ fontFamily: 'Traditional Arabic, serif' }}
                    >
                      رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي *
                      وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي * يَفْقَهُوا قَوْلِي
                    </p>
                    <div className='flex gap-2 mb-4'>
                      <Button
                        size='sm'
                        variant='outline'
                        className='bg-green-50'
                      >
                        English
                      </Button>
                      <Button size='sm' variant='outline'>
                        Urdu
                      </Button>
                      <Button size='sm' variant='outline'>
                        Roman
                      </Button>
                    </div>
                  </div>

                  {/* Feature Cards */}
                  <div className='grid grid-cols-2 gap-4 p-4'>
                    <div className='bg-green-50 p-4 rounded-lg text-center'>
                      <div className='bg-green-100 rounded-lg p-3 mb-2'>
                        <span className='text-2xl'>📍</span>
                      </div>
                      <p className='text-sm font-medium'>Mosques</p>
                      <p className='text-xs text-gray-600'>
                        Find and track local mosques
                      </p>
                    </div>
                    <div className='bg-purple-50 p-4 rounded-lg text-center'>
                      <div className='bg-purple-100 rounded-lg p-3 mb-2'>
                        <span className='text-2xl'>📖</span>
                      </div>
                      <p className='text-sm font-medium'>Duas</p>
                      <p className='text-xs text-gray-600'>
                        Learn & Memorize Quranic Duas
                      </p>
                    </div>
                    <div className='bg-blue-50 p-4 rounded-lg text-center'>
                      <div className='bg-blue-100 rounded-lg p-3 mb-2'>
                        <span className='text-2xl'>📅</span>
                      </div>
                      <p className='text-sm font-medium'>Events</p>
                      <p className='text-xs text-gray-600'>
                        Discover Islamic programs
                      </p>
                    </div>
                    <div className='bg-pink-50 p-4 rounded-lg text-center'>
                      <div className='bg-pink-100 rounded-lg p-3 mb-2'>
                        <span className='text-2xl'>⭐</span>
                      </div>
                      <p className='text-sm font-medium'>Favorites</p>
                      <p className='text-xs text-gray-600'>
                        Your saved mosques
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
