'use client';

import { gradeOptions } from '@/lib/db';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface SubjectRowProps {
  id: string;
  courseName: string;
  credits: number;
  grade: string;
  onUpdate: (id: string, field: string, value: string | number) => void;
  onRemove: (id: string) => void;
}

export default function SubjectRow({
  id,
  courseName,
  credits,
  grade,
  onUpdate,
  onRemove,
}: SubjectRowProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3 md:gap-4 items-start md:items-center p-4 bg-white/70 dark:bg-rv-navy/20 backdrop-blur-sm rounded-xl border border-rv-green-accent/20 hover:border-rv-green-light/40 shadow-sm hover:shadow-lg"
    >
      {/* Course Name */}
      <div className="space-y-1">
        <label className="block md:hidden text-xs font-display font-semibold text-rv-green uppercase tracking-wide">
          Course Name
        </label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => onUpdate(id, 'courseName', e.target.value)}
          placeholder="e.g., Data Structures"
          className="w-full px-4 py-2.5 rounded-lg border border-rv-green-accent/30 focus:border-rv-green focus:ring-2 focus:ring-rv-green/20 outline-none bg-white dark:bg-rv-navy/50 font-body text-base transition-all"
        />
      </div>
      
      {/* Credits and Grade - Side by Side on Mobile */}
      <div className="grid grid-cols-2 md:contents gap-3">
        {/* Credits */}
        <div className="space-y-1">
          <label className="block md:hidden text-xs font-display font-semibold text-rv-green uppercase tracking-wide">
            Credits
          </label>
          <input
            type="number"
            value={credits}
            onChange={(e) => onUpdate(id, 'credits', parseFloat(e.target.value) || 0)}
            min="0"
            max="10"
            step="0.5"
            placeholder="Credits"
            className="w-full md:w-24 px-3 py-2.5 rounded-lg border border-rv-green-accent/30 focus:border-rv-green focus:ring-2 focus:ring-rv-green/20 outline-none bg-white dark:bg-rv-navy/50 text-center font-body transition-all"
          />
        </div>
        
        {/* Grade */}
        <div className="space-y-1">
          <label className="block md:hidden text-xs font-display font-semibold text-rv-green uppercase tracking-wide">
            Grade
          </label>
          <select
            value={grade}
            onChange={(e) => onUpdate(id, 'grade', e.target.value)}
            className="w-full md:w-24 px-3 py-2.5 rounded-lg border border-rv-green-accent/30 focus:border-rv-green focus:ring-2 focus:ring-rv-green/20 outline-none bg-white dark:bg-rv-navy/50 text-center font-body font-semibold transition-all cursor-pointer"
          >
            <option value="">Select</option>
            {gradeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Remove Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onRemove(id)}
        className="w-full md:w-auto p-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-colors duration-200 flex items-center justify-center gap-2 font-display font-semibold text-sm"
        aria-label="Remove subject"
      >
        <Trash2 size={18} />
        <span className="md:hidden">Remove</span>
      </motion.button>
    </motion.div>
  );
}
