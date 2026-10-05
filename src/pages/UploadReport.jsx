// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Upload, FileText, Calendar, ArrowLeft } from 'lucide-react';
// import { toast } from 'react-toastify';
// import api from '../config/api';

// const UploadReport = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     reportName: '',
//     reportType: 'Lab Report',
//     reportDate: '',
//   });
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       // Validate file size (10MB max)
//       if (selectedFile.size > 10 * 1024 * 1024) {
//         toast.error('File size should not exceed 10MB');
//         return;
//       }
      
//       // Validate file type
//       const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
//       if (!allowedTypes.includes(selectedFile.type)) {
//         toast.error('Only PDF, JPG, and PNG files are allowed');
//         return;
//       }
      
//       setFile(selectedFile);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate all fields
//     if (!formData.reportName.trim()) {
//       toast.error('Please enter report name');
//       return;
//     }

//     if (!formData.reportType) {
//       toast.error('Please select report type');
//       return;
//     }

//     if (!formData.reportDate) {
//       toast.error('Please select report date');
//       return;
//     }

//     if (!file) {
//       toast.error('Please upload a file');
//       return;
//     }

//     setLoading(true);

//     try {
//       const uploadData = new FormData();
//       uploadData.append('file', file);
//       uploadData.append('name', formData.reportName);
//       uploadData.append('type', formData.reportType);
//       uploadData.append('date', formData.reportDate);

//       const response = await api.post('/reports/upload', uploadData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       toast.success(response.data.message || 'Report uploaded successfully!');
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error(error.response?.data?.message || 'Failed to upload report');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
//       <div className="max-w-2xl mx-auto">
//         <button
//           onClick={() => navigate('/dashboard')}
//           className="mb-6 flex items-center text-blue-600 hover:text-blue-700"
//         >
//           <ArrowLeft className="h-5 w-5 mr-2" />
//           Back to Dashboard
//         </button>

//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className="flex items-center mb-6">
//             <div className="bg-blue-100 p-3 rounded-full mr-4">
//               <Upload className="h-8 w-8 text-blue-600" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">Upload Report</h1>
//               <p className="text-gray-600">Add your medical report</p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Report Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Report Name *
//               </label>
//               <input
//                 type="text"
//                 name="reportName"
//                 value={formData.reportName}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="e.g., Blood Test, X-Ray"
//               />
//             </div>

//             {/* Report Type */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Report Type *
//               </label>
//               <select
//                 name="reportType"
//                 value={formData.reportType}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
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

//             {/* Report Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Report Date *
//               </label>
//               <input
//                 type="date"
//                 name="reportDate"
//                 value={formData.reportDate}
//                 onChange={handleInputChange}
//                 max={new Date().toISOString().split('T')[0]}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             {/* File Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Upload File (PDF or Image) *
//               </label>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
//                 <input
//                   type="file"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                   onChange={handleFileChange}
//                   className="hidden"
//                   id="file-upload"
//                 />
//                 <label htmlFor="file-upload" className="cursor-pointer">
//                   <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//                   <p className="text-gray-600 mb-1">
//                     {file ? file.name : 'Click to upload or drag and drop'}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     PDF, JPG, PNG up to 10MB
//                   </p>
//                   {file && (
//                     <p className="text-sm text-blue-600 mt-2">
//                       {(file.size / 1024).toFixed(2)} KB
//                     </p>
//                   )}
//                 </label>
//               </div>
//             </div>

//             {/* Disclaimer */}
//             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
//               <p className="text-sm text-yellow-800">
//                 ⚠️ <strong>Disclaimer:</strong> AI analysis is for understanding only, not for medical advice.
//               </p>
//               <p className="text-sm text-yellow-800 mt-1">
//                 صرف سمجھنے کے لیے ہے، نہ کہ طبی علاج کے لیے۔
//               </p>
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg disabled:opacity-50"
//               >
//                 {loading ? 'Uploading...' : 'Upload & Analyze'}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => navigate('/dashboard')}
//                 disabled={loading}
//                 className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadReport;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Calendar, ArrowLeft, CheckCircle, AlertCircle, X } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../config/api';

const UploadReport = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reportName: '',
    reportType: 'Lab Report',
    reportDate: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateFile = (selectedFile) => {
    // Validate file size (10MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error('File size should not exceed 10MB', {
        position: "top-right",
        autoClose: 4000,
      });
      return false;
    }
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error('Only PDF, JPG, and PNG files are allowed', {
        position: "top-right",
        autoClose: 4000,
      });
      return false;
    }
    
    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      toast.success('File selected successfully!', {
        position: "top-right",
        autoClose: 2000,
        icon: <CheckCircle className="h-5 w-5" />
      });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        toast.success('File uploaded successfully!', {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    toast.info('File removed', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!formData.reportName.trim()) {
      toast.error('Please enter report name', {
        position: "top-right",
        icon: <AlertCircle className="h-5 w-5" />
      });
      return;
    }

    if (!formData.reportType) {
      toast.error('Please select report type', {
        position: "top-right",
      });
      return;
    }

    if (!formData.reportDate) {
      toast.error('Please select report date', {
        position: "top-right",
      });
      return;
    }

    if (!file) {
      toast.error('Please upload a file', {
        position: "top-right",
      });
      return;
    }

    setLoading(true);

    try {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('name', formData.reportName);
      uploadData.append('type', formData.reportType);
      uploadData.append('date', formData.reportDate);

      const response = await api.post('/reports/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Report uploaded & analyzed successfully! 🎉', {
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
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Failed to upload report', {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = () => {
    if (!file) return <Upload className="h-16 w-16 text-gray-400" />;
    
    if (file.type === 'application/pdf') {
      return <FileText className="h-16 w-16 text-red-500" />;
    }
    return <FileText className="h-16 w-16 text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-700 font-semibold transition group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="flex items-center">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mr-5">
                <Upload className="h-10 w-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">Upload Medical Report</h1>
                <p className="text-blue-100">Add your medical documents and get AI-powered insights</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Report Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Report Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="reportName"
                value={formData.reportName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="e.g., Blood Test Report, Chest X-Ray"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Report Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Report Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="reportType"
                  value={formData.reportType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white cursor-pointer font-medium"
                >
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

              {/* Report Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Report Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    name="reportDate"
                    value={formData.reportDate}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload File (PDF or Image) <span className="text-red-500">*</span>
              </label>
              <div 
                className={`relative border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : file 
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                
                {file ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      {getFileIcon()}
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                          <div className="text-left">
                            <p className="font-semibold text-gray-800">{file.name}</p>
                            <p className="text-sm text-gray-500">
                              {(file.size / 1024).toFixed(2)} KB • {file.type.split('/')[1].toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-2 hover:bg-red-100 rounded-lg transition group"
                        >
                          <X className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                        </button>
                      </div>
                    </div>
                    <label 
                      htmlFor="file-upload" 
                      className="inline-block cursor-pointer text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Change File
                    </label>
                  </div>
                ) : (
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <div className="space-y-3">
                      {getFileIcon()}
                      <div>
                        <p className="text-lg font-semibold text-gray-700 mb-1">
                          {dragActive ? 'Drop your file here' : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF, JPG, PNG up to 10MB
                        </p>
                      </div>
                      <div className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                        Browse Files
                      </div>
                    </div>
                  </label>
                )}
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900 text-sm mb-1">AI Analysis</p>
                    <p className="text-xs text-blue-700">
                      Your report will be analyzed by AI to extract key insights and health metrics
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-yellow-900 text-sm mb-1">Disclaimer</p>
                    <p className="text-xs text-yellow-700">
                      AI analysis is for understanding only, not for medical advice
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Uploading & Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span>Upload & Analyze</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
                className="px-8 py-4 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Supported formats:</span> PDF for reports, JPG/PNG for images
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Your data is encrypted and stored securely
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadReport;