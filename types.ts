export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  rollNumber: string;
  guardianName: string;
  guardianContact: string;
  attendance: number; // Percentage
  feesStatus: 'Paid' | 'Pending' | 'Overdue';
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
  assignedClasses: string[];
}

export interface ExamResult {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  marks: number;
  totalMarks: number;
  grade: string;
  examDate: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  status: 'Available' | 'Issued' | 'Lost';
  dueDate?: string;
  borrower?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  audience: UserRole[];
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  attendanceRate: number;
  revenueCollected: number;
}
