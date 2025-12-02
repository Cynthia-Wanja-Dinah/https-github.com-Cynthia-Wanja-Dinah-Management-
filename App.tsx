import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import DashboardView from './views/DashboardView';
import StudentsView from './views/StudentsView';
import TeachersView from './views/TeachersView';
import { User, UserRole } from './types';
import { MOCK_NOTICES, MOCK_BOOKS } from './constants';
import { generateNotice, askAiAssistant } from './services/geminiService';
import { Send, Sparkles, Book, CheckCircle, AlertCircle, X } from 'lucide-react';

// Login Component
const Login = ({ onLogin }: { onLogin: (role: UserRole) => void }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  if (isRegistering) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-300">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500">Join EduSphere today</p>
          </div>
          <form 
            className="space-y-4" 
            onSubmit={(e) => { 
              e.preventDefault(); 
              // In a real app, this would call an API
              alert("Registration successful! Please login."); 
              setIsRegistering(false); 
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                placeholder="John Doe" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                required 
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                placeholder="name@example.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required 
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                placeholder="••••••••" 
              />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
               <select className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white">
                  <option value="STUDENT">Student</option>
                  <option value="TEACHER">Teacher</option>
                  <option value="PARENT">Parent</option>
               </select>
            </div>
            <button 
              type="submit" 
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-200"
            >
              Register
            </button>
          </form>
          <div className="mt-6 text-center pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => setIsRegistering(false)} 
                className="text-indigo-600 font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EduSphere</h1>
          <p className="text-gray-500">School Management System</p>
        </div>
        <div className="space-y-4">
          <button 
            onClick={() => onLogin(UserRole.ADMIN)}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
          >
            Login as Administrator
          </button>
          <button 
            onClick={() => onLogin(UserRole.TEACHER)}
            className="w-full py-3 px-4 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors hover:shadow-md"
          >
            Login as Teacher
          </button>
          <button 
            onClick={() => onLogin(UserRole.STUDENT)}
            className="w-full py-3 px-4 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors hover:shadow-md"
          >
            Login as Student
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Don't have an account?{' '}
            <button 
              onClick={() => setIsRegistering(true)} 
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register Now
            </button>
          </p>
          <p className="text-xs text-gray-400">Demo Mode • No Password Required</p>
        </div>
      </div>
    </div>
  );
};

// Placeholder Views for less complex modules
const CommunicationView = () => {
    const [topic, setTopic] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if(!topic) return;
        setLoading(true);
        const text = await generateNotice(topic, "Parents and Students");
        setGeneratedText(text);
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="text-indigo-600" size={20}/>
                    AI Notice Generator
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                        <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="e.g., School closure due to snow"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={handleGenerate}
                        disabled={loading}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-indigo-300 flex items-center gap-2"
                    >
                        {loading ? 'Generating...' : 'Generate Draft'}
                        <Send size={16} />
                    </button>
                    {generatedText && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Generated Draft</h3>
                            <p className="text-gray-800 whitespace-pre-wrap">{generatedText}</p>
                            <div className="mt-3 flex gap-2">
                                <button className="text-xs text-indigo-600 font-medium hover:underline">Copy to Clipboard</button>
                                <button className="text-xs text-indigo-600 font-medium hover:underline">Post to Board</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Recent Notices</h3>
                {MOCK_NOTICES.map(notice => (
                    <div key={notice.id} className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-800">{notice.title}</h4>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{notice.date}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{notice.content}</p>
                        <div className="mt-3 flex gap-2">
                            {notice.audience.map(role => (
                                <span key={role} className="text-[10px] uppercase font-bold text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded">
                                    {role}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LibraryView = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Book Details</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Author</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Due Date</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {MOCK_BOOKS.map(book => (
                    <tr key={book.id}>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-100 rounded text-amber-600">
                                    <Book size={20} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{book.title}</p>
                                    <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{book.author}</td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                book.status === 'Available' ? 'bg-green-100 text-green-800' : 
                                book.status === 'Issued' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {book.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                            {book.dueDate || '-'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const AttendanceView = () => (
    <div className="flex items-center justify-center h-64 text-gray-500 bg-white border border-dashed border-gray-300 rounded-xl">
        <div className="text-center">
            <CheckCircle className="mx-auto mb-2 text-gray-300" size={32} />
            <p>Attendance Module Placeholder</p>
            <p className="text-xs text-gray-400 mt-1">Select a class to mark attendance</p>
        </div>
    </div>
);

const FinanceView = () => (
    <div className="flex items-center justify-center h-64 text-gray-500 bg-white border border-dashed border-gray-300 rounded-xl">
        <div className="text-center">
            <AlertCircle className="mx-auto mb-2 text-gray-300" size={32} />
            <p>Finance Module Placeholder</p>
            <p className="text-xs text-gray-400 mt-1">Fee collection and invoices management</p>
        </div>
    </div>
);


// Global Chat Assistant
const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if(!query.trim()) return;
        const userMsg = query;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setQuery('');
        setLoading(true);
        
        const response = await askAiAssistant(userMsg, "User is browsing the dashboard");
        setMessages(prev => [...prev, { role: 'ai', text: response }]);
        setLoading(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-40">
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-indigo-600 rounded-full text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
                >
                    <Sparkles size={24} />
                </button>
            )}
            
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col border border-gray-200 max-h-[500px]">
                    <div className="p-4 bg-indigo-600 rounded-t-2xl flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <Sparkles size={18} />
                            <h3 className="font-semibold">AI Assistant</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)}><X size={18}/></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 h-80 bg-gray-50">
                        {messages.length === 0 && (
                            <p className="text-center text-xs text-gray-400 mt-4">Ask me about student performance, pending fees, or creating notices!</p>
                        )}
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                                    msg.role === 'user' 
                                    ? 'bg-indigo-600 text-white rounded-br-none' 
                                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none shadow-sm text-gray-400 text-xs animate-pulse">
                                    Thinking...
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-3 border-t border-gray-200 bg-white rounded-b-2xl">
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Type your query..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button 
                                onClick={handleSend}
                                className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50"
                                disabled={loading || !query.trim()}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState('dashboard');

  const handleLogin = (role: UserRole) => {
    // Mock Login
    const mockUser: User = {
      id: 'U001',
      name: role === UserRole.ADMIN ? 'Principal Skinner' : role === UserRole.TEACHER ? 'Mrs. Krabappel' : 'Bart Simpson',
      email: 'user@edusphere.com',
      role: role,
    };
    setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveView('dashboard');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'students': return <StudentsView />;
      case 'teachers': return <TeachersView />;
      case 'attendance': return <AttendanceView />;
      case 'finance': return <FinanceView />;
      case 'library': return <LibraryView />;
      case 'communication': return <CommunicationView />;
      default: return <DashboardView />;
    }
  };

  return (
    <Layout 
      activeView={activeView} 
      setActiveView={setActiveView} 
      user={user} 
      onLogout={handleLogout}
    >
      {renderView()}
      <ChatAssistant />
    </Layout>
  );
};

export default App;