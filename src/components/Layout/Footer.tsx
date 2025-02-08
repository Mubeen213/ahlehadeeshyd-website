import { MapPin, Mail, Youtube } from 'lucide-react'
import { Link } from 'wouter'

export default function Footer() {
  return (
    <footer className='bg-gradient-to-b from-[#004d40] to-[#00695c] text-gray-100 py-12'>
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-3 gap-8 mb-8'>
          {/* Get In Touch */}
          <div>
            <h3 className='font-semibold text-white mb-4'>Get In Touch</h3>
            <div className='space-y-3'>
              <div className='flex items-start gap-3'>
                <MapPin className='h-5 w-5 text-green-500 mt-1' />
                <span>Langer House, Hyderabad</span>
              </div>
              <div className='flex items-center gap-3'>
                <Mail className='h-5 w-5 text-green-500' />
                <a
                  href='mailto:info@ahlehadeeshyd.org'
                  className='hover:text-white'
                >
                  info@ahlehadeeshyd.org
                </a>
              </div>
            </div>
          </div>

          {/* Quick Menu */}
          <div>
            <h3 className='font-semibold text-white mb-4'>Quick Menu</h3>
            <ul className='space-y-2'>
              <li>
                <a
                  href='/privacy-policy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-white flex items-center gap-2'
                >
                  <span className='text-green-500'>›</span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href='/terms-of-service'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-white flex items-center gap-2'
                >
                  <span className='text-green-500'>›</span>
                  Terms Of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h3 className='font-semibold text-white mb-4'>Follow us</h3>
            <a
              href='https://youtube.com'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 hover:text-white'
            >
              <Youtube className='h-5 w-5 text-green-500' />
              Youtube
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className='text-center pt-8 border-t border-gray-800'>
          <p className='text-sm'>© 2025 All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
