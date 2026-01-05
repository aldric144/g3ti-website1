'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ContactForm() {
  const searchParams = useSearchParams();
  const [isDemo, setIsDemo] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });

  useEffect(() => {
    setIsDemo(searchParams.get('demo') === 'true');
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry. Our team will contact you within 24-48 hours.');
  };

  return (
    <div className="neural-grid min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-[#12F6C8]/10 border border-[#12F6C8]/30 rounded-full text-[#12F6C8] text-sm font-semibold mb-4">
            {isDemo ? 'DEMO REQUEST' : 'CONTACT'}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-4">
            {isDemo ? 'Request a Demo' : 'Contact G3TI'}
          </h1>
          <p className="text-xl text-gray-400">
            {isDemo
              ? 'Schedule a personalized demonstration of our intelligence systems.'
              : 'Connect with our team for inquiries, partnerships, or briefings.'}
          </p>
          <div className="cyber-divider mt-8" />
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8 border border-[#12F6C8]/10">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0D0D0F] border border-gray-700 rounded-lg text-white focus:border-[#12F6C8] focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0D0D0F] border border-gray-700 rounded-lg text-white focus:border-[#12F6C8] focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-300 mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0D0D0F] border border-gray-700 rounded-lg text-white focus:border-[#12F6C8] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0D0D0F] border border-gray-700 rounded-lg text-white focus:border-[#12F6C8] focus:outline-none transition-colors resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#0B85E5] hover:bg-[#0B85E5]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {isDemo ? 'Request Demo' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Info */}
      <section className="px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-rajdhani)] text-white mb-6">
            Headquarters
          </h2>
          <p className="text-gray-400">
            Global 3 Technology & Intelligence™<br />
            Palm Beach, FL<br />
            United States
          </p>
          <p className="text-[#12F6C8] mt-4">
            Veteran-Owned Technology & Intelligence Company
          </p>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <ContactForm />
    </Suspense>
  );
}
