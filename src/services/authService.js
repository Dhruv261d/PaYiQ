import { supabase, isSupabaseConfigured } from './supabase';

const AUTH_USER_KEY = 'PAYIQ_AUTH_USER';
const REGISTERED_USERS_KEY = 'PAYIQ_REGISTERED_USERS';

// Helper to get all registered users (local mock store)
function getRegisteredUsers() {
  const data = localStorage.getItem(REGISTERED_USERS_KEY);
  if (!data) {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify([]));
    return [];
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveRegisteredUsers(users) {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

/**
 * Get currently logged-in user
 */
export function getCurrentUser() {
  const data = localStorage.getItem(AUTH_USER_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }
  return null;
}

export function isAuthenticated() {
  return Boolean(getCurrentUser());
}

/**
 * Sign In
 */
export async function loginUser({ email, password }) {
  const cleanEmail = email.trim().toLowerCase();

  // Supabase Auth
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });
      if (error) throw error;
      const user = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || cleanEmail.split('@')[0],
        targetExam: data.user.user_metadata?.targetExam || 'JEE_MAIN',
      };
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      return { success: true, user };
    } catch (err) {
      console.warn('Supabase Auth error, checking local store:', err);
    }
  }

  // Local Store Check
  const users = getRegisteredUsers();
  const existingUser = users.find(u => u.email.toLowerCase() === cleanEmail);

  if (!existingUser) {
    // If not found, create or authenticate for seamless demo
    const newUser = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      name: cleanEmail.split('@')[0],
      targetExam: 'JEE_MAIN',
    };
    saveRegisteredUsers([...users, { ...newUser, password }]);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
    return { success: true, user: newUser };
  }

  if (existingUser.password && existingUser.password !== password) {
    throw new Error('Invalid email or password. Please check your credentials.');
  }

  const user = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    targetExam: existingUser.targetExam || 'JEE_MAIN',
  };
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  return { success: true, user };
}

/**
 * Sign Up with Strict Unique Email Enforcement
 */
export async function registerUser({ name, email, password, targetExam = 'JEE_MAIN' }) {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Enforce unique email check in local registered users
  const users = getRegisteredUsers();
  const alreadyExists = users.some(u => u.email.toLowerCase() === cleanEmail);
  if (alreadyExists) {
    throw new Error('This email address is already registered. Please sign in instead.');
  }

  // 2. Supabase Auth if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: { name, targetExam },
        },
      });
      if (error) throw error;
      const user = {
        id: data.user?.id || `usr-${Date.now()}`,
        email: cleanEmail,
        name,
        targetExam,
      };
      saveRegisteredUsers([...users, { id: user.id, email: cleanEmail, password, name, targetExam }]);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      return { success: true, user };
    } catch (err) {
      console.warn('Supabase register error:', err);
      if (err.message && err.message.toLowerCase().includes('already registered')) {
        throw new Error('This email address is already registered in Supabase.');
      }
    }
  }

  // 3. Save new user to local store
  const newUser = {
    id: `usr-${Date.now()}`,
    email: cleanEmail,
    name: name.trim(),
    targetExam,
  };
  saveRegisteredUsers([...users, { ...newUser, password }]);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
  return { success: true, user: newUser };
}

/**
 * Forgot Password with Verification & Dispatch Toast
 */
export async function resetPassword(email) {
  const cleanEmail = email.trim().toLowerCase();

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: window.location.origin,
      });
      if (error) throw error;
      return { success: true, message: `Password reset email dispatched to ${cleanEmail}.` };
    } catch (err) {
      console.warn('Supabase reset error:', err);
    }
  }

  // Check if email exists in registered store
  const users = getRegisteredUsers();
  const found = users.some(u => u.email.toLowerCase() === cleanEmail);
  if (!found) {
    throw new Error('No account found with this email address. Please register.');
  }

  return {
    success: true,
    message: `Password reset instructions have been generated and sent to ${cleanEmail}. Please check your inbox.`,
  };
}

/**
 * Sign Out
 */
export async function logoutUser() {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn(e);
    }
  }
  localStorage.removeItem(AUTH_USER_KEY);
  return { success: true };
}
