/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, GraduationCap, MapPin, Milestone, History, Landmark } from 'lucide-react';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const certifications = [
    { school: 'University of Oxford, UK', degree: 'Post-Graduate Diploma in Global Business' },
    { school: 'George Mason University, USA', degree: 'Master of Public Policy (MPP)' },
    { school: 'University of Nigeria, Nsukka', degree: 'Bachelor of Science (B.Sc.) in Management' },
    { school: 'National Honour', degree: 'Officer of the Order of the Federal Republic (OFR)' },
  ];

  const administrativeTimeline = [
    { year: '2023 - Present', role: 'Chancellor', organization: 'Athena Centre for Policy & Leadership', text: 'Directing strategic governance reviews and publishing detailed blueprints on national power grid deregulation, fiscal decentralization, and youth civil service fellowships.' },
    { year: '2014 - 2015', role: 'Minister of Aviation', organization: 'Federal Ministry of Aviation', text: 'Spearheaded runway modernization safety arrays and enforced transparent online-bidding contract mechanisms across the national ministry.' },
    { year: '2007 - 2014', role: 'Corps Marshal & Chief Executive', organization: 'Federal Road Safety Corps (FRSC)', text: 'Led a landmark technology overhaul creating security-integrations and biometric identity databases recognized internationally, securing ISO quality certifications.' },
    { year: '2003 - 2007', role: 'Senior Policy Advisor', organization: 'Enterprise & Public Relations Sector', text: 'Advised key infrastructure programs on public-private partnership models and resource transparency frameworks.' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-[#F7F3EC] pb-20"
    >
      {/* 1. Header */}
      <section className="max-w-[960px] mx-auto px-6 sm:px-12 md:px-16 pt-20 pb-8">
        <span className="font-sans text-[11px] font-bold tracking-[0.22em] text-[#7A7A7A] uppercase block mb-3">
          Biographical Journey
        </span>
        <h1 className="font-serif text-[44px] sm:text-[62px] font-bold tracking-tight leading-[1.05] text-[#121212] mb-4">
          About Osita Chidoka
        </h1>
        <p className="font-serif text-[20px] italic text-[#444444]">
          A career dedicated to structural reform, digital transformation, and civic empowerment.
        </p>
      </section>

      {/* 2. Main content grids */}
      <section className="max-w-[960px] mx-auto px-6 sm:px-12 md:px-16 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 border-t border-[#D8D0C0]">
        
        {/* Sidebar Details Column */}
        <div className="md:col-span-1 label-sticky">
          <div className="flex flex-col gap-8">
            {/* Quick Profile context */}
            <div className="border border-[#D8D0C0] p-5 rounded-sm bg-[#F7F3EC]/50 shadow-sm">
              <span className="font-sans text-[10px] font-bold tracking-widest text-[#9B7A2F] uppercase block mb-3">
                Profile Directory
              </span>
              <div className="flex flex-col gap-4 text-xs font-sans text-[#444444]">
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#9B7A2F]" /> Obosi, Anambra State, Nigeria
                </span>
                <span className="flex items-center gap-2">
                  <Milestone size={14} className="text-[#9B7A2F]" /> Born: July 18, 1971
                </span>
                <span className="flex items-center gap-2">
                  <Award size={14} className="text-[#9B7A2F]" /> Officer of the Order of the Federal Republic
                </span>
              </div>
            </div>

            {/* Academic Credentials */}
            <div>
              <span className="font-sans text-[10.5px] font-bold tracking-[0.2em] text-[#121212] uppercase block mb-4">
                Education & Credentials
              </span>
              <div className="flex flex-col gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex gap-3 items-start border-b border-[#D8D0C0]/50 pb-3 last:border-0 last:pb-0">
                    <GraduationCap size={16} className="text-[#9B7A2F] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-serif text-[13.5px] font-bold text-[#121212]">{cert.school}</h4>
                      <p className="font-sans text-[12px] text-[#7A7A7A] mt-0.5 leading-tight">{cert.degree}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Text Column */}
        <div className="md:col-span-2 flex flex-col gap-6 text-justify">
          <p className="font-sans text-[16.5px] text-[#444444] leading-relaxed">
            Osita Chidoka is a seasoned public policy expert, administrator, and reform advocate who has shaped standard parameters of civic identity, aviation safety, and civil service integrity across Nigeria. Known for introducing high-impact digital technologies into historically stagnant government systems, his career illustrates how structured institutional design overcomes political bottlenecks.
          </p>

          <p className="font-sans text-[16.2px] text-[#444444] leading-relaxed">
            Born in Obosi, Anambra State, Osita was driven by an early belief that administrative systems could serve citizens with dignity. This led him to pursue a management education at the University of Nigeria, Nsukka, followed by advanced studies in public policy at George Mason University in the United States and global business credentials from the University of Oxford. His academic foundation formed a lifetime focus: looking at social problems as system challenges.
          </p>

          <h3 className="font-serif text-[22px] font-bold text-[#121212] tracking-tight mt-6 mb-2">
            The Logic of System Modernization
          </h3>

          <p className="font-sans text-[16.2px] text-[#444444] leading-relaxed">
            During his groundbreaking tenure as the leader of the Federal Road Safety Corps (FRSC), Osita completely eliminated the corrupt physical handoffs of motorist licensing. By building a unified national biometric motorist registry, he converted the driving license from a piece of paper into a secure national identity asset. His administration earned the road safety corps the highly esteemed ISO 9001:2008 certification, making it the first law safety body in Africa to reach such quality milestones.
          </p>

          <p className="font-sans text-[16.2px] text-[#444444] leading-relaxed">
            As Minister of Aviation, he spearheaded terminal reconstruction plans, meteorological data arrays, and contract transparency. Today, through his role as Chancellor of the Athena Centre for Policy and Leadership and the Convener of Unlock Naija, he actively trains the emerging cadre of West African public servants and civic leaders through database-focused workshops and custom policy fellowships.
          </p>

          <div className="border border-[#D8D0C0] p-6 bg-[#9B7A2F]/5 rounded-sm my-6">
            <h4 className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#121212] uppercase mb-3 text-center sm:text-left block">
              Core Principles of Governance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans text-[#444444] text-center sm:text-left">
              <div>
                <strong className="text-[#121212] block mb-1 uppercase tracking-wider">Workflow Primacy</strong>
                Processes are baked into computer algorithms to strip out arbitrary personal discretion.
              </div>
              <div>
                <strong className="text-[#121212] block mb-1 uppercase tracking-wider">Payment Decoupling</strong>
                Electronic direct-accounting systems bypass caching and ensure treasury compliance.
              </div>
              <div>
                <strong className="text-[#121212] block mb-1 uppercase tracking-wider">Cadre Meritocracy</strong>
                Recruitment, evaluation, and progression are strictly metric-based to safeguard integrity.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Administrative Milestones Timeline */}
      <section className="max-w-[960px] mx-auto px-6 sm:px-12 md:px-16 py-16 border-t border-[#D8D0C0]">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-12">
          <div className="md:w-1/3">
            <h3 className="font-serif text-[32px] font-bold text-[#121212] leading-tight flex items-center gap-2">
              <History size={26} className="text-[#9B7A2F]" />
              Administrative Track
            </h3>
          </div>
          <div className="md:w-2/3">
            <p className="font-sans text-[16px] text-[#7A7A7A] leading-relaxed">
              Historical view of his leading public sector executive roles and founded development frameworks within Nigeria.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-0 border-t border-[#D8D0C0]">
          {administrativeTimeline.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="py-8 border-b border-[#D8D0C0] grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-16 group hover:bg-[#9B7A2F]/5 px-2 -mx-2 transition-colors rounded-sm"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-[14px] font-bold text-[#9B7A2F] block mb-1">
                  {item.year}
                </span>
                <span className="font-sans text-[12px] font-bold tracking-widest text-[#7A7A7A] uppercase">
                  {item.role}
                </span>
              </div>
              <div className="md:col-span-3">
                <h4 className="font-serif text-[18px] font-bold text-[#121212] mb-2 leading-tight group-hover:text-[#9B7A2F] transition-colors">
                  {item.organization}
                </h4>
                <p className="font-sans text-[14.5px] text-[#444444] leading-relaxed text-justify">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Bottom Quote Block */}
      <section className="max-w-[960px] mx-auto px-6 sm:px-12 md:px-16 py-12 border-t border-[#D8D0C0] flex flex-col items-center text-center">
        <p className="font-serif text-[19px] italic text-[#444444] max-w-[620px] leading-relaxed">
          "The biggest challenge of modern Africa is not the shortage of natural resource reserves. It is the acute absence of institutions built with the endurance of Clockwork mechanisms."
        </p>
      </section>
    </motion.div>
  );
}
