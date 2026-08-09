import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CLASS_ROSTER_54, SCHOOL_INFO } from '../lib/curriculumData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState('student'); // 'student' | 'teacher' | 'admin'
  const [loading, setLoading] = useState(true);

  // Student quick login state (Họ tên + Ngày sinh)
  const [currentStudent, setCurrentStudent] = useState(() => {
    const saved = localStorage.getItem('levantam_student');
    return saved ? JSON.parse(saved) : null;
  });

  // Fetch or sync user profile from Supabase profiles table
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data && !error) {
        setProfile(data);
        setRole(data.role || 'student');
        return data;
      }
    } catch (err) {
      console.warn("Could not fetch profile from Supabase:", err);
    }
    return null;
  };

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user && mounted) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      }
      if (mounted) setLoading(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // 1. Học sinh đăng nhập theo Tên + Ngày sinh
  const loginStudentByNameAndDob = (fullName, dob) => {
    const cleanName = fullName.trim().toLowerCase();
    const found = CLASS_ROSTER_54.find(
      (s) => s.name.trim().toLowerCase() === cleanName && s.dob === dob
    );

    if (found) {
      setCurrentStudent(found);
      setRole('student');
      localStorage.setItem('levantam_student', JSON.stringify(found));
      return { success: true, student: found };
    }

    // Default match if user typed any name in class roster
    const matchByName = CLASS_ROSTER_54.find(
      (s) => s.name.trim().toLowerCase() === cleanName
    );

    if (matchByName) {
      const studentObj = { ...matchByName, dob };
      setCurrentStudent(studentObj);
      setRole('student');
      localStorage.setItem('levantam_student', JSON.stringify(studentObj));
      return { success: true, student: studentObj };
    }

    // Fallback: create dynamic student profile for Grade 5/4
    const newStudent = {
      id: `hs-custom-${Date.now()}`,
      name: fullName.trim(),
      dob: dob,
      gender: "Học sinh",
      stars: 30,
      badge: "Tân binh Lớp 5/4"
    };
    setCurrentStudent(newStudent);
    setRole('student');
    localStorage.setItem('levantam_student', JSON.stringify(newStudent));
    return { success: true, student: newStudent };
  };

  // 2. Giáo viên / Admin / User Đăng nhập qua Supabase Auth
  const loginWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data?.user) {
      setUser(data.user);
      await fetchProfile(data.user.id);
    }
    return { data, error };
  };

  // 3. Đăng ký tài khoản trực tiếp trên Supabase Auth Live
  const signUpWithEmail = async (email, password, fullName, userRole = 'student') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: userRole,
        },
      },
    });

    if (data?.user && !error) {
      // Create profile record in profiles table
      try {
        await supabase.from('profiles').insert([{
          id: data.user.id,
          email: email,
          full_name: fullName,
          role: userRole
        }]);
      } catch (err) {
        console.warn("Profile auto-insert note:", err);
      }
    }

    return { data, error };
  };

  // 4. Đăng xuất
  const logout = async () => {
    if (user) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
    setCurrentStudent(null);
    setRole('student');
    localStorage.removeItem('levantam_student');
  };

  // 5. Chuyển đổi vai trò trải nghiệm (Role Switcher for testing/demo)
  const switchRole = (newRole) => {
    setRole(newRole);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role,
        currentStudent,
        schoolInfo: SCHOOL_INFO,
        loading,
        loginStudentByNameAndDob,
        loginWithEmail,
        signUpWithEmail,
        logout,
        switchRole,
        isStudentLoggedIn: !!currentStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
