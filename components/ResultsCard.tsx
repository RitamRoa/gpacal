'use client';

import { motion } from 'framer-motion';
import { Award, BookOpen, TrendingUp } from 'lucide-react';

interface ResultsCardProps {
  sgpa: number;
  totalCredits: number;
  totalQualityPoints: number;
}

export default function ResultsCard({
  sgpa,
  totalCredits,
  totalQualityPoints,
}: ResultsCardProps) {
  const getGradeColor = (sgpa: number) => {
    if (sgpa >= 9) return 'text-emerald-600 dark:text-emerald-400';
    if (sgpa >= 8) return 'text-green-600 dark:text-green-400';
    if (sgpa >= 7) return 'text-lime-600 dark:text-lime-400';
    if (sgpa >= 6) return 'text-yellow-600 dark:text-yellow-400';
    if (sgpa >= 5) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getPerformanceText = (sgpa: number) => {
    if (sgpa >= 9) return 'Outstanding Performance!';
    if (sgpa >= 8) return 'Excellent Work!';
    if (sgpa >= 7) return 'Very Good!';
    if (sgpa >= 6) return 'Good Progress';
    if (sgpa >= 5) return 'Average Performance';
    return 'Needs Improvement';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-rv-green via-rv-green-light to-rv-green-accent p-8 rounded-2xl shadow-2xl text-white"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
          <Award size={32} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold">Your Results</h2>
          <p className="text-white/80 text-sm">{getPerformanceText(sgpa)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-white/80" />
            <span className="text-sm font-body text-white/80">SGPA</span>
          </div>
          <div className={`text-5xl font-display font-black ${getGradeColor(sgpa)}`}>
            {sgpa.toFixed(2)}
          </div>
          <div className="mt-2 text-xs text-white/60">Out of 10.00</div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={20} className="text-white/80" />
            <span className="text-sm font-body text-white/80">Total Credits</span>
          </div>
          <div className="text-4xl font-display font-bold">
            {totalCredits.toFixed(1)}
          </div>
          <div className="mt-2 text-xs text-white/60">Credits Earned</div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <Award size={20} className="text-white/80" />
            <span className="text-sm font-body text-white/80">Quality Points</span>
          </div>
          <div className="text-4xl font-display font-bold">
            {totalQualityPoints.toFixed(2)}
          </div>
          <div className="mt-2 text-xs text-white/60">Total QP Earned</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
      >
        <p className="text-sm font-body text-white/90">
          <span className="font-semibold">Formula:</span> SGPA = Total Quality Points ({totalQualityPoints.toFixed(2)}) ÷ Total Credits ({totalCredits.toFixed(1)})
        </p>
      </motion.div>
    </motion.div>
  );
}
