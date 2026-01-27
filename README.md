# 🎓 SGPA Calculator

A modern, responsive web application for calculating Semester Grade Point Average (SGPA) using the 10-point grading scale. Built with Next.js 15, TypeScript, Tailwind CSS, and IndexedDB for persistent local storage.

![SGPA Calculator](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

- **Dynamic Subject Management**: Add and remove subjects on the fly
- **10-Point Grading Scale**: Supports O (10) to F (0) grading system
- **Real-time Calculation**: Instant SGPA calculation with quality points breakdown
- **Persistent Storage**: Save multiple semesters using IndexedDB (Dexie.js)
- **Beautiful UI**: Modern design with smooth animations using Framer Motion
- **Dark Mode**: Automatic dark mode support
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Offline Capable**: All data stored locally in your browser

## 🎨 Design

The app uses the RV University color palette:
- **Primary Green**: Professional green tones for a fresh, academic feel
- **Gold Accents**: Subtle gold highlights from the university branding
- **Navy Dark Mode**: Sophisticated dark navy background
- **Custom Typography**: Outfit for headings, Space Grotesk for body text

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

\`\`\`bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📊 Grading Scale

| Grade | Points |
|-------|--------|
| O     | 10     |
| A+    | 9      |
| A     | 8      |
| B+    | 7      |
| B     | 6      |
| C+    | 5      |
| C     | 4      |
| D+    | 3      |
| D     | 2      |
| E     | 1      |
| F     | 0      |

## 📐 Calculation Formula

The SGPA is calculated using the weighted average method:

SGPA = (Sum of Quality Points) / (Sum of Credits)

For each subject: Quality Points = Credits × Grade Value

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: IndexedDB with Dexie.js
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 🎯 Usage

1. **Add Subjects**: Click "Add Subject" to create new subject rows
2. **Enter Details**: Fill in course name, credits, and select grade
3. **Name Semester** (Optional): Give your semester a name for easy tracking
4. **Calculate**: Click "Calculate SGPA" to see your results
5. **Save**: Named semesters are automatically saved to IndexedDB
6. **Load**: Click on any previous semester to view/edit it

## 📝 License

MIT
