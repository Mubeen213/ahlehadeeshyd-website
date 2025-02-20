import { Card, CardContent } from '@/components/ui/card'

export default function PrivacyPolicy() {
  return (
    <div className='min-h-screen pt-8 pb-12 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <Card className='max-w-4xl mx-auto'>
          <CardContent className='p-8'>
            <h1 className='text-3xl font-bold mb-6'>Privacy Policy</h1>
            <div className='prose max-w-none'>
              <p className='mb-4'>Last updated: February 8, 2025</p>

              <h2 className='text-xl font-semibold mt-8 mb-4'>
                1. Information We Collect
              </h2>
              <p>
                We collect information that you provide directly to us when
                using PrayerTrack:
              </p>
              <ul className='list-disc pl-6 mb-4'>
                <li>Account information (email, username)</li>
                <li>Location data (when using mosque finder feature)</li>
                <li>Prayer time preferences</li>
                <li>Favorite mosques</li>
              </ul>

              <h2 className='text-xl font-semibold mt-8 mb-4'>
                2. How We Use Your Information
              </h2>
              <p>We use the collected information to:</p>
              <ul className='list-disc pl-6 mb-4'>
                <li>Provide prayer times and mosque information</li>
                <li>Improve our services</li>
                <li>Send notifications about prayer times</li>
                <li>Maintain and optimize the application</li>
              </ul>

              <h2 className='text-xl font-semibold mt-8 mb-4'>
                3. Data Security
              </h2>
              <p>
                We implement appropriate security measures to protect your
                personal information.
              </p>

              <h2 className='text-xl font-semibold mt-8 mb-4'>4. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <p>Email: dev@ahlehadeeshyd.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
