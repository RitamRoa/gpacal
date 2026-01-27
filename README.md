# SGPA Calculator

A modern, responsive web application for calculating Semester Grade Point Average (SGPA) using the 10-point grading scale. Built with Next.js 16, TypeScript, Tailwind CSS 4, and IndexedDB for offline-first data persistence.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Overview

SGPA Calculator is a client-side web application designed to help students calculate their Semester Grade Point Average efficiently. The application features local data persistence through IndexedDB, allowing users to save and manage multiple semesters without requiring a backend server. All calculations are performed in real-time with a focus on user experience and accessibility.

## Features

- **Dynamic Subject Management** - Add, edit, and remove subjects with real-time validation
- **10-Point Grading System** - Full support for O, A+, A, B+, B, C, P, and F grades
- **Semester Templates** - Pre-configured templates for quick data entry
- **Persistent Storage** - IndexedDB integration for offline data storage
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Dark Mode Support** - Automatic theme detection and switching
- **Real-time Calculation** - Instant SGPA computation with quality points breakdown
- **Export Capability** - Static site generation for deployment on any hosting platform

## Technical Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks
- **Database**: IndexedDB with Dexie.js
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Installation

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm

### Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/gpacal.git
cd gpacal
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Production Build

Generate a production build:

```bash
pnpm build
pnpm start
```

## Grading Scale

| Grade | Points |
|-------|--------|
| O     | 10     |
| A+    | 9      |
| A     | 8      |
| B+    | 7      |
| B     | 6      |
| C     | 5      |
| P     | 4      |
| F     | 0      |

The application implements the standard 10-point grading system where SGPA is calculated using the weighted average formula.

## Calculation Methodology

The SGPA is computed using the following formula:

```
SGPA = (Sum of Quality Points) / (Sum of Credits)

Where: Quality Points = Credits × Grade Value
```

## Deployment

This project is configured for static site generation and can be deployed to any hosting platform that supports static files.

### GitHub Pages

The repository includes a GitHub Actions workflow for automatic deployment:

1. Enable GitHub Pages in repository Settings > Pages
2. Set Source to "GitHub Actions"
3. Push changes to the main branch
4. The workflow will automatically build and deploy

The site will be available at `https://username.github.io/gpacal/`

### Other Platforms

The static build can be deployed to Vercel, Netlify, Cloudflare Pages, or any static hosting service:

```bash
pnpm build
# Deploy the 'out' directory
```

## Contributing

Contributions are welcome and appreciated. To contribute:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/improvement`)
3. **Commit your changes** (`git commit -am 'Add new feature'`)
4. **Push to the branch** (`git push origin feature/improvement`)
5. **Open a Pull Request**

### Reporting Issues

If you encounter any bugs or have feature requests:

1. Check if the issue already exists in the [Issues](https://github.com/yourusername/gpacal/issues) section
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (browser, OS)

### Development Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Update documentation for any new features
- Ensure the build passes before submitting PR (`pnpm build`)
- Test on multiple devices and browsers when possible

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Designed for RV University students and adaptable for any institution using the 10-point grading scale.

---

**Note**: This is a client-side application. All data is stored locally in the browser using IndexedDB. Data will not sync across devices or browsers.
