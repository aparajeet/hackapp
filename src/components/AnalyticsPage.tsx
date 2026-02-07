import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Trophy, Target, Award, TrendingUp, Zap, CheckCircle2, BookOpen } from 'lucide-react';
import { UserProgress } from '../App';

interface AnalyticsPageProps {
  userProgress: UserProgress;
  navigateTo: (page: 'landing' | 'quiz' | 'analytics') => void;
}

export default function AnalyticsPage({ userProgress, navigateTo }: AnalyticsPageProps) {
  const accuracy = userProgress.totalQuestions > 0 
    ? (userProgress.correctAnswers / userProgress.totalQuestions) * 100 
    : 0;

  const xpToNextLevel = 100 - (userProgress.xp % 100);
  const currentLevelProgress = (userProgress.xp % 100);

  // Data for XP breakdown chart
  const xpData = [
    { name: 'Current XP', value: userProgress.xp, color: '#3B82F6' },
    { name: 'To Next Level', value: xpToNextLevel, color: '#E5E7EB' }
  ];

  // Level progress data
  const levelData = Array.from({ length: 5 }, (_, i) => ({
    level: i + 1,
    xp: i < userProgress.level ? 100 : i === userProgress.level ? currentLevelProgress : 0
  }));

  const getBadgeEmoji = (badge: string) => {
    switch (badge) {
      case 'Fast Learner': return '⚡';
      case 'Consistency Star': return '⭐';
      case 'Level Up': return '🚀';
      default: return '🏆';
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Learning Analytics</h1>
          <p className="text-lg text-gray-600">Track your progress and celebrate your achievements</p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8" />
              <div className="text-right">
                <p className="text-sm opacity-90">Total XP</p>
                <p className="text-3xl font-bold">{userProgress.xp}</p>
              </div>
            </div>
            <div className="w-full bg-blue-400/30 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all"
                style={{ width: `${currentLevelProgress}%` }}
              />
            </div>
            <p className="text-sm mt-2 opacity-90">{xpToNextLevel} XP to next level</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8" />
              <div className="text-right">
                <p className="text-sm opacity-90">Current Level</p>
                <p className="text-3xl font-bold">{userProgress.level}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex-1 bg-purple-400/30 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full"
                  style={{ width: `${(userProgress.level / 10) * 100}%` }}
                />
              </div>
              <span className="text-sm opacity-90">Rank: {userProgress.level >= 5 ? 'Advanced' : userProgress.level >= 3 ? 'Intermediate' : 'Beginner'}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8" />
              <div className="text-right">
                <p className="text-sm opacity-90">Accuracy</p>
                <p className="text-3xl font-bold">{Math.round(accuracy)}%</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm opacity-90 mt-4">
              <span>Correct: {userProgress.correctAnswers}</span>
              <span>Total: {userProgress.totalQuestions}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8" />
              <div className="text-right">
                <p className="text-sm opacity-90">Badges Earned</p>
                <p className="text-3xl font-bold">{userProgress.badges.length}</p>
              </div>
            </div>
            <div className="flex gap-1 mt-4">
              {userProgress.badges.slice(0, 3).map((badge, index) => (
                <div key={index} className="text-2xl">
                  {getBadgeEmoji(badge)}
                </div>
              ))}
              {userProgress.badges.length > 3 && (
                <span className="text-sm opacity-90">+{userProgress.badges.length - 3} more</span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Charts and Details */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Level Progress Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Level Progress</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={levelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="level" 
                  label={{ value: 'Level', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  label={{ value: 'XP', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <Bar dataKey="xp" radius={[8, 8, 0, 0]}>
                  {levelData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index < userProgress.level ? '#3B82F6' : index === userProgress.level ? '#8B5CF6' : '#E5E7EB'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Performance Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Performance Overview</h2>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">Overall Accuracy</span>
                  <span className="text-2xl font-bold text-green-600">{Math.round(accuracy)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${accuracy}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">Questions Answered</span>
                  <span className="text-2xl font-bold text-blue-600">{userProgress.totalQuestions}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-600">Correct</p>
                    <p className="text-xl font-bold text-green-600">{userProgress.correctAnswers}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-600">Incorrect</p>
                    <p className="text-xl font-bold text-red-600">
                      {userProgress.totalQuestions - userProgress.correctAnswers}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">Quizzes Completed</span>
                  <span className="text-2xl font-bold text-purple-600">{userProgress.completedQuizzes}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-yellow-600" />
            <h2 className="text-2xl font-bold text-gray-900">Your Achievements</h2>
          </div>

          {userProgress.badges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userProgress.badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="text-4xl">{getBadgeEmoji(badge)}</div>
                  <div>
                    <p className="font-bold text-gray-900">{badge}</p>
                    <p className="text-sm text-gray-600">
                      {badge === 'Fast Learner' && 'Completed your first quiz'}
                      {badge === 'Consistency Star' && 'Achieved 80%+ accuracy'}
                      {badge === 'Level Up' && 'Reached a new level'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏆</div>
              <p className="text-gray-600 text-lg mb-4">No badges earned yet</p>
              <p className="text-gray-500">Start learning to unlock achievements!</p>
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <BookOpen className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Ready to Level Up?</h3>
          <p className="text-blue-100 mb-6">
            Continue your learning journey and earn more XP and badges!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateTo('quiz')}
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            Start New Quiz
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
