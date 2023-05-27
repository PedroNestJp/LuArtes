import { auth } from "./config/firebase";

export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const register = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const forgotPassword = (email) => {
  return auth.sendPasswordResetEmail(email);
};

export const logout = () => {
  return auth.signOut();
};