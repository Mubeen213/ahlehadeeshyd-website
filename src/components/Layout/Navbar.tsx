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
              <span className='text-sm sm:text-base md:text-xl font-bold text-primary hover:opacity-90 transition-opacity'>
                {/* Show shorter text on mobile */}
                <span className='block sm:hidden'>Jamiat Alhe Hadees</span>
                <span className='hidden sm:block'>
                  Jamiat Ahle Hadees Hyd & Sec
                </span>
              </span>
            </Link>
          </div>

          {/* Navigation Buttons */}
          <div className='flex items-center gap-3'>
            <Button variant='ghost' size='sm' className='rounded-full' asChild>
              <Link href='/application'>About App</Link>
            </Button>

            <Button size='sm' className='rounded-full shadow-sm' asChild>
              <a
                href='https://app.ahlehadeeshyd.com/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Login
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
