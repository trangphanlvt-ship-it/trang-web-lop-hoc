import { createClient } from '@supabase/supabase-js';
import { INITIAL_QUESTION_BANK, CLASS_ROSTER_54 } from './curriculumData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project-id.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const isSupabaseConfigured = () => {
  return (
    import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_ANON_KEY &&
    import.meta.env.VITE_SUPABASE_URL !== 'https://your-supabase-project-id.supabase.co' &&
    !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// ==============================================================================
// SUPABASE REAL DATABASE QUERIES & FALLBACK ENGINE
// ==============================================================================

// 1. Fetch Question Bank from Supabase `question_bank` Table
export const fetchQuestionBank = async (subjectCode = null) => {
  if (isSupabaseConfigured()) {
    try {
      let query = supabase.from('question_bank').select('*').order('created_at', { ascending: false });
      if (subjectCode) {
        query = query.eq('subject', subjectCode);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn("Supabase fetchQuestionBank warning, fallback used:", err);
    }
  }
  return subjectCode
    ? INITIAL_QUESTION_BANK.filter(q => q.subject === subjectCode)
    : INITIAL_QUESTION_BANK;
};

// 2. Insert new question into Supabase `question_bank` Table
export const addQuestionToBank = async (questionObj) => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('question_bank')
        .insert([{
          subject: questionObj.subject,
          topic: questionObj.topic,
          question_text: questionObj.question_text,
          options: questionObj.options,
          correct_answer: questionObj.correct_answer,
          explanation: questionObj.explanation,
          difficulty: questionObj.difficulty || 'medium'
        }])
        .select();
      if (!error && data) {
        return { success: true, data: data[0] };
      }
    } catch (err) {
      console.error("Supabase addQuestionToBank error:", err);
    }
  }
  return { success: true, data: questionObj };
};

// 3. Save Student Progress to Supabase `student_progress` Table
export const saveStudentProgress = async (studentId, score, timeSeconds, assignmentId = null) => {
  if (isSupabaseConfigured() && studentId) {
    try {
      const { data, error } = await supabase
        .from('student_progress')
        .insert([{
          student_id: studentId,
          assignment_id: assignmentId,
          score: score,
          completion_time_seconds: timeSeconds,
          status: 'completed',
          completed_at: new Date().toISOString()
        }])
        .select();
      if (!error && data) {
        return { success: true, data: data[0] };
      }
    } catch (err) {
      console.warn("Supabase saveStudentProgress error:", err);
    }
  }
  return { success: true };
};

// 4. Fetch Class Roster from Supabase `profiles` Table
export const fetchClassRoster = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('stars_count', { ascending: false });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn("Supabase fetchClassRoster fallback:", err);
    }
  }
  return CLASS_ROSTER_54;
};
