import { Metadata } from 'next'
import { Layout } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Terms of Service - behindyourbrain Blog',
  description: 'Terms of service and usage guidelines for behindyourbrain Blog. Learn about your rights and responsibilities when using our website.',
}

export default function Terms() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                Effective Date: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
      
      <div className="space-y-6">
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using this website, you accept and agree to be bound by the terms 
            and provision of this agreement.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">2. Use License</h2>
          <p className="mb-4 text-gray-700">
            Permission is granted to temporarily download one copy of the materials on our website 
            for personal, non-commercial transitory viewing only. This is the grant of a license, 
            not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">3. Disclaimer</h2>
          <p className="text-gray-700">
            The materials on our website are provided on an &apos;as is&apos; basis. We make no warranties, 
            expressed or implied, and hereby disclaim and negate all other warranties including 
            without limitation, implied warranties or conditions of merchantability, fitness for 
            a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">4. Limitations</h2>
          <p className="text-gray-700">
            In no event shall our company or its suppliers be liable for any damages (including, 
            without limitation, damages for loss of data or profit, or due to business interruption) 
            arising out of the use or inability to use the materials on our website.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">5. Accuracy of Materials</h2>
          <p className="text-gray-700">
            The materials appearing on our website could include technical, typographical, or 
            photographic errors. We do not warrant that any of the materials on its website are 
            accurate, complete, or current.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">6. Links</h2>
          <p className="text-gray-700">
            We have not reviewed all of the sites linked to our website and are not responsible 
            for the contents of any such linked site. The inclusion of any link does not imply 
            endorsement by us of the site.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">7. User Content</h2>
          <p className="text-gray-700">
            By posting content to our website, you grant us a non-exclusive, royalty-free, 
            perpetual license to use, modify, and distribute such content. You are responsible 
            for ensuring that your content does not violate any laws or third-party rights.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">8. Prohibited Uses</h2>
          <p className="mb-4 text-gray-700">You may not use our website:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
          </ul>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">9. Modifications</h2>
          <p className="text-gray-700">
            We may revise these terms of service for its website at any time without notice. 
            By using this website, you are agreeing to be bound by the then current version 
            of these terms of service.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">10. Governing Law</h2>
          <p className="text-gray-700">
            These terms and conditions are governed by and construed in accordance with the laws 
            and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">11. Contact Information</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms of Service, please contact us through 
            our contact page.
          </p>
        </section>
        </div>
        </div>
      </div>
    </Layout>
  )
}