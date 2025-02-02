'use client';

import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase'; // Ensure your firebase file exports `auth`
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();

  // Force dark mode (if needed)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [user, setUser] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + error.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerData.email,
        registerData.password
      );
      setIsLogin(true);
      setRegisterSuccess('Registration successful! Please log in.');
      setRegisterData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white/20">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => {
              setIsLogin(true);
              setRegisterSuccess('');
            }}
            className={`px-6 py-2 text-lg font-semibold transition-colors duration-300 ${
              isLogin
                ? 'border-b-2 border-indigo-400 text-indigo-400'
                : 'text-gray-300'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setRegisterSuccess('');
            }}
            className={`px-6 py-2 text-lg font-semibold transition-colors duration-300 ${
              !isLogin
                ? 'border-b-2 border-indigo-400 text-indigo-400'
                : 'text-gray-300'
            }`}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            {registerSuccess && (
              <div className="text-center text-sm text-green-400">
                {registerSuccess}
              </div>
            )}
            <div>
              <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="loginEmail"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="loginPassword"
                value={loginData.password}
                onChange={handleLoginChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 py-2 text-center text-lg font-bold text-white hover:bg-indigo-500 transition-all duration-300"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-6">
            <div>
              <label htmlFor="registerName" className="block text-sm font-medium text-gray-200">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="registerName"
                value={registerData.name}
                onChange={handleRegisterChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="registerEmail"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="registerPassword"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="registerConfirmPassword" className="block text-sm font-medium text-gray-200">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="registerConfirmPassword"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 py-2 text-center text-lg font-bold text-white hover:bg-indigo-500 transition-all duration-300"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
