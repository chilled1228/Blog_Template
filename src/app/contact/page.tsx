import { Metadata } from 'next'
import Link from 'next/link'
import { Layout } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Contact Us - behindyourbrain Blog',
  description: 'Get in touch with the behindyourbrain Blog team for questions, feedback, collaboration opportunities, or technical support. We respond within 24-48 hours.',
}

export default function Contact() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;d love to hear from you! Get in touch for questions, feedback, or collaboration opportunities.
            </p>
          </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Get In Touch</h2>
          <p className="text-gray-700 mb-6">
            We&apos;d love to hear from you! Whether you have questions about our content, 
            suggestions for new topics, or would like to collaborate with us, don&apos;t 
            hesitate to reach out.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-900">General Inquiries</h3>
                <p className="text-gray-600">For general questions and feedback</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-900">Content Suggestions</h3>
                <p className="text-gray-600">Have an idea for a tutorial or topic?</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-900">Collaboration</h3>
                <p className="text-gray-600">Interested in writing for us?</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-900">Technical Issues</h3>
                <p className="text-gray-600">Found a bug or having trouble with the site?</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Response Time</h3>
            <p className="text-gray-700">
              We typically respond to all inquiries within 24-48 hours. For urgent matters, 
              please mention &ldquo;URGENT&rdquo; in your subject line.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6 text-center text-gray-900">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="content">Content Suggestion</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="technical">Technical Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Please provide as much detail as possible..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                Send Message
              </button>
            </form>

            <div className="mt-4 text-sm text-gray-600">
              <p>
                * Required fields. By submitting this form, you agree to our{' '}
                <Link href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900">Can I guest post on your blog?</h3>
            <p className="text-gray-700">
              Yes! We welcome guest contributors. Please reach out with your topic ideas and 
              writing samples.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">How often do you publish new content?</h3>
            <p className="text-gray-700">
              We typically publish 2-3 new articles per week, covering various aspects of 
              web development and technology.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Do you offer consulting services?</h3>
            <p className="text-gray-700">
              While our primary focus is on content creation, some of our team members may 
              be available for consulting. Please contact us to discuss your needs.
            </p>
          </div>
        </div>
        </div>
        </div>
      </div>
    </Layout>
  )
}