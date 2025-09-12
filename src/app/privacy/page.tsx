import { Metadata } from 'next'
import { Layout } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Privacy Policy - behindthebrain',
  description: 'Comprehensive privacy policy for behindthebrain explaining how we collect, use, and protect your personal information and data.',
}

export default function Privacy() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <div className="mt-4 inline-block bg-gray-100 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                Effective Date: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="space-y-8">
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">1. Information We Collect</h2>
              <p className="mb-4 text-gray-700">
                We collect information you provide directly to us, such as when you create an account, 
                subscribe to our newsletter, or contact us.
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                <li>Email address for newsletter subscriptions</li>
                <li>Name and contact information when you reach out to us</li>
                <li>Comments and feedback you provide</li>
              </ul>
            </section>

            <section className="bg-white border border-gray-200 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">2. How We Use Your Information</h2>
              <p className="mb-6 text-gray-700">We use the information we collect to:</p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Provide, maintain, and improve our services</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Send you newsletters and updates (with your consent)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Respond to your comments and questions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Analyze usage patterns to improve user experience</span>
                </li>
              </ul>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">3. Information Sharing</h2>
              <p className="text-gray-700">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">4. Cookies and Tracking</h2>
              <p className="text-gray-700">
                We use cookies and similar tracking technologies to enhance your experience on our site. 
                You can control cookies through your browser settings.
              </p>
            </section>

            <section className="bg-white border border-gray-200 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">5. Third-Party Services & Advertising</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Our website uses third-party services to enhance user experience and support our operations:
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Google AdSense</h3>
                  <p className="text-sm">
                    We use Google AdSense to display advertisements. Google AdSense uses cookies and web beacons 
                    to serve ads based on your previous visits to our website and other websites. You may opt out 
                    of personalized advertising by visiting 
                    <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener"> 
                      Google Ads Settings
                    </a>.
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Google Analytics</h3>
                  <p className="text-sm">
                    We use Google Analytics to analyze website traffic and user behavior. This service may track 
                    your IP address and browser information. You can opt out by installing the 
                    <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener">
                      Google Analytics Opt-out Browser Add-on
                    </a>.
                  </p>
                </div>
                
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Firebase Services</h3>
                  <p className="text-sm">
                    We use Firebase for website functionality, which may collect usage data and analytics. 
                    Firebase is operated by Google and follows Google&apos;s privacy policies.
                  </p>
                </div>
                
                <p className="text-sm">
                  These third-party services have their own privacy policies. We encourage you to review them:
                </p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li><a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Google Privacy Policy</a></li>
                  <li><a href="https://firebase.google.com/support/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Firebase Privacy Information</a></li>
                </ul>
              </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">6. Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">7. Your Rights</h2>
              <p className="mb-4 text-gray-700">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">8. Children&apos;s Privacy</h2>
              <p className="text-gray-700">
                Our service is not directed to children under 13. We do not knowingly collect 
                personal information from children under 13.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">9. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. We will notify you of any 
                changes by posting the new policy on this page.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">10. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us through our 
                contact page or email us directly.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}