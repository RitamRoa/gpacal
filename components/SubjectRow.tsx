'use client';

import { gradeOptions } from '@/lib/db';
import { Trash2 } from 'lucide-react';

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
    <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 md:gap-4 items-center p-4 bg-white dark:bg-rv-navy/20 rounded-xl border border-rv-green-accent/20 hover:border-rv-green-light/40 transition-all duration-200 shadow-sm hover:shadow-md">
      <input
        type="text"
        value={courseName}
        onChange={(e) => onUpdate(id, 'courseName', e.target.value)}
        placeholder="e.g., Data Structures"
        className="px-4 py-2.5 rounded-lg border border-rv-green-accent/30 focus:border-rv-green focus:ring-2 focus:ring-rv-green/20 outline-none bg-white dark:bg-rv-navy/50 font-body text-base transition-all"
      />
      
      <input
        type="number"
        value={credits}
        onChange={(e) => onUpdate(id, 'credits', parseFloat(e.target.value) || 0)}
        min="0"
        max="10"
        step="0.5"
        placeholder="Credits"
        className="w-20 md:w-24 px-3 py-2.5 rounded-lg border border-rv-green-accent/30 focus:border-rv-green focus:ring-2 focus:ring-rv-green/20 outline-none bg-white dark:bg-rv-navy/50 text-center font-body transition-all"
      />
      
      <select
        value={grade}
        onChange={(e) => onUpdate(id, 'grade', e.target.value)}
        className="w-20 md:w-24 px-3 py-2.5 rounded-lg border border-rv-green-accent/30 focus:border-rv-green focus:ring-2 focus:ring-rv-green/20 outline-none bg-white dark:bg-rv-navy/50 text-center font-body font-semibold transition-all cursor-pointer"
      >
        <option value="">Grade</option>
        {gradeOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      
      <button
        onClick={() => onRemove(id)}
        className="p-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label="Remove subject"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
