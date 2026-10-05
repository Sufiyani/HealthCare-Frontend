import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Share2, FileImage, AlertCircle, CheckCircle, Send, MessageSquare, X, Loader, ArrowLeft, RefreshCw } from 'lucide-react';
import Navbar from '../components/Navbar';
import api from '../config/api';
import { toast } from 'react-toastify';

const ViewReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('english');
  
  // AI Chat state
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchReport();
    fetchConversation();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-refresh analysis status every 5 seconds if incomplete
  useEffect(() => {
    if (!loading && report && !isAnalysisComplete()) {
      console.log('🔄 Starting auto-refresh for analysis...');
      
      const interval = setInterval(() => {
        console.log('⏰ Auto-checking analysis status...');
        fetchReport(true); // Silent refresh
      }, 5000);

      return () => {
        console.log('⏹️ Stopping auto-refresh');
        clearInterval(interval);
      };
    }
  }, [report, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ✅ IMPROVED: Better analysis completion check
  const isAnalysisComplete = () => {
    if (!report?.aiAnalysis) return false;
    
    const summary = report.aiAnalysis.summaryEnglish;
    
    // Check if summary exists and is valid
    const isValid = 
      summary && 
      summary.trim().length > 20 &&
      summary !== 'undefined...' &&
      !summary.includes('in progress') &&
      !summary.includes('Analysis in progress');
    
    // Also check if there's an error flag
    const hasError = report.aiAnalysis.error === true;
    
    return isValid && !hasError;
  };

  // ✅ Check if analysis failed
  const isAnalysisFailed = () => {
    if (!report?.aiAnalysis) return false;
    
    const summary = report.aiAnalysis.summaryEnglish;
    return (
      report.aiAnalysis.error === true ||
      (summary && (
        summary.includes('failed') ||
        summary.includes('error') ||
        summary.includes('try again')
      ))
    );
  };

  const fetchReport = async (silent = false) => {
    try {
      if (!silent) {
        console.log('🔍 Fetching report:', id);
      }
      
      const response = await api.get(`/reports/${id}`);
      const reportData = response.data.data?.report || response.data.report;
      
      if (!reportData) {
        throw new Error('Report not found in response');
      }
      
      setReport(reportData);
      
      if (!silent) {
        console.log('✅ Report loaded');
      }
      
      // Log analysis status
      if (reportData.aiAnalysis) {
        console.log('📊 Analysis status:', {
          summaryLength: reportData.aiAnalysis.summaryEnglish?.length,
          severity: reportData.aiAnalysis.severity,
          hasError: reportData.aiAnalysis.error,
          isComplete: reportData.aiAnalysis.summaryEnglish?.length > 20
        });
      }
    } catch (error) {
      console.error('❌ Failed to load report:', error);
      if (!silent) {
        toast.error(error.response?.data?.message || 'Failed to load report');
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Manual refresh button
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchReport();
    setRefreshing(false);
    toast.success('Report refreshed');
  };

  const fetchConversation = async () => {
    try {
      const response = await api.get(`/assistant/conversation/${id}`);
      if (response.data.data?.conversation || response.data.conversation) {
        const conv = response.data.data?.conversation || response.data.conversation;
        setMessages(conv.messages || []);
      }
    } catch (error) {
      console.log('No existing conversation');
    }
  };

  const handleSendQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim() || sendingMessage || !isAnalysisComplete()) return;

    const userMessage = question.trim();
    setQuestion('');
    setSendingMessage(true);

    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const response = await api.post('/assistant/ask', {
        reportId: id,
        question: userMessage
      });

      const answer = response.data.data?.answer || response.data.answer;
      const aiMessage = {
        role: 'assistant',
        content: answer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('❌ Chat error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to get AI response';
      toast.error(errorMessage);
      
      // Remove user message on error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setSendingMessage(false);
    }
  };

  const handleClearChat = async () => {
    if (window.confirm('Clear conversation history?')) {
      try {
        await api.delete(`/assistant/conversation/${id}`);
        setMessages([]);
        toast.success('Conversation cleared');
      } catch (error) {
        toast.error('Failed to clear conversation');
      }
    }
  };

  const handleDownload = () => {
    if (report?.fileUrl) {
      const link = document.createElement('a');
      link.href = report.fileUrl;
      link.target = '_blank';
      link.download = report.name;
      link.click();
      toast.success('Opening report...');
    } else {
      toast.error('File URL not available');
    }
  };

  const suggestedQuestions = [
    "What does this report mean?",
    "Yeh results normal hain?",
    "Should I be worried?",
    "What foods should I eat?",
    "Kya mujhe doctor se milna chahiye?"
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading report...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Report not found</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const aiAnalysis = report?.aiAnalysis;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Report Preview */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{report.name}</h2>
                <p className="text-sm text-gray-500">
                  {report.type} • {new Date(report.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
                  title="Refresh Analysis"
                >
                  <RefreshCw className={`h-5 w-5 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
                <button 
                  onClick={handleDownload}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Download Report"
                >
                  <Download className="h-5 w-5 text-gray-600" />
                </button>
                <button 
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Share Report"
                  onClick={() => toast.info('Share feature coming soon!')}
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="border-2 border-gray-200 rounded-lg p-8 bg-gray-50 min-h-96">
              {report.fileUrl ? (
                <iframe
                  src={report.fileUrl}
                  className="w-full h-96 rounded"
                  title="Report Preview"
                />
              ) : (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <FileImage className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">File Preview</p>
                    <p className="text-sm text-gray-500 mt-2">{report.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* AI Chat Button */}
            <button
              onClick={() => setShowChat(!showChat)}
              disabled={!isAnalysisComplete()}
              className="mt-4 w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MessageSquare className="h-5 w-5" />
              <span>
                {!isAnalysisComplete() 
                  ? isAnalysisFailed()
                    ? 'Analysis Failed - Please Re-upload'
                    : 'AI Analysis in Progress...'
                  : showChat 
                    ? 'Hide Chat' 
                    : 'Ask AI About This Report'
                }
              </span>
            </button>
          </div>

          {/* AI Analysis OR Chat */}
          <div className="space-y-6">
            {!showChat ? (
              // AI Analysis Section
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">AI Analysis</h2>
                  {aiAnalysis && isAnalysisComplete() && (
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setLanguage('english')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                          language === 'english' ? 'bg-white shadow-sm' : 'text-gray-600'
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => setLanguage('urdu')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                          language === 'urdu' ? 'bg-white shadow-sm' : 'text-gray-600'
                        }`}
                      >
                        Roman Urdu
                      </button>
                    </div>
                  )}
                </div>

                {/* ✅ Analysis Failed State */}
                {isAnalysisFailed() ? (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
                      <div>
                        <p className="font-semibold text-red-800">AI Analysis Failed</p>
                        <p className="text-sm text-red-700 mt-1">
                          {aiAnalysis.summaryEnglish || 'The AI was unable to analyze this report. Please try uploading it again with a clear, readable file.'}
                        </p>
                        <button
                          onClick={() => navigate('/upload')}
                          className="mt-3 text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                          Upload New Report
                        </button>
                      </div>
                    </div>
                  </div>
                ) : !isAnalysisComplete() ? (
                  // ✅ Analysis In Progress State
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <div className="flex items-center">
                      <Loader className="h-5 w-5 text-yellow-600 animate-spin mr-3" />
                      <div>
                        <p className="font-semibold text-yellow-800">AI Analysis in Progress</p>
                        <p className="text-sm text-yellow-700">
                          Please wait while we analyze your report. This usually takes 10-30 seconds.
                          The page will auto-refresh.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // ✅ Analysis Complete - Show Results
                  <>
                    {/* Summary */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
                      <h3 className="font-semibold text-blue-900 mb-2">Summary</h3>
                      <p className="text-gray-800">
                        {language === 'english' ? aiAnalysis.summaryEnglish : aiAnalysis.summaryUrdu}
                      </p>
                    </div>

                    {/* Severity & Urgency */}
                    {(aiAnalysis.severity || aiAnalysis.urgency) && (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {aiAnalysis.severity && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">Severity</p>
                            <p className={`font-semibold ${
                              aiAnalysis.severity === 'high' ? 'text-red-600' :
                              aiAnalysis.severity === 'medium' ? 'text-orange-600' :
                              'text-green-600'
                            }`}>
                              {aiAnalysis.severity.toUpperCase()}
                            </p>
                          </div>
                        )}
                        {aiAnalysis.urgency && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">Urgency</p>
                            <p className={`font-semibold ${
                              aiAnalysis.urgency === 'urgent' ? 'text-red-600' :
                              aiAnalysis.urgency === 'soon' ? 'text-orange-600' :
                              'text-green-600'
                            }`}>
                              {aiAnalysis.urgency.toUpperCase()}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Key Findings */}
                    {aiAnalysis.keyFindings && aiAnalysis.keyFindings.length > 0 && (
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                          Key Findings
                        </h3>
                        <div className="space-y-2">
                          {aiAnalysis.keyFindings.map((finding, idx) => (
                            <div key={idx} className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                              <p className="text-sm text-blue-800">{finding}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    {aiAnalysis.suggestions && aiAnalysis.suggestions.length > 0 && (
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-800 mb-2">Suggestions</h3>
                        <div className="space-y-2">
                          {aiAnalysis.suggestions.map((suggestion, idx) => (
                            <div key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                              <span className="text-blue-600 font-medium">✓</span>
                              <span>{suggestion}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Disclaimer */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                      <p className="text-sm text-yellow-800">
                        <strong>⚠️ Always consult your doctor before making any decision.</strong>
                      </p>
                      <p className="text-sm text-yellow-800 mt-1">
                        ہمیشہ اپنے ڈاکٹر سے مشورہ کریں۔
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // AI Chat Section
              <div className="bg-white rounded-xl shadow-md p-6 h-[600px] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <MessageSquare className="h-6 w-6 mr-2 text-purple-600" />
                    AI Assistant
                  </h2>
                  <div className="flex space-x-2">
                    {messages.length > 0 && (
                      <button
                        onClick={handleClearChat}
                        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        Clear
                      </button>
                    )}
                    <button
                      onClick={() => setShowChat(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      <X className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Ask me anything about your report!</p>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500 font-medium">Suggested questions:</p>
                        {suggestedQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => setQuestion(q)}
                            className="block w-full text-left px-4 py-2 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.role === 'user'
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  {sendingMessage && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <Loader className="h-5 w-5 animate-spin text-gray-600" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSendQuestion} className="flex space-x-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask your question... (English or Roman Urdu)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={sendingMessage}
                  />
                  <button
                    type="submit"
                    disabled={!question.trim() || sendingMessage}
                    className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReport;