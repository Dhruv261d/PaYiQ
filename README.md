# PaYiQ — Multimodal AI Exam Paper Segregator & LaTeX Engine ⚡

PaYiQ is an AI-powered document processing platform that ingests raw examination papers (PDFs/images), performs intelligent OCR and multimodal analysis using **Google Gemini**, converts complex formulas into standardized **KaTeX** ($...$), and automatically segregates questions against a master NCERT syllabus taxonomy across Physics, Chemistry, Mathematics, and Biology (JEE/NEET).

---

## 🌟 Key Features

- **Multimodal AI Extraction:** Leverages Google Gemini Flash Vision models (`@google/genai`) to parse questions, multiple-choice options, and diagrams from complex layouts.
- **Automated LaTeX Math Conversion:** Automatically detects and converts mathematical equations and chemical formulas into clean KaTeX markup.
- **Syllabus Auto-Classification:** Maps extracted questions strictly against a multi-tier chapter hierarchy for JEE Main, JEE Advanced, NEET UG, MHT-CET, and BITSAT.
- **Flexible Print & PDF Generation:** Exports clean, A4-formatted chapter-wise question banks in 3 modes:
  1. *With Full Solutions*
  2. *Without Answers (Clean Student Test Sheet)*
  3. *With Detachable Answer Key Grid*
- **Workspaces & Storage:** Manage questions across **Segregator Studio**, **Master Vault**, and **Shift Archive** with Supabase and local storage persistence.

---

## 🛠️ Technology Stack

- **Core & UI:** React 19, Vite, Tailwind CSS v4, Lucide React, Canvas Confetti
- **AI & Multimodal Vision:** Google Gemini Multimodal SDK (`@google/genai`)
- **Formula Rendering:** KaTeX
- **Database & Auth:** Supabase / Local Storage
- **Linter & Tooling:** Oxlint, PostCSS

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Dhruv261d/PaYiQ.git
   cd PaYiQ
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📄 License
Distributed under the [MIT License](LICENSE).