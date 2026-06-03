/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle, Mail, Bell, Sparkles, FolderOpen, Heart } from 'lucide-react';

interface LocalSubscriber {
  code: string;
  name: string;
  email: string;
  interests: string[];
}

interface SubscribePageProps {
  onAddSubscriber?: (sub: LocalSubscriber) => void;
}

export default function SubscribePage({ onAddSubscriber }: SubscribePageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<string[]>(['Essays & Memoirs']);
  const [subscriberData, setSubscriberData] = useState<LocalSubscriber | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle interests selection helper
  const handleToggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(prev => prev.filter(i => i !== interest));
    } else {
      setInterests(prev => [...prev, interest]);
    }
  };

  const fieldInterests = [
    'Essays & Memoirs',
    'Governance, Policy & Database Systems',
    'Mekaria Fellowship & Mentorship Retreats',
    'Aviation & Infrastructure Briefs'
  ];

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const randomID = Math.floor(100+Math.random()*900);
      const code = `OSC-SUB-${randomID}`;

      const newSub = {
        code,
        name,
        email,
        interests
      };

      setSubscriberData(newSub);

      if (onAddSubscriber) {
        onAddSubscriber(newSub);
      }

      setIsSubmitting(false);
      setName('');
      setEmail('');
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#F7F3EC] min-h-[60vh] flex flex-col justify-center"
    >
      <div className="max-w-[960px] mx-auto px-6 sm:px-12 md:px-16 py-16 sm:py-24">
        <AnimatePresence mode="wait">
          {!subscriberData ? (
            <motion.div
              key="subscribe-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
            >
              {/* Left Column Description */}
              <div>
                <span className="font-sans text-[11px] font-bold tracking-[0.25em] text-[#9B7A2F] uppercase block mb-3">
                  STAY ENGAGED VIA EMAIL
                </span>
                <h1 className="font-serif text-[42px] sm:text-[58px] font-bold tracking-tight leading-[1.1] text-[#121212] mb-6">
                  Subscribe
                </h1>
                <p className="font-sans text-[16px] text-[#444444] mb-4 leading-relaxed text-justify">
                  Join a community of thousands of civil advocates, public administration experts, and university students receiving weekly publications.
                </p>
                <p className="font-serif text-[15px] italic text-[#7A7A7A] leading-relaxed mb-6">
                  "By creating open channels of dialogue, we build a nation of responsive citizens working in sync toward civil excellence."
                </p>
                <div className="flex items-center gap-3 mt-8 border-t border-[#D8D0C0]/50 pt-6">
                  <Mail size={16} className="text-[#9B7A2F]" />
                  <span className="font-sans text-[12px] text-[#7A7A7A] tracking-wide">
                    Delivered with absolute privacy. No spam. No third-party audits.
                  </span>
                </div>
              </div>

              {/* Right Column Form */}
              <div className="border border-[#D8D0C0] p-6 sm:p-10 bg-[#F7F3EC] rounded-sm shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#9B7A2F]" />

                <form onSubmit={handleSubscribe} className="flex flex-col gap-6">
                  <h3 className="font-serif text-[18px] font-semibold text-[#121212] tracking-tight">
                    Establish Alert Subscription
                  </h3>

                  {/* Name field */}
                  <div className="grid grid-cols-1 gap-1">
                    <label className="font-sans text-[10.5px] font-bold text-[#7A7A7A] tracking-wider uppercase">
                      Name / Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Amina Mohammed"
                      className="bg-transparent border-b-2 border-[#121212] outline-none font-sans text-[15px] text-[#121212] py-2 placeholder-[#C2BAA8] focus:border-[#9B7A2F] transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="grid grid-cols-1 gap-1">
                    <label className="font-sans text-[10.5px] font-bold text-[#7A7A7A] tracking-wider uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. amina@athena.org"
                      className="bg-transparent border-b-2 border-[#121212] outline-none font-sans text-[15px] text-[#121212] py-2 placeholder-[#C2BAA8] focus:border-[#9B7A2F] transition-colors"
                    />
                  </div>

                  {/* Choose Interests checkboxes */}
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    <label className="font-sans text-[10.5px] font-bold text-[#7A7A7A] tracking-wider uppercase block mb-1">
                      Choose Field Interests
                    </label>
                    <div className="flex flex-col gap-2.5">
                      {fieldInterests.map((interest) => {
                        const isChecked = interests.includes(interest);
                        return (
                          <div
                            key={interest}
                            onClick={() => handleToggleInterest(interest)}
                            className="flex items-center gap-3 cursor-pointer group select-none"
                          >
                            <span className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center rounded-sm transition-all ${
                              isChecked
                                ? 'bg-[#9B7A2F] border-[#9B7A2F] text-white'
                                : 'border-[#D8D0C0] group-hover:border-[#121212]'
                            }`}>
                              {isChecked && <span className="text-[10px] uppercase font-sans font-black leading-none">✔</span>}
                            </span>
                            <span className="font-sans text-[13px] text-[#444444] leading-tight group-hover:text-[#121212] transition-colors">
                              {interest}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || interests.length === 0}
                    className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase text-white bg-[#121212] hover:bg-[#9B7A2F] disabled:opacity-50 hover:shadow-md py-3 px-6 rounded-md border-none cursor-pointer text-center transition-colors flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? 'Establishing Connection...' : 'Confirm Subscription Entry'}
                    <ArrowUpRight size={14} />
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="subscribe-success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-[620px] mx-auto bg-[#121212] text-white p-8 sm:p-12 border border-[#9B7A2F] rounded-sm relative text-center sm:text-left"
            >
              <div className="absolute top-4 right-4">
                <Sparkles size={24} className="text-[#9B7A2F] animate-pulse" />
              </div>

              <div className="flex justify-center sm:justify-start items-center gap-3 text-[#9B7A2F] mb-6">
                <CheckCircle size={36} />
                <span className="font-sans text-[12px] font-bold tracking-[0.25em] uppercase">
                  CONNECTION ESTABLISHED
                </span>
              </div>

              <h2 className="font-serif text-[28px] sm:text-[36px] font-black leading-tight text-white mb-4">
                Welcome to the Registry, {subscriberData.name}
              </h2>

              <p className="font-sans text-[15px] sm:text-[15.5px] text-[#C2BAA8] leading-relaxed mb-8 text-justify">
                Your email address <strong>{subscriberData.email}</strong> has been catalogued securely. You are now verified to receive policy briefings and upcoming essays regarding <strong><em>"{subscriberData.interests.join(' & ')}"</em></strong>.
              </p>

              <div className="border border-[#444444] bg-[#222222] p-4 rounded-md flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <div className="text-center sm:text-left">
                  <span className="font-sans text-[9px] text-[#7A7A7A] uppercase tracking-widest block mb-0.5">MEMBER REGISTRY CODE</span>
                  <strong className="font-mono text-[16px] text-[#9B7A2F] tracking-widest">{subscriberData.code}</strong>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#C2BAA8]">
                  <Bell size={13} className="text-[#9B7A2F]" /> Standard alerts: ACTIVE
                </div>
              </div>

              <div className="border-t border-[#444444] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="font-sans text-[12px] text-[#7A7A7A] flex items-center gap-1">
                  <Heart size={12} className="text-red-500 fill-red-500" /> Building institutions together.
                </span>

                <button
                  onClick={() => setSubscriberData(null)}
                  className="font-sans text-[11px] font-bold tracking-widest uppercase text-[#9B7A2F] hover:text-white pb-0.5 border-b border-transparent hover:border-white transition-colors bg-transparent border-0 cursor-pointer outline-none"
                >
                  Register another mail
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
