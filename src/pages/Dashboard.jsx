// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FileText, Activity, Heart, Droplet, Upload, Plus, Calendar, Search, Eye, CheckCircle } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import api from '../config/api';
// import { toast } from 'react-toastify';

// const Dashboard = () => {
//   const [reports, setReports] = useState([]);
//   const [vitals, setVitals] = useState([]);
//   const [stats, setStats] = useState({
//     totalReports: 0,
//     totalVitals: 0,
//     latestBP: 'N/A',
//     latestSugar: 'N/A'
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const [reportsRes, vitalsRes] = await Promise.all([
//         api.get('/reports'),
//         api.get('/vitals')
//       ]);

//       console.log('📊 Reports Response:', reportsRes.data);
//       console.log('💓 Vitals Response:', vitalsRes.data);

//       // Backend response format: { success: true, data: { reports: [...] } }
//       const reportsData = reportsRes.data.data?.reports || reportsRes.data.reports || [];
//       const vitalsData = vitalsRes.data.data?.vitals || vitalsRes.data.vitals || [];

//       setReports(reportsData);
//       setVitals(vitalsData);

//       // Calculate stats
//       const latestVital = vitalsData[0];
//       setStats({
//         totalReports: reportsData.length,
//         totalVitals: vitalsData.length,
//         latestBP: latestVital?.bloodPressure || 'N/A',
//         latestSugar: latestVital?.bloodSugar ? `${latestVital.bloodSugar} mg/dL` : 'N/A'
//       });

//       console.log('✅ Stats:', {
//         totalReports: reportsData.length,
//         totalVitals: vitalsData.length
//       });
//     } catch (error) {
//       console.error('❌ Dashboard Error:', error);
//       toast.error(error.response?.data?.message || 'Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredReports = reports.filter(report => {
//     const matchesSearch = report.name?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filterType === 'all' || report.type === filterType;
//     return matchesSearch && matchesFilter;
//   });

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="flex items-center justify-center h-96">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Total Reports</p>
//                 <p className="text-3xl font-bold text-gray-800">{stats.totalReports}</p>
//               </div>
//               <FileText className="h-12 w-12 text-blue-500" />
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Vitals Tracked</p>
//                 <p className="text-3xl font-bold text-gray-800">{stats.totalVitals}</p>
//               </div>
//               <Activity className="h-12 w-12 text-green-500" />
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Latest BP</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.latestBP}</p>
//               </div>
//               <Heart className="h-12 w-12 text-purple-500" />
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Latest Sugar</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.latestSugar}</p>
//               </div>
//               <Droplet className="h-12 w-12 text-orange-500" />
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Link
//             to="/upload"
//             className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6 hover:from-blue-600 hover:to-blue-700 transition"
//           >
//             <Upload className="h-8 w-8 mb-2" />
//             <h3 className="text-lg font-semibold">Upload Report</h3>
//             <p className="text-sm text-blue-100">Add new medical documents</p>
//           </Link>
          
//           <Link
//             to="/add-vitals"
//             className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6 hover:from-green-600 hover:to-green-700 transition"
//           >
//             <Plus className="h-8 w-8 mb-2" />
//             <h3 className="text-lg font-semibold">Add Vitals</h3>
//             <p className="text-sm text-green-100">Track BP, Sugar, Weight</p>
//           </Link>
          
//           <Link
//             to="/timeline"
//             className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6 hover:from-purple-600 hover:to-purple-700 transition"
//           >
//             <Calendar className="h-8 w-8 mb-2" />
//             <h3 className="text-lg font-semibold">View Timeline</h3>
//             <p className="text-sm text-purple-100">See complete health history</p>
//           </Link>
//         </div>

//         {/* Reports Section */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
//             <h2 className="text-2xl font-bold text-gray-800">Recent Reports</h2>
//             <div className="flex space-x-4 w-full md:w-auto">
//               <div className="relative flex-1 md:flex-initial">
//                 <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search reports..."
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <select
//                 value={filterType}
//                 onChange={(e) => setFilterType(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="all">All Types</option>
//                 <option value="Lab Report">Lab Report</option>
//                 <option value="X-Ray">X-Ray</option>
//                 <option value="MRI">MRI</option>
//                 <option value="CT Scan">CT Scan</option>
//                 <option value="Ultrasound">Ultrasound</option>
//                 <option value="ECG">ECG</option>
//                 <option value="Prescription">Prescription</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>

//           <div className="space-y-4">
//             {filteredReports.length === 0 ? (
//               <div className="text-center py-12">
//                 <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500">No reports found</p>
//                 <p className="text-sm text-gray-400 mt-2">Upload your first medical report to get started</p>
//               </div>
//             ) : (
//               filteredReports.map(report => (
//                 <div key={report._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-4">
//                       <div className="bg-blue-100 p-3 rounded-lg">
//                         <FileText className="h-6 w-6 text-blue-600" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-gray-800">{report.name}</h3>
//                         <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
//                           <span className="flex items-center">
//                             <Calendar className="h-4 w-4 mr-1" />
//                             {new Date(report.date).toLocaleDateString()}
//                           </span>
//                           <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
//                             {report.type}
//                           </span>
//                           {report.aiAnalysis && (
//                             <span className="flex items-center text-green-600">
//                               <CheckCircle className="h-4 w-4 mr-1" />
//                               AI Analyzed
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <Link
//                       to={`/report/${report._id}`}
//                       className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
//                     >
//                       <Eye className="h-4 w-4" />
//                       <span>View</span>
//                     </Link>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FileText, Activity, Heart, Droplet, Upload, Plus, Calendar, Search, Eye, CheckCircle, Trash2 } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import api from '../config/api';
// import { toast } from 'react-toastify';

// const Dashboard = () => {
//   const [reports, setReports] = useState([]);
//   const [vitals, setVitals] = useState([]);
//   const [stats, setStats] = useState({
//     totalReports: 0,
//     totalVitals: 0,
//     latestBP: 'N/A',
//     latestSugar: 'N/A'
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const [reportsRes, vitalsRes] = await Promise.all([
//         api.get('/reports'),
//         api.get('/vitals')
//       ]);

//       console.log('📊 Reports Response:', reportsRes.data);
//       console.log('💓 Vitals Response:', vitalsRes.data);

//       // Backend response format: { success: true, data: { reports: [...] } }
//       const reportsData = reportsRes.data.data?.reports || reportsRes.data.reports || [];
//       const vitalsData = vitalsRes.data.data?.vitals || vitalsRes.data.vitals || [];

//       setReports(reportsData);
//       setVitals(vitalsData);

//       // Calculate stats
//       const latestVital = vitalsData[0];
//       setStats({
//         totalReports: reportsData.length,
//         totalVitals: vitalsData.length,
//         latestBP: latestVital?.bloodPressure || 'N/A',
//         latestSugar: latestVital?.bloodSugar ? `${latestVital.bloodSugar} mg/dL` : 'N/A'
//       });

//       console.log('✅ Stats:', {
//         totalReports: reportsData.length,
//         totalVitals: vitalsData.length
//       });
//     } catch (error) {
//       console.error('❌ Dashboard Error:', error);
//       toast.error(error.response?.data?.message || 'Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteReport = async (reportId, reportName) => {
//     if (!window.confirm(`Are you sure you want to delete "${reportName}"? This action cannot be undone.`)) {
//       return;
//     }

//     setDeletingId(reportId);
//     try {
//       await api.delete(`/reports/${reportId}`);
//       toast.success('Report deleted successfully!');
      
//       // Update local state
//       setReports(reports.filter(report => report._id !== reportId));
//       setStats(prev => ({
//         ...prev,
//         totalReports: prev.totalReports - 1
//       }));
//     } catch (error) {
//       console.error('❌ Delete Error:', error);
//       toast.error(error.response?.data?.message || 'Failed to delete report');
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const filteredReports = reports.filter(report => {
//     const matchesSearch = report.name?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filterType === 'all' || report.type === filterType;
//     return matchesSearch && matchesFilter;
//   });

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="flex items-center justify-center h-96">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Total Reports</p>
//                 <p className="text-3xl font-bold text-gray-800">{stats.totalReports}</p>
//               </div>
//               <FileText className="h-12 w-12 text-blue-500" />
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Vitals Tracked</p>
//                 <p className="text-3xl font-bold text-gray-800">{stats.totalVitals}</p>
//               </div>
//               <Activity className="h-12 w-12 text-green-500" />
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Latest BP</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.latestBP}</p>
//               </div>
//               <Heart className="h-12 w-12 text-purple-500" />
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Latest Sugar</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.latestSugar}</p>
//               </div>
//               <Droplet className="h-12 w-12 text-orange-500" />
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Link
//             to="/upload"
//             className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6 hover:from-blue-600 hover:to-blue-700 transition"
//           >
//             <Upload className="h-8 w-8 mb-2" />
//             <h3 className="text-lg font-semibold">Upload Report</h3>
//             <p className="text-sm text-blue-100">Add new medical documents</p>
//           </Link>
          
//           <Link
//             to="/add-vitals"
//             className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6 hover:from-green-600 hover:to-green-700 transition"
//           >
//             <Plus className="h-8 w-8 mb-2" />
//             <h3 className="text-lg font-semibold">Add Vitals</h3>
//             <p className="text-sm text-green-100">Track BP, Sugar, Weight</p>
//           </Link>
          
//           <Link
//             to="/timeline"
//             className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6 hover:from-purple-600 hover:to-purple-700 transition"
//           >
//             <Calendar className="h-8 w-8 mb-2" />
//             <h3 className="text-lg font-semibold">View Timeline</h3>
//             <p className="text-sm text-purple-100">See complete health history</p>
//           </Link>
//         </div>

//         {/* Reports Section */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
//             <h2 className="text-2xl font-bold text-gray-800">Recent Reports</h2>
//             <div className="flex space-x-4 w-full md:w-auto">
//               <div className="relative flex-1 md:flex-initial">
//                 <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search reports..."
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <select
//                 value={filterType}
//                 onChange={(e) => setFilterType(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="all">All Types</option>
//                 <option value="Lab Report">Lab Report</option>
//                 <option value="X-Ray">X-Ray</option>
//                 <option value="MRI">MRI</option>
//                 <option value="CT Scan">CT Scan</option>
//                 <option value="Ultrasound">Ultrasound</option>
//                 <option value="ECG">ECG</option>
//                 <option value="Prescription">Prescription</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>

//           <div className="space-y-4">
//             {filteredReports.length === 0 ? (
//               <div className="text-center py-12">
//                 <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500">No reports found</p>
//                 <p className="text-sm text-gray-400 mt-2">Upload your first medical report to get started</p>
//               </div>
//             ) : (
//               filteredReports.map(report => (
//                 <div key={report._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-4 flex-1">
//                       <div className="bg-blue-100 p-3 rounded-lg">
//                         <FileText className="h-6 w-6 text-blue-600" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-gray-800">{report.name}</h3>
//                         <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
//                           <span className="flex items-center">
//                             <Calendar className="h-4 w-4 mr-1" />
//                             {new Date(report.date).toLocaleDateString()}
//                           </span>
//                           <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
//                             {report.type}
//                           </span>
//                           {report.aiAnalysis && (
//                             <span className="flex items-center text-green-600">
//                               <CheckCircle className="h-4 w-4 mr-1" />
//                               AI Analyzed
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Link
//                         to={`/report/${report._id}`}
//                         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
//                       >
//                         <Eye className="h-4 w-4" />
//                         <span>View</span>
//                       </Link>
//                       <button
//                         onClick={() => handleDeleteReport(report._id, report.name)}
//                         disabled={deletingId === report._id}
//                         className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                         <span>{deletingId === report._id ? 'Deleting...' : 'Delete'}</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FileText, Activity, Heart, Droplet, Upload, Plus, Calendar, Search, Eye, CheckCircle, Trash2 } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import api from '../config/api';
// import { toast } from 'react-toastify';

// const Dashboard = () => {
//   const [reports, setReports] = useState([]);
//   const [vitals, setVitals] = useState([]);
//   const [stats, setStats] = useState({
//     totalReports: 0,
//     totalVitals: 0,
//     latestBP: 'N/A',
//     latestSugar: 'N/A'
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const [reportsRes, vitalsRes] = await Promise.all([
//         api.get('/reports'),
//         api.get('/vitals')
//       ]);

//       console.log('📊 Reports Response:', reportsRes.data);
//       console.log('💓 Vitals Response:', vitalsRes.data);

//       // Backend response format: { success: true, data: { reports: [...] } }
//       const reportsData = reportsRes.data.data?.reports || reportsRes.data.reports || [];
//       const vitalsData = vitalsRes.data.data?.vitals || vitalsRes.data.vitals || [];

//       setReports(reportsData);
//       setVitals(vitalsData);

//       // Calculate stats - find latest readings for each vital
//       const latestBP = vitalsData.find(v => v.bloodPressure)?.bloodPressure || 'N/A';
//       const latestSugarVital = vitalsData.find(v => v.bloodSugar);
//       const latestSugar = latestSugarVital ? `${latestSugarVital.bloodSugar} mg/dL` : 'N/A';
      
//       setStats({
//         totalReports: reportsData.length,
//         totalVitals: vitalsData.length,
//         latestBP: latestBP,
//         latestSugar: latestSugar
//       });

//       console.log('✅ Stats:', {
//         totalReports: reportsData.length,
//         totalVitals: vitalsData.length,
//         latestBP: latestBP,
//         latestSugar: latestSugar
//       });
//     } catch (error) {
//       console.error('❌ Dashboard Error:', error);
//       toast.error(error.response?.data?.message || 'Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteReport = async (reportId, reportName) => {
//     if (!window.confirm(`Are you sure you want to delete "${reportName}"? This action cannot be undone.`)) {
//       return;
//     }

//     setDeletingId(reportId);
//     try {
//       await api.delete(`/reports/${reportId}`);
//       toast.success('Report deleted successfully!');
      
//       // Update local state
//       setReports(reports.filter(report => report._id !== reportId));
//       setStats(prev => ({
//         ...prev,
//         totalReports: prev.totalReports - 1
//       }));
//     } catch (error) {
//       console.error('❌ Delete Error:', error);
//       toast.error(error.response?.data?.message || 'Failed to delete report');
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const filteredReports = reports.filter(report => {
//     const matchesSearch = report.name?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filterType === 'all' || report.type === filterType;
//     return matchesSearch && matchesFilter;
//   });

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="flex items-center justify-center h-96">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Total Reports</p>
//                 <p className="text-3xl font-bold text-gray-800">{stats.totalReports}</p>
//               </div>
//               <FileText className="h-12 w-12 text-blue-500" />
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Vitals Tracked</p>
//                 <p className="text-3xl font-bold text-gray-800">{stats.totalVitals}</p>
//               </div>
//               <Activity className="h-12 w-12 text-green-500" />
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Latest BP</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.latestBP}</p>
//               </div>
//               <Heart className="h-12 w-12 text-purple-500" />
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Latest Sugar</p>
//                 <p className="text-2xl font-bold text-gray-800">{stats.latestSugar}</p>
//               </div>
//               <Droplet className="h-12 w-12 text-orange-500" />
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Link
//             to="/upload"
//             className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6 hover:from-blue-600 hover:to-blue-700 transition"
//           >
//             <Upload className="h-8 w-8 mb-2" />
//             <h3 className="text-lg font-semibold">Upload Report</h3>
//             <p className="text-sm text-blue-100">Add new medical documents</p>
//           </Link>
          
//           <Link
//             to="/add-vitals"
//             className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6 hover:from-green-600 hover:to-green-700 transition"
//           >
//             <Plus className="h-8 w-8 mb-2" />
//             <h3 className="text-lg font-semibold">Add Vitals</h3>
//             <p className="text-sm text-green-100">Track BP, Sugar, Weight</p>
//           </Link>
          
//           <Link
//             to="/timeline"
//             className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6 hover:from-purple-600 hover:to-purple-700 transition"
//           >
//             <Calendar className="h-8 w-8 mb-2" />
//             <h3 className="text-lg font-semibold">View Timeline</h3>
//             <p className="text-sm text-purple-100">See complete health history</p>
//           </Link>
//         </div>

//         {/* Reports Section */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
//             <h2 className="text-2xl font-bold text-gray-800">Recent Reports</h2>
//             <div className="flex space-x-4 w-full md:w-auto">
//               <div className="relative flex-1 md:flex-initial">
//                 <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search reports..."
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <select
//                 value={filterType}
//                 onChange={(e) => setFilterType(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="all">All Types</option>
//                 <option value="Lab Report">Lab Report</option>
//                 <option value="X-Ray">X-Ray</option>
//                 <option value="MRI">MRI</option>
//                 <option value="CT Scan">CT Scan</option>
//                 <option value="Ultrasound">Ultrasound</option>
//                 <option value="ECG">ECG</option>
//                 <option value="Prescription">Prescription</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>

//           <div className="space-y-4">
//             {filteredReports.length === 0 ? (
//               <div className="text-center py-12">
//                 <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500">No reports found</p>
//                 <p className="text-sm text-gray-400 mt-2">Upload your first medical report to get started</p>
//               </div>
//             ) : (
//               filteredReports.map(report => (
//                 <div key={report._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-4 flex-1">
//                       <div className="bg-blue-100 p-3 rounded-lg">
//                         <FileText className="h-6 w-6 text-blue-600" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-gray-800">{report.name}</h3>
//                         <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
//                           <span className="flex items-center">
//                             <Calendar className="h-4 w-4 mr-1" />
//                             {new Date(report.date).toLocaleDateString()}
//                           </span>
//                           <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
//                             {report.type}
//                           </span>
//                           {report.aiAnalysis && (
//                             <span className="flex items-center text-green-600">
//                               <CheckCircle className="h-4 w-4 mr-1" />
//                               AI Analyzed
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Link
//                         to={`/report/${report._id}`}
//                         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
//                       >
//                         <Eye className="h-4 w-4" />
//                         <span>View</span>
//                       </Link>
//                       <button
//                         onClick={() => handleDeleteReport(report._id, report.name)}
//                         disabled={deletingId === report._id}
//                         className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                         <span>{deletingId === report._id ? 'Deleting...' : 'Delete'}</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Activity, Heart, Droplet, Upload, Plus, Calendar, Search, Eye, CheckCircle, Trash2, AlertTriangle, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import api from '../config/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [vitals, setVitals] = useState([]);
  const [stats, setStats] = useState({
    totalReports: 0,
    totalVitals: 0,
    latestBP: 'N/A',
    latestSugar: 'N/A'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, report: null });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [reportsRes, vitalsRes] = await Promise.all([
        api.get('/reports'),
        api.get('/vitals')
      ]);

      const reportsData = reportsRes.data.data?.reports || reportsRes.data.reports || [];
      const vitalsData = vitalsRes.data.data?.vitals || vitalsRes.data.vitals || [];

      setReports(reportsData);
      setVitals(vitalsData);

      // Calculate stats - find latest readings for each vital
      const latestBP = vitalsData.find(v => v.bloodPressure)?.bloodPressure || 'N/A';
      const latestSugarVital = vitalsData.find(v => v.bloodSugar);
      const latestSugar = latestSugarVital ? `${latestSugarVital.bloodSugar} mg/dL` : 'N/A';
      
      setStats({
        totalReports: reportsData.length,
        totalVitals: vitalsData.length,
        latestBP: latestBP,
        latestSugar: latestSugar
      });
    } catch (error) {
      console.error('❌ Dashboard Error:', error);
      toast.error(error.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (report) => {
    setDeleteModal({ show: true, report });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, report: null });
  };

  const confirmDelete = async () => {
    const report = deleteModal.report;
    if (!report) return;

    setDeletingId(report._id);
    closeDeleteModal();

    try {
      await api.delete(`/reports/${report._id}`);
      
      // Update local state
      setReports(reports.filter(r => r._id !== report._id));
      setStats(prev => ({
        ...prev,
        totalReports: prev.totalReports - 1
      }));
      
      toast.success(`"${report.name}" deleted successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('❌ Delete Error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete report', {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setDeletingId(null);
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || report.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading your health data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 transform hover:scale-105 transition duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Reports</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">{stats.totalReports}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <FileText className="h-10 w-10 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 transform hover:scale-105 transition duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Vitals Tracked</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">{stats.totalVitals}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <Activity className="h-10 w-10 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 transform hover:scale-105 transition duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Latest BP</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">{stats.latestBP}</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl">
                <Heart className="h-10 w-10 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 transform hover:scale-105 transition duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Latest Sugar</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">{stats.latestSugar}</p>
              </div>
              <div className="bg-orange-100 p-4 rounded-xl">
                <Droplet className="h-10 w-10 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/upload"
            className="group bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <Upload className="h-10 w-10 group-hover:scale-110 transition duration-300" />
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                Quick Action
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Upload Report</h3>
            <p className="text-blue-100 text-sm">Add new medical documents and get AI insights</p>
          </Link>
          
          <Link
            to="/add-vitals"
            className="group bg-gradient-to-br from-green-500 to-green-700 text-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <Plus className="h-10 w-10 group-hover:scale-110 transition duration-300" />
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                Track Health
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Add Vitals</h3>
            <p className="text-green-100 text-sm">Track BP, Sugar, Weight & more</p>
          </Link>
          
          <Link
            to="/timeline"
            className="group bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-10 w-10 group-hover:scale-110 transition duration-300" />
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                View History
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">View Timeline</h3>
            <p className="text-purple-100 text-sm">See complete health journey</p>
          </Link>
        </div>

        {/* Reports Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Recent Reports</h2>
              <p className="text-gray-500 mt-1">Manage your medical documents</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search reports..."
                  className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl w-full sm:w-72 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition font-medium bg-white cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="Lab Report">Lab Report</option>
                <option value="X-Ray">X-Ray</option>
                <option value="MRI">MRI</option>
                <option value="CT Scan">CT Scan</option>
                <option value="Ultrasound">Ultrasound</option>
                <option value="ECG">ECG</option>
                <option value="Prescription">Prescription</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredReports.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <FileText className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No reports found</h3>
                <p className="text-gray-500 mb-6">Upload your first medical report to get started</p>
                <Link
                  to="/upload"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Report
                </Link>
              </div>
            ) : (
              filteredReports.map(report => (
                <div 
                  key={report._id} 
                  className="group border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition duration-200 bg-gradient-to-r from-white to-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-5 flex-1">
                      <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl group-hover:scale-110 transition duration-200">
                        <FileText className="h-7 w-7 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg mb-2">{report.name}</h3>
                        <div className="flex items-center flex-wrap gap-3 text-sm">
                          <span className="flex items-center text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                            <Calendar className="h-4 w-4 mr-1.5" />
                            {new Date(report.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs font-semibold shadow-sm">
                            {report.type}
                          </span>
                          {report.aiAnalysis && (
                            <span className="flex items-center text-green-700 bg-green-100 px-3 py-1 rounded-lg font-medium">
                              <CheckCircle className="h-4 w-4 mr-1.5" />
                              AI Analyzed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`/report/${report._id}`}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition flex items-center space-x-2 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </Link>
                      <button
                        onClick={() => openDeleteModal(report)}
                        disabled={deletingId === report._id}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-xl hover:from-red-600 hover:to-red-700 transition flex items-center space-x-2 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {deletingId === report._id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            <span>Deleting...</span>
                          </>
                        ) : (
                          <>
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-3 rounded-xl">
                  <AlertTriangle className="h-7 w-7 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Delete Report?</h3>
              </div>
              <button
                onClick={closeDeleteModal}
                className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-8">
              <p className="text-gray-600 mb-3">
                Are you sure you want to delete this report?
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="font-semibold text-gray-800 mb-1">
                  {deleteModal.report?.name}
                </p>
                <p className="text-sm text-red-700">
                  This action cannot be undone. The report will be permanently deleted.
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={closeDeleteModal}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition font-semibold shadow-lg hover:shadow-xl"
              >
                Delete Report
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
    </div>
  );
};

export default Dashboard;