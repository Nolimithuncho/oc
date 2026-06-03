/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Send, Users, Shield, ArrowUpRight, Sparkles, HelpCircle } from 'lucide-react';
import { MENTORSHIP_FOCUSES_DATA } from '../data';

interface MentorshipApplication {
  id: string;
  name: string;
  email: string;
  discipline: string;
  proposal: string;
  focus: string;
  status: 'PENDING ADMISSION REVIEW' | 'APPROVED';
}

interface MentorshipPageProps {
  parentApps?: MentorshipApplication[];
  onApplyApp?: (app: MentorshipApplication) => void;
}

export default function MentorshipPage({ parentApps, onApplyApp }: MentorshipPageProps) {
  const [localApps, setLocalApps] = useState<MentorshipApplication[]>([
    {
      id: "MLF-2026-4028",
      name: "Tunde Alabi",
      email: "tunde@athenacentre.org",
      discipline: "Public Policy Graduate, UNILAG",
      proposal: "Implementing localized paper-decoupling in local government revenue collection units to decrease duplicate billing arrays.",
      focus: "Ethical Public Administration",
      status: "PENDING ADMISSION REVIEW"
    }
  ]);

  const apps = parentApps || localApps;

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formDiscipline, setFormDiscipline] = useState('');
  const [formProposal, setFormProposal] = useState('');
  const [formFocus, setFormFocus] = useState(MENTORSHIP_FOCUSES_DATA[0].title);
  const [submittedApp, setSubmittedApp] = useState<MentorshipApplication | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formDiscipline || !formProposal) return;

    setIsSubmitting(true);

    // Simulate short network delay for high-craft UX feedback
    setTimeout(() => {
      const serial = Math.floor(1000 + Math.random() * 9000);
      const appID = `MLF-2026-${serial}`;

      const newApp: MentorshipApplication = {
        id: appID,
        name: formName,
        email: formEmail,
        discipline: formDiscipline,
        proposal: formProposal,
        focus: formFocus,
        status: 'PENDING ADMISSION REVIEW'
      };

      if (onApplyApp) {
        onApplyApp(newApp);
      } else {
        setLocalApps(prev => [newApp, ...prev]);
      }

      setSubmittedApp(newApp);
      setIsSubmitting(false);

      // Clear form inputs
      setFormName('');
      setFormEmail('');
      setFormDiscipline('');
      setFormProposal('');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#F7F3EC] pb-20"
    >
      {/* Header */}
      <section className="max-w-[960px] mx-auto px-6 sm:px-12 md:px-16 pt-20">
        <span className="font-sans text-[11px] font-bold tracking-[0.22em] text-[#7A7A7A] uppercase block mb-3">
          Ethical Youth Cultivation
        </span>
        <h1 className="font-serif text-[44px] sm:text-[62px] font-bold tracking-tight leading-[1.05] text-[#121212] mb-6">
          Mekaria Mentorship
        </h1>

        <div className="border-l-2 border-[#9B7A2F] pl-6 md:pl-8 py-2 max-w-[580px] mt-8 mb-12">
          <p className="font-serif text-[20px] sm:text-[24px] italic text-[#444444] leading-[1.5]">
            "Mekaria is drawing-board courage. It is the moral demand to 'do more,' to engineer excellence in our immediate offices, and to accept responsibilities that exceed our credentials."
          </p>
        </div>
      </section>

      {/* Focus Area list Section */}
      <section className="max-w-[960px] mx-auto px-6 sm:px-12 md:px-16 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-11 border-t border-[#D8D0C0]">
        <div className="md:col-span-1 pt-1.5">
          <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#9B7A2F] uppercase block mb-2">
            The Philosophy
          </span>
          <p className="font-sans text-[13.5px] text-[#7A7A7A] leading-relaxed mt-4">
            Under this program, Osita Chidoka brings together groups of young public analysts during intensive retreats to study operational governance systems.
          </p>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-serif text-[24px] font-bold text-[#121212] mb-6 tracking-tight">
            Our Mentorship Focus Vectors
          </h3>

          <div className="flex flex-col gap-0 border-t border-[#D8D0C0]">
            {MENTORSHIP_FOCUSES_DATA.map((focus, idx) => (
              <div key={idx} className="py-6 border-b border-[#D8D0C0] flex items-start gap-4 hover:bg-[#9B7A2F]/5 p-2 transition-colors rounded-sm">
                <span className="font-serif text-[18px] sm:text-[20px] font-bold text-[#9B7A2F] flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#9B7A2F]/10 border border-[#9B7A2F]/25 leading-none">
                  0{idx + 1}
                </span>
                <div>
                  <h4 className="font-serif text-[18px] font-bold text-[#121212] tracking-tight mb-2">
                    {focus.title}
                  </h4>
                  <p className="font-sans text-[15px] text-[#7A7A7A] leading-relaxed text-justify">
                    {focus.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Section with form */}
      <section className="max-w-[960px] mx-auto px-6 sm:px-12 md:px-16 py-16 border-t border-[#D8D0C0] grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
        <div className="md:col-span-1 pt-1.5 label-sticky">
          <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#9B7A2F] uppercase block mb-3">
            Fellowship Intake
          </span>
          <h2 className="font-serif text-[24px] sm:text-[28px] font-bold tracking-tight text-[#121212] mb-4">
            The Autumn Class
          </h2>
          <p className="font-sans text-[14px] text-[#7A7A7A] leading-relaxed">
            The Mekaria Fellowship is open twice a year. We admit exactly fifteen delegates per cohort to guarantee a highly personalized development curriculum.
          </p>
        </div>

        {/* Form panel with dynamic states */}
        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            {!submittedApp ? (
              <motion.div
                key="form-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <form onSubmit={handleApply} className="bg-[#F7F3EC] border border-[#D8D0C0] p-6 sm:p-10 rounded-sm shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9B7A2F] to-[#121212]" />
                  
                  <h3 className="font-serif text-[22px] font-bold text-[#121212] mb-2 tracking-tight">
                    Apply for the Mekaria Fellowship
                  </h3>
                  <p className="font-sans text-[14px] text-[#7A7A7A] mb-8 leading-relaxed">
                    Submit your personal background information and a short public reform statement. All applicants must hold active links to civil groups or state departments.
                  </p>

                  <div className="flex flex-col gap-6">
                    {/* Focus Choice */}
                    <div className="grid grid-cols-1 gap-1">
                      <label className="font-sans text-[11px] font-bold text-[#7A7A7A] tracking-wider uppercase mb-1">
                        Selected Focus Vector
                      </label>
                      <select
                        value={formFocus}
                        onChange={(e) => setFormFocus(e.target.value)}
                        className="bg-[#F7F3EC] border border-[#D8D0C0] rounded-sm py-2 px-3 font-sans text-[14.5px] text-[#121212] outline-none focus:border-[#9B7A2F] focus:ring-1 focus:ring-[#9B7A2F]"
                      >
                        {MENTORSHIP_FOCUSES_DATA.map((focus, index) => (
                          <option key={index} value={focus.title}>{focus.title}</option>
                        ))}
                      </select>
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-1 gap-1">
                      <label className="font-sans text-[11px] font-bold text-[#7A7A7A] tracking-wider uppercase">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Ibrahim Ademola"
                        className="bg-transparent border-b border-[#D8D0C0] outline-none font-sans text-[15px] text-[#121212] py-2 placeholder-[#C2BAA8] focus:border-[#9B7A2F] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="grid grid-cols-1 gap-1">
                      <label className="font-sans text-[11px] font-bold text-[#7A7A7A] tracking-wider uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="e.g. ibrahim@outlook.com"
                        className="bg-transparent border-b border-[#D8D0C0] outline-none font-sans text-[15px] text-[#121212] py-2 placeholder-[#C2BAA8] focus:border-[#9B7A2F] transition-colors"
                      />
                    </div>

                    {/* Discipline */}
                    <div className="grid grid-cols-1 gap-1">
                      <label className="font-sans text-[11px] font-bold text-[#7A7A7A] tracking-wider uppercase">
                        Academic Credentials & Current Profession
                      </label>
                      <input
                        type="text"
                        required
                        value={formDiscipline}
                        onChange={(e) => setFormDiscipline(e.target.value)}
                        placeholder="e.g. Bachelor of Laws, University of Nigeria / Legal Intern"
                        className="bg-transparent border-b border-[#D8D0C0] outline-none font-sans text-[15px] text-[#121212] py-2 placeholder-[#C2BAA8] focus:border-[#9B7A2F] transition-colors"
                      />
                    </div>

                    {/* Essay Proposal focus */}
                    <div className="grid grid-cols-1 gap-1">
                      <label className="font-sans text-[11px] font-bold text-[#7A7A7A] tracking-wider uppercase">
                        Proposed System Reforms
                      </label>
                      <p className="font-sans text-[12px] text-[#7A7A7A] italic mb-1">
                        Briefly outline one structural reform (e.g. biometric capturing, paper reduction, transparent databases) you would enforce in a public sector unit of your choice.
                      </p>
                      <textarea
                        required
                        rows={5}
                        maxLength={500}
                        value={formProposal}
                        onChange={(e) => setFormProposal(e.target.value)}
                        placeholder="State your reform thesis and implementation metrics..."
                        className="bg-transparent border border-[#D8D0C0] rounded-sm p-3 font-sans text-[15px] text-[#121212] outline-none focus:border-[#9B7A2F] focus:ring-1 focus:ring-[#9B7A2F] transition-all"
                      />
                      <span className="font-sans text-[11px] text-[#C2BAA8] text-right mt-1">
                        Max 500 characters
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="font-sans text-[12px] font-bold tracking-widest uppercase text-white bg-[#121212] hover:bg-[#9B7A2F] py-3 px-8 rounded-md border-none cursor-pointer text-center mr-auto transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      {isSubmitting ? 'Verifying Credentials...' : 'Submit Application Dossier'}
                      <Send size={13} className={isSubmitting ? 'animate-bounce' : ''} />
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="submission-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#121212] text-white p-8 sm:p-12 border border-[#9B7A2F] rounded-sm relative"
              >
                <div className="absolute top-4 right-4">
                  <Sparkles size={24} className="text-[#9B7A2F] animate-spin-slow" />
                </div>

                <div className="flex items-center gap-3 text-[#9B7A2F] mb-6">
                  <CheckCircle size={32} />
                  <span className="font-sans text-[12px] font-bold tracking-[0.25em] h-fit uppercase">
                    APPLICATION COMPLETED
                  </span>
                </div>

                <h3 className="font-serif text-[28px] sm:text-[32px] font-bold text-white leading-tight mb-4">
                  Dossier Seeded Securely
                </h3>

                <p className="font-sans text-[15.5px] text-[#C2BAA8] mb-8 leading-relaxed max-w-[580px] text-justify">
                  Thank you, <strong>{submittedApp.name}</strong>. Your tactical fellowship entry for the focus area of <em>"{submittedApp.focus}"</em> has been verified and registered. Your unified tracking docket code is printed below:
                </p>

                <div className="border border-[#444444] bg-[#222222] p-5 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <span className="font-sans text-[9px] text-[#7A7A7A] uppercase tracking-widest block mb-1">DOCK CODE ENTRY</span>
                    <strong className="font-mono text-[18px] sm:text-[20px] text-[#9B7A2F] tracking-widest">{submittedApp.id}</strong>
                  </div>
                  <div>
                    <span className="font-sans text-[9px] text-[#7A7A7A] uppercase tracking-widest block mb-1">FILING STATUS</span>
                    <span className="font-sans font-bold text-[11px] tracking-wider text-white bg-[#9B7A2F]/20 border border-[#9B7A2F]/30 px-3 py-1 rounded-sm block">
                      {submittedApp.status}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#444444] pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-[#9B7A2F]" />
                    <span className="font-sans text-[12px] text-[#7A7A7A]">A secure evaluation summary is queued to: {submittedApp.email}</span>
                  </div>
                  <button
                    onClick={() => setSubmittedApp(null)}
                    className="font-sans text-[11px] font-bold tracking-widest uppercase text-[#9B7A2F] hover:text-white pb-0.5 border-b border-transparent hover:border-white transition-colors bg-transparent border-0 cursor-pointer outline-none"
                  >
                    Submit another dossier
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* List of active fellows dockets for realism */}
          <div className="mt-12">
            <h4 className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#121212] uppercase mb-4 block">
              Administrative Tracking Records ({apps.length})
            </h4>

            <div className="border border-[#D8D0C0] divide-y divide-[#D8D0C0] rounded-sm bg-[#F7F3EC]/40">
              {apps.map((app) => (
                <div key={app.id} className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-sans">
                  <div>
                    <h5 className="font-bold text-[#121212] text-[13.5px]">{app.name}</h5>
                    <p className="text-[#7A7A7A] mt-0.5">{app.discipline} • <em>{app.focus}</em></p>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="font-mono text-[#9B7A2F] tracking-wider">{app.id}</span>
                    <span className="font-bold bg-[#9B7A2F]/10 border border-[#9B7A2F]/20 text-[#9B7A2F] px-2 py-0.5 rounded-sm uppercase tracking-wider text-[10px]">
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
