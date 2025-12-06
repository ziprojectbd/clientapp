import { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { useAuth } from './AuthProvider';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Load saved credentials on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!username.trim()) {
      setError('Please enter your username');
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password');
      setIsLoading(false);
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      setIsLoading(false);
      return;
    }

    try {
      // Save username if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedUsername', username);
      } else {
        localStorage.removeItem('rememberedUsername');
      }

      // Simulate API call delay for loading animation
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Call async login function from auth context
      const success = await login(username, password);
      if (!success) {
        setError('Invalid username or password');
      }
      // If successful, the AppWrapper will automatically redirect to main app
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const glowStyles = `
    @keyframes loginGlow {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.3);
      }
      50% {
        box-shadow: 0 0 30px 8px rgba(16, 185, 129, 0.7);
      }
    }

    .login-glow {
      animation: loginGlow 3s ease-in-out infinite;
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

    .animation-delay-150 {
      animation-delay: 150ms;
    }

    .animation-delay-300 {
      animation-delay: 300ms;
    }

    @keyframes playerKick {
      0% {
        transform: translateX(0) translateY(0) rotate(0deg);
      }
      25% {
        transform: translateX(10px) translateY(-5px) rotate(-15deg);
      }
      50% {
        transform: translateX(20px) translateY(-10px) rotate(0deg);
      }
      75% {
        transform: translateX(15px) translateY(-5px) rotate(10deg);
      }
      100% {
        transform: translateX(0) translateY(0) rotate(0deg);
      }
    }

    @keyframes footballKick {
      0% {
        transform: translateX(0) translateY(0) rotate(0deg);
        opacity: 1;
      }
      20% {
        transform: translateX(30px) translateY(-15px) rotate(90deg);
        opacity: 1;
      }
      50% {
        transform: translateX(80px) translateY(-25px) rotate(270deg);
        opacity: 1;
      }
      80% {
        transform: translateX(140px) translateY(-10px) rotate(450deg);
        opacity: 1;
      }
      100% {
        transform: translateX(180px) translateY(0) rotate(540deg);
        opacity: 0.8;
      }
    }

    @keyframes legSwing {
      0%, 100% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(-45deg);
      }
    }

    @keyframes goalShake {
      0%, 100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-2px);
      }
      75% {
        transform: translateX(2px);
      }
    }

    .player-kick {
      animation: playerKick 1.5s ease-in-out infinite;
    }

    .football-kick {
      animation: footballKick 1.5s ease-in-out infinite;
    }

    .leg-swing {
      animation: legSwing 1.5s ease-in-out infinite;
      transform-origin: top center;
    }

    .goal-shake {
      animation: goalShake 0.3s ease-in-out infinite;
      animation-delay: 1.2s;
    }
  `;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://i.ibb.co.com/jvcsJnG9/33114809-rm251-mind-15-e.jpg')",
      }}
    >
      <style>{glowStyles}</style>
      
      <div className="w-full max-w-md mx-auto px-3">
        <div className="relative bg-cover bg-center bg-no-repeat rounded-3xl shadow-2xl overflow-hidden border border-slate-600/80 login-glow"
             style={{
               backgroundImage: "url('https://i.ibb.co/wZ8gyZvH/vecteezy-illustration-of-golden-soccer-logo-or-label-8172791.jpg')",
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
                MOZAMMEL MCFB
              </h1>
              <p className="text-emerald-100 text-sm mt-2 opacity-90">Welcome Back</p>
            </div>
          </div>

          {/* Login Form */}
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Username Field */}
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-slate-800 border border-slate-600 rounded-xl text-emerald-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Enter your username"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password Field */}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-slate-800 border border-slate-600 rounded-xl text-emerald-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    autoComplete="current-password"
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

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 bg-slate-800 border-slate-600 rounded focus:ring-2 focus:ring-emerald-500 text-emerald-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-emerald-300">
                  Remember username
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl px-4 py-3 text-red-300 text-sm">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-emerald-900/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Demo Info */}
              <div className="bg-slate-800/50 rounded-xl px-4 py-3 text-center">
                <p className="text-slate-400 text-xs mb-1">Demo Account</p>
                <p className="text-emerald-300 text-sm font-medium">Username: demo</p>
                <p className="text-emerald-300 text-sm font-medium">Password: demo123</p>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-slate-400 text-sm">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      console.log('Navigate to register');
                      window.location.href = window.location.pathname + '#register';
                      window.location.reload();
                    }}
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-700">
            <p className="text-center text-slate-400 text-xs">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center z-50">
          <div className="text-center">
            <div className="relative w-80 h-40 mx-auto mb-6">
              {/* Goal */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                <div className="w-16 h-20 border-4 border-white rounded-t-lg relative goal-shake">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 border-r-2 border-white"></div>
                    <div className="w-1/2"></div>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-1/2 border-b-2 border-white"></div>
                </div>
              </div>
              
              {/* Player (Stick Figure) */}
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2 player-kick">
                {/* Head */}
                <div className="w-4 h-4 bg-emerald-400 rounded-full mx-auto mb-1"></div>
                {/* Body */}
                <div className="w-1 h-8 bg-emerald-400 mx-auto mb-1"></div>
                {/* Arms */}
                <div className="absolute top-5 -left-2 w-1 h-6 bg-emerald-400 transform rotate-12"></div>
                <div className="absolute top-5 -right-2 w-1 h-6 bg-emerald-400 transform -rotate-12"></div>
                {/* Standing Leg */}
                <div className="w-1 h-6 bg-emerald-400 mx-auto"></div>
                {/* Kicking Leg */}
                <div className="absolute top-9 -left-1 w-1 h-6 bg-emerald-400 leg-swing"></div>
              </div>
              
              {/* Football */}
              <div className="absolute left-20 top-1/2 transform -translate-y-1/2 football-kick">
                <div className="w-6 h-6 bg-white rounded-full relative shadow-lg">
                  <div className="absolute inset-1 bg-black rounded-full"></div>
                  <div className="absolute inset-2 bg-white rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-black rounded-full"></div>
                </div>
              </div>

              {/* Goal line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"></div>
            </div>
            <div className="text-emerald-300 text-lg font-semibold mb-2">Player Kicking to Goal...</div>
            <div className="text-slate-400 text-sm">Authenticating your access to the field!</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
