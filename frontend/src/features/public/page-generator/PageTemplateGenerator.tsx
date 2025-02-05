import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DocumentTextIcon, 
  ShieldCheckIcon,
  LightBulbIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import { PageTemplate } from './types';

export function PageTemplateGenerator({ 
  template 
}: { 
  template: PageTemplate 
}) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Helmet>
        <title>{template.metaTitle}</title>
        <meta name="description" content={template.metaDescription} />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-semibold text-primary/80 mb-4">
          {template.title}
        </h1>
      </motion.div>

      <div className="space-y-4">
        {template.sections.map((section) => (
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
                {section.icon && (
                  <section.icon 
                    className={`h-6 w-6 text-primary/60 
                      ${activeSection === section.id ? 'rotate-6' : ''} 
                      transition-transform`} 
                  />
                )}
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

      {(template.lastUpdated || template.version) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <p className="text-xs text-muted-foreground/50">
            {template.lastUpdated && `Terakhir diperbarui: ${template.lastUpdated}`}
            {template.version && ` | Versi ${template.version}`}
          </p>
        </motion.div>
      )}
    </div>
  );
}
