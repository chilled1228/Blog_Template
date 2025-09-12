import { Metadata } from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { CheckCircle, Quote } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - behindthebrain',
  description: 'Learn about behindthebrain, our mission to empower personal growth, our expert team of life coaches and wellness experts, and our commitment to transformation.',
};

const values = [
  { title: 'Empowerment', description: 'Providing accurate, up-to-date information to empower your growth.' },
  { title: 'Actionable Content', description: 'Creating practical, actionable content that you can apply to your life.' },
  { title: 'Community Support', description: 'Fostering a supportive community for personal growth enthusiasts.' },
  { title: 'High Standards', description: 'Maintaining the highest editorial standards for quality and integrity.' },
];

export default function About() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <p className="font-semibold text-sm uppercase tracking-wider text-teal-600 mb-4">Our Story</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 leading-tight tracking-tight">
            About behindthebrain
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-stone-600">
            We&apos;re passionate about empowering personal growth and helping individuals transform their lives through 
            self-help strategies, mindfulness practices, and practical life guidance.
          </p>
        </section>

        {/* Mission Section with Blockquote */}
        <section className="mb-24 flex justify-center">
          <blockquote className="relative w-full text-center p-8 sm:p-12 bg-stone-100/80 rounded-2xl border border-stone-200/60">
            <Quote className="absolute top-6 left-6 w-8 h-8 text-teal-200" strokeWidth={1.5} />
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-4">Our Mission</h2>
            <p className="text-lg sm:text-xl text-stone-700 leading-relaxed italic">
              To empower individuals worldwide with comprehensive resources, guidance, and insights for personal growth, 
              self-help, mindfulness, and life transformation.
            </p>
            <Quote className="absolute bottom-6 right-6 w-8 h-8 text-teal-200" strokeWidth={1.5} />
          </blockquote>
        </section>

        {/* Values Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-800">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            {values.map((value) => (
              <div key={value.title} className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-10 w-10 bg-teal-500 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900">{value.title}</h3>
                  <p className="text-stone-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <div className="bg-teal-600 p-10 sm:p-12 rounded-2xl text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="max-w-2xl mx-auto mb-8 text-teal-50">
              We love hearing from our readers! Whether you have questions, suggestions, or would 
              like to contribute content, we encourage you to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-stone-100 transition-colors">
                Contact Us
              </Link>
              <Link href="/" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-colors">
                Read Our Blog
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
