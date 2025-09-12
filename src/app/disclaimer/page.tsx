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
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Disclaimer</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Important information about the content, recommendations, and services provided on behindthebrain.
            </p>
            <div className="mt-4 inline-block bg-gray-100 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                Effective Date: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="space-y-8">
            <section className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">1. General Information</h2>
              <p className="mb-4 text-gray-700">
                The information on this website is provided on an &quot;as is&quot; basis. To the fullest extent 
                permitted by law, this Company:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Excludes all representations and warranties relating to this website and its contents</li>
                <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
                <li>Does not guarantee the accuracy, completeness, or timeliness of information</li>
              </ul>
            </section>

            <section className="bg-white border border-gray-200 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">2. Professional Advice Disclaimer</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  The content on behindthebrain is for informational and educational purposes only and should 
                  not be construed as professional advice. While we strive to provide accurate and up-to-date 
                  information, we make no representations or warranties of any kind about:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>The completeness, accuracy, reliability, or suitability of the information</li>
                  <li>The availability or functionality of tools, software, or services mentioned</li>
                  <li>The results you may achieve by following our tutorials or advice</li>
                </ul>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">
                    ⚠️ Always consult with qualified professionals before making important decisions 
                    based on information found on this website.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">3. Affiliate Links & Compensation</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  behindthebrain may contain affiliate links to products and services. This means we may 
                  receive a commission if you click on these links and make a purchase, at no additional 
                  cost to you.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Our Commitment</h3>
                  <ul className="text-sm space-y-1">
                    <li>• We only recommend products and services we believe in</li>
                    <li>• Our opinions remain honest and unbiased</li>
                    <li>• Affiliate relationships do not influence our editorial content</li>
                    <li>• We clearly disclose affiliate relationships when present</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white border border-gray-200 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">4. External Links</h2>
              <p className="mb-4 text-gray-700">
                Our website contains links to external websites that are not provided or maintained by 
                us. We do not guarantee the accuracy, relevance, or completeness of information on 
                external sites.
              </p>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <p className="text-sm text-red-800">
                  <span className="font-semibold">Note:</span> We are not responsible for the content, 
                  privacy policies, or practices of external websites. Visit external links at your own risk.
                </p>
              </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">5. Software & Tools Disclaimer</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Any software, tools, or code examples provided on this website are offered &quot;as is&quot; 
                  without warranty of any kind. We disclaim all warranties, whether express or implied, including:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Merchantability and fitness for a particular purpose</li>
                  <li>That the software will meet your requirements</li>
                  <li>That the operation will be uninterrupted or error-free</li>
                  <li>That defects will be corrected</li>
                </ul>
                <p className="text-sm bg-blue-50 border border-blue-200 p-3 rounded">
                  <span className="font-semibold">Recommendation:</span> Always test code and tools in 
                  a safe environment before using them in production.
                </p>
              </div>
            </section>

            <section className="bg-white border border-gray-200 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">6. Changes to Content</h2>
              <p className="text-gray-700">
                Technology evolves rapidly. Information, tutorials, and recommendations on this website 
                may become outdated. We reserve the right to modify, update, or remove content without notice.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">7. Limitation of Liability</h2>
              <p className="mb-4 text-gray-700">
                Under no circumstances shall behindthebrain, its authors, or contributors be liable for any 
                direct, indirect, incidental, consequential, or punitive damages arising from:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Your use of this website or its content</li>
                <li>Any errors or omissions in the content</li>
                <li>Any unauthorized access to or use of our servers</li>
                <li>Any interruption or cessation of transmission to or from our website</li>
              </ul>
            </section>

            <section className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">8. Contact Information</h2>
              <p className="text-gray-700">
                If you have questions about this disclaimer or any content on our website, please 
                <Link href="/contact" className="text-blue-600 hover:underline font-medium"> contact us</Link>. 
                We&apos;re here to help clarify any concerns you may have.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}