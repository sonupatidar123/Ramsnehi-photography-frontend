import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: '1. Information We Collect',
      content: [
        'Personal Information: When you contact us or book our services, we may collect your name, email address, phone number, address, and payment information.',
        'Session Information: We collect information about how you interact with our website, including IP address, browser type, and pages visited.',
        'Cookies: We use cookies to enhance your browsing experience and track preferences.',
        'Client Project Data: For photography projects, we collect details about your event, preferences, and creative requirements.'
      ]
    },
    {
      title: '2. How We Use Your Information',
      content: [
        'To provide and improve our photography services',
        'To communicate with you regarding bookings, updates, and inquiries',
        'To process payments and maintain transaction records',
        'To send promotional content and updates (with your consent)',
        'To analyze website usage and improve user experience',
        'To comply with legal obligations and protect our rights'
      ]
    },
    {
      title: '3. Information Sharing',
      content: [
        'We do not sell your personal information to third parties.',
        'We may share information with trusted service providers (payment processors, email services) who assist in our operations.',
        'We may disclose information if required by law or to protect our legal rights.',
        'Client photos and projects are kept confidential and not shared without explicit consent.'
      ]
    },
    {
      title: '4. Data Security',
      content: [
        'We implement industry-standard security measures to protect your personal information.',
        'Our website uses SSL encryption to secure data transmission.',
        'Access to client information is restricted to authorized personnel only.',
        'Despite our efforts, no method of transmission over the internet is 100% secure.'
      ]
    },
    {
      title: '5. Your Rights',
      content: [
        'You have the right to access, update, or delete your personal information.',
        'You can opt-out of promotional emails at any time.',
        'You may request a copy of your data in a portable format.',
        'Contact us at contact@ramsnehi.com to exercise these rights.'
      ]
    },
    {
      title: '6. Retention of Information',
      content: [
        'We retain personal information for as long as necessary to provide services.',
        'Client project files are stored securely and retained according to agreed timelines.',
        'You may request deletion of your data, subject to legal and contractual obligations.'
      ]
    },
    {
      title: '7. Third-Party Links',
      content: [
        'Our website may contain links to third-party websites.',
        'We are not responsible for the privacy practices of external sites.',
        'Please review their privacy policies before sharing personal information.'
      ]
    },
    {
      title: '8. Children\'s Privacy',
      content: [
        'Our services are not directed to children under 13 years of age.',
        'We do not knowingly collect information from children without parental consent.',
        'If we become aware of such collection, we will delete the information promptly.'
      ]
    },
    {
      title: '9. Policy Updates',
      content: [
        'We may update this privacy policy periodically.',
        'Changes will be posted on this page with an updated effective date.',
        'Your continued use of our services constitutes acceptance of the updated policy.'
      ]
    },
    {
      title: '10. Contact Us',
      content: [
        'For privacy concerns or inquiries, please contact us:',
        'Email: privacy@ramsnehi.com',
        'Phone: +91 96441 67702',
        'Address: Mandsaur, Madhya Pradesh, India'
      ]
    }
  ];

  return (
    <section className="min-h-screen bg-[#050505] text-white py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-5 md:px-10">
        
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 text-sm"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif italic mb-4"
          >
            Privacy Policy
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-sm"
          >
            Effective Date: January 1, 2024
          </motion.p>
        </div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 p-6 bg-white/[0.02] border border-white/[0.08] rounded-lg"
        >
          <p className="text-white/60 leading-relaxed">
            At Ramsnehi Photography, we are committed to protecting your privacy and ensuring transparency about how we collect, use, and manage your personal information. This Privacy Policy outlines our practices regarding data collection and usage.
          </p>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="border-b border-white/[0.08] pb-8"
            >
              <h2 className="text-xl font-serif italic text-red-500 mb-4">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex gap-3 text-white/60 text-sm leading-relaxed">
                    <span className="text-red-500 mt-1 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/[0.08] text-center"
        >
          <p className="text-white/40 text-sm">
            Last Updated: May 24, 2024
          </p>
          <p className="text-white/20 text-xs mt-2">
            © 2024 Ramsnehi Photography. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
