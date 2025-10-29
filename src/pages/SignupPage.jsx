import React, { useState } from 'react';
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
import { registerUser } from '../services/authService';

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    location: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await registerUser(formData);
      setSuccess('Account created successfully Redirecting to login');
      setFormData({
        fullName: '',
        email: '',
        contactNumber: '',
        location: '',
        password: '',
        confirmPassword: '',
      });
      setTimeout(() => {
        navigate('/login', { replace: true });
        setSuccess('');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-gray-900 overflow-hidden">
      {/* Left half with background image and overlays */}
      <div className="hidden lg:flex w-1/2 h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1460925895917-adf4ee868993?w=1600&q=80&auto=format&fit=crop")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/10 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

        <div className="relative z-10 h-full flex items-center justify-center p-12">
          <div className="max-w-lg w-full text-white">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-cyan-400/40">
              <Wifi className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-3">Join NetworkSupport</h2>
            <p className="text-lg text-gray-300 mb-8">
              Manage your network issues efficiently with our powerful ticketing system.
            </p>

            <div className="space-y-5 max-w-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mt-1">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="font-semibold">Instant ticket creation</p>
                  <p className="text-sm text-gray-300">Get support in seconds</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mt-1">
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="font-semibold">Real time status tracking</p>
                  <p className="text-sm text-gray-300">Know what's happening</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mt-1">
                  <Wifi className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="font-semibold">Priority support</p>
                  <p className="text-sm text-gray-300">Fast resolution guaranteed</p>
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
            <h3 className="text-3xl font-bold mb-1 text-white">Create an account</h3>
            <p className="text-gray-400">Get started with NetworkSupport today</p>
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

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold mb-1 text-gray-200">
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-md focus:shadow-cyan-400/20 transition"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold mb-1 text-gray-200">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-md focus:shadow-cyan-400/20 transition"
              />
            </div>

            <div>
              <label htmlFor="contactNumber" className="block text-xs font-semibold mb-1 text-gray-200">
                Contact Number
              </label>
              <input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="1234567890"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-md focus:shadow-cyan-400/20 transition"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-xs font-semibold mb-1 text-gray-200">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="New York"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-md focus:shadow-cyan-400/20 transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold mb-1 text-gray-200">
                Password *
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-md focus:shadow-cyan-400/20 transition pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-400 hover:text-cyan-400 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold mb-1 text-gray-200">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-md focus:shadow-cyan-400/20 transition pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-2 text-gray-400 hover:text-cyan-400 transition"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-400 text-gray-900 font-semibold py-2.5 rounded-md hover:shadow-md hover:shadow-cyan-400/30 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-transparent text-gray-400">OR CONTINUE WITH</span>
              </div>
            </div>

            <button className="w-full border border-gray-700 hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-400/20 text-gray-300 hover:text-cyan-400 font-semibold py-2.5 rounded-md transition flex items-center justify-center gap-2 text-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign up with Google
            </button>
          </div>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
