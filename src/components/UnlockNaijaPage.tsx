/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  BookOpen, 
  Briefcase, 
  MapPin, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  Phone, 
  Mail, 
  Award,
  CheckCircle,
  GraduationCap,
  Download,
  Share2
} from 'lucide-react';
// @ts-ignore
import unlockNaijaHero from '../assets/images/unlock_naija_hero_1780406998025.png';

interface UnlockNaijaPageProps {
  onAddSubscriber?: (sub: { code: string; name: string; email: string; interests: string[] }) => void;
}

export default function UnlockNaijaPage({ onAddSubscriber }: UnlockNaijaPageProps) {
  // Form fields state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [stateOfResidence, setStateOfResidence] = useState('');
  const [educationalStatus, setEducationalStatus] = useState('');
  const [profession, setProfession] = useState('');
  const [motivation, setMotivation] = useState('');

  // Interactive UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredMember, setRegisteredMember] = useState<{
    memberId: string;
    fullName: string;
    email: string;
    phone: string;
    stateOfResidence: string;
    date: string;
  } | null>(null);

  // Form error notification
  const [errorMsg, setErrorMsg] = useState('');

  const NIGERIAN_STATES = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe', 
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 
    'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 
    'Taraba', 'Yobe', 'Zamfara'
  ];

  const EDUCATION_STATUSES = [
    'Secondary/High School Certificate',
    'National Diploma/HND',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctorate (PhD)',
    'Other Professional Certification'
  ];

  const handleJoinSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Field val
    if (!fullName.trim() || !email.trim() || !phone.trim() || !stateOfResidence || !profession.trim()) {
      setErrorMsg('Please populate all required fields (*) marked to establish registration.');
      return;
    }

    setIsSubmitting(true);

    // Simulate database record entry after slight network delay
    setTimeout(() => {
      const uniqueId = `UN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const member = {
        memberId: uniqueId,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        stateOfResidence,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      setRegisteredMember(member);
      setIsSubmitting(false);

      // If subscriber integration provided, map them as local subscriber too
      if (onAddSubscriber) {
        onAddSubscriber({
          code: uniqueId,
          name: fullName.trim(),
          email: email.trim(),
          interests: ['Unlock Naija Movement', 'Civic Action Assemblies']
        });
      }
    }, 1200);
  };

  const resetForm = () => {
    setRegisteredMember(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setStateOfResidence('');
    setEducationalStatus('');
    setProfession('');
    setMotivation('');
  };

  return (
    <div className="bg-[#F7F3EC] min-h-[85vh] py-16 text-justify">
      <div className="max-w-[960px] mx-auto px-6 sm:px-12 md:px-16">
        
        {/* Breadcrumb-style metadata */}
        <div className="mb-4">
          <span className="font-sans text-[11px] font-bold tracking-[0.25em] text-[#9B7A2F] uppercase block">
            INITIATIVE
          </span>
        </div>

        {/* Head Title & Tagline */}
        <div className="mb-12">
          <h1 className="font-serif text-[42px] sm:text-[60px] font-black tracking-tight leading-[1.05] text-[#121212] mb-4">
            Unlock Naija
          </h1>
          <p className="font-serif text-[20px] sm:text-[23px] text-[#444444] italic font-medium tracking-tight border-b border-[#D8D0C0] pb-6">
            A national movement. Youth as catalysts, not spectators.
          </p>
        </div>

        {/* Featured conference image: "Osita Chidoka at conference" */}
        <div className="w-full h-auto max-h-[480px] overflow-hidden border border-[#D8D0C0] rounded-sm mb-16 shadow-sm relative group">
          <img 
            src={unlockNaijaHero} 
            alt="Osita Chidoka addressing youth conference" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale-[25%] contrast-[1.05] group-hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#121212]/80 to-transparent p-6 text-white">
            <span className="font-mono text-[10px] tracking-widest text-[#9B7A2F] block mb-1 uppercase font-semibold">CAMPUS PLENARY CONGREGATION</span>
            <p className="font-sans text-[12px] sm:text-[13px] text-[#C2BAA8]">
              Chancellor Osita Chidoka delivering the inaugural keynote on systemic discipline to over 1,500 delegates.
            </p>
          </div>
        </div>

        {/* The Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-20 items-start">
          <div className="col-span-1">
            <h2 className="font-serif text-[24px] sm:text-[28px] font-bold tracking-tight text-[#121212] leading-none mb-4">
              The Mission
            </h2>
            <div className="w-12 h-1 bg-[#9B7A2F] rounded-sm" />
          </div>
          
          <div className="col-span-2">
            <p className="font-serif text-[18px] sm:text-[20px] text-[#121212] leading-relaxed mb-6 font-semibold italic text-slate-800">
              Unlock Naija is a youth-oriented social action group empowering young Nigerians to become catalysts for positive change at every level of society.
            </p>
            <p className="font-sans text-[15.5px] text-[#7A7A7A] leading-relaxed">
              We believe Nigeria's transformation begins with organised, disciplined, and purpose-driven young people who understand how systems work — and how to change them. Standard complaints are static; only system coordination produces moving accountability.
            </p>
          </div>
        </div>

        {/* Pillars Section */}
        <div className="border-t border-[#D8D0C0] pt-16 mb-20">
          <div className="mb-12">
            <span className="font-sans text-[11px] font-bold tracking-[0.25em] text-[#9B7A2F] uppercase block mb-2">SYSTEMIC PILLARS</span>
            <h2 className="font-serif text-[32px] font-black text-[#121212] tracking-tight">Our Pillars of Civic Progress</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <div className="border border-[#D8D0C0] p-6 bg-white/20 rounded-sm hover:-translate-y-1 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-[#121212] border border-[#9B7A2F] flex items-center justify-center text-white mb-5">
                <Compass size={18} className="text-[#9B7A2F]" />
              </div>
              <h3 className="font-serif text-[20px] font-bold tracking-tight text-[#121212] mb-3">Civic Education</h3>
              <p className="font-sans text-[14.5px] text-[#7A7A7A] leading-relaxed">
                Understanding how governance works — and how citizens can shape it. We decode public finance, legislative drafting, and biometric civil databases.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="border border-[#D8D0C0] p-6 bg-white/20 rounded-sm hover:-translate-y-1 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-[#121212] border border-[#9B7A2F] flex items-center justify-center text-white mb-5">
                <Briefcase size={18} className="text-[#9B7A2F]" />
              </div>
              <h3 className="font-serif text-[20px] font-bold tracking-tight text-[#121212] mb-3">Economic Empowerment</h3>
              <p className="font-sans text-[14.5px] text-[#7A7A7A] leading-relaxed">
                Developing skills, networks, and opportunities for economic participation. Training young builders to leverage digital technology and institutional systems.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="border border-[#D8D0C0] p-6 bg-white/20 rounded-sm hover:-translate-y-1 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-[#121212] border border-[#9B7A2F] flex items-center justify-center text-white mb-5">
                <Users size={18} className="text-[#9B7A2F]" />
              </div>
              <h3 className="font-serif text-[20px] font-bold tracking-tight text-[#121212] mb-3">Community Action</h3>
              <p className="font-sans text-[14.5px] text-[#7A7A7A] leading-relaxed">
                Organising at the grassroots to address real problems in real communities. Building local monitoring councils to track school rehabilitation and local projects.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="border border-[#D8D0C0] p-6 bg-white/20 rounded-sm hover:-translate-y-1 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-[#121212] border border-[#9B7A2F] flex items-center justify-center text-white mb-5">
                <Award size={18} className="text-[#9B7A2F]" />
              </div>
              <h3 className="font-serif text-[20px] font-bold tracking-tight text-[#121212] mb-3">Leadership Development</h3>
              <p className="font-sans text-[14.5px] text-[#7A7A7A] leading-relaxed">
                Preparing the next generation of Nigerians to lead with integrity and competence, embedding ethics and digital database management deep into civil leadership.
              </p>
            </div>
          </div>
        </div>

        {/* Join interactive Form section */}
        <div id="join-movement" className="border border-[#D8D0C0] bg-white rounded-sm overflow-hidden shadow-md relative scroll-mt-20">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#9B7A2F]" />
          
          <AnimatePresence mode="wait">
            {!registeredMember ? (
              <motion.div
                key="join-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 sm:p-12 md:p-16 text-left"
              >
                <div className="mb-8">
                  <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#9B7A2F] uppercase block mb-2">JOIN THE CITIZEN REGISTRY</span>
                  <h2 className="font-serif text-[28px] sm:text-[34px] font-black text-[#121212] tracking-tight">Join the Movement</h2>
                  <p className="font-sans text-[14px] text-[#7A7A7A] mt-2">
                    Open to Nigerians aged 18–35 who are committed to positive change, coordinated system development, and public integrity.
                  </p>
                </div>

                {errorMsg && (
                  <div className="mb-6 p-4 border border-red-200 bg-red-50 text-red-700 font-sans text-xs flex items-center gap-2 rounded-sm">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleJoinSubmit} className="flex flex-col gap-6 font-sans">
                  
                  {/* Full Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10.5px] font-bold text-[#7A7A7A] tracking-wider uppercase">
                        Full Name *
                      </label>
                      <input 
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="bg-[#F7F3EC]/40 border border-[#D8D0C0] focus:border-[#9B7A2F] outline-none p-3 text-sm text-[#121212] rounded-sm transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10.5px] font-bold text-[#7A7A7A] tracking-wider uppercase">
                        Email *
                      </label>
                      <input 
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="bg-[#F7F3EC]/40 border border-[#D8D0C0] focus:border-[#9B7A2F] outline-none p-3 text-sm text-[#121212] rounded-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & State */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10.5px] font-bold text-[#7A7A7A] tracking-wider uppercase flex items-center gap-1">
                        <Phone size={12} className="text-[#9B7A2F]" /> Phone *
                      </label>
                      <input 
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234..."
                        className="bg-[#F7F3EC]/40 border border-[#D8D0C0] focus:border-[#9B7A2F] outline-none p-3 text-sm text-[#121212] rounded-sm transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10.5px] font-bold text-[#7A7A7A] tracking-wider uppercase flex items-center gap-1">
                        <MapPin size={12} className="text-[#9B7A2F]" /> State of Residence *
                      </label>
                      <select
                        required
                        value={stateOfResidence}
                        onChange={(e) => setStateOfResidence(e.target.value)}
                        className="bg-[#F7F3EC]/40 border border-[#D8D0C0] focus:border-[#9B7A2F] outline-none p-3 text-sm text-[#121212] rounded-sm"
                      >
                        <option value="">Select state</option>
                        {NIGERIAN_STATES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Educational Status & Profession */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10.5px] font-bold text-[#7A7A7A] tracking-wider uppercase flex items-center gap-1">
                        <GraduationCap size={12} className="text-[#9B7A2F]" /> Educational Status
                      </label>
                      <select
                        value={educationalStatus}
                        onChange={(e) => setEducationalStatus(e.target.value)}
                        className="bg-[#F7F3EC]/40 border border-[#D8D0C0] focus:border-[#9B7A2F] outline-none p-3 text-sm text-[#121212] rounded-sm"
                      >
                        <option value="">Select</option>
                        {EDUCATION_STATUSES.map((ed) => (
                          <option key={ed} value={ed}>{ed}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10.5px] font-bold text-[#7A7A7A] tracking-wider uppercase">
                        Profession *
                      </label>
                      <input 
                        type="text"
                        required
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        placeholder="Your current occupation"
                        className="bg-[#F7F3EC]/40 border border-[#D8D0C0] focus:border-[#9B7A2F] outline-none p-3 text-sm text-[#121212] rounded-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Motivation detailed query */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10.5px] font-bold text-[#7A7A7A] tracking-wider uppercase">
                      Why do you want to join Unlock Naija?
                    </label>
                    <textarea
                      rows={4}
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                      placeholder="Tell us your motivation..."
                      className="bg-[#F7F3EC]/40 border border-[#D8D0C0] focus:border-[#9B7A2F] outline-none p-3.5 text-sm text-[#121212] rounded-sm leading-relaxed"
                    />
                  </div>

                  {/* Terms indicator */}
                  <p className="text-[11.5px] text-[#7A7A7A] italic leading-relaxed mt-1">
                    By submitting your credentials, you commit to upholding the values of disciplined national engagement, community-driven accountability, and non-violence in civil affairs.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-white bg-[#121212] hover:bg-[#9B7A2F] py-4 px-8 rounded-sm cursor-pointer border-none transition-colors mt-4 text-center flex items-center justify-center gap-2 self-start hover:shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Verifying Registry...' : 'Join Now'} <ArrowRight size={13} />
                  </button>
                </form>
              </motion.div>
            ) : (
              /* Success Registry Screen with dynamic high-fidelity member badge */
              <motion.div
                key="join-success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-12 md:p-16 text-center text-justify"
              >
                <div className="max-w-[460px] mx-auto text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle size={36} />
                  </div>
                  
                  <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-emerald-800 uppercase block mb-1">
                    REGISTRATION SUCCESSFUL
                  </span>
                  <h3 className="font-serif text-[24px] sm:text-[28px] font-bold text-[#121212] mb-3 tracking-tight">
                    Welcome to the Movement
                  </h3>
                  <p className="font-sans text-[13.5px] text-[#7A7A7A] leading-relaxed mb-8">
                    Your credentials have been authenticated and filed into the national Unlock Naija civilian database registry. An institutional officer will contact you within 72 hours with assembly details.
                  </p>
                </div>

                {/* Aesthetic Civic Membership card */}
                <div className="max-w-[480px] mx-auto bg-[#121212] border border-[#9B7A2F] text-white p-6 rounded-md relative overflow-hidden shadow-lg mt-2 mb-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#9B7A2F]/5 rounded-full -mr-10 -mt-10" />
                  
                  <div className="flex justify-between items-start mb-10 pb-4 border-b border-white/10">
                    <div>
                      <h4 className="font-serif text-[18px] font-semibold text-white tracking-wide">Unlock Naija</h4>
                      <span className="font-mono text-[9px] tracking-widest text-[#9B7A2F] uppercase">CIVILIAN CATALYST CARD</span>
                    </div>
                    <Sparkles size={20} className="text-[#9B7A2F] animate-pulse" />
                  </div>

                  {/* Card Details */}
                  <div className="flex flex-col gap-6 relative">
                    <div className="flex justify-between items-end gap-1">
                      <div>
                        <span className="text-[9px] text-[#7A7A7A] uppercase block">NAME</span>
                        <span className="font-serif text-[18px] font-bold text-white tracking-wide">{registeredMember.fullName}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-[#7A7A7A] uppercase block">STATE HUB</span>
                        <span className="font-mono text-[13px] text-white">{registeredMember.stateOfResidence.toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end gap-1 pt-2 border-t border-white/5">
                      <div>
                        <span className="text-[9px] text-[#7A7A7A] uppercase block">SUBSCRIBED EMAIL</span>
                        <span className="font-mono text-[12px] text-zinc-300">{registeredMember.email}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-[#7A7A7A] uppercase block">CATALYST NO.</span>
                        <span className="font-mono text-[14px] font-bold text-[#9B7A2F] tracking-widest">{registeredMember.memberId}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Printable controls */}
                <div className="max-w-[480px] mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => {
                      alert('Downloading catalog membership credential pass directly...');
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 font-sans text-[11px] font-bold tracking-widest uppercase bg-[#121212] hover:bg-[#9B7A2F] text-white px-5 py-3 rounded-sm cursor-pointer transition-colors border-none"
                  >
                    Download Pass <Download size={14} />
                  </button>
                  
                  <button
                    onClick={resetForm}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 font-sans text-[11px] font-bold tracking-widest uppercase bg-transparent hover:bg-neutral-100 text-[#121212] border border-[#D8D0C0] px-5 py-3 rounded-sm cursor-pointer transition-all"
                  >
                    Establish Another Registry
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
