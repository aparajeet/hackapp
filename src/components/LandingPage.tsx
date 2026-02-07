import { motion } from 'motion/react';
import { Zap, Target, Award, TrendingUp, ArrowRight, Star } from 'lucide-react';
import { UserProgress } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  navigateTo: (page: 'landing' | 'quiz' | 'analytics') => void;
  userProgress: UserProgress;
}

export default function LandingPage({ navigateTo, userProgress }: LandingPageProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Gamified Adaptive Learning</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Master Skills,
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Level Up Your Future
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience the next generation of learning with our gamified adaptive platform. 
              Earn XP, unlock achievements, and track your progress in real-time through 
              interactive quizzes designed to adapt to your skill level.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateTo('quiz')}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                <Zap className="w-5 h-5" />
                Start Learning
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateTo('analytics')}
                className="flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                <TrendingUp className="w-5 h-5" />
                View Analytics
              </motion.button>
            </div>
            
            {/* Current Progress Preview */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Level</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{userProgress.level}</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-gray-600">XP</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{userProgress.xp}</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">Badges</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{userProgress.badges.length}</p>
              </div>
            </div>
          </motion.div>
          
          {/* Right: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Current Level</span>
                    <span className="text-2xl font-bold text-blue-600">Level {userProgress.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(userProgress.xp % 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">{userProgress.xp % 100}/100 XP to next level</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-100 rounded-xl p-4">
                    <div className="text-3xl mb-2">🎯</div>
                    <p className="text-sm font-medium text-gray-700">Adaptive Quizzes</p>
                  </div>
                  <div className="bg-purple-100 rounded-xl p-4">
                    <div className="text-3xl mb-2">⚡</div>
                    <p className="text-sm font-medium text-gray-700">XP System</p>
                  </div>
                  <div className="bg-yellow-100 rounded-xl p-4">
                    <div className="text-3xl mb-2">🏆</div>
                    <p className="text-sm font-medium text-gray-700">Achievements</p>
                  </div>
                  <div className="bg-green-100 rounded-xl p-4">
                    <div className="text-3xl mb-2">📊</div>
                    <p className="text-sm font-medium text-gray-700">Analytics</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Floating badges */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <Award className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <Star className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose LevelUp Learn?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Combining cutting-edge human-computer interaction with gamification to create 
              an engaging, personalized learning experience.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Adaptive Learning",
                description: "Questions adjust to your skill level for optimal challenge and growth",
                color: "blue"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "XP & Levels",
                description: "Earn experience points and level up as you master new concepts",
                color: "yellow"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Achievements",
                description: "Unlock badges and rewards for consistency and excellence",
                color: "purple"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Real-time Analytics",
                description: "Track your progress with detailed insights and performance metrics",
                color: "green"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className={`w-14 h-14 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4 text-${feature.color}-600`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}