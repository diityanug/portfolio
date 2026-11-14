import { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperPlaneTilt, CheckCircle, WarningCircle, SpinnerGap } from '@phosphor-icons/react';
import { fadeUp } from '../../utils/animations';
import ScrollFillHeading from '../ui/ScrollFillHeading';
import BackgroundShape from '../ui/BackgroundShape';

const VIEWPORT = { once: true, margin: '-10px' } as const;

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', content: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', content: '' });
    } catch (err: unknown) {
      setStatus('error');
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-heading"
      className="relative z-10 bg-surface-soft border-t border-[#e5e7eb] py-20 lg:py-32 px-4 md:px-8 overflow-hidden outline-none"
    >
      <BackgroundShape
        initialIndex={1}
        strokeClassName="stroke-[#111111]/[0.04]"
        className="right-[-25vw] top-[-10vw] w-[70vw] h-[70vw] md:right-[-15vw] md:top-[-5vh] md:w-[45vw] md:h-[45vw]"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Clean Heading & Intro without clutter */}
          <div className="lg:col-span-5 flex flex-col">
            <ScrollFillHeading
              id="contact-heading"
              line1="Get In"
              line2="Touch."
              className="mb-6"
            />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              aria-label="またね - See ya"
              className="flex items-center gap-3.5 mb-6 select-none"
            >
              <span aria-hidden="true" className="h-px w-10 bg-[#111111]" />
              <span className="font-serif font-medium text-lg sm:text-xl tracking-[0.22em] text-muted">
                またね
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="text-body text-base sm:text-lg leading-relaxed max-w-md"
            >
              Have an open role, a freelance collaboration, or simply want to connect? Leave a message below and it will be sent directly to my inbox.
            </motion.p>
          </div>

          {/* Right Column: Clean White Card Contact Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="lg:col-span-7 w-full"
          >
            <div className="rounded-2xl border border-[#e5e7eb] bg-[#ffffff] p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_-20px_rgba(17,17,17,0.06)]">
              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] flex items-start gap-3">
                  <CheckCircle size={22} className="shrink-0 mt-0.5 text-[#10b981]" weight="fill" />
                  <div>
                    <h4 className="font-semibold text-sm">Message Sent Successfully!</h4>
                    <p className="text-xs sm:text-sm mt-0.5 text-[#047857]">
                      Thank you for reaching out. Your message has been saved to my inbox and I will get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-[#fef2f2] border border-[#fecaca] text-[#991b1b] flex items-start gap-3">
                  <WarningCircle size={22} className="shrink-0 mt-0.5 text-[#ef4444]" weight="fill" />
                  <div>
                    <h4 className="font-semibold text-sm">Failed to Send</h4>
                    <p className="text-xs sm:text-sm mt-0.5 text-[#b91c1c]">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold tracking-wider uppercase text-[#111111] mb-2">
                    Your Name <span className="text-[#ef4444]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Recruiter"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#fdfdfd] text-[#111111] placeholder:text-[#9ca3af] text-sm focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold tracking-wider uppercase text-[#111111] mb-2">
                    Email Address <span className="text-[#ef4444]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#fdfdfd] text-[#111111] placeholder:text-[#9ca3af] text-sm focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-xs font-semibold tracking-wider uppercase text-[#111111] mb-2">
                    Message <span className="text-[#ef4444]">*</span>
                  </label>
                  <textarea
                    id="content"
                    required
                    rows={4}
                    placeholder="Tell me about your project, job opportunity, or inquiry..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#fdfdfd] text-[#111111] placeholder:text-[#9ca3af] text-sm focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-2 inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#111111] px-6 py-3.5 text-sm font-medium text-[#ffffff] transition-all duration-200 hover:bg-primary-active active:scale-[0.99] disabled:opacity-60 cursor-pointer shadow-sm"
                >
                  {status === 'loading' ? (
                    <>
                      <SpinnerGap size={18} className="animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <PaperPlaneTilt size={18} weight="bold" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
