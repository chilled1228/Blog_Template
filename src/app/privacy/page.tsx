import { Metadata } from 'next'
import { Layout } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Privacy Policy - behindthebrain',
  description: 'Comprehensive privacy policy for behindthebrain explaining how we collect, use, and protect your personal information and data.',
}

export default function Privacy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <p className="font-semibold text-sm uppercase tracking-wider text-[var(--verdigris)] mb-4">Your Privacy Matters</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--black-olive)] leading-tight tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[var(--black-olive)]">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className="mt-6 inline-block bg-[var(--light-gray)] border border-[var(--stone-200)] px-6 py-3 rounded-full">
            <span className="text-sm font-medium text-[var(--black-olive)]">
              Effective Date: {new Date().toLocaleDateString()}
            </span>
          </div>
        </section>

          <div className="space-y-8">
            <section className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">1. Information We Collect</h2>
              <p className="mb-6 text-[var(--black-olive)] text-lg leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, 
                subscribe to our newsletter, or contact us.
              </p>
              <ul className="space-y-3 text-[var(--black-olive)]">
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-[var(--verdigris)] rounded-full mt-3"></div>
                  <span>Email address for newsletter subscriptions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-[var(--verdigris)] rounded-full mt-3"></div>
                  <span>Name and contact information when you reach out to us</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-[var(--verdigris)] rounded-full mt-3"></div>
                  <span>Comments and feedback you provide</span>
                </li>
              </ul>
            </section>

            <section className="border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">2. How We Use Your Information</h2>
              <p className="mb-8 text-[var(--black-olive)] text-lg leading-relaxed">We use the information we collect to:</p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-[var(--verdigris)]/10 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--verdigris)] rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--black-olive)] mb-1">Service Improvement</h3>
                    <p className="text-[var(--black-olive)]">Provide, maintain, and improve our services</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-[var(--verdigris)]/10 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--verdigris)] rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--black-olive)] mb-1">Communication</h3>
                    <p className="text-[var(--black-olive)]">Send you newsletters and updates (with your consent)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-[var(--verdigris)]/10 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--verdigris)] rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--black-olive)] mb-1">Support</h3>
                    <p className="text-[var(--black-olive)]">Respond to your comments and questions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-[var(--verdigris)]/10 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--verdigris)] rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--black-olive)] mb-1">Analytics</h3>
                    <p className="text-[var(--black-olive)]">Analyze usage patterns to improve user experience</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">3. Information Sharing</h2>
              <p className="text-[var(--black-olive)] text-lg leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy.
              </p>
            </section>

            <section className="border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">4. Cookies and Tracking</h2>
              <p className="text-[var(--black-olive)] text-lg leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our site. 
                You can control cookies through your browser settings.
              </p>
            </section>

            <section className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">5. Third-Party Services & Advertising</h2>
              <div className="space-y-4 text-[var(--black-olive)]">
                <p>
                  Our website uses third-party services to enhance user experience and support our operations:
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-[var(--black-olive)] mb-2">Google AdSense</h3>
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
                  <h3 className="font-semibold text-[var(--black-olive)] mb-2">Google Analytics</h3>
                  <p className="text-sm">
                    We use Google Analytics to analyze website traffic and user behavior. This service may track 
                    your IP address and browser information. You can opt out by installing the 
                    <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener">
                      Google Analytics Opt-out Browser Add-on
                    </a>.
                  </p>
                </div>
                
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-[var(--black-olive)] mb-2">Firebase Services</h3>
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

            <section className="border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">6. Data Security</h2>
              <p className="text-[var(--black-olive)] text-lg leading-relaxed">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">7. Your Rights</h2>
              <p className="mb-6 text-[var(--black-olive)] text-lg leading-relaxed">You have the right to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-[var(--stone-200)]">
                  <p className="font-medium text-[var(--black-olive)]">Access Information</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[var(--stone-200)]">
                  <p className="font-medium text-[var(--black-olive)]">Correct Inaccuracies</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[var(--stone-200)]">
                  <p className="font-medium text-[var(--black-olive)]">Request Deletion</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[var(--stone-200)]">
                  <p className="font-medium text-[var(--black-olive)]">Opt Out of Marketing</p>
                </div>
              </div>
            </section>

            <section className="border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">8. Children&apos;s Privacy</h2>
              <p className="text-[var(--black-olive)] text-lg leading-relaxed">
                Our service is not directed to children under 13. We do not knowingly collect 
                personal information from children under 13.
              </p>
            </section>

            <section className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">9. Changes to This Policy</h2>
              <p className="text-[var(--black-olive)] text-lg leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any 
                changes by posting the new policy on this page.
              </p>
            </section>

            <section className="border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">10. Contact Us</h2>
              <p className="text-[var(--black-olive)] text-lg leading-relaxed mb-6">
                If you have any questions about this Privacy Policy, please contact us through our 
                contact page or email us directly.
              </p>
              <div className="bg-[var(--verdigris)]/10 border border-[var(--verdigris)]/20 p-6 rounded-lg">
                <p className="text-[var(--black-olive)]">
                  <span className="font-semibold">Have questions?</span> Our support team is here to help you understand your privacy rights and how we protect your data.
                </p>
              </div>
            </section>
          </div>
      </div>
    </Layout>
  )
}