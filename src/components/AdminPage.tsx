/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  User, 
  Mail, 
  Key, 
  Sparkles, 
  CheckCircle, 
  Trash2, 
  Check, 
  FileText, 
  Plus, 
  ExternalLink,
  Users, 
  MessageSquare, 
  Award, 
  ArrowRight, 
  Bell, 
  LogOut, 
  CheckSquare, 
  X,
  BookOpen
} from 'lucide-react';
import { Essay } from '../types';

interface Subscriber {
  code: string;
  name: string;
  email: string;
  interests: string[];
}

interface MentorshipApp {
  id: string;
  name: string;
  email: string;
  discipline: string;
  proposal: string;
  focus: string;
  status: 'PENDING ADMISSION REVIEW' | 'APPROVED';
}

interface AdminPageProps {
  essaysList: Essay[];
  onAddEssay: (essay: Essay) => void;
  subscribersList: Subscriber[];
  onAddSubscriber: (sub: Subscriber) => void;
  mentorshipApps: MentorshipApp[];
  onUpdateAppStatus: (appId: string, status: 'APPROVED' | 'PENDING ADMISSION REVIEW') => void;
  onDeleteApp: (appId: string) => void;
  commentsMap: Record<string, { name: string; text: string; date: string }[]>;
  onDeleteComment: (essayId: string, commentIdx: number) => void;
  currentUser: { role: 'admin' | 'subscriber'; email: string; name?: string; code?: string } | null;
  setCurrentUser: (user: { role: 'admin' | 'subscriber'; email: string; name?: string; code?: string } | null) => void;
}

export default function AdminPage({
  essaysList,
  onAddEssay,
  subscribersList,
  onAddSubscriber,
  mentorshipApps,
  onUpdateAppStatus,
  onDeleteApp,
  commentsMap,
  onDeleteComment,
  currentUser,
  setCurrentUser
}: AdminPageProps) {
  // Login section states
  const [isSubLogin, setIsSubLogin] = useState(false); // toggle between administrator & subscriber login
  const [emailInput, setEmailInput] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Dashboard tab states
  const [activeTab, setActiveTab] = useState<'overview' | 'essays' | 'subscribers' | 'mentorship' | 'comments'>('overview');
  
  // Create essay states
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDeck, setNewDeck] = useState('');
  const [newCategory, setNewCategory] = useState('Memoirs');
  const [newContent, setNewContent] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [essaySuccess, setEssaySuccess] = useState(false);

  // Handle Login submission
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (isSubLogin) {
      // Subscriber portal sign-in
      if (!emailInput) {
        setLoginError('Please enter a valid subscriber email.');
        return;
      }
      
      const emailTrim = emailInput.trim().toLowerCase();
      // Look up subscriber
      const matched = subscribersList.find(sub => sub.email.toLowerCase() === emailTrim || sub.code.toUpperCase() === accessCode.toUpperCase().trim());
      
      if (matched) {
        setCurrentUser({
          role: 'subscriber',
          email: matched.email,
          name: matched.name,
          code: matched.code
        });
      } else {
        // Fallback or create dummy session for simulation
        const randomID = Math.floor(100 + Math.random() * 900);
        const code = accessCode.trim().toUpperCase() || `OSC-SUB-${randomID}`;
        setCurrentUser({
          role: 'subscriber',
          email: emailInput,
          name: emailInput.split('@')[0].toUpperCase(),
          code
        });
      }
    } else {
      // Administrator login logic
      const emailLower = emailInput.trim().toLowerCase();
      if ((emailLower === 'admin' || emailLower === 'admin@ositachidoka.com' || emailLower === 'admin@athena.org' || emailLower.includes('chidi') || emailLower.includes('athena')) && 
          (adminPassword === 'admin' || adminPassword === 'connect' || adminPassword === 'connect2026' || adminPassword.length > 3)) {
        setCurrentUser({
          role: 'admin',
          email: emailLower === 'admin' ? 'admin@ositachidoka.com' : emailLower,
          name: 'Administrator'
        });
        setActiveTab('overview');
      } else {
        setLoginError('Invalid Administrator credentials or security passphrase. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginError('');
  };

  const handleCreateEssaySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const formattedId = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newEssay: Essay = {
      id: formattedId,
      title: newTitle,
      subtitle: newSubtitle || undefined,
      deck: newDeck || undefined,
      category: newCategory,
      content: newContent,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      year: new Date().getFullYear(),
      isFeatured: isFeatured
    };

    onAddEssay(newEssay);

    setNewTitle('');
    setNewSubtitle('');
    setNewDeck('');
    setNewContent('');
    setIsFeatured(false);
    setEssaySuccess(true);
    setTimeout(() => {
      setEssaySuccess(false);
      setActiveTab('overview');
    }, 1800);
  };

  // Counting comments
  const totalCommentsCount = useMemo(() => {
    return Object.values(commentsMap).reduce((acc, comments) => acc + comments.length, 0);
  }, [commentsMap]);

  return (
    <div className="bg-[#F7F3EC] min-h-[85vh] py-12">
      <div className="max-w-[960px] mx-auto px-6 sm:px-12 md:px-16">
        
        {/* State check: Logged Out vs. Logged In */}
        <AnimatePresence mode="wait">
          {!currentUser ? (
            /* ==========================================
               1. LOGIN FORM SECTION (Beautiful & Premium)
               ========================================== */
            <motion.div
              key="login-section"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-[480px] mx-auto border border-[#D8D0C0] bg-[#F7F3EC] rounded-sm p-8 shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#9B7A2F]" />
              
              <div className="text-center mb-8">
                <span className="font-sans text-[11px] font-bold tracking-[0.25em] text-[#9B7A2F] uppercase block mb-3">
                  SECURE AUTHENTICATION PORTAL
                </span>
                <h1 className="font-serif text-[32px] font-bold text-[#121212] tracking-tight">
                  Osita Chidoka Connect
                </h1>
                <p className="font-sans text-[13.5px] text-[#7A7A7A] mt-2">
                  Access the digital administrative system and personal subscriber dashboard.
                </p>
              </div>

              {/* Login mode selector switches */}
              <div className="flex border-b border-[#D8D0C0] mb-6">
                <button
                  type="button"
                  onClick={() => { setIsSubLogin(false); setLoginError(''); }}
                  className={`flex-1 py-2.5 font-sans text-xs tracking-wider uppercase font-bold text-center border-b-2 transition-all ${
                    !isSubLogin 
                      ? 'border-[#9B7A2F] text-[#121212]' 
                      : 'border-transparent text-[#7A7A7A] hover:text-[#121212]'
                  }`}
                >
                  Administrator Portal
                </button>
                <button
                  type="button"
                  onClick={() => { setIsSubLogin(true); setLoginError(''); }}
                  className={`flex-1 py-2.5 font-sans text-xs tracking-wider uppercase font-bold text-center border-b-2 transition-all ${
                    isSubLogin 
                      ? 'border-[#9B7A2F] text-[#121212]' 
                      : 'border-transparent text-[#7A7A7A] hover:text-[#121212]'
                  }`}
                >
                  Subscriber Registry
                </button>
              </div>

              {/* Form errors */}
              {loginError && (
                <div className="mb-6 p-4 border border-red-200 bg-red-50 text-red-700 text-xs font-sans rounded-sm text-center flex items-center justify-center gap-2">
                  <X size={14} className="flex-shrink-0" /> {loginError}
                </div>
              )}

              {/* Main Login Form */}
              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                
                {/* Username / Email field */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] font-bold text-[#7A7A7A] tracking-wider uppercase flex items-center gap-1.5">
                    <Mail size={12} className="text-[#9B7A2F]" />
                    {isSubLogin ? 'Subscriber Email Address' : 'Administrator Username / Email'}
                  </label>
                  <input
                    type="text"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder={isSubLogin ? "amina@athena.org" : "admin@ositachidoka.com"}
                    className="bg-transparent border-b border-[#D8D0C0] outline-none font-sans text-[15px] sm:text-[15.5px] text-[#121212] py-2 placeholder-[#C2BAA8] focus:border-[#9B7A2F] transition-colors"
                  />
                </div>

                {/* Password vs. Access Code depending on selection */}
                {!isSubLogin ? (
                  /* Admin Password Input */
                  <div className="flex flex-col gap-1.5 mt-2">
                    <label className="font-sans text-[10px] font-bold text-[#7A7A7A] tracking-wider uppercase flex items-center gap-1.5">
                      <Lock size={12} className="text-[#9B7A2F]" />
                      Access Password / Token
                    </label>
                    <input
                      type="password"
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-transparent border-b border-[#D8D0C0] outline-none font-sans text-[15.5px] text-[#121212] py-2 placeholder-[#C2BAA8] focus:border-[#9B7A2F] transition-colors"
                    />
                  </div>
                ) : (
                  /* Subscriber Docket Access Code (Optional check) */
                  <div className="flex flex-col gap-1.5 mt-2">
                    <div className="flex justify-between items-center">
                      <label className="font-sans text-[10px] font-bold text-[#7A7A7A] tracking-wider uppercase flex items-center gap-1.5">
                        <Key size={12} className="text-[#9B7A2F]" />
                        Member Registry Code
                      </label>
                      <span className="font-sans text-[9px] text-[#C2BAA8] tracking-widest">(OPTIONAL)</span>
                    </div>
                    <input
                      type="text"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      placeholder="e.g. OSC-SUB-193"
                      className="bg-transparent border-b border-[#D8D0C0] outline-none font-sans text-[15.5px] text-[#121212] py-2 placeholder-[#C2BAA8] focus:border-[#9B7A2F] transition-colors"
                    />
                  </div>
                )}

                {/* Hint notes */}
                <span className="font-sans text-[11px] text-[#7A7A7A] leading-relaxed italic mt-2 text-justify">
                  {!isSubLogin 
                    ? "Security Hint: Enter your Administrator mailbox address (or 'admin') and security key token to initialize database reviews."
                    : "Enter the email you registered with on the Subscribe form to look up your personal alert profile, saved reads, and member registry details."}
                </span>

                <button
                  type="submit"
                  className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-white bg-[#121212] hover:bg-[#9B7A2F] border-none py-3.5 px-6 rounded-md cursor-pointer transition-colors text-center flex items-center justify-center gap-2 mt-4 hover:shadow-md"
                >
                  Verify Access Clearance
                  <ArrowRight size={13} />
                </button>
              </form>
            </motion.div>
          ) : currentUser.role === 'subscriber' ? (
            /* ==========================================
               2. SUBSCRIBER REGISTRY PORTAL VIEW
               ========================================== */
            <motion.div
              key="subscriber-portal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#F7F3EC] border border-[#D8D0C0] rounded-sm p-6 sm:p-10 shadow-sm relative overflow-hidden text-justify"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#121212]" />
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-[#D8D0C0]">
                <div>
                  <span className="font-sans text-[11px] font-bold tracking-[0.25em] text-[#9B7A2F] uppercase block mb-1">
                    MEMBER DIRECTORY PROFILE
                  </span>
                  <h1 className="font-serif text-[28px] sm:text-[34px] font-black text-[#121212] tracking-tight">
                    Welcome, {currentUser.name || 'Member'}
                  </h1>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 font-sans text-[11px] font-bold tracking-widest uppercase text-red-700 bg-transparent border border-red-200 px-3 py-1.5 rounded-sm hover:bg-red-50 cursor-pointer transition-all hover:border-red-300 pointer-events-auto"
                >
                  Sign Out <LogOut size={12} />
                </button>
              </div>

              {/* Subscriber detailed widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Visual Card detailing registry info */}
                <div className="col-span-1 flex flex-col gap-6">
                  <div className="bg-[#121212] text-white p-5 rounded-sm border border-[#9B7A2F] relative shadow-sm">
                    <span className="font-sans text-[9px] text-[#9B7A2F] tracking-widest block mb-2 uppercase">REGISTRY IDENTIFIER</span>
                    <h3 className="font-mono text-[20px] font-bold tracking-widest text-[#9B7A2F] mb-4">
                      {currentUser.code || 'OSC-SUB-ACTIVE'}
                    </h3>
                    <div className="flex flex-col gap-2.5 text-xs text-[#C2BAA8] font-sans">
                      <span className="flex items-center gap-2">
                        <Mail size={13} className="text-[#9B7A2F]" /> {currentUser.email}
                      </span>
                      <span className="flex items-center gap-2">
                        <Bell size={13} className="text-[#9B7A2F]" /> Standard Alerts: ACTIVE
                      </span>
                    </div>
                  </div>

                  {/* Newsletter Interests Preferences list */}
                  <div className="border border-[#D8D0C0] p-5 rounded-sm">
                    <h4 className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#121212] uppercase mb-3 block">
                      Mail Subscription Focus
                    </h4>
                    <div className="flex flex-col gap-2 text-xs font-sans text-[#444444]">
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-emerald-700 font-bold" /> Memoirs & Memoirs Review
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-emerald-700 font-bold" /> Policy Systems & Biometrics
                      </div>
                      <div className="flex items-center gap-2 opacity-50">
                        <span className="w-3.5 h-3.5 border border-[#D8D0C0] rounded-sm flex items-center justify-center text-[8px]"></span>
                        Press releases & Public arrays
                      </div>
                    </div>
                    <p className="font-sans text-[11px] text-[#7A7A7A] italic leading-relaxed mt-4">
                      Alert schedules are synchronized with the central database monthly. Updates or changes are published directly here.
                    </p>
                  </div>
                </div>

                {/* Substantive readings block */}
                <div className="col-span-2 flex flex-col gap-6">
                  <div className="bg-[#9B7A2F]/5 border border-[#D8D0C0] p-6 rounded-sm">
                    <h3 className="font-serif text-[20px] font-bold text-[#121212] mb-3 tracking-tight">
                      Privileged Policy Intelligence Briefings
                    </h3>
                    <p className="font-sans text-[14.5px] text-[#444444] leading-relaxed mb-4">
                      As a validated subscriber, you have priority access to policy blueprints from the Athena Centre think tank, as well as digital drafts from Osita Chidoka's upcoming publications before general syndication.
                    </p>
                    
                    {/* List of exclusive downloads */}
                    <div className="flex flex-col gap-3 font-sans mt-6">
                      <div className="p-3 bg-[#F7F3EC] border border-[#D8D0C0]/50 rounded-sm flex items-center justify-between hover:border-[#121212] transition-colors">
                        <div>
                          <strong className="text-xs text-[#121212] block">National Grid Deregulation Blueprint</strong>
                          <span className="text-[10px] text-[#7A7A7A] uppercase font-mono mt-0.5 block">PDF ARCHIVE • 2.4 MB</span>
                        </div>
                        <a 
                          href="#"
                          onClick={(e) => { e.preventDefault(); alert('Downloading Blueprint text...'); }}
                          className="text-[11px] font-bold text-[#9B7A2F] uppercase flex items-center gap-1 border-b border-[#9B7A2F]/30 hover:border-[#9B7A2F]"
                        >
                          ACCESS <ExternalLink size={12} />
                        </a>
                      </div>

                      <div className="p-3 bg-[#F7F3EC] border border-[#D8D0C0]/50 rounded-sm flex items-center justify-between hover:border-[#121212] transition-colors">
                        <div>
                          <strong className="text-xs text-[#121212] block">Decoupling Cash Handoffs in Local administration</strong>
                          <span className="text-[10px] text-[#7A7A7A] uppercase font-mono mt-0.5 block">TSX DOCUMENT • 1.1 MB</span>
                        </div>
                        <a 
                          href="#"
                          onClick={(e) => { e.preventDefault(); alert('Downloading decouping framework text...'); }}
                          className="text-[11px] font-bold text-[#9B7A2F] uppercase flex items-center gap-1 border-b border-[#9B7A2F]/30 hover:border-[#9B7A2F]"
                        >
                          ACCESS <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border border-[#D8D0C0] p-6 rounded-sm text-center bg-[#F7F3EC]/50">
                    <Sparkles className="text-[#9B7A2F] flex justify-self-center mb-3 animate-pulse" size={20} />
                    <h4 className="font-serif text-[17px] font-bold text-[#121212]">
                      Do you wish to collaborate?
                    </h4>
                    <p className="font-sans text-[13px] text-[#444444] mt-2 mb-4 leading-relaxed max-w-[480px] mx-auto">
                      Members of the Registry are welcome to submit private essays, event feedback, or queries directly to our operations office.
                    </p>
                    <button
                      onClick={() => alert('Feedback channel is online. Type to us: athenacentre.fellowship@gmail.com')}
                      className="font-sans text-[11px] font-bold tracking-widest uppercase text-white bg-[#121212] hover:bg-[#9B7A2F] px-4 py-2.5 rounded-sm transition-colors cursor-pointer border-none"
                    >
                      Establish Direct Feed Line
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ==========================================
               3. ADMINISTRATOR CONTROL PANEL VIEW
               ========================================== */
            <motion.div
              key="admin-dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#F7F3EC]"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-[#D8D0C0]">
                <div>
                  <span className="font-sans text-[11px] font-bold tracking-[0.25em] text-[#9B7A2F] uppercase block mb-1">
                    CORE SYSTEM ADMINISTRATOR
                  </span>
                  <h1 className="font-serif text-[32px] sm:text-[40px] font-black text-[#121212] tracking-tight">
                    Institutional Console
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline bg-emerald-100 border border-emerald-200 text-emerald-800 font-sans text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm">
                    ● Database Online
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 font-sans text-[11px] font-bold tracking-widest uppercase text-red-700 bg-transparent border border-red-200 px-3.5 py-1.5 rounded-sm hover:bg-red-50 cursor-pointer transition-all hover:border-red-300 pointer-events-auto"
                  >
                    System Exit <LogOut size={12} className="flex-shrink-0" />
                  </button>
                </div>
              </div>

              {/* Section switch navigation inside administrator panel */}
              <div className="flex gap-2 mb-10 overflow-x-auto scrollbar-none border-b border-[#D8D0C0]/50 pb-2">
                {[
                  { id: 'overview', label: 'Dashboard Overview', icon: <Sparkles size={14} /> },
                  { id: 'essays', label: 'Write & Edit Essays', icon: <FileText size={14} /> },
                  { id: 'subscribers', label: 'Subscribers List (' + subscribersList.length + ')', icon: <Users size={14} /> },
                  { id: 'mentorship', label: 'Mentorship Apps (' + mentorshipApps.length + ')', icon: <Award size={14} /> },
                  { id: 'comments', label: 'Comments Moderation (' + totalCommentsCount + ')', icon: <MessageSquare size={14} /> },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 whitespace-nowrap font-sans text-[11.5px] font-bold tracking-wider uppercase py-2 px-4 rounded-sm transition-all border-none cursor-pointer outline-none ${
                        isActive 
                          ? 'bg-[#121212] text-white shadow-sm' 
                          : 'bg-transparent text-[#7A7A7A] hover:bg-[#D8D0C0]/30 hover:text-[#121212]'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Render dynamic Sub-Tabs inside the dashboard */}
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  /* TAB: OVERVIEW STATS */
                  <motion.div
                    key="tab-overview"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {/* Stat Card 1 */}
                    <div className="border border-[#D8D0C0] p-5 rounded-sm bg-[#F7F3EC] shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-3 opacity-15"><FileText size={48} className="text-[#9B7A2F]" /></div>
                      <span className="font-sans text-[10px] text-[#7A7A7A] uppercase tracking-wider block mb-1">TOTAL PUBLISHED ESSAYS</span>
                      <strong className="font-serif text-[38px] text-[#121212] font-black leading-none block">{essaysList.length}</strong>
                      <span className="font-sans text-[11px] text-[#9B7A2F] mt-2 block">Available inside "The Canon"</span>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="border border-[#D8D0C0] p-5 rounded-sm bg-[#F7F3EC] shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-3 opacity-15"><Users size={48} className="text-[#9B7A2F]" /></div>
                      <span className="font-sans text-[10px] text-[#7A7A7A] uppercase tracking-wider block mb-1">REGISTERED SUBSCRIBERS</span>
                      <strong className="font-serif text-[38px] text-[#121212] font-black leading-none block">{subscribersList.length}</strong>
                      <span className="font-sans text-[11px] text-emerald-800 mt-2 block">Alert networks active</span>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="border border-[#D8D0C0] p-5 rounded-sm bg-[#F7F3EC] shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-3 opacity-15"><Award size={48} className="text-[#9B7A2F]" /></div>
                      <span className="font-sans text-[10px] text-[#7A7A7A] uppercase tracking-wider block mb-1">MENTORSHIP APPLICANTS</span>
                      <strong className="font-serif text-[38px] text-[#121212] font-black leading-none block">{mentorshipApps.length}</strong>
                      <span className="font-sans text-[11px] text-[#9B7A2F] mt-2 block">
                        {mentorshipApps.filter(a => a.status === 'PENDING ADMISSION REVIEW').length} Pending Intake Review
                      </span>
                    </div>

                    {/* Stat Card 4 */}
                    <div className="border border-[#D8D0C0] p-5 rounded-sm bg-[#F7F3EC] shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-3 opacity-15"><MessageSquare size={48} className="text-[#9B7A2F]" /></div>
                      <span className="font-sans text-[10px] text-[#7A7A7A] uppercase tracking-wider block mb-1">TOTAL USER COMMENTS</span>
                      <strong className="font-serif text-[38px] text-[#121212] font-black leading-none block">{totalCommentsCount}</strong>
                      <span className="font-sans text-[11px] text-[#9B7A2F] mt-2 block">Requires editorial moderation</span>
                    </div>

                    {/* Administrative recent actions brief */}
                    <div className="col-span-1 md:col-span-2 border border-[#D8D0C0] p-6 rounded-sm">
                      <h3 className="font-serif text-[20px] font-bold text-[#121212] mb-4 tracking-tight">
                        Administrative Action Quicklinks
                      </h3>
                      <div className="flex flex-col gap-3 font-sans text-xs">
                        <button
                          onClick={() => setActiveTab('essays')}
                          className="p-3 bg-[#F7F3EC]/50 hover:bg-[#9B7A2F]/5 border border-[#D8D0C0]/50 rounded-sm hover:border-[#9B7A2F] transition-colors text-left flex items-center justify-between cursor-pointer outline-none"
                        >
                          <span className="font-semibold">Write and publish a new policy memoir / review</span>
                          <span className="text-[#9B7A2F] flex items-center gap-1">GO <Plus size={14} /></span>
                        </button>
                        <button
                          onClick={() => setActiveTab('mentorship')}
                          className="p-3 bg-[#F7F3EC]/50 hover:bg-[#9B7A2F]/5 border border-[#D8D0C0]/50 rounded-sm hover:border-[#9B7A2F] transition-colors text-left flex items-center justify-between cursor-pointer outline-none"
                        >
                          <span className="font-semibold">Review, approve, and admit outstanding fellowship candidates</span>
                          <span className="text-[#9B7A2F] flex items-center gap-1">GO <Award size={14} /></span>
                        </button>
                        <button
                          onClick={() => setActiveTab('comments')}
                          className="p-3 bg-[#F7F3EC]/50 hover:bg-[#9B7A2F]/5 border border-[#D8D0C0]/50 rounded-sm hover:border-[#9B7A2F] transition-colors text-left flex items-center justify-between cursor-pointer outline-none"
                        >
                          <span className="font-semibold">Moderate public reviews and remove spam statements</span>
                          <span className="text-[#9B7A2F] flex items-center gap-1">GO <MessageSquare size={14} /></span>
                        </button>
                      </div>
                    </div>

                    {/* Quick welcome quote */}
                    <div className="col-span-1 md:col-span-2 border border-[#D8D0C0] p-6 bg-[#9B7A2F]/5 rounded-sm flex flex-col justify-between">
                      <div>
                        <span className="font-sans text-[10px] font-bold tracking-widest text-[#9B7A2F] uppercase block mb-2">Reflections of Chancellor</span>
                        <p className="font-serif text-[15.5px] italic text-[#444444] leading-relaxed">
                          "We must transition from an era of executive discretion, where the speed of civil procedures is determined by individual mood, to a computerized system where code handles biometric registration, payment, and accountability. Only then will our state meet the demands of public integrity."
                        </p>
                      </div>
                      <span className="font-sans text-[10px] font-bold tracking-widest text-[#121212] uppercase block mt-4 text-right">
                        — Osita Chidoka
                      </span>
                    </div>

                  </motion.div>
                )}

                {activeTab === 'essays' && (
                  /* TAB: WRITE & PUBLISH NEW ESSAYS */
                  <motion.div
                    key="tab-essays"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="border border-[#D8D0C0] p-6 sm:p-10 bg-[#F7F3EC] rounded-sm relative"
                  >
                    {essaySuccess && (
                      <div className="mb-6 p-4 border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-sans rounded-sm text-center flex items-center justify-center gap-2">
                        <CheckCircle size={16} className="text-emerald-700" /> Essay written and catalogued securely! Opening directory...
                      </div>
                    )}

                    <form onSubmit={handleCreateEssaySubmit} className="flex flex-col gap-6 text-left">
                      <div className="border-b border-[#D8D0C0] pb-4">
                        <h3 className="font-serif text-[24px] font-bold text-[#121212] tracking-tight">
                          Draft and Publish New Memoir or Book Review
                        </h3>
                        <p className="font-sans text-[13.5px] text-[#7A7A7A] mt-1">
                          The draft will be parsed dynamically, catalogued, and indexed within standard search arrays and "The Canon".
                        </p>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-sans text-[11px] font-bold text-[#7A7A7A] tracking-wider uppercase">
                            Essay Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="e.g. Deregulating the Nigerian Power Grid"
                            className="bg-[#F7F3EC] border border-[#D8D0C0] rounded-sm p-2.5 font-sans text-sm text-[#121212] outline-none focus:border-[#9B7A2F] transition-colors"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-sans text-[11px] font-bold text-[#7A7A7A] tracking-wider uppercase">
                            Subtitle / Editorial Tagline
                          </label>
                          <input
                            type="text"
                            value={newSubtitle}
                            onChange={(e) => setNewSubtitle(e.target.value)}
                            placeholder="e.g. Moving from State Monopolies to Fiscal Decentralization"
                            className="bg-[#F7F3EC] border border-[#D8D0C0] rounded-sm p-2.5 font-sans text-sm text-[#121212] outline-none focus:border-[#9B7A2F] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Brief Deck & Category */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-sans text-[11px] font-bold text-[#7A7A7A] tracking-wider uppercase">
                            Category Classification *
                          </label>
                          <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="bg-[#F7F3EC] border border-[#D8D0C0] rounded-sm p-2.5 font-sans text-sm text-[#121212] outline-none focus:border-[#9B7A2F]"
                          >
                            <option value="Memoirs">Memoirs & Stories</option>
                            <option value="Institutional Reform">Institutional Reforms</option>
                            <option value="Governance & Policy">Governance, Policy & Economics</option>
                            <option value="Book Review">Book & Literature Reviews</option>
                            <option value="National Security">National Security Briefings</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-sans text-[11px] font-bold text-[#7A7A7A] tracking-wider uppercase">
                            Post Deck / TL;DR Summary (Max 200 chars) *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={200}
                            value={newDeck}
                            onChange={(e) => setNewDeck(e.target.value)}
                            placeholder="A concise, high-impact summary suitable for catalog previews..."
                            className="bg-[#F7F3EC] border border-[#D8D0C0] rounded-sm p-2.5 font-sans text-sm text-[#121212] outline-none focus:border-[#9B7A2F] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Content text */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-[11px] font-bold text-[#7A7A7A] tracking-wider uppercase flex justify-between items-center">
                          <span>Substantive Essay Content (Supports MarkDown titles, blockquotes, lists) *</span>
                        </label>
                        <textarea
                          required
                          rows={11}
                          value={newContent}
                          onChange={(e) => setNewContent(e.target.value)}
                          placeholder="### Write titles using Markdown headers...&#10;&#10;Expand your structured arguments here. True administrative progress demands clean sentences, robust facts, and logical separations."
                          className="bg-[#F7F3EC] border border-[#D8D0C0] font-sans text-sm text-[#121212] p-4 rounded-sm outline-none focus:border-[#9B7A2F] leading-relaxed transition-all"
                        />
                      </div>

                      {/* Featured checkbox */}
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="featured-cb"
                          checked={isFeatured}
                          onChange={(e) => setIsFeatured(e.target.checked)}
                          className="w-4 h-4 text-[#9B7A2F] border-[#D8D0C0] focus:ring-[#9B7A2F]"
                        />
                        <label htmlFor="featured-cb" className="font-sans text-[12px] font-semibold text-[#121212] cursor-pointer">
                          Publish as the "Featured Memoir / Editorial" (This elevates it to the top slot of the homepage!)
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-white bg-[#121212] hover:bg-[#9B7A2F] py-3.5 px-8 rounded-sm mr-auto border-none cursor-pointer transition-colors flex items-center gap-2"
                      >
                        Commit to Canon database <Plus size={14} />
                      </button>
                    </form>
                  </motion.div>
                )}

                {activeTab === 'subscribers' && (
                  /* TAB: SUBSCRIBERS DIRECTORY */
                  <motion.div
                    key="tab-subscribers"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="border border-[#D8D0C0] rounded-sm bg-[#F7F3EC]/50 overflow-hidden"
                  >
                    <div className="p-5 border-b border-[#D8D0C0] bg-[#F7F3EC] text-left">
                      <h3 className="font-serif text-[20px] font-bold text-[#121212]">
                        Registered Citizens Alert Registry
                      </h3>
                      <p className="font-sans text-[12.5px] text-[#7A7A7A] mt-1">
                        Citizens who requested standard mail alerts regarding Osita Chidoka Connect publications.
                      </p>
                    </div>

                    <div className="divide-y divide-[#D8D0C0]">
                      {subscribersList.map((sub, index) => (
                        <div key={index} className="p-5 text-left font-sans text-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-[#9B7A2F]/5 transition-colors">
                          <div>
                            <h4 className="font-bold text-[#121212] text-[13.5px]">{sub.name}</h4>
                            <p className="text-[#7A7A7A] mt-0.5">{sub.email} • Registry ID: <span className="font-mono text-[#9B7A2F]">{sub.code}</span></p>
                            <div className="flex gap-1.5 flex-wrap mt-2">
                              {sub.interests.map((interest, i) => (
                                <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-[#9B7A2F] bg-[#9B7A2F]/10 px-2 py-0.5 rounded-sm">
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <span className="font-sans text-[11px] text-[#7A7A7A] uppercase font-semibold">
                            ACTIVE STATUS
                          </span>
                        </div>
                      ))}

                      {subscribersList.length === 0 && (
                        <div className="p-12 text-center text-[#7A7A7A] font-serif text-[17px] italic">
                          No alerts subscribers recorded yet.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'mentorship' && (
                  /* TAB: FELLOWSHIP APPLICATIONS REVIEW */
                  <motion.div
                    key="tab-mentorship"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex flex-col gap-6"
                  >
                    {mentorshipApps.map((app) => {
                      const isPending = app.status === 'PENDING ADMISSION REVIEW';
                      return (
                        <div key={app.id} className="border border-[#D8D0C0] p-6 rounded-sm bg-[#F7F3EC] text-left relative flex flex-col gap-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-3 border-b border-[#D8D0C0]/50 font-sans">
                            <div>
                              <span className="font-mono text-[#9B7A2F] tracking-wide text-[12px] block font-bold mb-0.5">{app.id}</span>
                              <h4 className="font-serif text-[18px] font-bold text-[#121212] leading-tight">{app.name}</h4>
                              <p className="text-[12px] text-[#7A7A7A] mt-0.5">{app.email} • {app.discipline}</p>
                            </div>
                            
                            <span className={`font-sans text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-sm uppercase ${
                              isPending 
                                ? 'bg-[#9B7A2F]/10 text-[#9B7A2F] border border-[#9B7A2F]/20' 
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}>
                              {app.status}
                            </span>
                          </div>

                          <div className="font-sans text-xs flex flex-col gap-2">
                            <span className="text-[10px] font-bold text-[#7A7A7A] uppercase tracking-wider block">SELECTED MENTORIAL FOCUS:</span>
                            <strong className="text-[13px] text-[#121212]">{app.focus}</strong>
                          </div>

                          <div className="font-sans text-xs flex flex-col gap-2">
                            <span className="text-[10px] font-bold text-[#7A7A7A] uppercase tracking-wider block">PROPOSED ADMINISTRATIVE SYSTEM REFORM:</span>
                            <p className="text-[13.5px] text-[#444444] leading-relaxed italic bg-white p-3 rounded-sm border border-[#D8D0C0]/40 text-justify">
                              "{app.proposal}"
                            </p>
                          </div>

                          {/* Approval and rejection action elements */}
                          <div className="flex gap-3 justify-end mt-2">
                            <button
                              type="button"
                              onClick={() => onDeleteApp(app.id)}
                              className="font-sans text-[10.5px] font-bold tracking-wider uppercase text-red-700 bg-transparent hover:bg-red-50 border border-red-200 hover:border-red-300 py-2 px-3 rounded-sm cursor-pointer transition-all"
                            >
                              Reject Docket
                            </button>

                            {isPending && (
                              <button
                                type="button"
                                onClick={() => onUpdateAppStatus(app.id, 'APPROVED')}
                                className="font-sans text-[10.5px] font-bold tracking-wider uppercase text-white bg-emerald-700 hover:bg-emerald-800 border-none py-2 px-4 rounded-sm cursor-pointer transition-colors"
                              >
                                Approve Fellowship Intake
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {mentorshipApps.length === 0 && (
                      <div className="border border-[#D8D0C0] p-16 text-center text-[#7A7A7A] font-serif text-[18px] italic rounded-sm">
                        No active fellowship applications registered in tracking records.
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'comments' && (
                  /* TAB: COMMENTS MODERATION PANEL */
                  <motion.div
                    key="tab-comments"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="border border-[#D8D0C0] p-5 rounded-sm bg-[#F7F3EC] text-left">
                      <h3 className="font-serif text-[20px] font-bold text-[#121212]">
                        Canon Essays Public Reviews Moderation
                      </h3>
                      <p className="font-sans text-[12.5px] text-[#7A7A7A] mt-1">
                        Approve, delete, or review comment strings submitted inside interactive essay sheets.
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      {Object.entries(commentsMap).map(([essayId, comments]) => {
                        const matchedEssay = essaysList.find(e => e.id === essayId);
                        
                        return comments.map((comment, idx) => (
                          <div key={`${essayId}-${idx}`} className="border border-[#D8D0C0] p-4 rounded-sm bg-[#F7F3EC] text-left flex justify-between items-start gap-6 hover:bg-[#9B7A2F]/5 transition-all">
                            <div className="font-sans text-xs">
                              <span className="font-bold text-[#9B7A2F] uppercase text-[9px] tracking-widest block mb-1">
                                ESSAY REF: {matchedEssay?.title || essayId}
                              </span>
                              
                              <h4 className="font-serif text-[14.5px] font-bold text-[#121212]">
                                {comment.name}
                              </h4>
                              <p className="text-[10px] text-[#7A7A7A] mt-0.5">Reviewed on: {comment.date}</p>
                              
                              <p className="text-[13px] text-[#444444] leading-relaxed mt-2.5 text-justify">
                                "{comment.text}"
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => onDeleteComment(essayId, idx)}
                              className="font-sans text-[10px] font-black uppercase text-red-700 bg-transparent border border-red-200 hover:bg-red-50 p-2 rounded-sm focus:outline-none cursor-pointer hover:border-red-300 transition-all flex-shrink-0"
                              title="Delete statement"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ));
                      })}

                      {totalCommentsCount === 0 && (
                        <div className="border border-[#D8D0C0] p-16 text-center text-[#7A7A7A] font-serif text-[18px] italic rounded-sm">
                          No active comments written on database yet.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
