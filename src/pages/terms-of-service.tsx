import { Card, CardContent } from '@/components/ui/card'

export default function TermsOfService() {
  return (
    <div className='min-h-screen pt-8 pb-12 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <Card className='max-w-4xl mx-auto'>
          <CardContent className='p-8'>
            <h1 className='text-3xl font-bold mb-6'>Terms of Service</h1>
            <div className='prose max-w-none'>
              <p className='mb-4'>Last updated: February 8, 2025</p>

              <h2 className='text-xl font-semibold mt-8 mb-4'>
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using PrayerTrack, you agree to be bound by
                these Terms of Service.
              </p>

              <h2 className='text-xl font-semibold mt-8 mb-4'>
                2. Use of Service
              </h2>
              <p>
                You agree to use PrayerTrack only for lawful purposes and in
                accordance with these Terms.
              </p>

              <h2 className='text-xl font-semibold mt-8 mb-4'>
                3. User Accounts
              </h2>
              <ul className='list-disc pl-6 mb-4'>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account
                </li>
                <li>You must provide accurate and complete information</li>
                <li>You must not share your account credentials</li>
              </ul>

              <h2 className='text-xl font-semibold mt-8 mb-4'>4. Content</h2>
              <p>
                All content provided in PrayerTrack is for informational
                purposes only.
              </p>

              <h2 className='text-xl font-semibold mt-8 mb-4'>
                5. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. We will
                notify users of any changes.
              </p>

              <h2 className='text-xl font-semibold mt-8 mb-4'>6. Contact</h2>
              <p>For any questions about these Terms, please contact us at:</p>
              <p>Email: dev@ahlehadeeshyd.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
