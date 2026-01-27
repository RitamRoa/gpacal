import Dexie, { Table } from 'dexie';

export interface Subject {
  id?: number;
  semesterId: number;
  courseName: string;
  credits: number;
  grade: string;
  gradeValue: number;
  createdAt: Date;
}

export interface Semester {
  id?: number;
  name: string;
  sgpa: number;
  totalCredits: number;
  totalQualityPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export class GPADatabase extends Dexie {
  subjects!: Table<Subject>;
  semesters!: Table<Semester>;

  constructor() {
    super('GPACalculatorDB');
    
    this.version(1).stores({
      subjects: '++id, semesterId, courseName, credits, grade, createdAt',
      semesters: '++id, name, sgpa, createdAt, updatedAt'
    });
  }
}

export const db = new GPADatabase();

// Grade scale mapping
export const gradeScale: Record<string, number> = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'P': 4,
  'F': 0
};

export const gradeOptions = Object.keys(gradeScale);
