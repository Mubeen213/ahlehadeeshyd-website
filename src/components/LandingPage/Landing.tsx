import { content } from '@/data/intro'
import { motion } from 'framer-motion'

import bailUlMaalScanner from '../../assets/donation-qr-codes/bait-ul-maal-scanner.jpeg'
import jamiatScanner from '../../assets/donation-qr-codes/jamiat-scanner.jpg'

export default function Landing() {
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='py-20 bg-gradient-to-b from-green-50 to-white'>
        <div className='container mx-auto px-4 text-center'>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex justify-center mb-6'
          >
            <content.hero.icon className='h-16 w-16 text-primary/80' />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-4xl md:text-5xl font-bold mb-4 text-primary'
          >
            {content.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='text-xl text-muted-foreground mb-4'
          >
            {content.hero.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='max-w-2xl mx-auto text-lg'
          >
            {content.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-center mb-6'>
            <content.mission.icon className='h-12 w-12 text-primary/80' />
          </div>
          <h2 className='text-3xl font-bold text-center mb-8'>
            {content.mission.title}
          </h2>
          <p className='text-lg text-center mb-12 max-w-3xl mx-auto'>
            {content.mission.content}
          </p>
          <div className='grid md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
            {content.mission.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className='flex items-start gap-4 p-6 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors'
              >
                <point.icon className='h-6 w-6 text-primary/80 mt-1 flex-shrink-0' />
                <p>{point.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-center mb-6'>
            <content.principles.icon className='h-12 w-12 text-primary/80' />
          </div>
          <h2 className='text-3xl font-bold text-center mb-12'>
            {content.principles.title}
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {content.principles.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className='p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow'
              >
                <div className='flex items-center gap-3 mb-4'>
                  <item.icon className='h-6 w-6 text-primary/80' />
                  <h3 className='text-xl font-semibold text-primary'>
                    {item.title}
                  </h3>
                </div>
                <p className='text-muted-foreground'>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Welfare Section */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-center mb-6'>
            <content.socialWelfare.icon className='h-12 w-12 text-primary/80' />
          </div>
          <h2 className='text-3xl font-bold text-center mb-4'>
            {content.socialWelfare.title}
          </h2>
          <p className='text-lg text-center mb-12'>
            {content.socialWelfare.description}
          </p>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {content.socialWelfare.programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className='p-6 bg-green-50/50 rounded-lg hover:bg-green-50 transition-colors'
              >
                <div className='flex items-center gap-3 mb-3'>
                  <program.icon className='h-6 w-6 text-primary/80' />
                  <h3 className='text-xl font-semibold text-primary'>
                    {program.title}
                  </h3>
                </div>
                <p className='text-muted-foreground'>{program.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </section>
        {/* Donation section */}
     
{/* Donation section */}
<section className='py-16 bg-gray-50'>
  <div className='container mx-auto px-4'>
    <div className='flex justify-center mb-6'>
      <content.donation.icon className='h-12 w-12 text-primary/80' />
    </div>
    <h2 className='text-3xl font-bold text-center mb-4'>
      {content.donation.title}
    </h2>
    <p className='text-lg text-center mb-12'>
      {content.donation.description}
    </p>
    
    <div className='grid md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
    
    {/* Jamiat Account Details */}
    <div className='bg-white p-6 rounded-lg shadow'>
      <h3 className='text-2xl font-semibold text-primary mb-4 text-center'>Jamiat Account</h3>
      <div className='space-y-3 mb-6'>
        {(content.donation?.bankDetials?.[0]?.Jamiat ?? []).map((detail, index) => (
          <div key={index} className='flex justify-between'>
            <span className='font-medium'>{detail.title}:</span>
            <span className='text-muted-foreground'>{detail.value}</span>
          </div>
        ))}
      </div>
      <div className='flex flex-col items-center mt-6'>
        <p className='text-sm text-muted-foreground mb-3'>Scan to donate</p>
        <div className='p-3 bg-white border-2 border-green-100 rounded-lg shadow-sm'>
          <img 
            src={jamiatScanner} 
            alt="Jamiat QR Code" 
            className='w-74 h-74 object-contain' 
          />
        </div>
      </div>
    </div>
    
    {/* Bait Ul Maal Account Details */}
    <div className='bg-white p-6 rounded-lg shadow'>
      <h3 className='text-2xl font-semibold text-primary mb-4 text-center'>Jamiat Bait Ul Maal</h3>
      <div className='space-y-3 mb-6'>
        {(content.donation?.bankDetials?.[1].BaitUlMaal ?? []).map((detail, index) => (
          <div key={index} className='flex justify-between'>
            <span className='font-medium'>{detail.title}:</span>
            <span className='text-muted-foreground'>{detail.value}</span>
          </div>
        ))}
      </div>
      <div className='flex flex-col items-center mt-6'>
        <p className='text-sm text-muted-foreground mb-3'>Scan to donate</p>
        <div className='p-3 bg-white border-2 border-green-100 rounded-lg shadow-sm'>
          <img 
            src={bailUlMaalScanner} 
            alt="Bait Ul Maal QR Code" 
            className='w-74 h-74 object-contain' 
          />
        </div>
      </div>
    </div>
    </div>
  </div>
</section>
    </div>
  )
}
