/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUp } from 'lucide-react';

interface FooterProps {
  setActivePage: (p: string) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#D8D0C0] bg-[#F7F3EC] mt-16">
      <div className="max-w-[960px] mx-auto px-6 sm:px-12 md:px-16 py-12 flex flex-col sm:flex-row justify-between items-start gap-10">
        <div>
          <div className="font-serif text-[18px] font-semibold text-[#121212] mb-2 leading-none">
            Osita Chidoka
          </div>
          <p className="font-sans text-[13px] text-[#7A7A7A] italic max-w-[280px] leading-relaxed">
            Public Servant, Writer, and Institution Builder. Empowering public administration改革 with civic transparency.
          </p>
        </div>

        <div className="flex gap-14 flex-wrap">
          <div className="footer-col">
            <h4 className="font-sans text-[10.5px] font-bold tracking-widest text-[#7A7A7A] uppercase mb-4">
              Sections
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { setActivePage('canon'); handleBackToTop(); }}
                className="text-left font-sans text-[14px] text-[#444444] hover:text-[#121212] transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
              >
                The Canon
              </button>
              <button
                onClick={() => { setActivePage('institutions'); handleBackToTop(); }}
                className="text-left font-sans text-[14px] text-[#444444] hover:text-[#121212] transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
              >
                Institutions
              </button>
              <button
                onClick={() => { setActivePage('unlock-naija'); handleBackToTop(); }}
                className="text-left font-sans text-[14px] text-[#444444] hover:text-[#121212] transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
              >
                Unlock Naija
              </button>
              <button
                onClick={() => { setActivePage('mentorship'); handleBackToTop(); }}
                className="text-left font-sans text-[14px] text-[#444444] hover:text-[#121212] transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
              >
                Mentorship
              </button>
              <button
                onClick={() => { setActivePage('about'); handleBackToTop(); }}
                className="text-left font-sans text-[14px] text-[#444444] hover:text-[#121212] transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
              >
                About
              </button>
              <button
                onClick={() => { setActivePage('subscribe'); handleBackToTop(); }}
                className="text-left font-sans text-[14px] text-[#444444] hover:text-[#121212] transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
              >
                Subscribe
              </button>
              <button
                onClick={() => { setActivePage('admin'); handleBackToTop(); }}
                className="text-left font-sans text-[14px] text-[#444444] hover:text-[#121212] transition-colors font-semibold cursor-pointer bg-transparent border-none p-0 outline-none"
              >
                Sign In
              </button>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="font-sans text-[10.5px] font-bold tracking-widest text-[#7A7A7A] uppercase mb-4">
              Initiatives
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { setActivePage('institutions'); handleBackToTop(); }}
                className="text-left font-sans text-[14px] text-[#444444] hover:text-[#121212] transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
              >
                Athena Policy Centre
              </button>
              <button
                onClick={() => { setActivePage('institutions'); handleBackToTop(); }}
                className="text-left font-sans text-[14px] text-[#444444] hover:text-[#121212] transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
              >
                FRSC Database Portal
              </button>
              <button
                onClick={() => { setActivePage('mentorship'); handleBackToTop(); }}
                className="text-left font-sans text-[14px] text-[#444444] hover:text-[#121212] transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
              >
                Mekaria Mentorials
              </button>
              <button
                onClick={() => { setActivePage('unlock-naija'); handleBackToTop(); }}
                className="text-left font-sans text-[14px] text-[#444444] hover:text-[#121212] transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
              >
                Unlock Naija Movement
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[960px] mx-auto px-6 sm:px-12 md:px-16 py-6 border-t border-[#D8D0C0] flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-sans text-[12px] text-[#C2BAA8] tracking-widest">
          © {new Date().getFullYear()} OSITA CHIDOKA. ALL RIGHTS RESERVED.
        </span>

        <div className="flex gap-6 items-center">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[12.5px] text-[#7A7A7A] hover:text-[#121212] transition-colors decoration-none"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[12.5px] text-[#7A7A7A] hover:text-[#121212] transition-colors decoration-none"
          >
            Twitter
          </a>
          <a
            href="https://medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[12.5px] text-[#7A7A7A] hover:text-[#121212] transition-colors decoration-none"
          >
            Medium
          </a>
          <button
            onClick={handleBackToTop}
            className="flex items-center gap-1.5 font-sans text-[12.5px] font-medium text-[#9B7A2F] hover:text-[#121212] transition-colors cursor-pointer bg-transparent border-none outline-none p-1"
            title="Scroll up"
          >
            Top <ArrowUp size={14} className="animate-pulse" />
          </button>
        </div>
      </div>
    </footer>
  );
}
