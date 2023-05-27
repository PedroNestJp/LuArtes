import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useAuth } from '../pages/contexts/AuthProvider';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const userData = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
      };
      setDoc(userRef, userData, { merge: true })
        .then(() => {
          console.log('User data saved to Firestore');
        })
        .catch((error) => {
          console.error('Error saving user data to Firestore: ', error);
        });
    }
  }, [user]);

  const { signup } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const usersCollection = collection(db, 'users');
      await addDoc(usersCollection, {
        name,
        email,
        password,
      });
      alert('Usuário registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar usuário: ', error);
      alert('Ocorreu um erro ao registrar o usuário: ' + error.message);
    }

    try {
      await signup(email, password);
      navigate('/profile');
    } catch (error) {
      setError(error.message);
      console.log('Erro no segundo try: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      {error && <div>{error}</div>}
      <div>
        <label>
          Nome:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignUpPage;
