/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CanonPage from './components/CanonPage';
import InstitutionsPage from './components/InstitutionsPage';
import MentorshipPage from './components/MentorshipPage';
import AboutPage from './components/AboutPage';
import SubscribePage from './components/SubscribePage';
import AdminPage from './components/AdminPage';
import UnlockNaijaPage from './components/UnlockNaijaPage';
import { ESSAYS_DATA } from './data';
import { Essay } from './types';

interface Subscriber {
  code: string;
  name: string;
  email: string;
  interests: string[];
}

interface MentorshipApplication {
  id: string;
  name: string;
  email: string;
  discipline: string;
  proposal: string;
  focus: string;
  status: 'PENDING ADMISSION REVIEW' | 'APPROVED';
}

interface LocalComment {
  name: string;
  text: string;
  date: string;
}

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedEssayId, setSelectedEssayId] = useState<string | null>(null);

  // 1. Lifted parent states for full interactive data simulation across screens

  // Dynamic Essays index state (initialized with static ESSAYS_DATA from file)
  const [essaysList, setEssaysList] = useState<Essay[]>(ESSAYS_DATA);

  // Active Subscribers Alert Registry
  const [subscribersList, setSubscribersList] = useState<Subscriber[]>([
    { code: "OSC-SUB-283", name: "Amina Mohammed", email: "amina@athena.org", interests: ["Essays & Memoirs", "Governance, Policy & Database Systems"] },
    { code: "OSC-SUB-492", name: "Ibrahim Yusuf", email: "yusuf@frsc-reforms.gov.ng", interests: ["Governance, Policy & Database Systems", "Aviation & Infrastructure Briefs"] }
  ]);

  // Fellowship Applications records
  const [mentorshipApps, setMentorshipApps] = useState<MentorshipApplication[]>([
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

  // Public discourse review strings mapping essayId to arrays
  const [commentsMap, setCommentsMap] = useState<Record<string, LocalComment[]>>({
    'from-20-to-destiny': [
      { name: 'Dr. Chika Opara', text: 'An incredibly inspiring story. Public administrative systems indeed require exactly this type of bold foresight.', date: 'May 14, 2024' },
      { name: 'Abubakar Bello', text: 'This teaches our youth the importance of preparation meeting opportunity.', date: 'May 15, 2024' }
    ],
    'frsc-reform-part-1': [
      { name: 'Engr. Yusuf', text: 'I remember when licenses were just papers. This computerized database reform completely changed public life in Nigeria.', date: 'September 18, 2025' }
    ]
  });

  // Current session user profile (logged-out, standard subscriber, administrator)
  const [currentUser, setCurrentUser] = useState<{ role: 'admin' | 'subscriber'; email: string; name?: string; code?: string } | null>(null);

  // Helper callbacks to mutate data in lifted states

  const handleApplyApp = (newApp: MentorshipApplication) => {
    setMentorshipApps((prev) => [newApp, ...prev]);
  };

  const handleUpdateAppStatus = (appId: string, status: 'APPROVED' | 'PENDING ADMISSION REVIEW') => {
    setMentorshipApps((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status } : app))
    );
  };

  const handleDeleteApp = (appId: string) => {
    setMentorshipApps((prev) => prev.filter((app) => app.id !== appId));
  };

  const handleAddSubscriber = (newSub: Subscriber) => {
    setSubscribersList((prev) => {
      // Check for duplicate subscriber and insert
      if (prev.some((s) => s.email.toLowerCase() === newSub.email.toLowerCase())) {
        return prev;
      }
      return [newSub, ...prev];
    });
  };

  const handleAddEssay = (newEssay: Essay) => {
    setEssaysList((prev) => [newEssay, ...prev]);
  };

  const handleAddComment = (essayId: string, comment: LocalComment) => {
    setCommentsMap((prev) => ({
      ...prev,
      [essayId]: [...(prev[essayId] || []), comment],
    }));
  };

  const handleDeleteComment = (essayId: string, commentIdx: number) => {
    setCommentsMap((prev) => {
      const matchComments = prev[essayId] || [];
      const updated = matchComments.filter((_, idx) => idx !== commentIdx);
      return {
        ...prev,
        [essayId]: updated,
      };
    });
  };

  // Find the current featured essay choice (defaults to our newest featured essay)
  const activeFeaturedEssay = essaysList.find((e) => e.isFeatured) || essaysList[0];

  // Direct trigger to active essay reading view
  const handleReadEssay = (essayId: string) => {
    setSelectedEssayId(essayId);
    setActivePage('canon');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page: string) => {
    if (page !== 'canon') {
      setSelectedEssayId(null);
    }
    setActivePage(page);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomePage
            onReadEssay={handleReadEssay}
            setActivePage={handlePageChange}
            featuredEssay={activeFeaturedEssay}
          />
        );
      case 'canon':
        return (
          <CanonPage
            selectedEssayId={selectedEssayId}
            setSelectedEssayId={setSelectedEssayId}
            parentEssaysList={essaysList}
            parentCommentsMap={commentsMap}
            onAddComment={handleAddComment}
          />
        );
      case 'institutions':
        return <InstitutionsPage />;
      case 'unlock-naija':
        return (
          <UnlockNaijaPage
            onAddSubscriber={handleAddSubscriber}
          />
        );
      case 'mentorship':
        return (
          <MentorshipPage
            parentApps={mentorshipApps}
            onApplyApp={handleApplyApp}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'subscribe':
        return (
          <SubscribePage
            onAddSubscriber={handleAddSubscriber}
          />
        );
      case 'admin':
        return (
          <AdminPage
            essaysList={essaysList}
            onAddEssay={handleAddEssay}
            subscribersList={subscribersList}
            onAddSubscriber={handleAddSubscriber}
            mentorshipApps={mentorshipApps}
            onUpdateAppStatus={handleUpdateAppStatus}
            onDeleteApp={handleDeleteApp}
            commentsMap={commentsMap}
            onDeleteComment={handleDeleteComment}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        );
      default:
        return (
          <HomePage
            onReadEssay={handleReadEssay}
            setActivePage={handlePageChange}
            featuredEssay={activeFeaturedEssay}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F7F3EC] p-0 m-0 text-[#121212] font-sans antialiased overflow-x-hidden selection:bg-[#9B7A2F]/20 selection:text-[#121212]">
      <div>
        <Navigation activePage={activePage} setActivePage={handlePageChange} />
        <main>{renderActivePage()}</main>
      </div>
      <Footer setActivePage={handlePageChange} />
    </div>
  );
}
