import { Metadata } from 'next'
import Link from 'next/link'
import { Layout } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Cookie Policy - behindthebrain',
  description: 'Learn about how behindthebrain uses cookies to enhance your browsing experience and provide personalized content.',
}

export default function CookiePolicy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <p className="font-semibold text-sm uppercase tracking-wider text-[var(--verdigris)] mb-4">Cookie Information</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--black-olive)] leading-tight tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[var(--black-olive)]">
            This Cookie Policy explains how behindthebrain uses cookies and similar technologies to enhance your browsing experience.
          </p>
          <div className="mt-6 inline-block bg-[var(--light-gray)] border border-[var(--stone-200)] px-6 py-3 rounded-full">
            <span className="text-sm font-medium text-[var(--black-olive)]">
              Effective Date: {new Date().toLocaleDateString()}
            </span>
          </div>
        </section>

          <div className="space-y-8">
            <section className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">1. What Are Cookies?</h2>
              <p className="mb-6 text-[var(--black-olive)] text-lg leading-relaxed">
                Cookies are small text files that are stored on your device when you visit a website. 
                They help websites remember your preferences and improve your browsing experience.
              </p>
              <div className="bg-white border border-[var(--stone-200)] p-6 rounded-xl">
                <h3 className="text-xl font-bold text-[var(--black-olive)] mb-4">Types of Cookies We Use:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="font-semibold text-blue-900 mb-1">Essential Cookies</p>
                    <p className="text-sm text-blue-800">Required for basic website functionality</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-900 mb-1">Performance Cookies</p>
                    <p className="text-sm text-green-800">Help us understand how visitors use our site</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="font-semibold text-purple-900 mb-1">Functionality Cookies</p>
                    <p className="text-sm text-purple-800">Remember your preferences and settings</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <p className="font-semibold text-orange-900 mb-1">Advertising Cookies</p>
                    <p className="text-sm text-orange-800">Used to show relevant advertisements</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">2. How We Use Cookies</h2>
              <div className="space-y-6">
                <div className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-[var(--black-olive)] mb-3">Essential Website Functionality</h3>
                  <p className="text-[var(--black-olive)] leading-relaxed">
                    These cookies are necessary for the website to function properly. They enable core functionality 
                    such as page navigation, access to secure areas, and form submissions.
                  </p>
                </div>
                
                <div className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-[var(--black-olive)] mb-3">Analytics and Performance</h3>
                  <p className="text-[var(--black-olive)] leading-relaxed">
                    We use Google Analytics cookies to understand how visitors interact with our website. 
                    This helps us improve our content and user experience. These cookies collect information 
                    anonymously and report website trends.
                  </p>
                </div>
                
                <div className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-[var(--black-olive)] mb-3">Advertising and Marketing</h3>
                  <p className="text-[var(--black-olive)] leading-relaxed">
                    We use Google AdSense to display advertisements. These cookies help show you more relevant 
                    ads based on your interests and previous browsing behavior. They also help measure the 
                    effectiveness of advertising campaigns.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-yellow-50 border border-yellow-200 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">3. Third-Party Cookies</h2>
              <p className="mb-6 text-[var(--black-olive)] text-lg leading-relaxed">
                Some cookies on our website are set by third-party services we use to enhance functionality:
              </p>
              
              <div className="space-y-3">
                <div className="bg-white border border-yellow-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-[var(--black-olive)] mb-2">Google Services</h3>
                  <ul className="text-sm text-[var(--black-olive)] space-y-1">
                    <li>• <span className="font-medium">Google Analytics:</span> Website traffic analysis</li>
                    <li>• <span className="font-medium">Google AdSense:</span> Advertisement delivery</li>
                    <li>• <span className="font-medium">Google Fonts:</span> Web font delivery</li>
                  </ul>
                  <p className="text-xs text-[var(--black-olive)] mt-2">
                    Learn more: <a href="https://policies.google.com/technologies/cookies" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Google&apos;s Cookie Policy</a>
                  </p>
                </div>
                
                <div className="bg-white border border-yellow-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-[var(--black-olive)] mb-2">Social Media Platforms</h3>
                  <p className="text-sm text-[var(--black-olive)]">
                    When you interact with social media sharing buttons or embedded content, 
                    these platforms may set their own cookies.
                  </p>
                </div>
              </div>
            </section>

            <section className="border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">4. Managing Your Cookie Preferences</h2>
              <div className="space-y-4 text-[var(--black-olive)]">
                <p>
                  You have several options to manage or disable cookies:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-[var(--black-olive)] mb-2">Browser Settings</h3>
                    <p className="text-sm">
                      Most browsers allow you to control cookies through their settings. You can usually 
                      find these options in the &quot;Privacy&quot; or &quot;Security&quot; section of your browser.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-[var(--black-olive)] mb-2">Ad Personalization</h3>
                    <p className="text-sm">
                      Visit <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Google Ads Settings</a> 
                      to opt out of personalized advertising.
                    </p>
                  </div>
                </div>
                
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-[var(--black-olive)] mb-2">⚠️ Important Note</h3>
                  <p className="text-sm text-red-800">
                    Disabling certain cookies may affect website functionality and your user experience. 
                    Some features may not work properly if essential cookies are blocked.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">5. How Long Do Cookies Last?</h2>
              <div className="space-y-3 text-[var(--black-olive)]">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold">Session Cookies:</h3>
                    <p className="text-sm">Deleted when you close your browser</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold">Persistent Cookies:</h3>
                    <p className="text-sm">Remain on your device for a set period (typically 1-2 years)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold">Analytics Cookies:</h3>
                    <p className="text-sm">Usually expire after 2 years</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="border border-[var(--stone-200)] p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">6. Updates to This Cookie Policy</h2>
              <p className="text-[var(--black-olive)] mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons.
              </p>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Stay Informed:</span> We recommend reviewing this policy 
                  periodically to stay informed about how we use cookies.
                </p>
              </div>
            </section>

            <section className="bg-[var(--verdigris)]/10 border border-[var(--verdigris)]/20 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">7. Contact Us</h2>
              <p className="text-[var(--black-olive)] text-lg leading-relaxed mb-6">
                If you have any questions about our use of cookies or this Cookie Policy, please 
                <Link href="/contact" className="text-[var(--verdigris)] hover:underline font-semibold"> contact us</Link>. 
                We&apos;re here to help clarify any concerns you may have.
              </p>
              <div className="bg-white border border-[var(--verdigris)]/20 p-6 rounded-xl">
                <p className="text-[var(--black-olive)]">
                  <span className="font-semibold text-[var(--verdigris)]">Need help?</span> Our support team is available to assist you with any cookie-related questions or concerns.
                </p>
              </div>
            </section>
          </div>
      </div>
    </Layout>
  )
}