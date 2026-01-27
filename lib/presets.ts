export interface PresetSubject {
  courseName: string;
  credits: number;
}

export interface SemesterPreset {
  id: string;
  name: string;
  academicYear: string;
  subjects: PresetSubject[];
}

export const semesterPresets: SemesterPreset[] = [
  {
    id: 'sem1-2024-2025',
    name: 'UG Semester-1',
    academicYear: '2024-2025',
    subjects: [
      { courseName: 'CS1005-PROGRAMMING IN C', credits: 3 },
      { courseName: 'CS1101-DIGITAL SYSTEMS AND COMPUTER ARCHITECTURE', credits: 3 },
      { courseName: 'CS1307-WEB FUNDAMENTALS AND UX DESIGN', credits: 3 },
      { courseName: 'CS1805-ENGINEERING EXPLORATIONS - 1', credits: 3 },
      { courseName: 'CS1804-EXPLORING SCIENCE - 1', credits: 3 },
      { courseName: 'CS1803-DISCRETE MATHEMATICS AND GRAPH THEORY', credits: 3 },
      { courseName: 'CS1902-STRUCTURED INNOVATION WITH DESIGN THINKING', credits: 3 },
      { courseName: 'CS1909-CONSTITUTION OF INDIA AND PROFESSIONAL ETHICS', credits: 3 },
    ],
  },
  {
    id: 'sem2-2024-2025',
    name: 'UG Semester-2',
    academicYear: '2024-2025',
    subjects: [
      { courseName: 'CS1904-ENTREPRENEURIAL MINDSET', credits: 3 },
      { courseName: 'CS1925-YOGA & WELLBEING', credits: 2 },
      { courseName: 'CS1927-ENGLISH COMMUNICATION', credits: 2 },
      { courseName: 'CS1102-EMBEDDED SYSTEMS AND ARM MICROCONTROLLERS', credits: 3 },
      { courseName: 'CS1103-OPERATING SYSTEMS', credits: 3 },
      { courseName: 'CS1211-DATABASE MANAGEMENT SYSTEMS', credits: 4 },
      { courseName: 'CS1006-DATA STRUCTURES', credits: 4 },
      { courseName: 'CS1807-LINEAR ALGEBRA', credits: 3 },
    ],
  },
  {
    id: 'sem3-2025-2026',
    name: 'UG Semester-3',
    academicYear: '2025-2026',
    subjects: [
      { courseName: 'CS2000-DESIGN AND ANALYSIS OF ALGORITHMS', credits: 4 },
      { courseName: 'Elective', credits: 2 },
      { courseName: 'GN1001-Environment Education', credits: 2 },
      { courseName: 'CS2806-CALCULUS', credits: 2 },
      { courseName: 'CS2403-COMPUTER NETWORKS', credits: 3 },
      { courseName: 'CS2404-INTERNET OF THINGS', credits: 3 },
      { courseName: 'Majors', credits: 3 },
      { courseName: 'Minor 1', credits: 3 },
      { courseName: 'Minor 2', credits: 3 },
    ],
  },
];
