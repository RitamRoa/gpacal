'use client';

import { motion } from 'framer-motion';
import { BookTemplate, ChevronRight } from 'lucide-react';
import { semesterPresets, SemesterPreset } from '@/lib/presets';

interface PresetSelectorProps {
  onSelectPreset: (preset: SemesterPreset) => void;
}

export default function PresetSelector({ onSelectPreset }: PresetSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 p-6 bg-white/80 dark:bg-rv-navy/40 backdrop-blur-xl rounded-2xl shadow-xl border border-rv-green-accent/30"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 bg-gradient-to-br from-rv-green to-rv-green-light rounded-xl">
          <BookTemplate size={22} className="text-white" />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg text-gray-800 dark:text-gray-100">
            Quick Start Templates
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Load pre-filled course data for your semester
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {semesterPresets.map((preset, index) => (
          <motion.button
            key={preset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectPreset(preset)}
            className="group relative overflow-hidden text-left p-5 bg-gradient-to-br from-white to-gray-50/50 dark:from-rv-navy/60 dark:to-rv-navy/40 hover:from-rv-green-accent/10 hover:to-rv-green-light/10 dark:hover:from-rv-green-accent/20 dark:hover:to-rv-green-light/20 rounded-xl border border-rv-green-accent/20 hover:border-rv-green transition-all duration-300 shadow-md hover:shadow-xl"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rv-green/5 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            
            <div className="relative">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="font-display font-bold text-lg text-rv-green group-hover:text-rv-green-light transition-colors">
                    {preset.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-body">
                    Academic Year {preset.academicYear}
                  </div>
                </div>
                <ChevronRight 
                  size={20} 
                  className="text-rv-green-accent group-hover:text-rv-green group-hover:translate-x-1 transition-all duration-200" 
                />
              </div>
              
              <div className="mt-3 pt-3 border-t border-rv-green-accent/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 font-body">
                    {preset.subjects.length} Courses
                  </span>
                  <span className="text-rv-green font-semibold font-body">
                    {preset.subjects.reduce((sum, s) => sum + s.credits, 0)} Credits
                  </span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-700/50"
      >
        <p className="text-sm text-blue-800 dark:text-blue-300 font-body">
          💡 <span className="font-semibold">Tip:</span> Click a template to auto-fill course names and credits. You only need to enter your grades!
        </p>
      </motion.div>
    </motion.div>
  );
}
