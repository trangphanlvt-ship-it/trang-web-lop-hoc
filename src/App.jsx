import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HeaderBanner } from './components/HeaderBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Modals
import { StudentLoginModal } from './components/StudentLoginModal';
import { AuthModal } from './components/AuthModal';
import { AITutorModal } from './components/AITutorModal';

// Pages
import { HomePage } from './pages/HomePage';
import { SubjectsPage } from './pages/SubjectsPage';
import { SubjectDetailPage } from './pages/SubjectDetailPage';
import { ClassActivitiesPage } from './pages/ClassActivitiesPage';
import { HCMCultureSpacePage } from './pages/HCMCultureSpacePage';
import { HonorRollPage } from './pages/HonorRollPage';
import { TeacherRemindersPage } from './pages/TeacherRemindersPage';
import { DashboardPage } from './pages/DashboardPage';

function AppContent() {
  const [isStudentLoginOpen, setIsStudentLoginOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col water-ink-bg">
      
      {/* Header Banner with Real-time Clock Ticker */}
      <HeaderBanner
        onOpenAITutor={() => setIsAITutorOpen(true)}
        onOpenStudentLogin={() => setIsStudentLoginOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Main Page Routing */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenAITutor={() => setIsAITutorOpen(true)}
                onOpenStudentLogin={() => setIsStudentLoginOpen(true)}
              />
            }
          />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/subject/:code" element={<SubjectDetailPage />} />
          <Route path="/activities" element={<ClassActivitiesPage />} />
          <Route path="/hcm-space" element={<HCMCultureSpacePage />} />
          <Route path="/honor-roll" element={<HonorRollPage />} />
          <Route path="/reminders" element={<TeacherRemindersPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <StudentLoginModal
        isOpen={isStudentLoginOpen}
        onClose={() => setIsStudentLoginOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
      />

    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
