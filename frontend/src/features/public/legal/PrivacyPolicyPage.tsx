import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  CodeBracketIcon,
  LightBulbIcon,
  LockClosedIcon 
} from '@heroicons/react/24/outline';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const privacySections = [
    {
      id: 'data-collection',
      title: 'Data Collection',
      icon: CodeBracketIcon,
      description: 'Transparent and secure data gathering practices.',
      details: [
        'Minimal personal information collection',
        'Explicit consent mechanisms',
        'Anonymous data processing',
        'Zero tracking without permission'
      ]
    },
    {
      id: 'usage-policy',
      title: 'Usage Policy',
      icon: LightBulbIcon,
      description: 'Intelligent and ethical data utilization.',
      details: [
        'Purpose-driven data usage',
        'User-centric information handling',
        'Predictive privacy protection',
        'Continuous improvement protocols'
      ]
    },
    {
      id: 'security-measures',
      title: 'Security Protocols',
      icon: ShieldCheckIcon,
      description: 'Advanced protection for your digital identity.',
      details: [
        'Military-grade encryption',
        'Real-time threat monitoring',
        'Decentralized security architecture',
        'Proactive vulnerability management'
      ]
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing',
      icon: LockClosedIcon,
      description: 'Rigorous control over information distribution.',
      details: [
        'Zero third-party data selling',
        'Granular sharing permissions',
        'Transparent partner agreements',
        'User-controlled data boundaries'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Helmet>
        <title>Privacy Policy - Next-Gen Digital Trust</title>
        <meta name="description" content="Cutting-edge privacy protection for the digital era" />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-semibold text-primary/80 mb-4">
          Digital Privacy Reimagined
        </h1>
        <p className="text-muted-foreground/70 max-w-2xl mx-auto">
          Pioneering a new standard of digital trust and transparency
        </p>
      </motion.div>

      <div className="space-y-4">
        {privacySections.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-border/50 last:border-b-0"
          >
            <button 
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              className="w-full text-left py-4 flex items-center justify-between 
                         hover:bg-accent/30 transition-colors rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <section.icon 
                  className={`h-6 w-6 text-primary/60 
                    ${activeSection === section.id ? 'rotate-6' : ''} 
                    transition-transform`} 
                />
                <span className="font-medium text-foreground/80">
                  {section.title}
                </span>
              </div>
              <motion.div
                animate={{ 
                  rotate: activeSection === section.id ? 180 : 0 
                }}
                transition={{ duration: 0.2 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-5 h-5 text-muted-foreground/60"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </motion.div>
            </button>

            <AnimatePresence>
              {activeSection === section.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: 1, 
                    height: 'auto',
                    transition: { 
                      duration: 0.3,
                      ease: "easeInOut" 
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    height: 0,
                    transition: { duration: 0.2 }
                  }}
                  className="px-4 py-4 bg-accent/20 rounded-b-lg"
                >
                  <p className="text-muted-foreground/70 text-sm mb-3">
                    {section.description}
                  </p>
                  <ul className="space-y-2 text-foreground/80 text-sm">
                    {section.details.map((detail, idx) => (
                      <li 
                        key={idx}
                        className="flex items-center space-x-2 
                          text-muted-foreground/70 hover:text-foreground/90 
                          transition-colors"
                      >
                        <span className="w-2 h-2 bg-primary/50 rounded-full"></span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mt-12"
      >
        <p className="text-xs text-muted-foreground/50">
          Last Updated: January 2024 | Version 2.0 
        </p>
      </motion.div>
    </div>
  );
}
