import React, { useState } from 'react';
import {
  Search,
  Clock,
  BookOpen,
  BarChart2,
  Settings,
  Moon,
  Sun,
  Target,
  Timer,
  List,
} from 'lucide-react';
import TaskManager from './components/TaskManager';
import FocusTimer from './components/FocusTimer';
import SearchBar from './components/SearchBar';
import DailyGoals from './components/DailyGoals';
import Schedule from './components/Schedule';
import Analytics from './components/Analytics';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import { TaskProvider } from './contexts/TaskContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'tasks' | 'schedule' | 'analytics'>('tasks');
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage
          onLoginClick={() => setAuthModal('login')}
          onSignupClick={() => setAuthModal('signup')}
        />
        <AuthModal
          isOpen={!!authModal}
          mode={authModal || 'login'}
          onClose={() => setAuthModal(null)}
        />
      </>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Rest of your authenticated app UI */}
      <div className="fixed h-full w-20 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-8 space-y-8">
        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
          <Target className="w-8 h-8 text-white" />
        </div>
        <nav className="flex flex-col space-y-6">
          <button
            onClick={() => setActiveView('tasks')}
            className={`p-3 rounded-xl ${
              activeView === 'tasks'
                ? 'bg-blue-50 dark:bg-blue-900'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <List className={`w-6 h-6 ${
              activeView === 'tasks'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            }`} />
          </button>
          <button
            onClick={() => setActiveView('schedule')}
            className={`p-3 rounded-xl ${
              activeView === 'schedule'
                ? 'bg-blue-50 dark:bg-blue-900'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Timer className={`w-6 h-6 ${
              activeView === 'schedule'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            }`} />
          </button>
          <button className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
            <BookOpen className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => setActiveView('analytics')}
            className={`p-3 rounded-xl ${
              activeView === 'analytics'
                ? 'bg-blue-50 dark:bg-blue-900'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <BarChart2 className={`w-6 h-6 ${
              activeView === 'analytics'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            }`} />
          </button>
        </nav>
        <div className="mt-auto">
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div className="ml-20 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <SearchBar onSearch={setSearchQuery} />
          </header>

          {activeView === 'tasks' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <DailyGoals />
                <TaskManager />
              </div>
              <div className="space-y-8">
                <FocusTimer />
              </div>
            </div>
          )}

          {activeView === 'schedule' && <Schedule />}
          {activeView === 'analytics' && <Analytics />}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;