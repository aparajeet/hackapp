import { useState, useEffect } from 'react';
import { Trophy, BookOpen, BarChart3 } from 'lucide-react';
import LandingPage from './components/LandingPage';
import QuizPage from './components/QuizPage';
import AnalyticsPage from './components/AnalyticsPage';

type Page = 'landing' | 'quiz' | 'analytics';

export interface UserProgress {
  xp: number;
  level: number;
  totalQuestions: number;
  correctAnswers: number;
  badges: string[];
  completedQuizzes: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('levelup-progress');
    return saved ? JSON.parse(saved) : {
      xp: 0,
      level: 1,
      totalQuestions: 0,
      correctAnswers: 0,
      badges: [],
      completedQuizzes: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('levelup-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const updateProgress = (xpGained: number, isCorrect: boolean) => {
    setUserProgress(prev => {
      const newXP = prev.xp + xpGained;
      const newLevel = Math.floor(newXP / 100) + 1;
      const newCorrect = isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers;
      const newTotal = prev.totalQuestions + 1;
      
      let newBadges = [...prev.badges];
      
      // Award badges based on achievements
      if (newLevel > prev.level && !newBadges.includes('Level Up')) {
        newBadges.push('Level Up');
      }
      
      if (newTotal >= 6 && !newBadges.includes('Fast Learner')) {
        newBadges.push('Fast Learner');
      }
      
      const accuracy = (newCorrect / newTotal) * 100;
      if (accuracy >= 80 && newTotal >= 6 && !newBadges.includes('Consistency Star')) {
        newBadges.push('Consistency Star');
      }
      
      return {
        xp: newXP,
        level: newLevel,
        totalQuestions: newTotal,
        correctAnswers: newCorrect,
        badges: newBadges,
        completedQuizzes: prev.completedQuizzes
      };
    });
  };

  const completeQuiz = () => {
    setUserProgress(prev => ({
      ...prev,
      completedQuizzes: prev.completedQuizzes + 1
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('landing')}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LevelUp Learn
              </span>
            </div>
            
            <div className="flex gap-6">
              <button
                onClick={() => navigateTo('landing')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'landing'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span className="font-medium">Home</span>
              </button>
              
              <button
                onClick={() => navigateTo('quiz')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'quiz'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="font-medium">Learn</span>
              </button>
              
              <button
                onClick={() => navigateTo('analytics')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'analytics'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="font-medium">Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main>
        {currentPage === 'landing' && (
          <LandingPage 
            navigateTo={navigateTo} 
            userProgress={userProgress}
          />
        )}
        {currentPage === 'quiz' && (
          <QuizPage 
            userProgress={userProgress}
            updateProgress={updateProgress}
            completeQuiz={completeQuiz}
            navigateTo={navigateTo}
          />
        )}
        {currentPage === 'analytics' && (
          <AnalyticsPage 
            userProgress={userProgress}
            navigateTo={navigateTo}
          />
        )}
      </main>
    </div>
  );
}
