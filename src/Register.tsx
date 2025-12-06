import { useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail } from 'lucide-react';
import { useAuth } from './AuthProvider';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    fullName: '',
    referralCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Please enter your full name');
      return false;
    }

    if (!formData.username.trim()) {
      setError('Please enter a username');
      return false;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.password.trim()) {
      setError('Please enter a password');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Form submitted!');
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      console.log('Validation failed');
      return;
    }

    console.log('Validation passed, starting registration...');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful registration
      setSuccess('Registration successful! Redirecting to login...');
      
      // Auto-login after successful registration
      setTimeout(async () => {
        const loginSuccess = await login(formData.username, formData.password);
        if (!loginSuccess) {
          setError('Registration successful but auto-login failed. Please login manually.');
        }
      }, 1500);

    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const glowStyles = `
    @keyframes registerGlow {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.3);
      }
      50% {
        box-shadow: 0 0 30px 8px rgba(16, 185, 129, 0.7);
      }
    }

    .register-glow {
      animation: registerGlow 3s ease-in-out infinite;
    }

    @keyframes titleGlow {
      0% {
        text-shadow: 0 0 12px rgba(34, 197, 94, 0.8), 0 0 24px rgba(56, 189, 248, 0.6);
      }
      50% {
        text-shadow: 0 0 20px rgba(248, 250, 252, 0.9), 0 0 40px rgba(236, 72, 153, 0.8);
      }
      100% {
        text-shadow: 0 0 12px rgba(34, 197, 94, 0.8), 0 0 24px rgba(56, 189, 248, 0.6);
      }
    }

    .title-glow {
      animation: titleGlow 4s ease-in-out infinite;
    }
  `;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-slate-900"
    >
      <style>{glowStyles}</style>
      
      <div className="w-full max-w-md mx-auto px-3">
        <div className="relative bg-cover bg-center bg-no-repeat rounded-3xl shadow-2xl overflow-hidden border border-slate-600/80 min-h-[600px] md:min-h-[700px] lg:min-h-[800px]"
             style={{
               backgroundImage: "url('https://i.ibb.co/39TTjGtm/goal2.jpg')",
               backgroundSize: 'cover',
               backgroundPosition: 'center',
             }}>
          <div className="absolute inset-0 bg-slate-900/20"></div>
          <div className="relative z-10">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-sky-600 to-indigo-600 px-6 py-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>
            
            <div className="relative z-10">
              <img
                src="https://i.ibb.co/wZ8gyZvH/vecteezy-illustration-of-golden-soccer-logo-or-label-8172791.jpg"
                alt="MOZAMMEL MCFB logo"
                className="w-16 h-16 rounded-2xl shadow-xl mx-auto mb-4 border-2 border-amber-400"
              />
              <h1 className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-white to-emerald-300 drop-shadow-lg title-glow">
                Create Account
              </h1>
              <p className="text-emerald-100 text-sm mt-2 opacity-90">Join the winning team</p>
            </div>
          </div>

          {/* Registration Form */}
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-emerald-300 text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-emerald-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 bg-slate-800 border border-slate-600 rounded-xl text-emerald-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-emerald-300 text-sm font-medium mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-emerald-400" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 bg-slate-800 border border-slate-600 rounded-xl text-emerald-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Choose a username"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-emerald-300 text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-emerald-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 bg-slate-800 border border-slate-600 rounded-xl text-emerald-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Referral Code */}
              <div>
                <label className="block text-emerald-300 text-sm font-medium mb-2">
                  Referral Code (Optional)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 bg-slate-800 border border-slate-600 rounded-xl text-emerald-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Enter referral code (optional)"
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-emerald-300 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-emerald-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-10 py-3 bg-slate-800 border border-slate-600 rounded-xl text-emerald-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Create a password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-emerald-300 text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-emerald-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-10 py-3 bg-slate-800 border border-slate-600 rounded-xl text-emerald-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl px-4 py-3 text-red-300 text-sm">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl px-4 py-3 text-emerald-300 text-sm">
                  {success}
                </div>
              )}

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                onClick={() => console.log('Button clicked!')}
                className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-emerald-900/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-slate-400 text-sm">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => window.location.href = window.location.pathname}
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-700">
            <p className="text-center text-slate-400 text-xs">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;