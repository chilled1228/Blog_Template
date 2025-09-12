import { Metadata } from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { Mail, MessageSquare, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us - behindthebrain',
  description: 'Get in touch with the behindthebrain team for questions, feedback, collaboration opportunities, or technical support. We respond within 24-48 hours.',
};

export default function Contact() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <p className="font-semibold text-sm uppercase tracking-wider text-teal-600 mb-4">Get In Touch</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 leading-tight tracking-tight">
            Contact Us
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-stone-600">
            We&apos;d love to hear from you! Whether you have questions, feedback, or collaboration ideas, our door is always open.
          </p>
        </section>

        {/* Contact Form and Info Section */}
        <section className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-4">Contact Information</h2>
              <p className="text-stone-600">
                For any inquiries, please feel free to send us a message using the form. We typically respond within 24-48 hours.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-10 w-10 bg-teal-100/70 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900">General Inquiries</h3>
                  <p className="text-stone-600">For general questions and feedback.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-10 w-10 bg-teal-100/70 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900">Content Suggestions</h3>
                  <p className="text-stone-600">Have an idea for a new topic?</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-10 w-10 bg-teal-100/70 rounded-lg flex items-center justify-center">
                  <HelpCircle className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900">Technical Support</h3>
                  <p className="text-stone-600">Found a bug or need help with the site?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-stone-100/80 border border-stone-200/60 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-stone-800 mb-6 text-center">Send Us a Message</h2>
            <form className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="content">Content Suggestion</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="technical">Technical Issue</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Send Message
              </button>
            </form>
            <p className="mt-4 text-xs text-stone-500 text-center">
              By submitting, you agree to our{' '}
              <Link href="/privacy" className="text-teal-600 hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
