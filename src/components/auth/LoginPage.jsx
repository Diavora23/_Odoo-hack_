import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { validateEmail } from '../../utils/validation';
import { Compass, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const { login, setCurrentView, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // Live Email Validation on Change
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (val.length > 0) {
      const result = validateEmail(val);
      setEmailError(result.error);
    } else {
      setEmailError('');
    }
  };

  // Live Password Change
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (val.length > 0 && val.length < 6) {
      setPasswordError('Password should be at least 6-8 characters.');
    } else {
      setPasswordError('');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const emailVal = validateEmail(email);
    if (!emailVal.isValid) {
      setEmailError(emailVal.error);
      return;
    }

    if (!password || password.trim() === '') {
      setPasswordError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      login(email, password);
    }, 600);
  };

  // 1-Click Demo Login Helper
  const handleQuickDemoLogin = (demoEmail, demoName) => {
    setEmail(demoEmail);
    setPassword('India@2026!');
    setEmailError('');
    setPasswordError('');
    showToast('info', 'Demo Profile Loaded', `Ready to sign in as ${demoName}. Click "Sign In" or auto-signing now...`);
    setTimeout(() => {
      login(demoEmail, 'India@2026!');
    }, 500);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const emailVal = validateEmail(forgotEmail);
    if (!emailVal.isValid) {
      showToast('error', 'Invalid Email', 'Please enter a valid email to receive reset instructions.');
      return;
    }
    setShowForgotModal(false);
    showToast('success', 'Reset Link Dispatched', `Password reset instructions sent to ${forgotEmail}`);
    setForgotEmail('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-2xl border border-sand-200 animate-slide-up relative overflow-hidden">
        
        {/* Decorative Top Gradient Stripe */}
        <div className="absolute top-0 left-0 right-0 h-2 india-gradient" />

        {/* Header Branding */}
        <div className="text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl saffron-gradient flex items-center justify-center text-white shadow-lg shadow-saffron-500/30 mb-3">
            <Compass className="w-8 h-8 animate-pulse-subtle" />
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-slate-900">
            Welcome back to Globe<span className="text-saffron-500">Trotter</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to access your curated Indian itineraries, budgets & bookmarks
          </p>
        </div>

        {/* 1-Click Demo Accounts Banner */}
        <div className="p-3.5 rounded-2xl bg-sand-100/70 border border-sand-200">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
            <span>1-Click Demo Profiles</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('aarav.sharma@traveler.in', 'Aarav (Explorer)')}
              className="px-2.5 py-1.5 text-[11px] font-semibold bg-white text-slate-800 rounded-xl border border-sand-300 hover:border-saffron-500 hover:text-saffron-600 transition-all text-left truncate"
            >
              🇮🇳 Aarav Sharma
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('priya.patel@heritage.in', 'Priya (Luxury)')}
              className="px-2.5 py-1.5 text-[11px] font-semibold bg-white text-slate-800 rounded-xl border border-sand-300 hover:border-indiaTeal-500 hover:text-indiaTeal-700 transition-all text-left truncate"
            >
              ✨ Priya Patel
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form className="mt-6 space-y-4" onSubmit={handleLoginSubmit}>
          
          {/* Email Field with Live Validation */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="e.g. explorer@india.com"
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-sand-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  emailError
                    ? 'border-red-400 focus:ring-red-300 bg-red-50/20'
                    : email && !emailError
                    ? 'border-emerald-400 focus:ring-emerald-300'
                    : 'border-sand-300 focus:ring-saffron-400 focus:border-saffron-500'
                }`}
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            {emailError && (
              <p className="text-[11px] text-red-500 font-medium mt-1 animate-fade-in">
                {emailError}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[11px] font-semibold text-saffron-600 hover:text-saffron-700 transition-colors"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-10 py-2.5 text-sm bg-sand-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  passwordError
                    ? 'border-red-400 focus:ring-red-300 bg-red-50/20'
                    : 'border-sand-300 focus:ring-saffron-400 focus:border-saffron-500'
                }`}
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordError && (
              <p className="text-[11px] text-red-500 font-medium mt-1 animate-fade-in">
                {passwordError}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 py-3 px-4 saffron-gradient hover:opacity-95 text-white font-heading font-bold text-sm rounded-xl shadow-lg shadow-saffron-500/25 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to GlobeTrotter</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link to Register */}
        <div className="text-center pt-2 border-t border-sand-100">
          <p className="text-xs text-slate-600">
            Don't have an account yet?{' '}
            <button
              onClick={() => setCurrentView('register')}
              className="font-bold text-saffron-600 hover:text-saffron-700 transition-colors"
            >
              Create Free Account
            </button>
          </p>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white max-w-sm w-full p-6 rounded-3xl shadow-2xl border border-sand-200">
            <h3 className="text-lg font-heading font-bold text-slate-900">Reset Your Password</h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your registered email address to receive a secure password reset link.
            </p>
            <form onSubmit={handleForgotPasswordSubmit} className="mt-4 space-y-3">
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="e.g. explorer@india.com"
                className="w-full px-3.5 py-2 text-sm bg-sand-50 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-400"
                required
              />
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sand-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white saffron-gradient rounded-xl shadow-md"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
