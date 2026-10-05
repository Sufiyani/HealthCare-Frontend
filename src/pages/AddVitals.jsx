// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Heart, Droplet, Weight } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import api from '../config/api';
// import { toast } from 'react-toastify';

// const AddVitals = () => {
//   const [vitalDate, setVitalDate] = useState(new Date().toISOString().split('T')[0]);
//   const [bloodPressureSystolic, setBloodPressureSystolic] = useState('');
//   const [bloodPressureDiastolic, setBloodPressureDiastolic] = useState('');
//   const [bloodSugar, setBloodSugar] = useState('');
//   const [weight, setWeight] = useState('');
//   const [temperature, setTemperature] = useState('');
//   const [heartRate, setHeartRate] = useState('');
//   const [notes, setNotes] = useState('');
//   const [saving, setSaving] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate at least one vital is entered
//     if (!bloodPressureSystolic && !bloodSugar && !weight && !temperature && !heartRate) {
//       toast.error('Please enter at least one vital reading');
//       return;
//     }

//     // Validate BP format
//     if (bloodPressureSystolic && !bloodPressureDiastolic) {
//       toast.error('Please enter both systolic and diastolic blood pressure');
//       return;
//     }

//     setSaving(true);

//     const vitalData = {
//       date: vitalDate,
//       bloodPressure: bloodPressureSystolic && bloodPressureDiastolic 
//         ? `${bloodPressureSystolic}/${bloodPressureDiastolic}` 
//         : undefined,
//       bloodSugar: bloodSugar || undefined,
//       weight: weight || undefined,
//       temperature: temperature || undefined,
//       heartRate: heartRate || undefined,
//       notes: notes || undefined,
//     };

//     // Remove undefined fields
//     Object.keys(vitalData).forEach(key => 
//       vitalData[key] === undefined && delete vitalData[key]
//     );

//     try {
//       await api.post('/vitals', vitalData);
//       toast.success('Vitals saved successfully!');
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to save vitals');
//       console.error(error);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white rounded-xl shadow-md p-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Add Manual Vitals</h1>
//           <p className="text-gray-600 mb-8">Apne daily health readings manually add karein</p>

//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Date <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="date"
//                   value={vitalDate}
//                   onChange={(e) => setVitalDate(e.target.value)}
//                   required
//                   max={new Date().toISOString().split('T')[0]}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               {/* Blood Pressure */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <div className="flex items-center space-x-2">
//                     <Heart className="h-5 w-5 text-red-500" />
//                     <span>Blood Pressure (BP)</span>
//                   </div>
//                 </label>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <input
//                       type="number"
//                       value={bloodPressureSystolic}
//                       onChange={(e) => setBloodPressureSystolic(e.target.value)}
//                       placeholder="Systolic (e.g., 120)"
//                       min="70"
//                       max="200"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Systolic (Upper)</p>
//                   </div>
//                   <div>
//                     <input
//                       type="number"
//                       value={bloodPressureDiastolic}
//                       onChange={(e) => setBloodPressureDiastolic(e.target.value)}
//                       placeholder="Diastolic (e.g., 80)"
//                       min="40"
//                       max="130"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Diastolic (Lower)</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Blood Sugar */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <div className="flex items-center space-x-2">
//                     <Droplet className="h-5 w-5 text-blue-500" />
//                     <span>Blood Sugar (mg/dL)</span>
//                   </div>
//                 </label>
//                 <input
//                   type="number"
//                   value={bloodSugar}
//                   onChange={(e) => setBloodSugar(e.target.value)}
//                   placeholder="e.g., 95"
//                   min="50"
//                   max="500"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               {/* Weight */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <div className="flex items-center space-x-2">
//                     <Weight className="h-5 w-5 text-green-500" />
//                     <span>Weight (kg)</span>
//                   </div>
//                 </label>
//                 <input
//                   type="number"
//                   step="0.1"
//                   value={weight}
//                   onChange={(e) => setWeight(e.target.value)}
//                   placeholder="e.g., 68.5"
//                   min="20"
//                   max="300"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               {/* Temperature */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-orange-500">🌡️</span>
//                     <span>Temperature (°F)</span>
//                   </div>
//                 </label>
//                 <input
//                   type="number"
//                   step="0.1"
//                   value={temperature}
//                   onChange={(e) => setTemperature(e.target.value)}
//                   placeholder="e.g., 98.6"
//                   min="95"
//                   max="106"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               {/* Heart Rate */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <div className="flex items-center space-x-2">
//                     <Heart className="h-5 w-5 text-pink-500" />
//                     <span>Heart Rate (bpm)</span>
//                   </div>
//                 </label>
//                 <input
//                   type="number"
//                   value={heartRate}
//                   onChange={(e) => setHeartRate(e.target.value)}
//                   placeholder="e.g., 72"
//                   min="40"
//                   max="200"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               {/* Notes */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
//                 <textarea
//                   value={notes}
//                   onChange={(e) => setNotes(e.target.value)}
//                   rows="3"
//                   placeholder="e.g., Feeling good, after breakfast, before exercise, etc."
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               {/* Info Box */}
//               <div className="md:col-span-2 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
//                 <p className="text-sm text-blue-800">
//                   <strong>Tip:</strong> Regular tracking of vitals helps you and your doctor monitor your health trends over time.
//                 </p>
//                 <p className="text-sm text-blue-800 mt-1">
//                   نوٹ: باقاعدگی سے vitals track کرنے سے آپ اور آپ کے ڈاکٹر کو صحت کی نگرانی میں مددملتی ہے۔
//                 </p>
//               </div>

//               {/* Buttons */}
//               <div className="md:col-span-2 flex space-x-4">
//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {saving ? 'Saving...' : 'Save Vitals'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => navigate('/dashboard')}
//                   disabled={saving}
//                   className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddVitals;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Droplet, Weight, Calendar, Activity, Thermometer, Save, X, AlertCircle, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import api from '../config/api';
import { toast } from 'react-toastify';

const AddVitals = () => {
  const [vitalDate, setVitalDate] = useState(new Date().toISOString().split('T')[0]);
  const [bloodPressureSystolic, setBloodPressureSystolic] = useState('');
  const [bloodPressureDiastolic, setBloodPressureDiastolic] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [weight, setWeight] = useState('');
  const [temperature, setTemperature] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate at least one vital is entered
    if (!bloodPressureSystolic && !bloodSugar && !weight && !temperature && !heartRate) {
      toast.error('Please enter at least one vital reading', {
        position: "top-right",
        icon: <AlertCircle className="h-5 w-5" />
      });
      return;
    }

    // Validate BP format
    if (bloodPressureSystolic && !bloodPressureDiastolic) {
      toast.error('Please enter both systolic and diastolic blood pressure', {
        position: "top-right",
      });
      return;
    }

    if (bloodPressureDiastolic && !bloodPressureSystolic) {
      toast.error('Please enter both systolic and diastolic blood pressure', {
        position: "top-right",
      });
      return;
    }

    setSaving(true);

    const vitalData = {
      date: vitalDate,
      bloodPressure: bloodPressureSystolic && bloodPressureDiastolic 
        ? `${bloodPressureSystolic}/${bloodPressureDiastolic}` 
        : undefined,
      bloodSugar: bloodSugar || undefined,
      weight: weight || undefined,
      temperature: temperature || undefined,
      heartRate: heartRate || undefined,
      notes: notes || undefined,
    };

    // Remove undefined fields
    Object.keys(vitalData).forEach(key => 
      vitalData[key] === undefined && delete vitalData[key]
    );

    try {
      await api.post('/vitals', vitalData);
      toast.success('Vitals saved successfully! 🎉', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save vitals', {
        position: "top-right",
        autoClose: 4000,
      });
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const getBPStatus = () => {
    if (!bloodPressureSystolic || !bloodPressureDiastolic) return null;
    const sys = parseInt(bloodPressureSystolic);
    const dia = parseInt(bloodPressureDiastolic);
    
    if (sys < 120 && dia < 80) return { text: 'Normal', color: 'text-green-600', bg: 'bg-green-50' };
    if (sys < 130 && dia < 80) return { text: 'Elevated', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (sys < 140 || dia < 90) return { text: 'High (Stage 1)', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { text: 'High (Stage 2)', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const getSugarStatus = () => {
    if (!bloodSugar) return null;
    const sugar = parseInt(bloodSugar);
    
    if (sugar < 70) return { text: 'Low', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (sugar <= 100) return { text: 'Normal', color: 'text-green-600', bg: 'bg-green-50' };
    if (sugar <= 125) return { text: 'Prediabetes', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { text: 'High', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const bpStatus = getBPStatus();
  const sugarStatus = getSugarStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
            <div className="flex items-center">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mr-5">
                <Activity className="h-10 w-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">Track Your Vitals</h1>
                <p className="text-green-100">Monitor your daily health readings and trends</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Date Section - Full Width */}
              <div className="lg:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <span>Date <span className="text-red-500">*</span></span>
                  </div>
                </label>
                <input
                  type="date"
                  value={vitalDate}
                  onChange={(e) => setVitalDate(e.target.value)}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                />
              </div>

              {/* Blood Pressure Card */}
              <div className="lg:col-span-3 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-100">
                <label className="block text-lg font-bold text-gray-800 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-100 p-2 rounded-lg">
                        <Heart className="h-6 w-6 text-red-600" />
                      </div>
                      <span>Blood Pressure (BP)</span>
                    </div>
                    {bpStatus && (
                      <span className={`px-4 py-1.5 ${bpStatus.bg} ${bpStatus.color} rounded-full text-sm font-semibold`}>
                        {bpStatus.text}
                      </span>
                    )}
                  </div>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      Systolic (Upper)
                    </label>
                    <input
                      type="number"
                      value={bloodPressureSystolic}
                      onChange={(e) => setBloodPressureSystolic(e.target.value)}
                      placeholder="e.g., 120"
                      min="70"
                      max="200"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition text-lg font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      Diastolic (Lower)
                    </label>
                    <input
                      type="number"
                      value={bloodPressureDiastolic}
                      onChange={(e) => setBloodPressureDiastolic(e.target.value)}
                      placeholder="e.g., 80"
                      min="40"
                      max="130"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition text-lg font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Blood Sugar Card */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
                <label className="block text-lg font-bold text-gray-800 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Droplet className="h-6 w-6 text-blue-600" />
                      </div>
                      <span>Blood Sugar</span>
                    </div>
                    {sugarStatus && (
                      <span className={`px-3 py-1 ${sugarStatus.bg} ${sugarStatus.color} rounded-full text-xs font-semibold`}>
                        {sugarStatus.text}
                      </span>
                    )}
                  </div>
                </label>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Glucose Level (mg/dL)
                  </label>
                  <input
                    type="number"
                    value={bloodSugar}
                    onChange={(e) => setBloodSugar(e.target.value)}
                    placeholder="e.g., 95"
                    min="50"
                    max="500"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-lg font-semibold"
                  />
                </div>
              </div>

              {/* Weight Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
                <label className="block text-lg font-bold text-gray-800 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Weight className="h-6 w-6 text-green-600" />
                    </div>
                    <span>Weight</span>
                  </div>
                </label>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Body Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g., 68.5"
                    min="20"
                    max="300"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-lg font-semibold"
                  />
                </div>
              </div>

              {/* Temperature Card */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-100">
                <label className="block text-lg font-bold text-gray-800 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Thermometer className="h-6 w-6 text-orange-600" />
                    </div>
                    <span>Temperature</span>
                  </div>
                </label>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Body Temp (°F)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    placeholder="e.g., 98.6"
                    min="95"
                    max="106"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-lg font-semibold"
                  />
                </div>
              </div>

              {/* Heart Rate Card */}
              <div className="lg:col-span-3 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-pink-100">
                <label className="block text-lg font-bold text-gray-800 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-pink-100 p-2 rounded-lg">
                      <Heart className="h-6 w-6 text-pink-600" />
                    </div>
                    <span>Heart Rate</span>
                  </div>
                </label>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Pulse Rate (bpm)
                  </label>
                  <input
                    type="number"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                    placeholder="e.g., 72"
                    min="40"
                    max="200"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition text-lg font-semibold"
                  />
                </div>
              </div>

              {/* Notes Section */}
              <div className="lg:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="4"
                  placeholder="Add any additional observations, symptoms, or context (e.g., 'Feeling good, measured after breakfast, before exercise')"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none"
                />
              </div>

              {/* Info Cards */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500 p-5 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-green-900 mb-1">Health Tracking</p>
                      <p className="text-sm text-green-700">
                        Regular tracking helps you and your doctor monitor health trends over time
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-blue-900 mb-1">صحت کی نگرانی</p>
                      <p className="text-sm text-blue-700">
                        باقاعدگی سے vitals track کرنے سے آپ اور آپ کے ڈاکٹر کو مدد ملتی ہے
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="lg:col-span-3 flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Saving Vitals...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      <span>Save Vitals</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  disabled={saving}
                  className="sm:w-auto px-8 py-4 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <X className="h-5 w-5" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Bottom Tips */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
            <p className="text-sm font-semibold text-gray-700">📊 Track Regularly</p>
            <p className="text-xs text-gray-600 mt-1">Daily tracking shows better trends</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
            <p className="text-sm font-semibold text-gray-700">⏰ Same Time</p>
            <p className="text-xs text-gray-600 mt-1">Measure at consistent times</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
            <p className="text-sm font-semibold text-gray-700">📝 Add Notes</p>
            <p className="text-xs text-gray-600 mt-1">Context helps understanding</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVitals;