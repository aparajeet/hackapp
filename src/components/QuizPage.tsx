import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Zap, Trophy, CheckCircle2, XCircle, Star, Award } from 'lucide-react';
import { UserProgress } from '../App';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpReward: number;
}

interface QuizPageProps {
  userProgress: UserProgress;
  updateProgress: (xpGained: number, isCorrect: boolean) => void;
  completeQuiz: () => void;
  navigateTo: (page: 'landing' | 'quiz' | 'analytics') => void;
}

const questions: Question[] = [
  // Easy Questions
  {
    id: 1,
    question: "What does HCI stand for in the context of technology?",
    options: [
      "Human-Computer Interaction",
      "High-Capacity Interface",
      "Hardware Communication Interface",
      "Hybrid Control Integration"
    ],
    correctAnswer: 0,
    difficulty: "Easy",
    xpReward: 10
  },
  {
    id: 2,
    question: "Which of the following is a key principle of user-centered design?",
    options: [
      "Focus on developer preferences",
      "Understand user needs and context",
      "Maximize technical complexity",
      "Minimize user testing"
    ],
    correctAnswer: 1,
    difficulty: "Easy",
    xpReward: 10
  },
  // Medium Questions
  {
    id: 3,
    question: "What is the primary goal of gamification in educational platforms?",
    options: [
      "To make learning more complex",
      "To increase engagement and motivation",
      "To replace traditional assessment",
      "To reduce course content"
    ],
    correctAnswer: 1,
    difficulty: "Medium",
    xpReward: 20
  },
  {
    id: 4,
    question: "Which cognitive psychology principle is most relevant to adaptive learning?",
    options: [
      "Classical conditioning",
      "Zone of Proximal Development",
      "Herd mentality",
      "Confirmation bias"
    ],
    correctAnswer: 1,
    difficulty: "Medium",
    xpReward: 20
  },
  // Hard Questions
  {
    id: 5,
    question: "In HCI, what does the term 'affordance' refer to?",
    options: [
      "The cost of implementing a feature",
      "The perceived and actual properties of an object that suggest how it can be used",
      "The speed at which users can learn a system",
      "The visual aesthetics of an interface"
    ],
    correctAnswer: 1,
    difficulty: "Hard",
    xpReward: 30
  },
  {
    id: 6,
    question: "Which framework is commonly used for evaluating the usability of educational technology?",
    options: [
      "SWOT Analysis",
      "Porter's Five Forces",
      "Technology Acceptance Model (TAM)",
      "Maslow's Hierarchy"
    ],
    correctAnswer: 2,
    difficulty: "Hard",
    xpReward: 30
  }
];

export default function QuizPage({ userProgress, updateProgress, completeQuiz, navigateTo }: QuizPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [sessionXP, setSessionXP] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [showBadge, setShowBadge] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const xpGained = isCorrect ? currentQuestion.xpReward : Math.floor(currentQuestion.xpReward / 3);
    
    setSessionXP(prev => prev + xpGained);
    if (isCorrect) {
      setSessionCorrect(prev => prev + 1);
    }
    
    updateProgress(xpGained, isCorrect);
    
    // Check for new badges
    const prevBadgeCount = userProgress.badges.length;
    setTimeout(() => {
      const currentBadgeCount = userProgress.badges.length;
      if (currentBadgeCount > prevBadgeCount) {
        const newBadge = userProgress.badges[currentBadgeCount - 1];
        setShowBadge(newBadge);
        setTimeout(() => setShowBadge(null), 3000);
      }
    }, 100);
    
    // Move to next question or complete
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setIsComplete(true);
        completeQuiz();
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsComplete(false);
    setSessionXP(0);
    setSessionCorrect(0);
  };

  const getMotivationalMessage = () => {
    if (!showFeedback) return '';
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      const messages = ["Excellent! 🌟", "Well done! 🎯", "Perfect! ⚡", "Outstanding! 🏆"];
      return messages[Math.floor(Math.random() * messages.length)];
    } else {
      const messages = ["Nice try! 💪", "Keep going! 🚀", "You're learning! 📚", "Good effort! ✨"];
      return messages[Math.floor(Math.random() * messages.length)];
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Quiz Complete! 🎉</h2>
          <p className="text-xl text-gray-600 mb-8">
            Great job! You've completed all questions and earned valuable XP.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-2xl p-6">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">XP Earned</p>
              <p className="text-3xl font-bold text-blue-600">+{sessionXP}</p>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-6">
              <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Accuracy</p>
              <p className="text-3xl font-bold text-green-600">
                {Math.round((sessionCorrect / questions.length) * 100)}%
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-2xl p-6">
              <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Current Level</p>
              <p className="text-3xl font-bold text-purple-600">{userProgress.level}</p>
            </div>
            
            <div className="bg-yellow-50 rounded-2xl p-6">
              <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Badges</p>
              <p className="text-3xl font-bold text-yellow-600">{userProgress.badges.length}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Try Again
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo('analytics')}
              className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-300"
            >
              View Analytics
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Level and XP */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Level</p>
                <p className="text-2xl font-bold text-gray-900">Level {userProgress.level}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-600">Total XP</p>
              <p className="text-2xl font-bold text-blue-600">{userProgress.xp}</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(userProgress.xp % 100)}%` }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full"
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {userProgress.xp % 100}/100 XP to Level {userProgress.level + 1}
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">Quiz Progress</span>
            <span className="text-sm font-medium text-gray-900">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        
        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            {/* Difficulty Badge */}
            <div className="flex items-center justify-between mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getDifficultyColor(currentQuestion.difficulty)}`}>
                {currentQuestion.difficulty}
              </span>
              <div className="flex items-center gap-2 text-yellow-600">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-semibold">+{currentQuestion.xpReward} XP</span>
              </div>
            </div>
            
            {/* Question */}
            <div className="mb-8">
              <div className="flex items-start gap-3 mb-4">
                <Brain className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <h3 className="text-2xl font-semibold text-gray-900">
                  {currentQuestion.question}
                </h3>
              </div>
            </div>
            
            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showCorrect = showFeedback && isCorrect;
                const showIncorrect = showFeedback && isSelected && !isCorrect;
                
                return (
                  <motion.button
                    key={index}
                    whileHover={!showFeedback ? { scale: 1.02 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      showCorrect
                        ? 'border-green-500 bg-green-50'
                        : showIncorrect
                        ? 'border-red-500 bg-red-50'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{option}</span>
                      {showCorrect && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                      {showIncorrect && <XCircle className="w-6 h-6 text-red-600" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Feedback Message */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 text-center"
                >
                  <p className="text-xl font-semibold text-gray-700">
                    {getMotivationalMessage()}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
        
        {/* Badge Notification */}
        <AnimatePresence>
          {showBadge && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              className="fixed bottom-8 right-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50"
            >
              <Award className="w-8 h-8" />
              <div>
                <p className="text-sm font-medium">New Badge Unlocked!</p>
                <p className="text-lg font-bold">{showBadge}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
