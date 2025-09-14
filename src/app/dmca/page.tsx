import { Metadata } from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { Mail, AlertTriangle, FileText, Shield, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DMCA Policy - behindthebrain',
  description: 'Digital Millennium Copyright Act policy for behindthebrain. Learn how to report copyright infringement and submit DMCA takedown notices.',
};

const dmcaSections = [
  {
    title: 'Overview',
    icon: Shield,
    content: 'behindthebrain respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998, we will respond expeditiously to claims of copyright infringement committed using the behindthebrain website.',
    subContent: 'If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide our designated copyright agent with the following information:'
  },
  {
    title: 'What Happens Next',
    icon: CheckCircle,
    content: 'Upon receipt of a valid DMCA notice, we will:',
    listItems: [
      'Review the notice for completeness and compliance with DMCA requirements',
      'Remove or disable access to the allegedly infringing material',
      'Attempt to notify the user who posted the material',
      'Provide the user with an opportunity to submit a counter-notice'
    ],
    subContent: 'If the user submits a valid counter-notice, we may restore the removed material within 10-14 business days, unless we receive notice from the copyright owner that legal action has been initiated.'
  },
  {
    title: 'Repeat Infringer Policy',
    icon: AlertTriangle,
    content: 'We reserve the right to terminate the accounts of users who are determined to be repeat infringers of copyrighted material. We will consider the circumstances of each case when determining whether a user is a repeat infringer.'
  }
];

export default function DMCAPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-teal-600" />
          </div>
          <p className="font-semibold text-sm uppercase tracking-wider text-teal-600 mb-4">Legal Policy</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 leading-tight tracking-tight">
            DMCA Policy
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-stone-600">
            We respect intellectual property rights and comply with the Digital Millennium Copyright Act.
          </p>
        </section>

        {/* DMCA Notice Requirements Section with Blockquote */}
        <section className="mb-24">
          <blockquote className="relative w-full p-8 sm:p-12 bg-stone-100/80 rounded-2xl border border-stone-200/60">
            <FileText className="absolute top-6 left-6 w-8 h-8 text-teal-200" strokeWidth={1.5} />
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-6">DMCA Notice Requirements</h2>
            <div className="space-y-4 text-stone-700">
              <p className="text-lg">
                To submit a DMCA notice, please provide the following information in writing:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
                <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed</li>
                <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works are covered, a representative list of such works</li>
                <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled</li>
                <li>Information reasonably sufficient to permit us to locate the material</li>
                <li>Information reasonably sufficient to permit us to contact the complaining party, such as an address, telephone number, and, if available, an electronic mail address</li>
                <li>A statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law</li>
                <li>A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed</li>
              </ul>
            </div>
            <FileText className="absolute bottom-6 right-6 w-8 h-8 text-teal-200" strokeWidth={1.5} />
          </blockquote>
        </section>

        {/* Designated Copyright Agent Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-800">Designated Copyright Agent</h2>
          </div>
          <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200/60">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0 h-12 w-12 bg-teal-500 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">Contact Information</h3>
                <p className="text-stone-600 mb-4">
                  Please send DMCA notices to our designated copyright agent:
                </p>
                <div className="bg-white rounded-lg p-4 border border-stone-200">
                  <p className="font-medium text-stone-800">Email: blog.boopul@gmail.com</p>
                  <p className="text-sm text-stone-600 mt-1">Subject: DMCA Notice - Copyright Infringement</p>
                </div>
                <p className="text-stone-600 mt-4">
                  We will respond to your notice within 1-2 business days and take appropriate action as required by law.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DMCA Policy Sections */}
        <section className="mb-24">
          <div className="grid grid-cols-1 gap-10">
            {dmcaSections.map((section, index) => (
              <div key={section.title} className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-10 w-10 bg-teal-500 rounded-full flex items-center justify-center mt-1">
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">{section.title}</h3>
                  <p className="text-stone-600 mb-3">{section.content}</p>
                  {section.listItems && (
                    <ul className="list-disc list-inside space-y-1 ml-4 text-stone-600 mb-3">
                      {section.listItems.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.subContent && (
                    <p className="text-stone-600">{section.subContent}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer Section with Alert Styling */}
        <section className="mb-24">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 h-10 w-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Important Disclaimer</h3>
                <div className="space-y-3 text-stone-700">
                  <p>
                    <strong>Please note:</strong> The information provided in this DMCA policy is for informational purposes only 
                    and does not constitute legal advice. If you need legal advice regarding copyright matters, please consult 
                    with a qualified attorney.
                  </p>
                  <p>
                    Submitting a false DMCA notice may result in legal liability. Please ensure that your notice is accurate 
                    and that you have the legal authority to submit it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <div className="bg-teal-600 p-10 sm:p-12 rounded-2xl text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Questions About Copyright?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-teal-50">
              If you have questions about our DMCA policy or need assistance with a copyright claim, 
              please don&apos;t hesitate to reach out to our designated copyright agent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-stone-100 transition-colors">
                Contact Us
              </Link>
              <a href="mailto:blog.boopul@gmail.com" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-colors">
                Email Copyright Agent
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}