import { Metadata } from 'next'
import { Layout } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Terms of Service - behindthebrain',
  description: 'Terms of service and usage guidelines for behindthebrain. Learn about your rights and responsibilities when using our website.',
}

export default function Terms() {
  return (
    <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <p className="font-semibold text-sm uppercase tracking-wider text-[var(--verdigris)] mb-4">Legal Terms</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--black-olive)] leading-tight tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[var(--black-olive)] mb-6">
            Please read these terms carefully before using our website.
          </p>
          <div className="inline-block bg-[var(--light-gray)] border border-[var(--stone-200)] px-6 py-3 rounded-full">
            <span className="text-sm font-medium text-[var(--black-olive)]">
              Effective Date: {new Date().toLocaleDateString()}
            </span>
          </div>
        </section>
      
      <div className="space-y-8">
        <section className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">1. Acceptance of Terms</h2>
          <p className="text-[var(--black-olive)] text-lg leading-relaxed">
            By accessing and using this website, you accept and agree to be bound by the terms 
            and provision of this agreement.
          </p>
        </section>

        <section className="border border-[var(--stone-200)] p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">2. Use License</h2>
          <p className="mb-6 text-[var(--black-olive)] text-lg leading-relaxed">
            Permission is granted to temporarily download one copy of the materials on our website 
            for personal, non-commercial transitory viewing only. This is the grant of a license, 
            not a transfer of title, and under this license you may not:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-red-800 font-medium">Modify or copy materials</p>
            </div>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-red-800 font-medium">Use for commercial purposes</p>
            </div>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-red-800 font-medium">Reverse engineer software</p>
            </div>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-red-800 font-medium">Remove proprietary notations</p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">3. Disclaimer</h2>
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-6">
            <p className="text-yellow-800 font-medium mb-2">⚠️ Important Notice</p>
            <p className="text-yellow-700">
              The materials on our website are provided on an &apos;as is&apos; basis without any warranties or guarantees.
            </p>
          </div>
          <p className="text-[var(--black-olive)] text-lg leading-relaxed">
            We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including 
            without limitation, implied warranties or conditions of merchantability, fitness for 
            a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="border border-[var(--stone-200)] p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">4. Limitations</h2>
          <p className="text-[var(--black-olive)] text-lg leading-relaxed">
            In no event shall our company or its suppliers be liable for any damages (including, 
            without limitation, damages for loss of data or profit, or due to business interruption) 
            arising out of the use or inability to use the materials on our website.
          </p>
        </section>

        <section className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">5. Accuracy of Materials</h2>
          <p className="text-[var(--black-olive)] text-lg leading-relaxed">
            The materials appearing on our website could include technical, typographical, or 
            photographic errors. We do not warrant that any of the materials on its website are 
            accurate, complete, or current.
          </p>
        </section>

        <section className="border border-[var(--stone-200)] p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">6. Links</h2>
          <p className="text-[var(--black-olive)] text-lg leading-relaxed">
            We have not reviewed all of the sites linked to our website and are not responsible 
            for the contents of any such linked site. The inclusion of any link does not imply 
            endorsement by us of the site.
          </p>
        </section>

        <section className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">7. User Content</h2>
          <p className="text-[var(--black-olive)] text-lg leading-relaxed">
            By posting content to our website, you grant us a non-exclusive, royalty-free, 
            perpetual license to use, modify, and distribute such content. You are responsible 
            for ensuring that your content does not violate any laws or third-party rights.
          </p>
        </section>

        <section className="border border-[var(--stone-200)] p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">8. Prohibited Uses</h2>
          <p className="mb-6 text-[var(--black-olive)] text-lg leading-relaxed">You may not use our website:</p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-3"></div>
              <span className="text-[var(--black-olive)]">For any unlawful purpose or to solicit others to perform unlawful acts</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-3"></div>
              <span className="text-[var(--black-olive)]">To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-3"></div>
              <span className="text-[var(--black-olive)]">To infringe upon or violate our intellectual property rights or the intellectual property rights of others</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-3"></div>
              <span className="text-[var(--black-olive)]">To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-3"></div>
              <span className="text-[var(--black-olive)]">To submit false or misleading information</span>
            </div>
          </div>
        </section>

        <section className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">9. Modifications</h2>
          <p className="text-[var(--black-olive)] text-lg leading-relaxed">
            We may revise these terms of service for its website at any time without notice. 
            By using this website, you are agreeing to be bound by the then current version 
            of these terms of service.
          </p>
        </section>

        <section className="border border-[var(--stone-200)] p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">10. Governing Law</h2>
          <p className="text-[var(--black-olive)] text-lg leading-relaxed">
            These terms and conditions are governed by and construed in accordance with the laws 
            and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
          </p>
        </section>

        <section className="bg-[var(--light-gray)] border border-[var(--stone-200)] p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--black-olive)] mb-6">11. Contact Information</h2>
          <p className="text-[var(--black-olive)] text-lg leading-relaxed mb-6">
            If you have any questions about these Terms of Service, please contact us through 
            our contact page.
          </p>
          <div className="bg-[var(--verdigris)]/10 border border-[var(--verdigris)]/20 p-6 rounded-lg">
            <p className="text-[var(--black-olive)]">
              <span className="font-semibold">Need clarification?</span> Our support team is available to help you understand any aspect of these terms.
            </p>
          </div>
        </section>
        </div>
      </div>
    </Layout>
  )
}