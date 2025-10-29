import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Wifi,
  Zap,
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { loginUser, isUserLoggedIn } from '../services/authService';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const checkAuth = () => {
      if (isUserLoggedIn()) {
        navigate('/user/dashboard', { replace: true });
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password');
      return;
    }

    setIsAuthenticating(true);
    try {
      const response = await loginUser(credentials);

      if (!response || !response.token) {
        setError('Invalid credentials. Please try again.');
        setIsAuthenticating(false);
        return;
      }

      setSuccess('Login successful Redirecting to dashboard');
      setCredentials({ email: '', password: '' });
      setError('');

      setTimeout(() => {
        navigate('/user/dashboard', { replace: true });
      }, 1000);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      setIsAuthenticating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex font-sans bg-gray-900 overflow-hidden">
      {/* Left half with background image fixed on large screens */}
      <div className="hidden lg:flex w-1/2 h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80&auto=format&fit=crop")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/10 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

        <div className="relative z-10 h-full flex items-center justify-center p-12">
          <div className="max-w-lg w-full text-white">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-cyan-400/40">
              <Wifi className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-3">Welcome Back</h2>
            <p className="text-lg text-gray-300 mb-8">
              Continue managing your network issues with ease and get real-time support from our expert team.
            </p>

            <div className="space-y-5 max-w-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mt-1">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="font-semibold">500+ Active Users</p>
                  <p className="text-sm text-gray-300">Trusted by businesses</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mt-1">
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="font-semibold">1.2K Tickets Resolved</p>
                  <p className="text-sm text-gray-300">98% success rate</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mt-1">
                  <Wifi className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="font-semibold">24/7 Support</p>
                  <p className="text-sm text-gray-300">Always here to help</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right half with internal scroll */}
      <div className="w-full lg:w-1/2 h-screen overflow-y-auto p-8">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold mb-1 text-white">Sign in to your account</h3>
            <p className="text-gray-400">Welcome back Please enter your details</p>
          </div>

          {error && (
            <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-md flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-400">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-3 p-3 bg-green-500/10 border border-green-500/30 rounded-md flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-400">{success}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-200">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-md focus:shadow-cyan-400/20 transition"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-200">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300 transition">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-md focus:shadow-cyan-400/20 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 rounded bg-gray-700 border-gray-600 accent-cyan-400" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition">Keep me logged in</span>
            </label>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-400 text-gray-900 font-semibold py-3 rounded-lg hover:shadow-md hover:shadow-cyan-400/30 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAuthenticating ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400">OR CONTINUE WITH</span>
              </div>
            </div>

            <button className="w-full border border-gray-700 hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-400/20 text-gray-300 hover:text-cyan-400 font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </button>
          </div>

          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold transition">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
