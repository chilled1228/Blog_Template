import { Metadata } from 'next'
import Link from 'next/link'
import { Layout } from '@/components/layout'
import { typography, textSpacing, textColors } from '@/lib/typography'

export const metadata: Metadata = {
  title: 'About Us - behindthebrain',
  description: 'Learn about behindthebrain, our mission to empower personal growth, our expert team of life coaches and wellness experts, and our commitment to transformation.',
}

export default function About() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className={`${typography.h1} ${textSpacing.heading} ${textColors.heading}`}>
              About behindthebrain
            </h1>
            <p className={`${typography.bodyLarge} ${textColors.secondary} max-w-2xl mx-auto`}>
              We&apos;re passionate about empowering personal growth and helping individuals transform their lives through 
              self-help strategies, mindfulness practices, and practical life guidance.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-16">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className={`${typography.h2} ${textSpacing.subheading} ${textColors.heading}`}>Our Mission</h2>
              <p className={`${typography.body} ${textColors.body} leading-relaxed`}>
                behindthebrain is dedicated to empowering individuals worldwide with comprehensive 
                resources, guidance, and insights about personal growth, self-help strategies, mindfulness practices, 
                and life transformation. We believe in making personal development accessible to everyone, from 
                those just starting their journey to experienced practitioners looking to deepen their growth.
              </p>
            </div>
          </section>

          {/* What We Cover */}
          <section className="mb-16">
            <h2 className={`${typography.h2} ${textSpacing.subheading} ${textColors.heading}`}>What We Cover</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">🎨</span>
                </div>
                <h3 className={`${typography.h5} ${textSpacing.title} ${textColors.heading}`}>Personal Growth</h3>
                <p className={`${typography.body} ${textColors.secondary}`}>
                  Self-improvement strategies, goal setting, habit formation, and mindset development for lasting change.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">⚙️</span>
                </div>
                <h3 className={`${typography.h5} ${textSpacing.title} ${textColors.heading}`}>Mindfulness & Wellness</h3>
                <p className={`${typography.body} ${textColors.secondary}`}>
                  Meditation techniques, stress management, emotional wellbeing, and mental health awareness practices.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">🚀</span>
                </div>
                <h3 className={`${typography.h5} ${textSpacing.title} ${textColors.heading}`}>Life Transformation</h3>
                <p className={`${typography.body} ${textColors.secondary}`}>
                  Life coaching insights, personal development strategies, and practical guidance for meaningful change.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">✨</span>
                </div>
                <h3 className={`${typography.h5} ${textSpacing.title} ${textColors.heading}`}>Productivity & Motivation</h3>
                <p className={`${typography.body} ${textColors.secondary}`}>
                  Time management, productivity systems, motivation techniques, and achieving work-life balance.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Our Team</h2>
            <p className="text-gray-700 mb-6">
              Our content is created by experienced life coaches, wellness experts, and personal development professionals who are 
              passionate about empowering others on their growth journey.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg text-white">SC</span>
                </div>
                <h3 className="font-bold mb-1 text-gray-900">Sarah Chen</h3>
                <p className="text-sm text-gray-600">Life Coach & Mindfulness Expert</p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg text-white">MR</span>
                </div>
                <h3 className="font-bold mb-1 text-gray-900">Michael Rodriguez</h3>
                <p className="text-sm text-gray-600">Wellness & Transformation Coach</p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg text-white">ET</span>
                </div>
                <h3 className="font-bold mb-1 text-gray-900">Emma Thompson</h3>
                <p className="text-sm text-gray-600">Personal Growth Specialist</p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg text-white">DP</span>
                </div>
                <h3 className="font-bold mb-1 text-gray-900">David Park</h3>
                <p className="text-sm text-gray-600">Productivity & Motivation Expert</p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Why We Started This Blog</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We believe that personal growth should be accessible to everyone. Our blog was created to 
                  bridge the gap between self-help theory and practical life transformation.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Whether you&apos;re just beginning your personal development journey or are an experienced 
                  seeker looking for deeper insights, we have content for you.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Our Commitment</h2>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Providing accurate, up-to-date information</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Creating practical, actionable content</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Supporting the personal growth community</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Maintaining high editorial standards</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Fostering supportive transformation environments</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section>
            <div className="bg-blue-500 p-8 rounded-lg text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
              <p className="mb-6">
                We love hearing from our readers! Whether you have questions, suggestions, or would 
                like to contribute content, we encourage you to reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Contact Us
                </Link>
                <Link href="/blog" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-500 transition-colors">
                  Read Our Blog
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}