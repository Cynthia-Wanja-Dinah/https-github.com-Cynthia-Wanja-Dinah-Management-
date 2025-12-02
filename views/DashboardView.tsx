import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { Users, DollarSign, BookOpen, UserCheck, TrendingUp } from 'lucide-react';
import { DashboardStats } from '../types';

const dataAttendance = [
  { name: 'Mon', present: 92 },
  { name: 'Tue', present: 88 },
  { name: 'Wed', present: 95 },
  { name: 'Thu', present: 85 },
  { name: 'Fri', present: 90 },
];

const dataPerformance = [
  { name: 'Grade 9', math: 78, science: 82, english: 75 },
  { name: 'Grade 10', math: 85, science: 88, english: 80 },
  { name: 'Grade 11', math: 72, science: 76, english: 85 },
  { name: 'Grade 12', math: 89, science: 92, english: 88 },
];

const dataFees = [
  { name: 'Paid', value: 75000 },
  { name: 'Pending', value: 25000 },
];

const COLORS = ['#4f46e5', '#e11d48'];

const StatCard = ({ title, value, icon: Icon, color, subtext }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
        <TrendingUp size={12} /> {subtext}
      </p>
    </div>
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
  </div>
);

const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value="1,245" icon={Users} color="bg-blue-500" subtext="+12% from last term" />
        <StatCard title="Total Revenue" value="$450k" icon={DollarSign} color="bg-green-500" subtext="+5% from last month" />
        <StatCard title="Avg Attendance" value="92%" icon={UserCheck} color="bg-indigo-500" subtext="stable" />
        <StatCard title="Library Books" value="8,432" icon={BookOpen} color="bg-orange-500" subtext="24 new arrivals" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataAttendance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="present" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fees Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fee Collection Status</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataFees}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataFees.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-xl font-bold text-gray-900">$100k</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-3 h-3 rounded-full bg-indigo-600"></div> Paid
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-3 h-3 rounded-full bg-rose-600"></div> Pending
            </div>
          </div>
        </div>
      </div>

      {/* Academic Performance */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance by Grade</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataPerformance}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="math" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Math" />
              <Bar dataKey="science" fill="#10b981" radius={[4, 4, 0, 0]} name="Science" />
              <Bar dataKey="english" fill="#f59e0b" radius={[4, 4, 0, 0]} name="English" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
