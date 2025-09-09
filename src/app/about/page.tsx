import { Metadata } from 'next'
import Link from 'next/link'
import { Layout } from '@/components/layout'
import { typography, textSpacing, textColors } from '@/lib/typography'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our blog and our mission to share knowledge',
}

export default function About() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className={`${typography.h1} ${textSpacing.heading} ${textColors.heading}`}>
              About Us
            </h1>
            <p className={`${typography.bodyLarge} ${textColors.secondary} max-w-2xl mx-auto`}>
              We&apos;re passionate about sharing knowledge and helping developers grow in their careers through 
              high-quality content and expert insights.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-16">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className={`${typography.h2} ${textSpacing.subheading} ${textColors.heading}`}>Our Mission</h2>
              <p className={`${typography.body} ${textColors.body} leading-relaxed`}>
                We are passionate about sharing knowledge and helping developers grow in their careers. 
                Our blog focuses on providing high-quality content about web development, programming, 
                and technology trends.
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
                <h3 className={`${typography.h5} ${textSpacing.title} ${textColors.heading}`}>Frontend Development</h3>
                <p className={`${typography.body} ${textColors.secondary}`}>
                  Modern JavaScript frameworks, CSS techniques, responsive design, and user experience best practices.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">⚙️</span>
                </div>
                <h3 className={`${typography.h5} ${textSpacing.title} ${textColors.heading}`}>Backend Development</h3>
                <p className={`${typography.body} ${textColors.secondary}`}>
                  Server-side technologies, databases, APIs, cloud computing, and scalable architecture patterns.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">🚀</span>
                </div>
                <h3 className={`${typography.h5} ${textSpacing.title} ${textColors.heading}`}>Technology Trends</h3>
                <p className={`${typography.body} ${textColors.secondary}`}>
                  Emerging technologies, industry insights, career advice, and software development methodologies.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">✨</span>
                </div>
                <h3 className={`${typography.h5} ${textSpacing.title} ${textColors.heading}`}>CSS & Design</h3>
                <p className={`${typography.body} ${textColors.secondary}`}>
                  Modern CSS techniques, animations, design systems, and creating beautiful user interfaces.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Our Team</h2>
            <p className="text-gray-700 mb-6">
              Our content is created by experienced developers and industry professionals who are 
              passionate about sharing their knowledge.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg text-white">SC</span>
                </div>
                <h3 className="font-bold mb-1 text-gray-900">Sarah Chen</h3>
                <p className="text-sm text-gray-600">Frontend Specialist</p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg text-white">MR</span>
                </div>
                <h3 className="font-bold mb-1 text-gray-900">Michael Rodriguez</h3>
                <p className="text-sm text-gray-600">Backend Expert</p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg text-white">ET</span>
                </div>
                <h3 className="font-bold mb-1 text-gray-900">Emma Thompson</h3>
                <p className="text-sm text-gray-600">Tech Analyst</p>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg text-white">DP</span>
                </div>
                <h3 className="font-bold mb-1 text-gray-900">David Park</h3>
                <p className="text-sm text-gray-600">CSS Designer</p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Why We Started This Blog</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We believe that knowledge should be accessible to everyone. Our blog was created to 
                  bridge the gap between complex technical concepts and practical implementation.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Whether you&apos;re a beginner looking to learn the basics or an experienced developer 
                  seeking advanced techniques, we have content for you.
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
                    <span className="text-gray-700">Supporting the developer community</span>
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
                    <span className="text-gray-700">Fostering inclusive learning environments</span>
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