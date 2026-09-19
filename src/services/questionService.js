import { supabase, isSupabaseConfigured } from './supabase';
import { SEED_QUESTIONS } from '../data/seedQuestions';

const LOCAL_STORAGE_KEY = 'PAYIQ_LOCAL_QUESTIONS';
const BOOKMARKS_STORAGE_KEY = 'PAYIQ_LOCAL_BOOKMARKS';

/**
 * Initialize local storage with seed questions if empty
 */
function getLocalQuestions() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SEED_QUESTIONS));
    return SEED_QUESTIONS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return SEED_QUESTIONS;
  }
}

function saveLocalQuestions(questions) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(questions));
}

/**
 * Fetch questions matching multi-parametric filters
 */
export async function fetchQuestions({
  exam = 'ALL',
  subjectId = 'ALL',
  classLevel = 'ALL',
  chapterId = 'ALL',
  topicId = 'ALL',
  year = 'ALL',
  questionType = 'ALL',
  difficulty = 'ALL',
  searchQuery = '',
} = {}) {
  // If Supabase is active, query Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('master_questions').select('*');

      if (exam !== 'ALL') query = query.eq('exam', exam);
      if (subjectId !== 'ALL') query = query.eq('subject_id', subjectId);
      if (chapterId !== 'ALL') query = query.eq('chapter_id', chapterId);
      if (topicId !== 'ALL') query = query.eq('topic_id', topicId);
      if (year !== 'ALL') query = query.eq('year', parseInt(year));
      if (questionType !== 'ALL') query = query.eq('question_type', questionType);
      if (difficulty !== 'ALL') query = query.eq('difficulty', difficulty);
      if (searchQuery.trim()) {
        query = query.ilike('question_text', `%${searchQuery.trim()}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase query failed, falling back to local storage:', err);
    }
  }

  // Fallback to local storage
  let all = getLocalQuestions();

  return all.filter((q) => {
    if (exam !== 'ALL' && q.exam !== exam) return false;
    if (subjectId !== 'ALL' && q.subject_id !== subjectId) return false;
    if (chapterId !== 'ALL' && q.chapter_id !== chapterId) return false;
    if (topicId !== 'ALL' && q.topic_id !== topicId) return false;
    if (year !== 'ALL' && q.year !== parseInt(year)) return false;
    if (questionType !== 'ALL' && q.question_type !== questionType) return false;
    if (difficulty !== 'ALL' && q.difficulty !== difficulty) return false;
    if (searchQuery.trim()) {
      const qLower = (q.question_text + ' ' + (q.solution_text || '')).toLowerCase();
      if (!qLower.includes(searchQuery.toLowerCase())) return false;
    }
    return true;
  });
}

/**
 * Add / Commit new questions to Database & Storage
 */
export async function saveParsedQuestions(newQuestions = []) {
  if (!newQuestions.length) return { success: true, count: 0 };

  // Try Supabase first
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('master_questions').insert(newQuestions);
      if (error) throw error;
      return { success: true, count: newQuestions.length, data };
    } catch (err) {
      console.error('Failed to commit to Supabase:', err);
    }
  }

  // Save to local storage
  const current = getLocalQuestions();
  const updated = [...newQuestions, ...current];
  saveLocalQuestions(updated);
  return { success: true, count: newQuestions.length, local: true };
}

/**
 * Bookmarks management
 */
export function getBookmarks() {
  const data = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function toggleBookmark(questionId) {
  const bookmarks = getBookmarks();
  let updated;
  if (bookmarks.includes(questionId)) {
    updated = bookmarks.filter(id => id !== questionId);
  } else {
    updated = [...bookmarks, questionId];
  }
  localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
