// import React, { useState, useEffect } from 'react';
// import { FileText, Activity, Clock } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import api from '../config/api';
// import { toast } from 'react-toastify';

// const Timeline = () => {
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all'); // all, reports, vitals

//   useEffect(() => {
//     fetchTimelineData();
//   }, []);

//   const fetchTimelineData = async () => {
//     try {
//       const [reportsRes, vitalsRes] = await Promise.all([
//         api.get('/reports'),
//         api.get('/vitals')
//       ]);

//       const reports = (reportsRes.data.reports || []).map(r => ({
//         ...r,
//         entryType: 'report',
//         displayDate: new Date(r.date)
//       }));

//       const vitals = (vitalsRes.data.vitals || []).map(v => ({
//         ...v,
//         entryType: 'vital',
//         displayDate: new Date(v.date)
//       }));

//       const combined = [...reports, ...vitals].sort((a, b) => 
//         b.displayDate - a.displayDate
//       );

//       setEntries(combined);
//     } catch (error) {
//       toast.error('Failed to load timeline data');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredEntries = entries.filter(entry => {
//     if (filter === 'all') return true;
//     if (filter === 'reports') return entry.entryType === 'report';
//     if (filter === 'vitals') return entry.entryType === 'vital';
//     return true;
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
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Timeline</h1>
//               <p className="text-gray-600">Apki complete health history chronological order mein</p>
//             </div>
//             <div className="flex space-x-2 mt-4 md:mt-0">
//               <button
//                 onClick={() => setFilter('all')}
//                 className={`px-4 py-2 rounded-lg transition ${
//                   filter === 'all' 
//                     ? 'bg-blue-600 text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 All
//               </button>
//               <button
//                 onClick={() => setFilter('reports')}
//                 className={`px-4 py-2 rounded-lg transition ${
//                   filter === 'reports' 
//                     ? 'bg-blue-600 text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Reports
//               </button>
//               <button
//                 onClick={() => setFilter('vitals')}
//                 className={`px-4 py-2 rounded-lg transition ${
//                   filter === 'vitals' 
//                     ? 'bg-blue-600 text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Vitals
//               </button>
//             </div>
//           </div>

//           {filteredEntries.length === 0 ? (
//             <div className="text-center py-12">
//               <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-500">No health records found</p>
//               <p className="text-sm text-gray-400 mt-2">Start adding reports and vitals to see your timeline</p>
//             </div>
//           ) : (
//             <div className="relative">
//               {/* Timeline Line */}
//               <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

//               {/* Timeline Entries */}
//               <div className="space-y-8">
//                 {filteredEntries.map((entry, idx) => (
//                   <div key={`${entry.entryType}-${entry._id}-${idx}`} className="relative pl-20">
//                     {/* Timeline Dot */}
//                     <div className={`absolute left-5 w-6 h-6 rounded-full border-4 border-white ${
//                       entry.entryType === 'report' ? 'bg-blue-500' : 'bg-green-500'
//                     }`}></div>

//                     {/* Timeline Content */}
//                     <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition">
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center space-x-3">
//                           {entry.entryType === 'report' ? (
//                             <FileText className="h-5 w-5 text-blue-600" />
//                           ) : (
//                             <Activity className="h-5 w-5 text-green-600" />
//                           )}
//                           <span className="font-semibold text-gray-800">
//                             {entry.entryType === 'report' ? entry.name : 'Vitals Recorded'}
//                           </span>
//                         </div>
//                         <span className="text-sm text-gray-600 flex items-center">
//                           <Clock className="h-4 w-4 mr-1" />
//                           {entry.displayDate.toLocaleDateString()}
//                         </span>
//                       </div>

//                       {entry.entryType === 'report' ? (
//                         <div>
//                           <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
//                             {entry.type}
//                           </span>
//                           {entry.aiAnalysis && (
//                             <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
//                               AI Analyzed
//                             </span>
//                           )}
//                         </div>
//                       ) : (
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
//                           {entry.bloodPressure && (
//                             <div className="text-sm">
//                               <span className="text-gray-600">BP:</span>
//                               <span className="font-medium text-gray-800 ml-1">{entry.bloodPressure}</span>
//                             </div>
//                           )}
//                           {entry.bloodSugar && (
//                             <div className="text-sm">
//                               <span className="text-gray-600">Sugar:</span>
//                               <span className="font-medium text-gray-800 ml-1">{entry.bloodSugar}</span>
//                             </div>
//                           )}
//                           {entry.weight && (
//                             <div className="text-sm">
//                               <span className="text-gray-600">Weight:</span>
//                               <span className="font-medium text-gray-800 ml-1">{entry.weight} kg</span>
//                             </div>
//                           )}
//                           {entry.heartRate && (
//                             <div className="text-sm">
//                               <span className="text-gray-600">Heart:</span>
//                               <span className="font-medium text-gray-800 ml-1">{entry.heartRate} bpm</span>
//                             </div>
//                           )}
//                         </div>
//                       )}

//                       {entry.notes && (
//                         <p className="text-sm text-gray-600 mt-2 italic">{entry.notes}</p>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Timeline;


// import React, { useState, useEffect } from 'react';
// import { FileText, Activity, Clock, AlertCircle, RefreshCw } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import api from '../config/api';
// import { toast } from 'react-toastify';

// const Timeline = () => {
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState('all');
//   const [debugInfo, setDebugInfo] = useState(null); // Debug info

//   useEffect(() => {
//     fetchTimelineData();
//   }, []);

//   const fetchTimelineData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       console.log('🔄 Starting timeline data fetch...');

//       // Fetch both reports and vitals
//       const reportsRes = await api.get('/reports');
//       const vitalsRes = await api.get('/vitals');

//       console.log('📊 RAW Reports Response:', reportsRes);
//       console.log('💓 RAW Vitals Response:', vitalsRes);
      
//       console.log('📊 Reports Data:', reportsRes.data);
//       console.log('💓 Vitals Data:', vitalsRes.data);

//       // Try to extract data
//       const reportsData = reportsRes.data?.reports || reportsRes.data?.data?.reports || [];
//       const vitalsData = vitalsRes.data?.vitals || vitalsRes.data?.data?.vitals || [];

//       console.log('✅ Extracted Reports Array:', reportsData);
//       console.log('✅ Extracted Vitals Array:', vitalsData);
//       console.log('📏 Reports Length:', reportsData.length);
//       console.log('📏 Vitals Length:', vitalsData.length);
//       console.log('📋 Reports Type:', Array.isArray(reportsData) ? 'array' : typeof reportsData);
//       console.log('📋 Vitals Type:', Array.isArray(vitalsData) ? 'array' : typeof vitalsData);

//       // Store debug info
//       setDebugInfo({
//         reportsResponse: reportsRes.data,
//         vitalsResponse: vitalsRes.data,
//         reportsData,
//         vitalsData,
//         reportsLength: Array.isArray(reportsData) ? reportsData.length : 'NOT ARRAY',
//         vitalsLength: Array.isArray(vitalsData) ? vitalsData.length : 'NOT ARRAY',
//         reportsType: Array.isArray(reportsData) ? 'array' : typeof reportsData,
//         vitalsType: Array.isArray(vitalsData) ? 'array' : typeof vitalsData
//       });

//       if (!Array.isArray(reportsData) || !Array.isArray(vitalsData)) {
//         console.error('❌ Data is not in array format!');
//         console.error('Reports:', reportsData);
//         console.error('Vitals:', vitalsData);
//         throw new Error('Invalid data format from API');
//       }

//       // Transform reports
//       const reports = reportsData.map((r, idx) => {
//         console.log(`📄 Processing report ${idx}:`, r);
//         return {
//           ...r,
//           entryType: 'report',
//           displayDate: new Date(r.date),
//           sortDate: new Date(r.date).getTime()
//         };
//       });

//       // Transform vitals
//       const vitals = vitalsData.map((v, idx) => {
//         console.log(`💓 Processing vital ${idx}:`, v);
//         return {
//           ...v,
//           entryType: 'vital',
//           displayDate: new Date(v.date),
//           sortDate: new Date(v.date).getTime()
//         };
//       });

//       // Combine and sort
//       const combined = [...reports, ...vitals].sort((a, b) => 
//         b.sortDate - a.sortDate
//       );

//       console.log('📋 Final Combined Entries:', combined);
//       console.log('📊 Total entries:', combined.length);

//       setEntries(combined);

//       if (combined.length > 0) {
//         toast.success(`Loaded ${combined.length} health records`);
//       } else {
//         toast.info('No health records found');
//       }

//     } catch (err) {
//       console.error('❌ Timeline fetch error:', err);
//       console.error('Error details:', err.response);
//       console.error('Error message:', err.message);
//       setError(err.response?.data?.message || err.message || 'Failed to load timeline data');
//       toast.error('Failed to load timeline: ' + (err.message || 'Unknown error'));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredEntries = entries.filter(entry => {
//     if (filter === 'all') return true;
//     if (filter === 'reports') return entry.entryType === 'report';
//     if (filter === 'vitals') return entry.entryType === 'vital';
//     return true;
//   });

//   const formatDate = (date) => {
//     try {
//       if (!date) return 'No date';
//       const dateObj = date instanceof Date ? date : new Date(date);
//       if (isNaN(dateObj.getTime())) return 'Invalid date';
      
//       return dateObj.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       });
//     } catch (err) {
//       return 'Invalid date';
//     }
//   };

//   const reportsCount = entries.filter(e => e.entryType === 'report').length;
//   const vitalsCount = entries.filter(e => e.entryType === 'vital').length;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="flex items-center justify-center h-96">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading your health timeline...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
//         {/* 🔍 DEBUG INFO BOX - Remove after fixing */}
        

//         {error && (
//           <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
//             <div className="flex items-start">
//               <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
//               <div className="flex-1">
//                 <h3 className="text-red-800 font-medium">Error Loading Timeline</h3>
//                 <p className="text-red-600 text-sm mt-1">{error}</p>
//               </div>
//               <button
//                 onClick={fetchTimelineData}
//                 className="ml-4 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center flex-shrink-0"
//               >
//                 <RefreshCw className="h-4 w-4 mr-1" />
//                 Retry
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="bg-white rounded-xl shadow-md p-6">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Timeline</h1>
//               <p className="text-gray-600">Apki complete health history chronological order mein</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 {entries.length > 0 ? (
//                   <>Total: {entries.length} entries • {reportsCount} reports • {vitalsCount} vitals</>
//                 ) : (
//                   'No records yet'
//                 )}
//               </p>
//             </div>
            
//             {/* Filter Buttons */}
//             <div className="flex space-x-2 mt-4 md:mt-0">
//               <button
//                 onClick={() => setFilter('all')}
//                 className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
//                   filter === 'all' 
//                     ? 'bg-blue-600 text-white shadow-md' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 All ({entries.length})
//               </button>
//               <button
//                 onClick={() => setFilter('reports')}
//                 className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
//                   filter === 'reports' 
//                     ? 'bg-blue-600 text-white shadow-md' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Reports ({reportsCount})
//               </button>
//               <button
//                 onClick={() => setFilter('vitals')}
//                 className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
//                   filter === 'vitals' 
//                     ? 'bg-blue-600 text-white shadow-md' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Vitals ({vitalsCount})
//               </button>
//             </div>
//           </div>

//           {/* Timeline Content */}
//           {filteredEntries.length === 0 ? (
//             <div className="text-center py-16">
//               <Clock className="h-20 w-20 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold text-gray-700 mb-2">
//                 {filter === 'all' ? 'No Health Records Yet' : `No ${filter} found`}
//               </h3>
//               <p className="text-gray-500 mb-6">
//                 {filter === 'all' 
//                   ? 'Start tracking your health by adding reports and vitals' 
//                   : `Add some ${filter} to see them here`
//                 }
//               </p>
//               <div className="flex justify-center space-x-4">
//                 <a
//                   href="/upload"
//                   className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
//                 >
//                   <FileText className="h-5 w-5 mr-2" />
//                   Upload Report
//                 </a>
//                 <a
//                   href="/vitals"
//                   className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center"
//                 >
//                   <Activity className="h-5 w-5 mr-2" />
//                   Add Vitals
//                 </a>
//               </div>
//             </div>
//           ) : (
//             <div className="relative">
//               {/* Vertical Timeline Line */}
//               <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-purple-300 to-green-300"></div>

//               {/* Timeline Entries */}
//               <div className="space-y-6">
//                 {filteredEntries.map((entry, idx) => (
//                   <div key={`${entry.entryType}-${entry._id}-${idx}`} className="relative pl-20">
//                     {/* Timeline Dot */}
//                     <div className={`absolute left-5 w-6 h-6 rounded-full border-4 border-white shadow-lg transition transform hover:scale-110 ${
//                       entry.entryType === 'report' ? 'bg-blue-500' : 'bg-green-500'
//                     }`}></div>

//                     {/* Timeline Card */}
//                     <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 shadow-sm hover:shadow-lg transition border border-gray-200">
//                       {/* Card Header */}
//                       <div className="flex items-center justify-between mb-3">
//                         <div className="flex items-center space-x-3">
//                           {entry.entryType === 'report' ? (
//                             <div className="p-2 bg-blue-100 rounded-lg">
//                               <FileText className="h-5 w-5 text-blue-600" />
//                             </div>
//                           ) : (
//                             <div className="p-2 bg-green-100 rounded-lg">
//                               <Activity className="h-5 w-5 text-green-600" />
//                             </div>
//                           )}
//                           <div>
//                             <h3 className="font-semibold text-gray-800">
//                               {entry.entryType === 'report' ? entry.name : 'Vitals Recorded'}
//                             </h3>
//                             {entry.entryType === 'report' && entry.type && (
//                               <p className="text-xs text-gray-500">{entry.type}</p>
//                             )}
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <div className="text-sm text-gray-600 flex items-center bg-gray-100 px-3 py-1 rounded-full">
//                             <Clock className="h-3.5 w-3.5 mr-1.5" />
//                             {formatDate(entry.displayDate)}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Report Specific Content */}
//                       {entry.entryType === 'report' && (
//                         <div className="space-y-2">
//                           <div className="flex items-center space-x-2 flex-wrap">
//                             {entry.aiAnalysis?.summaryEnglish && 
//                              !entry.aiAnalysis.summaryEnglish.includes('in progress') && 
//                              !entry.aiAnalysis.summaryEnglish.includes('Analysis failed') && (
//                               <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center">
//                                 <span className="mr-1">✨</span> AI Analyzed
//                               </span>
//                             )}
//                             {entry.aiAnalysis?.severity && (
//                               <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
//                                 entry.aiAnalysis.severity === 'high' 
//                                   ? 'bg-red-100 text-red-700'
//                                   : entry.aiAnalysis.severity === 'medium'
//                                   ? 'bg-yellow-100 text-yellow-700'
//                                   : 'bg-blue-100 text-blue-700'
//                               }`}>
//                                 {entry.aiAnalysis.severity.charAt(0).toUpperCase() + entry.aiAnalysis.severity.slice(1)} Severity
//                               </span>
//                             )}
//                           </div>
                          
//                           {entry.aiAnalysis?.summaryEnglish && 
//                            !entry.aiAnalysis.summaryEnglish.includes('in progress') && (
//                             <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                               <p className="text-sm text-gray-700">
//                                 {entry.aiAnalysis.summaryEnglish}
//                               </p>
//                             </div>
//                           )}
//                         </div>
//                       )}

//                       {/* Vitals Specific Content */}
//                       {entry.entryType === 'vital' && (
//                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-3">
//                           {entry.bloodPressure && (
//                             <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
//                               <div className="text-xs text-gray-500 mb-1">Blood Pressure</div>
//                               <div className="font-semibold text-gray-800">{entry.bloodPressure}</div>
//                             </div>
//                           )}
//                           {entry.bloodSugar && (
//                             <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
//                               <div className="text-xs text-gray-500 mb-1">Blood Sugar</div>
//                               <div className="font-semibold text-gray-800">{entry.bloodSugar} mg/dL</div>
//                             </div>
//                           )}
//                           {entry.weight && (
//                             <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
//                               <div className="text-xs text-gray-500 mb-1">Weight</div>
//                               <div className="font-semibold text-gray-800">{entry.weight} kg</div>
//                             </div>
//                           )}
//                           {entry.temperature && (
//                             <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
//                               <div className="text-xs text-gray-500 mb-1">Temperature</div>
//                               <div className="font-semibold text-gray-800">{entry.temperature}°F</div>
//                             </div>
//                           )}
//                           {entry.heartRate && (
//                             <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
//                               <div className="text-xs text-gray-500 mb-1">Heart Rate</div>
//                               <div className="font-semibold text-gray-800">{entry.heartRate} bpm</div>
//                             </div>
//                           )}
//                         </div>
//                       )}

//                       {/* Notes Section */}
//                       {entry.notes && (
//                         <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
//                           <div className="flex items-start">
//                             <span className="text-amber-600 mr-2">📝</span>
//                             <p className="text-sm text-gray-700 italic flex-1">{entry.notes}</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Timeline;


import React, { useState, useEffect } from 'react';
import { FileText, Activity, Clock, AlertCircle, RefreshCw, Calendar, TrendingUp, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../config/api';
import { toast } from 'react-toastify';

const Timeline = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTimelineData();
  }, []);

  const fetchTimelineData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch both reports and vitals
      const [reportsRes, vitalsRes] = await Promise.all([
        api.get('/reports'),
        api.get('/vitals')
      ]);

      // Extract data with fallbacks
      const reportsData = reportsRes.data?.reports || reportsRes.data?.data?.reports || [];
      const vitalsData = vitalsRes.data?.vitals || vitalsRes.data?.data?.vitals || [];

      if (!Array.isArray(reportsData) || !Array.isArray(vitalsData)) {
        throw new Error('Invalid data format from API');
      }

      // Transform reports
      const reports = reportsData.map(r => ({
        ...r,
        entryType: 'report',
        displayDate: new Date(r.date),
        sortDate: new Date(r.date).getTime()
      }));

      // Transform vitals
      const vitals = vitalsData.map(v => ({
        ...v,
        entryType: 'vital',
        displayDate: new Date(v.date),
        sortDate: new Date(v.date).getTime()
      }));

      // Combine and sort
      const combined = [...reports, ...vitals].sort((a, b) => 
        b.sortDate - a.sortDate
      );

      setEntries(combined);

      if (combined.length > 0) {
        toast.success(`Loaded ${combined.length} health records successfully`, {
          position: "top-right",
          autoClose: 2500,
        });
      }

    } catch (err) {
      console.error('❌ Timeline fetch error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load timeline data');
      toast.error('Failed to load timeline: ' + (err.message || 'Unknown error'), {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredEntries = entries.filter(entry => {
    if (filter === 'all') return true;
    if (filter === 'reports') return entry.entryType === 'report';
    if (filter === 'vitals') return entry.entryType === 'vital';
    return true;
  });

  const formatDate = (date) => {
    try {
      if (!date) return 'No date';
      const dateObj = date instanceof Date ? date : new Date(date);
      if (isNaN(dateObj.getTime())) return 'Invalid date';
      
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (err) {
      return 'Invalid date';
    }
  };

  const getMonthYear = (date) => {
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
    } catch (err) {
      return '';
    }
  };

  const groupByMonth = (entries) => {
    const groups = {};
    entries.forEach(entry => {
      const monthYear = getMonthYear(entry.displayDate);
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(entry);
    });
    return groups;
  };

  const reportsCount = entries.filter(e => e.entryType === 'report').length;
  const vitalsCount = entries.filter(e => e.entryType === 'vital').length;
  const groupedEntries = groupByMonth(filteredEntries);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-700 font-semibold text-lg">Loading your health timeline...</p>
            <p className="text-gray-500 text-sm mt-1">Please wait</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {error && (
          <div className="mb-6 bg-white rounded-2xl shadow-xl overflow-hidden border-l-4 border-red-500">
            <div className="p-6">
              <div className="flex items-start">
                <div className="bg-red-100 p-3 rounded-xl mr-4">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-red-900 font-bold text-lg mb-1">Error Loading Timeline</h3>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
                <button
                  onClick={fetchTimelineData}
                  className="ml-4 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition shadow-lg flex items-center space-x-2 font-semibold"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Retry</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <TrendingUp className="h-10 w-10" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-1">Health Timeline</h1>
                  <p className="text-purple-100">Your complete health journey in chronological order</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      📊 {entries.length} Total Records
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      📄 {reportsCount} Reports
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      💓 {vitalsCount} Vitals
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Filter by:</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-6 py-2.5 rounded-xl transition-all duration-200 font-semibold ${
                    filter === 'all' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  All ({entries.length})
                </button>
                <button
                  onClick={() => setFilter('reports')}
                  className={`px-6 py-2.5 rounded-xl transition-all duration-200 font-semibold ${
                    filter === 'reports' 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg transform scale-105' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  📄 Reports ({reportsCount})
                </button>
                <button
                  onClick={() => setFilter('vitals')}
                  className={`px-6 py-2.5 rounded-xl transition-all duration-200 font-semibold ${
                    filter === 'vitals' 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-105' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  💓 Vitals ({vitalsCount})
                </button>
              </div>
            </div>
          </div>

          {/* Timeline Content */}
          <div className="p-8">
            {filteredEntries.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-full p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <Clock className="h-16 w-16 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {filter === 'all' ? 'No Health Records Yet' : `No ${filter} found`}
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  {filter === 'all' 
                    ? 'Start your health journey by adding reports and tracking vitals' 
                    : `Add some ${filter} to see them in your timeline`
                  }
                </p>
                <div className="flex justify-center space-x-4">
                  <Link
                    to="/upload"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2 font-semibold"
                  >
                    <FileText className="h-5 w-5" />
                    <span>Upload Report</span>
                  </Link>
                  <Link
                    to="/add-vitals"
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2 font-semibold"
                  >
                    <Activity className="h-5 w-5" />
                    <span>Add Vitals</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(groupedEntries).map(([monthYear, monthEntries]) => (
                  <div key={monthYear}>
                    {/* Month Header */}
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-bold text-lg shadow-lg">
                        <Calendar className="inline h-5 w-5 mr-2" />
                        {monthYear}
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-purple-300 to-transparent ml-4"></div>
                    </div>

                    {/* Timeline for this month */}
                    <div className="relative">
                      {/* Vertical Timeline Line */}
                      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-pink-400 to-blue-400 rounded-full"></div>

                      {/* Timeline Entries */}
                      <div className="space-y-6">
                        {monthEntries.map((entry, idx) => (
                          <div key={`${entry.entryType}-${entry._id}-${idx}`} className="relative pl-20">
                            {/* Timeline Dot */}
                            <div className={`absolute left-5 w-8 h-8 rounded-full border-4 border-white shadow-xl transition transform hover:scale-125 z-10 ${
                              entry.entryType === 'report' 
                                ? 'bg-gradient-to-br from-blue-500 to-cyan-500' 
                                : 'bg-gradient-to-br from-green-500 to-emerald-500'
                            }`}>
                              <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-current"></div>
                            </div>

                            {/* Timeline Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-purple-200 transform hover:-translate-y-1">
                              {/* Card Header */}
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                  {entry.entryType === 'report' ? (
                                    <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                                      <FileText className="h-6 w-6 text-blue-600" />
                                    </div>
                                  ) : (
                                    <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                                      <Activity className="h-6 w-6 text-green-600" />
                                    </div>
                                  )}
                                  <div>
                                    <h3 className="font-bold text-gray-800 text-lg">
                                      {entry.entryType === 'report' ? entry.name : 'Vitals Recorded'}
                                    </h3>
                                    {entry.entryType === 'report' && entry.type && (
                                      <p className="text-sm text-gray-500 font-medium">{entry.type}</p>
                                    )}
                                  </div>
                                </div>
                                <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-xl flex items-center space-x-2">
                                  <Clock className="h-4 w-4 text-purple-600" />
                                  <span className="text-sm font-semibold text-purple-700">{formatDate(entry.displayDate)}</span>
                                </div>
                              </div>

                              {/* Report Specific Content */}
                              {entry.entryType === 'report' && (
                                <div className="space-y-3">
                                  <div className="flex items-center space-x-2 flex-wrap gap-2">
                                    {entry.aiAnalysis?.summaryEnglish && 
                                     !entry.aiAnalysis.summaryEnglish.includes('in progress') && 
                                     !entry.aiAnalysis.summaryEnglish.includes('Analysis failed') && (
                                      <span className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-xl text-xs font-bold flex items-center shadow-sm">
                                        <span className="mr-1.5">✨</span> AI Analyzed
                                      </span>
                                    )}
                                    {entry.aiAnalysis?.severity && (
                                      <span className={`px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${
                                        entry.aiAnalysis.severity === 'high' 
                                          ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700'
                                          : entry.aiAnalysis.severity === 'medium'
                                          ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700'
                                          : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700'
                                      }`}>
                                        {entry.aiAnalysis.severity.charAt(0).toUpperCase() + entry.aiAnalysis.severity.slice(1)} Severity
                                      </span>
                                    )}
                                  </div>
                                  
                                  {entry.aiAnalysis?.summaryEnglish && 
                                   !entry.aiAnalysis.summaryEnglish.includes('in progress') && (
                                    <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl">
                                      <p className="text-sm text-gray-700 leading-relaxed">
                                        {entry.aiAnalysis.summaryEnglish}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Vitals Specific Content */}
                              {entry.entryType === 'vital' && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
                                  {entry.bloodPressure && (
                                    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 border-2 border-red-100 shadow-sm">
                                      <div className="text-xs text-red-600 font-semibold mb-1 uppercase tracking-wide">Blood Pressure</div>
                                      <div className="font-bold text-gray-800 text-lg">{entry.bloodPressure}</div>
                                    </div>
                                  )}
                                  {entry.bloodSugar && (
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-100 shadow-sm">
                                      <div className="text-xs text-blue-600 font-semibold mb-1 uppercase tracking-wide">Blood Sugar</div>
                                      <div className="font-bold text-gray-800 text-lg">{entry.bloodSugar} <span className="text-sm">mg/dL</span></div>
                                    </div>
                                  )}
                                  {entry.weight && (
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-100 shadow-sm">
                                      <div className="text-xs text-green-600 font-semibold mb-1 uppercase tracking-wide">Weight</div>
                                      <div className="font-bold text-gray-800 text-lg">{entry.weight} <span className="text-sm">kg</span></div>
                                    </div>
                                  )}
                                  {entry.temperature && (
                                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border-2 border-orange-100 shadow-sm">
                                      <div className="text-xs text-orange-600 font-semibold mb-1 uppercase tracking-wide">Temperature</div>
                                      <div className="font-bold text-gray-800 text-lg">{entry.temperature}<span className="text-sm">°F</span></div>
                                    </div>
                                  )}
                                  {entry.heartRate && (
                                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 border-2 border-pink-100 shadow-sm">
                                      <div className="text-xs text-pink-600 font-semibold mb-1 uppercase tracking-wide">Heart Rate</div>
                                      <div className="font-bold text-gray-800 text-lg">{entry.heartRate} <span className="text-sm">bpm</span></div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Notes Section */}
                              {entry.notes && (
                                <div className="mt-4 p-4 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl">
                                  <div className="flex items-start">
                                    <span className="text-2xl mr-3">📝</span>
                                    <div className="flex-1">
                                      <p className="text-xs text-amber-700 font-semibold mb-1 uppercase tracking-wide">Notes</p>
                                      <p className="text-sm text-gray-700 italic">{entry.notes}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;