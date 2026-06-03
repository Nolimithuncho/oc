/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { INSTITUTIONS_DATA } from '../data';
import { Check, ArrowUpRight, Landmark, GraduationCap, Tv, Heart, Network } from 'lucide-react';

export default function InstitutionsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // Associate icons with respective institutions
  const getIcon = (id: string) => {
    switch (id) {
      case 'athena-centre':
        return <Landmark size={24} className="text-[#9B7A2F]" />;
      case 'mekaria':
        return <GraduationCap size={24} className="text-[#9B7A2F]" />;
      case 'clearpath':
        return <Tv size={24} className="text-[#9B7A2F]" />;
      case 'nneka-chidoka':
        return <Heart size={24} className="text-[#9B7A2F]" />;
      case 'ngren':
        return <Network size={24} className="text-[#9B7A2F]" />;
      default:
        return <Landmark size={24} className="text-[#9B7A2F]" />;
    }
  };

  // Associate sector labels with respective institutions
  const getSectorLabel = (id: string) => {
    switch (id) {
      case 'athena-centre':
        return 'THINK TANK';
      case 'mekaria':
        return 'ACADEMIA & TECH';
      case 'clearpath':
        return 'EXPLANATORY MEDIA';
      case 'nneka-chidoka':
        return 'MEDICAL OUTREACH';
      case 'ngren':
        return 'RESEARCH BACKBONE';
      default:
        return 'CIVIC SECTOR';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-[#F7F3EC] pb-20"
    >
      {/* Header */}
      <div className="max-w-[960px] mx-auto px-6 sm:px-12 md:px-16 pt-20">
        <span className="font-sans text-[11px] font-bold tracking-[0.22em] text-[#7A7A7A] uppercase block mb-3">
          Sustained Civil Operations
        </span>
        <h1 className="font-serif text-[44px] sm:text-[62px] font-bold tracking-tight leading-[1.05] text-[#121212]">
          Built Institutions
        </h1>
        
        {/* Quote and citation */}
        <div className="border-l-2 border-[#9B7A2F] pl-6 md:pl-8 py-2 max-w-[580px] mt-8 mb-16">
          <p className="font-serif text-[20px] sm:text-[24px] italic text-[#444444] leading-[1.5]">
            "The true measure of structural capability is not public praise. It is the steady, quiet continuation of database protocols, integrity codes, and civilian safety long after the founder departs."
          </p>
        </div>
      </div>

      {/* Grid List of Institutions */}
      <div className="max-w-[960px] mx-auto px-6 sm:px-12 md:px-16 divide-y divide-[#D8D0C0] border-t border-[#D8D0C0]">
        {INSTITUTIONS_DATA.map((inst) => (
          <motion.div
            key={inst.id}
            id={inst.id}
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-16 py-16 scroll-mt-20 group"
          >
            {/* Left label column */}
            <div className="md:col-span-1 pt-1.5 label-sticky">
              <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#9B7A2F] uppercase block mb-2">
                {inst.roleLabel}
              </span>
              <div className="hidden md:flex flex-col gap-3 mt-6 text-[#7A7A7A] text-[11.5px] font-sans tracking-wide uppercase font-semibold border-t border-[#D8D0C0]/50 pt-4 leading-relaxed group-hover:text-[#121212] transition-colors">
                <span className="flex items-center gap-2">
                  {getIcon(inst.id)} {getSectorLabel(inst.id)}
                </span>
              </div>
            </div>

            {/* Right content column */}
            <div className="md:col-span-3">
              <h2 className="font-serif text-[28px] sm:text-[32px] font-black tracking-tight leading-tight text-[#121212] mb-3 group-hover:text-[#9B7A2F] transition-colors">
                {inst.name}
              </h2>
              
              <p className="font-serif text-[17px] sm:text-[18px] italic text-[#444444] mb-4">
                {inst.tagline}
              </p>

              <p className="font-sans text-[16px] text-[#7A7A7A] mb-8 leading-relaxed text-justify">
                {inst.description}
              </p>

              {/* Accomplishment items checklists */}
              <h4 className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#121212] uppercase mb-4 block">
                Key Deliverables & Reforms
              </h4>

              <ul className="list-none p-0 m-0 flex flex-col gap-4">
                {inst.details.map((detail, index) => (
                  <li key={index} className="flex gap-4 items-baseline">
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-[#9B7A2F]/10 border border-[#9B7A2F]/25 text-[#9B7A2F]">
                      <Check size={11} className="stroke-[3]" />
                    </span>
                    <span className="font-sans text-[15px] sm:text-[15.5px] text-[#444444] leading-relaxed">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>

              {/* External portal launch button */}
              {inst.websiteUrl && (
                <div className="mt-8 pt-4 border-t border-dashed border-[#D8D0C0]/60">
                  <a
                    href={inst.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-sans text-[12.5px] font-bold tracking-wider uppercase text-[#121212] border-b border-[#121212] pb-0.5 hover:text-[#9B7A2F] hover:border-[#9B7A2F] transition-colors"
                  >
                    Launch portal archive <ArrowUpRight size={13} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom context summaries */}
      <div className="border-t border-[#D8D0C0] max-w-[960px] mx-auto px-6 sm:px-12 md:px-16 py-16 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-16 items-center">
        <div className="md:col-span-1">
          <span className="font-sans text-[11px] font-bold tracking-[0.18em] text-[#7A7A7A] uppercase">
            Accountability
          </span>
        </div>
        <div className="md:col-span-3">
          <p className="font-sans text-[15.5px] text-[#7A7A7A] leading-relaxed text-justify">
            Each operation listed represents years of persistent physical enforcement, database management, and legal reforms across Nigeria. They demonstrate that developing states do not suffer from lack of policy templates, but from the systemic discipline required to enforce them.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
