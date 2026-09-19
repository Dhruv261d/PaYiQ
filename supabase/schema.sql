-- ====================================================================
-- PaYiQ: Master Database Schema & PostgreSQL Migration for Supabase
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TAXONOMY: SUBJECTS
CREATE TABLE IF NOT EXISTS subjects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    icon TEXT,
    color TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TAXONOMY: CHAPTERS
CREATE TABLE IF NOT EXISTS chapters (
    id TEXT PRIMARY KEY,
    subject_id TEXT REFERENCES subjects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    class_level INTEGER NOT NULL CHECK (class_level IN (11, 12)),
    unit TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TAXONOMY: TOPICS
CREATE TABLE IF NOT EXISTS topics (
    id TEXT PRIMARY KEY,
    chapter_id TEXT REFERENCES chapters(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. EXAM PAPERS (Shift/Session metadata)
CREATE TABLE IF NOT EXISTS exam_papers (
    id TEXT PRIMARY KEY,
    exam TEXT NOT NULL CHECK (exam IN ('JEE_MAIN', 'JEE_ADVANCED', 'NEET', 'MHT_CET', 'BITSAT', 'GATE')),
    year INTEGER NOT NULL CHECK (year >= 2000 AND year <= 2030),
    session_shift TEXT NOT NULL, -- e.g. "2025_JAN_S1", "2024_APR_S2", "2024_PHASE_1"
    total_questions INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. MASTER QUESTIONS REPOSITORY
CREATE TABLE IF NOT EXISTS master_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paper_id TEXT REFERENCES exam_papers(id) ON DELETE SET NULL,
    exam TEXT NOT NULL CHECK (exam IN ('JEE_MAIN', 'JEE_ADVANCED', 'NEET', 'MHT_CET', 'BITSAT', 'GATE')),
    year INTEGER NOT NULL,
    session_shift TEXT,
    subject_id TEXT REFERENCES subjects(id) ON DELETE RESTRICT,
    chapter_id TEXT REFERENCES chapters(id) ON DELETE RESTRICT,
    topic_id TEXT REFERENCES topics(id) ON DELETE SET NULL,
    question_type TEXT NOT NULL CHECK (question_type IN ('MCQ', 'NUMERICAL')),
    difficulty TEXT NOT NULL CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD')),
    question_text TEXT NOT NULL,
    diagram_url TEXT,
    options JSONB, -- Array of { "id": "A", "text": "$...$" } for MCQ, null for NUMERICAL
    correct_answer TEXT NOT NULL, -- "A" or numerical value string e.g. "4.5"
    solution_text TEXT,
    search_vector tsvector GENERATED ALWAYS AS (
        to_tsvector('english', coalesce(question_text, '') || ' ' || coalesce(solution_text, ''))
    ) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. USER SAVED WORKSHEETS / DPPs
CREATE TABLE IF NOT EXISTS saved_worksheets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    institute_name TEXT DEFAULT 'PaYiQ Academy',
    exam TEXT,
    subject_id TEXT,
    question_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. USER BOOKMARKS
CREATE TABLE IF NOT EXISTS bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    question_id UUID REFERENCES master_questions(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, question_id)
);

-- ====================================================================
-- PERFORMANCE COMPOUND INDEXES FOR SUB-SECOND FILTERING
-- ====================================================================

CREATE INDEX IF NOT EXISTS idx_questions_exam_subject_year ON master_questions (exam, subject_id, year DESC);
CREATE INDEX IF NOT EXISTS idx_questions_chapter_topic ON master_questions (chapter_id, topic_id);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON master_questions (difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_search_vector ON master_questions USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS idx_chapters_subject_class ON chapters (subject_id, class_level);

-- ====================================================================
-- STORAGE BUCKETS SETUP (Supabase Storage)
-- ====================================================================
-- Run in Supabase Storage Dashboard:
-- 1. Create a public bucket: 'exam-diagrams'
-- 2. Set Public Read policy for all clients.
