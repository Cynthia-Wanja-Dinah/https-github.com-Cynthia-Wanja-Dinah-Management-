import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Filter, Sparkles, X } from 'lucide-react';
import { Student } from '../types';
import { MOCK_STUDENTS } from '../constants';
import { analyzeStudentPerformance } from '../services/geminiService';

const StudentsView: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [search, setSearch] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<{id: string, text: string} | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Form State (Simplified for demo)
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.rollNumber.includes(search)
  );

  const handleAiAnalysis = async (student: Student) => {
    setLoadingAi(true);
    setAiAnalysis(null);
    const summary = `Grade: ${student.grade}, Attendance: ${student.attendance}%, Fees: ${student.feesStatus}. Known for good conduct but needs improvement in History.`;
    const result = await analyzeStudentPerformance(student.name, summary);
    setAiAnalysis({ id: student.id, text: result });
    setLoadingAi(false);
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if(!newStudentName) return;
    const newStudent: Student = {
        id: `S${Math.floor(Math.random() * 1000)}`,
        name: newStudentName,
        grade: '10',
        section: 'A',
        rollNumber: `${Math.floor(Math.random() * 1000)}`,
        guardianName: 'Unknown',
        guardianContact: 'N/A',
        attendance: 0,
        feesStatus: 'Pending'
    };
    setStudents([...students, newStudent]);
    setNewStudentName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or roll number..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
            <Filter size={18} />
            Filter
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Student
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Student Info</th>
                <th className="px-6 py-4 font-semibold">Grade/Sec</th>
                <th className="px-6 py-4 font-semibold">Guardian</th>
                <th className="px-6 py-4 font-semibold">Attendance</th>
                <th className="px-6 py-4 font-semibold">Fees Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-500">Roll: {student.rollNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.grade} - {student.section}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{student.guardianName}</p>
                    <p className="text-xs text-gray-500">{student.guardianContact}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${student.attendance >= 90 ? 'bg-green-500' : student.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${student.feesStatus === 'Paid' ? 'bg-green-100 text-green-800' : 
                        student.feesStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {student.feesStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => handleAiAnalysis(student)}
                         className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded" title="AI Insight">
                         <Sparkles size={16} />
                       </button>
                       <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                         <MoreHorizontal size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Analysis Modal Overlay */}
      {(loadingAi || aiAnalysis) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
           <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative">
              <button 
                onClick={() => { setAiAnalysis(null); setLoadingAi(false); }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <Sparkles size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">AI Performance Insight</h3>
              </div>

              {loadingAi ? (
                <div className="py-8 text-center text-gray-500 animate-pulse">
                   Analyzing student data with Gemini...
                </div>
              ) : (
                <div className="prose prose-sm">
                   <p className="text-gray-700 leading-relaxed italic">"{aiAnalysis?.text}"</p>
                </div>
              )}
           </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-lg p-6">
                <h2 className="text-xl font-bold mb-4">Add New Student</h2>
                <form onSubmit={handleAddStudent} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input 
                            type="text" 
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            value={newStudentName}
                            onChange={(e) => setNewStudentName(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button 
                            type="button" 
                            onClick={() => setShowAddModal(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Add Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default StudentsView;
