// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Heart, Home, Upload, Activity, Calendar, LogOut, User } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/dashboard" className="flex items-center space-x-3">
//             <Heart className="h-8 w-8" />
//             <span className="font-bold text-xl">HealthMate</span>
//             <span className="text-blue-200 text-sm hidden sm:block">Sehat ka Smart Dost</span>
//           </Link>
          
//           <div className="flex items-center space-x-6">
//             <Link to="/dashboard" className="hover:text-blue-200 transition flex items-center space-x-1">
//               <Home className="h-5 w-5" />
//               <span className="hidden sm:block">Dashboard</span>
//             </Link>
//             <Link to="/upload" className="hover:text-blue-200 transition flex items-center space-x-1">
//               <Upload className="h-5 w-5" />
//               <span className="hidden sm:block">Upload</span>
//             </Link>
//             <Link to="/add-vitals" className="hover:text-blue-200 transition flex items-center space-x-1">
//               <Activity className="h-5 w-5" />
//               <span className="hidden sm:block">Vitals</span>
//             </Link>
//             <Link to="/timeline" className="hover:text-blue-200 transition flex items-center space-x-1">
//               <Calendar className="h-5 w-5" />
//               <span className="hidden sm:block">Timeline</span>
//             </Link>
//             <div className="flex items-center space-x-2 pl-4 border-l border-blue-400">
//               <User className="h-5 w-5" />
//               <span className="hidden sm:block">{user?.name}</span>
//               <button onClick={handleLogout} className="hover:text-red-200 transition">
//                 <LogOut className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, Home, Upload, Activity, Calendar, LogOut, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    logout();
    toast.success('Logged out successfully', {
      position: "top-right",
      autoClose: 2000,
    });
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/upload', icon: Upload, label: 'Upload' },
    { path: '/add-vitals', icon: Activity, label: 'Vitals' },
    { path: '/timeline', icon: Calendar, label: 'Timeline' },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl group-hover:bg-white/30 transition duration-300">
                <Heart className="h-8 w-8 group-hover:scale-110 transition duration-300" />
              </div>
              <div>
                <span className="font-bold text-2xl tracking-tight">HealthMate</span>
                <span className="text-blue-200 text-xs block font-medium">Sehat ka Smart Dost</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 font-medium ${
                      active
                        ? 'bg-white text-blue-600 shadow-lg transform scale-105'
                        : 'hover:bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              
              {/* User Section */}
              <div className="flex items-center space-x-3 pl-4 ml-2 border-l-2 border-white/30">
                <div className="hidden lg:flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <div className="bg-white/30 p-1.5 rounded-lg">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="font-semibold text-sm">{user?.name || 'User'}</span>
                </div>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="bg-red-500/90 hover:bg-red-600 backdrop-blur-sm px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden lg:block">Logout</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden bg-white/20 backdrop-blur-sm p-2 rounded-xl hover:bg-white/30 transition"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-blue-700 to-indigo-700 border-t border-white/20">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      active
                        ? 'bg-white text-blue-600 shadow-lg font-semibold'
                        : 'hover:bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile User Info */}
              <div className="pt-4 border-t border-white/20">
                <div className="flex items-center space-x-3 px-4 py-3 bg-white/10 rounded-xl mb-2">
                  <div className="bg-white/30 p-2 rounded-lg">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{user?.name || 'User'}</p>
                    <p className="text-xs text-blue-200">{user?.email || 'user@example.com'}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowLogoutConfirm(true);
                  }}
                  className="w-full bg-red-500/90 hover:bg-red-600 px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 font-semibold shadow-lg"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform animate-scale-in">
            <div className="text-center mb-6">
              <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <LogOut className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Logout Confirmation</h3>
              <p className="text-gray-600">Are you sure you want to logout from HealthMate?</p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition font-semibold shadow-lg hover:shadow-xl"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;