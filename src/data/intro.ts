import {
  BookOpen,
  Users,
  Heart,
  GraduationCap,
  Landmark,
  Library,
  HandHeart,
  ScrollText,
  Star,
  Compass,
  Shield,
} from 'lucide-react'

export const content = {
  hero: {
    title: 'Jamiat Ahle Hadees Hyderabad & Secunderabad',
    subtitle: 'A branch of Markazi Jamiat Ahle Hadees Hind (INDIA)',
    description:
      "Dedicated to promoting the teachings of the Qur'an and Sunnah as understood by the Salaf us-Salaheen (the pious predecessors).",
    icon: BookOpen,
  },

  mission: {
    title: 'Our Mission',
    content:
      'With a vision to introduce this methodology to all of humanity, aiming for societal welfare and unity. Central to our ideology is the emphasis on Tawheed (the oneness of Allah) and adherence to authentic Sunnah traditions.',
    icon: Compass,
    points: [
      {
        text: "Reform the Ummah through Qur'an and Sunnah teachings",
        icon: ScrollText,
      },
      {
        text: 'Convey authentic teachings to every household',
        icon: Users,
      },
      {
        text: "Understand Qur'an and Hadith according to Sahaba's perspective",
        icon: BookOpen,
      },
      {
        text: 'Implement Islamic principles in personal and social life',
        icon: Heart,
      },
    ],
  },

  principles: {
    title: 'Core Principles',
    icon: Shield,
    items: [
      {
        title: 'Authentic Teaching',
        description:
          "Emphasis on understanding the Qur'an and Hadith according to the perspectives of the Sahaba",
        icon: Star,
      },
      {
        title: 'Divine Guidance',
        description:
          "Obeying Allah, His Messenger, and referring disputes to the Qur'an and Sunnah",
        icon: Compass,
      },
      {
        title: 'Pure Islam',
        description: 'Adherence to original teachings, free from innovations',
        icon: Heart,
      },
    ],
  },

  socialWelfare: {
    title: 'Social Welfare Initiatives',
    description: 'Active involvement in various community support programs',
    icon: HandHeart,
    programs: [
      {
        title: 'Baitul Maal',
        description:
          'Public fund supporting over 100 widows during social and natural crises',
        icon: Landmark,
      },
      {
        title: 'Education',
        description:
          "Training sessions for Madrasa students in Qur'anic memorization",
        icon: GraduationCap,
      },
      {
        title: 'Community Support',
        description:
          'Monthly pension distributions and Ramadan ration packages',
        icon: Users,
      },
      {
        title: 'Resources',
        description:
          'Library with rare books, Islamic center, and separate arrangements for ladies',
        icon: Library,
      },
    ],
  },
}
