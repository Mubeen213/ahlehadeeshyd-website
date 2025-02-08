import { Button } from '@/components/ui/button'
import { Link } from 'wouter'
const Navbar = () => {
  return (
    <nav className='bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo/Brand */}
          <div className='flex-shrink-0'>
            <Link href='/'>
              <span className='text-xl font-bold text-primary hover:opacity-90 transition-opacity'>
                PrayerTrack
              </span>
            </Link>
          </div>

          {/* Login Button */}
          <Button size='sm' className='rounded-full shadow-sm' asChild>
            <a
              href='https://app.ahlehadeeshyd.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Login to App
            </a>
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
