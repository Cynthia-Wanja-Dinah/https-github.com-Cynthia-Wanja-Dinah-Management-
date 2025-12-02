import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  LogOut, 
  Menu,
  X,
  School
} from 'lucide-react';
import { User, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
  user: User | null;
  onLogout: () => void;
}

const NavItem = ({ 
  id, 
  label, 
  icon: Icon, 
  isActive, 
  onClick 
}: { 
  id: string; 
  label: string; 
  icon: any; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    <Icon size={20} />
    {label}
  </button>
);

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Close sidebar on route change (mobile)
  const handleNavClick = (view: string) => {
    setActiveView(view);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center gap-2 px-6 h-16 border-b border-gray-200">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <School className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold text-gray-900">EduSphere</span>
        </div>

        <div className="flex flex-col h-[calc(100%-4rem)] justify-between py-4">
          <nav className="space-y-1">
            <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} isActive={activeView === 'dashboard'} onClick={() => handleNavClick('dashboard')} />
            <NavItem id="students" label="Students" icon={Users} isActive={activeView === 'students'} onClick={() => handleNavClick('students')} />
            <NavItem id="teachers" label="Teachers" icon={GraduationCap} isActive={activeView === 'teachers'} onClick={() => handleNavClick('teachers')} />
            <NavItem id="finance" label="Fees & Finance" icon={DollarSign} isActive={activeView === 'finance'} onClick={() => handleNavClick('finance')} />
            <NavItem id="attendance" label="Attendance" icon={Calendar} isActive={activeView === 'attendance'} onClick={() => handleNavClick('attendance')} />
            <NavItem id="library" label="Library" icon={BookOpen} isActive={activeView === 'library'} onClick={() => handleNavClick('library')} />
            <NavItem id="communication" label="Communication" icon={MessageSquare} isActive={activeView === 'communication'} onClick={() => handleNavClick('communication')} />
          </nav>

          <div className="px-4">
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                <p className="text-xs text-slate-500 uppercase font-bold mb-2">Logged in as</p>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                        {user?.name.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.role}</p>
                    </div>
                </div>
             </div>
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full w-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <button 
            className="p-2 -ml-2 text-gray-600 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <h1 className="text-lg lg:text-xl font-semibold text-gray-800 capitalize">
            {activeView.replace('-', ' ')}
          </h1>

          <div className="flex items-center gap-4">
            {/* Can add search or notifications here */}
          </div>
        </header>

        {/* Scrollable View Area */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
