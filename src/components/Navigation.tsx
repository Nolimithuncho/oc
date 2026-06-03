/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  activePage: string;
  setActivePage: (p: string) => void;
}

export default function Navigation({ activePage, setActivePage }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'canon', label: 'The Canon' },
    { id: 'institutions', label: 'Institutions' },
    { id: 'unlock-naija', label: 'Unlock Naija' },
    { id: 'mentorship', label: 'Mentorship' },
    { id: 'about', label: 'About' },
    { id: 'subscribe', label: 'Subscribe' },
    { id: 'admin', label: 'Sign In' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#F7F3EC] border-b border-[#D8D0C0] shadow-sm">
      <div className="max-w-[960px] mx-auto px-6 sm:px-12 md:px-16 h-[58px] flex items-center justify-between">
        <button
          onClick={() => {
            setActivePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-serif text-[17px] font-semibold text-[#121212] tracking-tight hover:text-[#9B7A2F] transition-colors cursor-pointer bg-transparent border-none outline-none"
        >
          Osita Chidoka
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex gap-9 list-none m-0 p-0 items-center">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <li key={item.id} className="relative">
                <button
                  onClick={() => {
                    setActivePage(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`font-sans text-[12.5px] font-medium tracking-widest uppercase cursor-pointer bg-transparent border-none outline-none py-1 transition-colors ${
                    isActive ? 'text-[#121212]' : 'text-[#7A7A7A] hover:text-[#121212]'
                  }`}
                >
                  {item.label}
                </button>
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-[-19px] left-0 right-0 h-[2px] bg-[#121212]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex sm:hidden p-1 text-[#121212] hover:text-[#9B7A2F] transition-colors bg-transparent border-none outline-none cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="sm:hidden absolute top-[58px] left-0 right-0 bg-[#F7F3EC] border-b border-[#D8D0C0] px-6 py-4 flex flex-col gap-4 shadow-lg"
        >
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`font-sans text-[13px] font-medium tracking-widest uppercase text-left py-2 border-b border-dashed border-[#D8D0C0]/50 bg-transparent outline-none cursor-pointer ${
                  isActive ? 'text-[#121212] font-semibold' : 'text-[#7A7A7A]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </motion.div>
      )}
    </nav>
  );
}
