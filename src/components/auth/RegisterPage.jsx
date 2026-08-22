import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  validateEmail, 
  validatePassword, 
  validateConfirmPassword, 
  validateName 
} from '../../utils/validation';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { 
  Compass, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Luggage,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function RegisterPage() {
  const { register, setCurrentView } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    travelStyle: 'Balanced Explorer'
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(null);

  // Travel style options
  const travelStyles = [
    { value: 'Balanced Explorer', label: 'Balanced Explorer (Heritage & Comfort)' },
    { value: 'Budget Backpacker', label: 'Budget Backpacker (Hostels & Local Transit)' },
    { value: 'Luxury Heritage', label: 'Luxury Heritage (Palaces & Private SUV)' },
    { value: 'Spiritual & Cultural', label: 'Spiritual & Cultural (Ghats & Ashrams)' },
    { value: 'Adventure & Trekking', label: 'Adventure & Trekking (Himalayas & Trails)' },
  ];

  // Handle Full Name Input & Live Validation
  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, name: val }));
    const result = validateName(val);
    setErrors(prev => ({ ...prev, name: result.error }));
  };

  // Handle Email Input & Live Validation
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, email: val }));
    const result = validateEmail(val);
    setErrors(prev => ({ ...prev, email: result.error }));
  };

  // Handle Password Input & Live Checklist Validation
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, password: val }));
    const result = validatePassword(val);
    setPasswordValidation(result);
    setErrors(prev => ({ ...prev, password: result.error }));

    // Recheck confirm password if already typed
    if (formData.confirmPassword) {
      const confirmResult = validateConfirmPassword(val, formData.confirmPassword);
      setErrors(prev => ({ ...prev, confirmPassword: confirmResult.error }));
    }
  };

  // Handle Confirm Password Input & Strict Match Validation
  const handleConfirmPasswordChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, confirmPassword: val }));
    const result = validateConfirmPassword(formData.password, val);
    setErrors(prev => ({ ...prev, confirmPassword: result.error }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Run all validations strictly
    const nameVal = validateName(formData.name);
    const emailVal = validateEmail(formData.email);
    const passVal = validatePassword(formData.password);
    const confirmVal = validateConfirmPassword(formData.password, formData.confirmPassword);

    const newErrors = {
      name: nameVal.error,
      email: emailVal.error,
      password: passVal.error,
      confirmPassword: confirmVal.error
    };

    setErrors(newErrors);

    if (!nameVal.isValid || !emailVal.isValid || !passVal.isValid || !confirmVal.isValid) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        travelStyle: formData.travelStyle,
      });
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-6 bg-white p-8 rounded-3xl shadow-2xl border border-sand-200 animate-slide-up relative overflow-hidden">
        
        {/* Decorative Top Gradient Stripe */}
        <div className="absolute top-0 left-0 right-0 h-2 india-gradient" />

        {/* Header Branding */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-2xl saffron-gradient flex items-center justify-center text-white shadow-lg shadow-saffron-500/30 mb-2">
            <Compass className="w-7 h-7 animate-pulse-subtle" />
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-slate-900">
            Join Globe<span className="text-saffron-500">Trotter</span> India
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Unlock AI trip planning across India, INR budget tracking & verified itineraries
          </p>
        </div>

        {/* Registration Form */}
        <form className="space-y-4" onSubmit={handleRegisterSubmit}>
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. Vikramaditya Rathore"
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-sand-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? 'border-red-400 focus:ring-red-300 bg-red-50/20'
                    : formData.name && !errors.name
                    ? 'border-emerald-400 focus:ring-emerald-300'
                    : 'border-sand-300 focus:ring-saffron-400 focus:border-saffron-500'
                }`}
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            {errors.name && (
              <p className="text-[11px] text-red-500 font-medium mt-1 animate-fade-in">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={handleEmailChange}
                placeholder="e.g. wanderer@traveler.in"
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-sand-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-red-400 focus:ring-red-300 bg-red-50/20'
                    : formData.email && !errors.email
                    ? 'border-emerald-400 focus:ring-emerald-300'
                    : 'border-sand-300 focus:ring-saffron-400 focus:border-saffron-500'
                }`}
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-500 font-medium mt-1 animate-fade-in">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password with Strength Meter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handlePasswordChange}
                placeholder="Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special"
                className={`w-full pl-10 pr-10 py-2.5 text-sm bg-sand-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.password
                    ? 'border-red-400 focus:ring-red-300'
                    : formData.password && !errors.password
                    ? 'border-emerald-400 focus:ring-emerald-300'
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
            
            {/* Live Password Strength Meter & Checklist */}
            <PasswordStrengthMeter validation={passwordValidation} />

            {errors.password && (
              <p className="text-[11px] text-red-500 font-medium mt-1 animate-fade-in">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Re-enter password strictly matching above"
                className={`w-full pl-10 pr-10 py-2.5 text-sm bg-sand-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.confirmPassword
                    ? 'border-red-400 focus:ring-red-300 bg-red-50/20'
                    : formData.confirmPassword && !errors.confirmPassword
                    ? 'border-emerald-400 focus:ring-emerald-300'
                    : 'border-sand-300 focus:ring-saffron-400 focus:border-saffron-500'
                }`}
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] text-red-500 font-medium mt-1 animate-fade-in">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Preferred Travel Style Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Preferred Travel Style
            </label>
            <div className="relative">
              <select
                value={formData.travelStyle}
                onChange={(e) => setFormData(prev => ({ ...prev, travelStyle: e.target.value }))}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-sand-50 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-saffron-500 text-slate-800"
              >
                {travelStyles.map(s => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <Luggage className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Bonus Points Badge */}
          <div className="flex items-center gap-2 p-3 bg-indiaTeal-50 border border-indiaTeal-200 rounded-2xl text-xs text-indiaTeal-900">
            <Sparkles className="w-4 h-4 text-indiaTeal-600 flex-shrink-0" />
            <span>Bonus: Receive <strong>₹1,000 Travel Points</strong> instantly on joining!</span>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 saffron-gradient hover:opacity-95 text-white font-heading font-bold text-sm rounded-xl shadow-lg shadow-saffron-500/25 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Create GlobeTrotter Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link to Login */}
        <div className="text-center pt-2 border-t border-sand-100">
          <p className="text-xs text-slate-600">
            Already have an account?{' '}
            <button
              onClick={() => setCurrentView('login')}
              className="font-bold text-saffron-600 hover:text-saffron-700 transition-colors"
            >
              Sign In Here
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
