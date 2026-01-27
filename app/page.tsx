'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calculator, BookMarked, Sparkles } from 'lucide-react';
import SubjectRow from '@/components/SubjectRow';
import ResultsCard from '@/components/ResultsCard';
import PresetSelector from '@/components/PresetSelector';
import { gradeScale, db, Subject as SubjectType } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { SemesterPreset } from '@/lib/presets';

interface SubjectInput {
  id: string;
  courseName: string;
  credits: number;
  grade: string;
}

export default function HomePage() {
  const [subjects, setSubjects] = useState<SubjectInput[]>([
    { id: '1', courseName: '', credits: 0, grade: '' },
  ]);
  const [results, setResults] = useState<{
    sgpa: number;
    totalCredits: number;
    totalQualityPoints: number;
  } | null>(null);
  const [semesterName, setSemesterName] = useState('');
  const [currentSemesterId, setCurrentSemesterId] = useState<number | null>(null);

  // Load saved semesters
  const semesters = useLiveQuery(() => db.semesters.orderBy('createdAt').reverse().toArray());

  const addSubject = () => {
    setSubjects([
      ...subjects,
      { id: Date.now().toString(), courseName: '', credits: 0, grade: '' },
    ]);
  };

  const updateSubject = (id: string, field: string, value: string | number) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === id ? { ...subject, [field]: value } : subject
      )
    );
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((subject) => subject.id !== id));
    }
  };

  const calculateSGPA = async () => {
    const validSubjects = subjects.filter(
      (s) => s.courseName && s.credits > 0 && s.grade
    );

    if (validSubjects.length === 0) {
      alert('Please add at least one valid subject with course name, credits, and grade.');
      return;
    }

    let totalQualityPoints = 0;
    let totalCredits = 0;

    validSubjects.forEach((subject) => {
      const gradeValue = gradeScale[subject.grade];
      const qualityPoints = subject.credits * gradeValue;
      totalQualityPoints += qualityPoints;
      totalCredits += subject.credits;
    });

    const sgpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

    setResults({
      sgpa,
      totalCredits,
      totalQualityPoints,
    });

    // Save to IndexedDB
    if (semesterName.trim()) {
      const semId = await db.semesters.add({
        name: semesterName.trim(),
        sgpa,
        totalCredits,
        totalQualityPoints,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      setCurrentSemesterId(semId as number);

      // Save subjects
      await Promise.all(
        validSubjects.map((subject) =>
          db.subjects.add({
            semesterId: semId as number,
            courseName: subject.courseName,
            credits: subject.credits,
            grade: subject.grade,
            gradeValue: gradeScale[subject.grade],
            createdAt: new Date(),
          })
        )
      );
    }

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const resetCalculator = () => {
    setSubjects([{ id: '1', courseName: '', credits: 0, grade: '' }]);
    setResults(null);
    setSemesterName('');
    setCurrentSemesterId(null);
  };

  const loadSemester = async (semesterId: number) => {
    const semester = await db.semesters.get(semesterId);
    const savedSubjects = await db.subjects.where('semesterId').equals(semesterId).toArray();

    if (semester && savedSubjects) {
      setSemesterName(semester.name);
      setSubjects(
        savedSubjects.map((s) => ({
          id: s.id!.toString(),
          courseName: s.courseName,
          credits: s.credits,
          grade: s.grade,
        }))
      );
      setResults({
        sgpa: semester.sgpa,
        totalCredits: semester.totalCredits,
        totalQualityPoints: semester.totalQualityPoints,
      });
      setCurrentSemesterId(semesterId);
    }
  };

  const loadPreset = (preset: SemesterPreset) => {
    setSemesterName(`${preset.name} - ${preset.academicYear}`);
    setSubjects(
      preset.subjects.map((subject, index) => ({
        id: `preset-${index}-${Date.now()}`,
        courseName: subject.courseName,
        credits: subject.credits,
        grade: '',
      }))
    );
    setResults(null);
    setCurrentSemesterId(null);
    
    // Scroll to subjects section
    setTimeout(() => {
      document.getElementById('subjects-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-green-100/30 dark:from-slate-950 dark:via-emerald-950/50 dark:to-teal-950/30" />
        
        {/* Animated blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-rv-green/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-rv-green-light/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-rv-green-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/logo.svg" 
              alt="GPACal Logo" 
              className="w-16 h-16 md:w-20 md:h-20"
            />
            <h1 className="text-5xl md:text-6xl font-display font-black bg-gradient-to-r from-rv-green via-rv-green-light to-rv-green-accent bg-clip-text text-transparent drop-shadow-sm">
              GPACal
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-body max-w-2xl mx-auto">
            Calculate your Semester Grade Point Average using the 10-point grading scale.
            Add subjects, enter grades, and track your academic progress.
          </p>
        </motion.div>

        {/* Saved Semesters */}
        {semesters && semesters.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 p-6 bg-white/80 dark:bg-rv-navy/40 backdrop-blur-sm rounded-2xl shadow-xl border border-rv-green-accent/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <BookMarked size={20} className="text-rv-green" />
              <h3 className="font-display font-semibold text-lg">Previous Semesters</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {semesters.map((sem) => (
                <button
                  key={sem.id}
                  onClick={() => loadSemester(sem.id!)}
                  className="text-left p-4 bg-gradient-to-br from-rv-green-accent/10 to-rv-green-light/10 hover:from-rv-green-accent/20 hover:to-rv-green-light/20 rounded-xl border border-rv-green-accent/30 transition-all duration-200 hover:scale-105"
                >
                  <div className="font-display font-semibold text-rv-green-light">{sem.name}</div>
                  <div className="text-2xl font-display font-bold text-rv-green">{sem.sgpa.toFixed(2)}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{sem.totalCredits} Credits</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Preset Templates */}
        <PresetSelector onSelectPreset={loadPreset} />

        {/* Semester Name Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
          id="subjects-section"
        >
          <label className="block mb-2 font-display font-semibold text-gray-700 dark:text-gray-200">
            Semester Name (Optional)
          </label>
          <input
            type="text"
            value={semesterName}
            onChange={(e) => setSemesterName(e.target.value)}
            placeholder="e.g., Semester 5 - Fall 2026"
            className="w-full px-5 py-3 rounded-xl border border-rv-green-accent/30 focus:border-rv-green focus:ring-2 focus:ring-rv-green/20 outline-none bg-white dark:bg-rv-navy/50 font-body text-lg transition-all"
          />
        </motion.div>

        {/* Subjects Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 space-y-3"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100">
              Your Subjects
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-body">
              {subjects.length} subject{subjects.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Column Headers */}
          <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-4 py-3 mb-2 bg-gradient-to-r from-rv-green/10 via-rv-green-light/10 to-rv-green-accent/10 rounded-xl border border-rv-green-accent/30">
            <div className="font-display font-bold text-sm text-rv-green uppercase tracking-wide">
              Course Name
            </div>
            <div className="w-24 font-display font-bold text-sm text-rv-green uppercase tracking-wide text-center">
              Credits
            </div>
            <div className="w-24 font-display font-bold text-sm text-rv-green uppercase tracking-wide text-center">
              Grade
            </div>
            <div className="w-[42px] font-display font-bold text-sm text-rv-green uppercase tracking-wide text-center">
              Action
            </div>
          </div>

          <AnimatePresence>
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <SubjectRow
                  {...subject}
                  onUpdate={updateSubject}
                  onRemove={removeSubject}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addSubject}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-rv-navy/40 hover:bg-gray-50 dark:hover:bg-rv-navy/60 text-rv-green font-display font-semibold rounded-xl border-2 border-rv-green-accent/40 hover:border-rv-green transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus size={20} />
            Add Subject
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateSGPA}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-rv-green via-rv-green-light to-rv-green-accent hover:from-rv-green-light hover:via-rv-green-accent hover:to-rv-green text-white font-display font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200"
          >
            <Sparkles size={20} />
            Calculate SGPA
          </motion.button>

          {results && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetCalculator}
              className="sm:w-auto px-6 py-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-display font-semibold rounded-xl transition-all duration-200"
            >
              Reset
            </motion.button>
          )}
        </div>

        {/* Results */}
        {results && (
          <div id="results">
            <ResultsCard {...results} />
          </div>
        )}

        {/* Grade Scale Reference */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 bg-white/80 dark:bg-rv-navy/40 backdrop-blur-sm rounded-2xl shadow-xl border border-rv-green-accent/20"
        >
          <h3 className="font-display font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">
            Grading Scale Reference
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-3">
            {Object.entries(gradeScale).map(([grade, value]) => (
              <div
                key={grade}
                className="p-3 bg-gradient-to-br from-rv-green-accent/10 to-rv-green-light/10 rounded-lg text-center border border-rv-green-accent/20"
              >
                <div className="font-display font-bold text-lg text-rv-green">{grade}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
