import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const authors = [
  {
    name: 'Muhammad Muhsin Khan, Muhammad Taqi-ud-Din al-Hilali, ',
    translation: 'English Translation',
    btnText: 'Read in English',
  },
  {
    name: 'Muhammad Junagarhi',
    translation: 'Urdu Translation',
    btnText: 'اردو میں پڑھیں',
  },
]
export default function QuranFeature() {
  return (
    <section id='quran' className='py-24 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl font-bold mb-6'>Complete Quran</h2>
            <p className='text-lg text-muted-foreground mb-8'>
              Access the complete Quran with verified translations in English
              and Urdu
            </p>

            <div className='grid md:grid-cols-2 gap-6 mb-12'>
              {authors.map((author, index) => (
                <Card key={index} className='flex flex-col h-full'>
                  <CardContent className='p-6 flex flex-col h-full'>
                    <div className='flex-grow'>
                      <h3 className='text-xl font-semibold mb-3'>
                        {author.translation}
                      </h3>
                      <p className='mb-4'>By {author.name}</p>
                    </div>
                    <Button className='w-full mt-auto'>{author.btnText}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className='text-sm text-muted-foreground'>
              Quran sourced from {''}
              <a
                href='https://tanzil.net'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary hover:underline'
              >
                Tanzil.net
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
