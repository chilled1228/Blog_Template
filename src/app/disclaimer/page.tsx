import { Metadata } from 'next'
import Link from 'next/link'
import { Layout } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Disclaimer - behindthebrain',
  description: 'Important disclaimer information for behindthebrain regarding content accuracy, affiliate links, and liability limitations.',
}

export default function Disclaimer() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <p className="font-semibold text-sm uppercase tracking-wider text-[var(--coral-pink)] mb-4">Important Notice</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--black-olive)] leading-tight tracking-tight mb-4">
            Disclaimer
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[var(--black-olive)]">
            Important information about the content, recommendations, and services provided on behindthebrain.
          </p>
          <div className="mt-6 inline-block bg-[var(--light-gray)] border border-[var(--stone-200)] px-6 py-3 rounded-full">
            <span className="text-sm font-medium text-[var(--black-olive)]">
              Effective Date: {new Date().toLocaleDateString()}
            </span>
          </div>
        </section>

          <div className="space-y-8">
            <section className="bg-red-50 border border-red-200 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">1. General Information</h2>
              <div className="bg-white border border-red-200 p-6 rounded-xl mb-6">
                <p className="text-red-800 font-medium mb-2">⚠️ Important Notice</p>
                <p className="text-red-700">
                  The information on this website is provided on an &quot;as is&quot; basis without any guarantees or warranties.
                </p>
              </div>
              <p className="mb-6 text-[var(--black-olive)] text-lg leading-relaxed">
                To the fullest extent permitted by law, this Company:
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-3"></div>
                  <span className="text-[var(--black-olive)]">Excludes all representations and warranties relating to this website and its contents</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-3"></div>
                  <span className="text-[var(--black-olive)]">Excludes all liability for damages arising out of or in connection with your use of this website</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-3"></div>
                  <span className="text-[var(--black-olive)]">Does not guarantee the accuracy, completeness, or timeliness of information</span>
                </div>
              </div>
            </section>

            <section className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">2. Professional Advice Disclaimer</h2>
              <p className="mb-6 text-[var(--black-olive)] text-lg leading-relaxed">
                The content on behindthebrain is for informational and educational purposes only and should 
                not be construed as professional advice. While we strive to provide accurate and up-to-date 
                information, we make no representations or warranties of any kind about:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-[var(--stone-200)]">
                  <p className="font-medium text-[var(--black-olive)]">Information Accuracy</p>
                  <p className="text-sm text-[var(--black-olive)] mt-1">Completeness, accuracy, reliability, or suitability</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[var(--stone-200)]">
                  <p className="font-medium text-[var(--black-olive)]">Service Availability</p>
                  <p className="text-sm text-[var(--black-olive)] mt-1">Tools, software, or services mentioned</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[var(--stone-200)]">
                  <p className="font-medium text-[var(--black-olive)]">Expected Results</p>
                  <p className="text-sm text-[var(--black-olive)] mt-1">Outcomes from following tutorials or advice</p>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
                <p className="text-yellow-800 font-semibold mb-2">⚠️ Important Reminder</p>
                <p className="text-yellow-700">
                  Always consult with qualified professionals before making important decisions 
                  based on information found on this website.
                </p>
              </div>
            </section>

            <section className="border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">3. Affiliate Links & Compensation</h2>
              <p className="mb-6 text-[var(--black-olive)] text-lg leading-relaxed">
                behindthebrain may contain affiliate links to products and services. This means we may 
                receive a commission if you click on these links and make a purchase, at no additional 
                cost to you.
              </p>
              <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-green-900 mb-4">Our Commitment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <p className="font-medium text-green-900">Quality First</p>
                    <p className="text-sm text-green-800 mt-1">We only recommend products and services we believe in</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <p className="font-medium text-green-900">Honest Opinions</p>
                    <p className="text-sm text-green-800 mt-1">Our opinions remain honest and unbiased</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <p className="font-medium text-green-900">Editorial Independence</p>
                    <p className="text-sm text-green-800 mt-1">Affiliate relationships do not influence our content</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <p className="font-medium text-green-900">Full Disclosure</p>
                    <p className="text-sm text-green-800 mt-1">We clearly disclose affiliate relationships when present</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">4. External Links</h2>
              <p className="mb-6 text-[var(--black-olive)] text-lg leading-relaxed">
                Our website contains links to external websites that are not provided or maintained by 
                us. We do not guarantee the accuracy, relevance, or completeness of information on 
                external sites.
              </p>
              <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                <p className="text-red-800 font-semibold mb-2">⚠️ Important Note</p>
                <p className="text-red-700">
                  We are not responsible for the content, privacy policies, or practices of external websites. Visit external links at your own risk.
                </p>
              </div>
            </section>

            <section className="border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">5. Software & Tools Disclaimer</h2>
              <p className="mb-6 text-[var(--black-olive)] text-lg leading-relaxed">
                Any software, tools, or code examples provided on this website are offered &quot;as is&quot; 
                without warranty of any kind. We disclaim all warranties, whether express or implied, including:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <p className="font-medium text-orange-900">No Merchantability</p>
                  <p className="text-sm text-orange-800 mt-1">Fitness for a particular purpose not guaranteed</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <p className="font-medium text-orange-900">Requirements Not Guaranteed</p>
                  <p className="text-sm text-orange-800 mt-1">Software may not meet your specific needs</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <p className="font-medium text-orange-900">No Service Guarantee</p>
                  <p className="text-sm text-orange-800 mt-1">Operation may be interrupted or contain errors</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <p className="font-medium text-orange-900">No Bug Fixes</p>
                  <p className="text-sm text-orange-800 mt-1">Defects may not be corrected</p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
                <p className="text-blue-800 font-semibold mb-2">💡 Recommendation</p>
                <p className="text-blue-700">
                  Always test code and tools in a safe environment before using them in production.
                </p>
              </div>
            </section>

            <section className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">6. Changes to Content</h2>
              <p className="text-[var(--black-olive)] text-lg leading-relaxed">
                Technology evolves rapidly. Information, tutorials, and recommendations on this website 
                may become outdated. We reserve the right to modify, update, or remove content without notice.
              </p>
            </section>

            <section className="border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">7. Limitation of Liability</h2>
              <p className="mb-6 text-[var(--black-olive)] text-lg leading-relaxed">
                Under no circumstances shall behindthebrain, its authors, or contributors be liable for any 
                direct, indirect, incidental, consequential, or punitive damages arising from:
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-3"></div>
                  <span className="text-[var(--black-olive)]">Your use of this website or its content</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-3"></div>
                  <span className="text-[var(--black-olive)]">Any errors or omissions in the content</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-3"></div>                  <span className="text-[var(--black-olive)]">Any unauthorized access to or use of our servers</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-3"></div>
                  <span className="text-[var(--black-olive)]">Any interruption or cessation of transmission to or from our website</span>
                </div>
              </div>
            </section>

            <section className="bg-[var(--verdigris)]/10 border border-[var(--verdigris)]/20 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">8. Contact Information</h2>
              <p className="text-[var(--black-olive)] text-lg leading-relaxed mb-6">
                If you have questions about this disclaimer or any content on our website, please 
                <Link href="/contact" className="text-[var(--verdigris)] hover:underline font-semibold"> contact us</Link>. 
                We&apos;re here to help clarify any concerns you may have.
              </p>
              <div className="bg-white border border-[var(--verdigris)]/20 p-6 rounded-xl">
                <p className="text-[var(--black-olive)]">
                  <span className="font-semibold text-[var(--verdigris)]">Questions?</span> Our support team is available to help you understand any aspect of this disclaimer or website content.
                </p>
              </div>
            </section>
          </div>
      </div>
    </Layout>
  )
}