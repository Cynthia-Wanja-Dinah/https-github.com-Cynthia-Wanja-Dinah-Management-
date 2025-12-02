import React from 'react';
import { Mail, Phone, BookOpen, MoreVertical } from 'lucide-react';
import { MOCK_TEACHERS } from '../constants';

const TeachersView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {MOCK_TEACHERS.map((teacher) => (
        <div key={teacher.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                {teacher.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700">
                  {teacher.subject}
                </span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreVertical size={20} />
            </button>
          </div>

          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Mail size={16} className="text-gray-400" />
              {teacher.email}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Phone size={16} className="text-gray-400" />
              {teacher.phone}
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <BookOpen size={16} className="text-gray-400 mt-0.5" />
              <div>
                <p className="mb-1">Assigned Classes:</p>
                <div className="flex flex-wrap gap-2">
                  {teacher.assignedClasses.map(cls => (
                    <span key={cls} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700 font-medium">
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
             <button className="flex-1 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
               View Schedule
             </button>
             <button className="flex-1 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
               Message
             </button>
          </div>
        </div>
      ))}
      
      {/* Add Teacher Card */}
      <button className="flex flex-col items-center justify-center h-full min-h-[250px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-100 hover:border-indigo-400 transition-all group">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
            <span className="text-2xl text-gray-400 group-hover:text-indigo-500">+</span>
        </div>
        <span className="font-medium text-gray-500 group-hover:text-gray-700">Add New Teacher</span>
      </button>
    </div>
  );
};

export default TeachersView;
