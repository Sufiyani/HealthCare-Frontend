// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Heart, Mail, Lock, User } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-toastify';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await register(name, email, password);
//       toast.success('Registration successful!');
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Registration failed');
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
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
//           <p className="text-gray-600">Join HealthMate today</p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//             <div className="relative">
//               <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Ahmed Khan"
//               />
//             </div>
//           </div>
          
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
//                 minLength="6"
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
//             {loading ? 'Creating Account...' : 'Create Account'}
//           </button>
          
//           <div className="text-center">
//             <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
//               Already have an account? Login
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const getPasswordStrength = () => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 10) return { strength: 2, label: 'Medium', color: 'bg-yellow-500' };
    return { strength: 3, label: 'Strong', color: 'bg-blue-500' };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        position: "top-right",
      });
      return;
    }

    if (!agreedToTerms) {
      toast.error('Please agree to Terms & Conditions', {
        position: "top-right",
      });
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      toast.success('Account created successfully! 🎉', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.', {
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
        
        {/* Left Side - Benefits */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-xl">
                <Heart className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">Join HealthMate</h1>
                <p className="text-lg text-gray-600 font-medium">Start Your Health Journey</p>
              </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Create your account and get access to AI-powered health insights, smart tracking, and personalized recommendations.
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-4">
            <div className="flex items-start space-x-4 bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Free Forever</h3>
                <p className="text-sm text-gray-600">All core features completely free with no hidden charges</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white rounded-2xl p-6 shadow-lg border-2 border-indigo-100">
              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-3 rounded-xl flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Instant AI Analysis</h3>
                <p className="text-sm text-gray-600">Upload reports and get AI-powered insights within seconds</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl flex-shrink-0">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Bank-Level Security</h3>
                <p className="text-sm text-gray-600">Your health data is encrypted and completely private</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-200 p-3 rounded-xl flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Health Timeline</h3>
                <p className="text-sm text-gray-600">Track your complete health journey in one place</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-xl">
                <Heart className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Join HealthMate</h1>
            <p className="text-gray-600">Start Your Health Journey</p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-600">Get started with your free account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-4 bg-blue-100 p-1 rounded-lg">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-800 font-medium"
                  placeholder="Ahmed Khan"
                />
              </div>
            </div>
            
            {/* Email */}
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
            
            {/* Password */}
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
                  minLength="6"
                  className="w-full pl-14 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-800 font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600 font-semibold">Password Strength:</span>
                    <span className={`text-xs font-bold ${
                      passwordStrength.strength === 1 ? 'text-red-600' :
                      passwordStrength.strength === 2 ? 'text-yellow-600' : 'text-blue-600'
                    }`}>{passwordStrength.label}</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded-full transition ${
                          level <= passwordStrength.strength
                            ? passwordStrength.color
                            : 'bg-gray-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-4 bg-blue-100 p-1 rounded-lg">
                  <Lock className="h-5 w-5 text-blue-600" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-14 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-800 font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-600 mt-1 font-semibold">Passwords do not match</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div>
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input 
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-800">
                  I agree to the <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">Terms & Conditions</a> and <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">Privacy Policy</a>
                </span>
              </label>
            </div>
            
            {/* Register Button */}
            <button
              type="submit"
              disabled={loading || !agreedToTerms}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
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
                <span className="px-4 bg-white text-gray-500 font-medium">Already have an account?</span>
              </div>
            </div>
            
            {/* Login Link */}
            <Link 
              to="/login" 
              className="block w-full text-center py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Login to Your Account
            </Link>
          </form>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              🔒 Your information is secure and will never be shared
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;