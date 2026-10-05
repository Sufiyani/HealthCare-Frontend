// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Heart, Mail, Lock } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const result = await login(email, password);
//       console.log('✅ Login successful:', result);
//       toast.success(result.message || 'Login successful!');
      
//       // Small delay to ensure state updates
//       setTimeout(() => {
//         navigate('/dashboard', { replace: true });
//       }, 100);
//     } catch (error) {
//       console.error('❌ Login error:', error);
//       const errorMessage = error.response?.data?.message || 'Login failed';
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <div className="bg-blue-100 p-4 rounded-full">
//               <Heart className="h-12 w-12 text-blue-600" />
//             </div>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to HealthMate</h1>
//           <p className="text-gray-600">Sehat ka Smart Dost</p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="your@email.com"
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="••••••••"
//               />
//             </div>
//           </div>
          
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg disabled:opacity-50"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
          
//           <div className="text-center">
//             <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
//               Don't have an account? Register
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await login(email, password);
      console.log('✅ Login successful:', result);
      toast.success(result.message || 'Welcome back! 🎉', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Small delay to ensure state updates
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 100);
    } catch (error) {
      console.error('❌ Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-xl">
                <Heart className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">HealthMate</h1>
                <p className="text-lg text-gray-600 font-medium">Sehat ka Smart Dost</p>
              </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Your complete health management platform with AI-powered insights and smart tracking.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100 transform hover:scale-105 transition duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">AI-Powered Analysis</h3>
                  <p className="text-sm text-gray-600">Get instant insights from your medical reports</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100 transform hover:scale-105 transition duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Health Tracking</h3>
                  <p className="text-sm text-gray-600">Monitor vitals and track your health journey</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100 transform hover:scale-105 transition duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Secure & Private</h3>
                  <p className="text-sm text-gray-600">Your health data is encrypted and protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-xl">
                <Heart className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">HealthMate</h1>
            <p className="text-gray-600">Sehat ka Smart Dost</p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
            <p className="text-gray-600">Login to access your health dashboard</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-4 bg-blue-100 p-1 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-800 font-medium"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-4 bg-blue-100 p-1 rounded-lg">
                  <Lock className="h-5 w-5 text-blue-600" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-14 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-800 font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-600 group-hover:text-gray-800">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                Forgot Password?
              </a>
            </div>
            
            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Login to Dashboard</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">New to HealthMate?</span>
              </div>
            </div>
            
            {/* Register Link */}
            <Link 
              to="/register" 
              className="block w-full text-center py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Create New Account
            </Link>
          </form>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By logging in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;