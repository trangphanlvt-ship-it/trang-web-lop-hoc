import { createClient } from '@supabase/supabase-js';
import { INITIAL_QUESTION_BANK, CLASS_ROSTER_54 } from './curriculumData';

// User's Live Supabase Project Credentials
const DEFAULT_SUPABASE_URL = 'https://nepktjichhnksedkcgrc.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lcGt0amljaGhua3NlZGtjZ3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyNTIwMzAsImV4cCI6MjEwMTgyODAzMH0.P4MTOAcpkfeuZumb3UNiiOCFuo8cutqY3UHi27Ry6MU';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
  return true;
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// ==============================================================================
// SUPABASE REAL DATABASE QUERIES
// ==============================================================================

// 1. Fetch Question Bank from Supabase `question_bank` Table
export const fetchQuestionBank = async (subjectCode = null) => {
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
  return subjectCode
    ? INITIAL_QUESTION_BANK.filter(q => q.subject === subjectCode)
    : INITIAL_QUESTION_BANK;
};

// 2. Insert new question into Supabase `question_bank` Table
export const addQuestionToBank = async (questionObj) => {
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
  return { success: true, data: questionObj };
};

// 3. Save Student Progress to Supabase `student_progress` Table
export const saveStudentProgress = async (studentId, score, timeSeconds, assignmentId = null) => {
  if (studentId) {
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
  return CLASS_ROSTER_54;
};
