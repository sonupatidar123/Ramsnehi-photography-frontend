import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: [
        'By accessing and using the Ramsnehi Photography website and services, you accept and agree to be bound by these Terms and Conditions.',
        'If you do not agree to abide by the above, please do not use this service.'
      ]
    },
    {
      title: '2. Services Offered',
      content: [
        'Ramsnehi Photography provides professional photography and videography services including weddings, pre-weddings, maternity shoots, and events.',
        'All services are subject to availability and confirmed booking.',
        'Service packages and pricing are subject to change without notice.'
      ]
    },
    {
      title: '3. Booking & Payments',
      content: [
        'A deposit/advance payment is required to secure your booking date.',
        'Full payment must be received before the scheduled event.',
        'Payment methods include bank transfer, online payment, and cash.',
        'Invoices will be provided with itemized service details.',
        'All prices are in Indian Rupees (INR) unless otherwise specified.'
      ]
    },
    {
      title: '4. Cancellation & Refund Policy',
      content: [
        'Cancellations made more than 60 days before the event: Full refund minus 10% administrative fee',
        'Cancellations made 30-60 days before the event: 50% refund',
        'Cancellations made less than 30 days before the event: No refund',
        'Rescheduling requests should be made as soon as possible and are subject to availability.',
        'Force majeure events may be grounds for date rescheduling.'
      ]
    },
    {
      title: '5. Deliverables & Timeline',
      content: [
        'Digital images are typically delivered within 10-15 days after the event.',
        'Final edited videos are delivered within 30-45 days.',
        'Delivery format includes high-resolution digital copies.',
        'Albums and prints can be ordered separately with additional costs.',
        'Delays due to technical issues will be communicated promptly.'
      ]
    },
    {
      title: '6. Intellectual Property Rights',
      content: [
        'All photographs and videos created by Ramsnehi remain our intellectual property.',
        'Clients receive a license to use the images for personal, non-commercial purposes.',
        'Commercial use requires explicit written permission and additional licensing fees.',
        'We reserve the right to use selected images for portfolio and promotional purposes with client credit.',
        'Images may not be reproduced, modified, or redistributed without permission.'
      ]
    },
    {
      title: '7. Client Responsibilities',
      content: [
        'Clients must ensure all required permissions and clearances for the event venue.',
        'Clients are responsible for providing accurate event details and timelines.',
        'Punctuality of the client and wedding party is essential; delays may result in reduced coverage.',
        'Clients must inform us of any special requests or restrictions in advance.',
        'Clients agree to respect the photographer\'s creative judgment and safety.'
      ]
    },
    {
      title: '8. Limitations of Liability',
      content: [
        'Ramsnehi Photography is not responsible for circumstances beyond our control (weather, technical failures, venue access).',
        'Our liability is limited to the amount paid for services.',
        'We are not responsible for loss, theft, or damage to personal items during the event.',
        'Backup equipment and contingency plans are in place, but service continuation is not guaranteed in emergencies.'
      ]
    },
    {
      title: '9. Venue & Safety',
      content: [
        'Clients must ensure the photographer has safe access to the venue.',
        'Photography may be restricted in certain areas; clients should inform us in advance.',
        'We reserve the right to decline photography in unsafe conditions.',
        'All local laws and venue regulations must be followed.'
      ]
    },
    {
      title: '10. Privacy & Confidentiality',
      content: [
        'All client information is kept confidential and protected according to our Privacy Policy.',
        'Raw/unedited images will not be shared without explicit permission.',
        'Client photos are not shared on public platforms without consent.',
        'Guest information collected during events is handled with privacy standards.'
      ]
    },
    {
      title: '11. Dispute Resolution',
      content: [
        'Any disputes will be resolved through mutual discussion and negotiation.',
        'If unresolved, disputes will be handled through mediation or legal proceedings as per Indian law.',
        'Disputes must be raised within 30 days of service completion.'
      ]
    },
    {
      title: '12. Limitation of Use',
      content: [
        'Users must not use the website for unlawful purposes.',
        'Users must not engage in any conduct that restricts or inhibits anyone\'s use of the website.',
        'Unauthorized access to website systems is prohibited.',
        'Intellectual property rights must be respected.'
      ]
    },
    {
      title: '13. Third-Party Links',
      content: [
        'Our website may contain links to third-party websites.',
        'We are not responsible for the content or practices of external websites.',
        'Use of third-party services is at your own risk.',
        'We do not endorse or guarantee third-party services or products.'
      ]
    },
    {
      title: '14. Modification of Terms',
      content: [
        'Ramsnehi Photography reserves the right to modify these terms at any time.',
        'Updated terms will be posted on our website with an effective date.',
        'Continued use of our services implies acceptance of updated terms.'
      ]
    },
    {
      title: '15. Governing Law',
      content: [
        'These terms and conditions are governed by Indian law.',
        'Jurisdiction and venue shall be exclusive to courts in Madhya Pradesh, India.',
        'Any disputes shall be resolved in accordance with Indian legal statutes.'
      ]
    },
    {
      title: '16. Contact Information',
      content: [
        'For inquiries or concerns regarding these terms:',
        'Email: contact@ramsnehi.com',
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
            Terms & Conditions
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
            These Terms and Conditions establish the rules and regulations for the use of Ramsnehi Photography's website and services. By using our website and booking our services, you agree to comply with these terms and conditions in full.
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

export default TermsAndConditions;
