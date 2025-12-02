import { Student, Teacher, LibraryBook, ExamResult, Notice, UserRole } from './types';

export const MOCK_STUDENTS: Student[] = [
  { id: 'S001', name: 'Alice Johnson', grade: '10', section: 'A', rollNumber: '101', guardianName: 'Robert Johnson', guardianContact: '555-0101', attendance: 92, feesStatus: 'Paid' },
  { id: 'S002', name: 'Bob Smith', grade: '10', section: 'A', rollNumber: '102', guardianName: 'Sarah Smith', guardianContact: '555-0102', attendance: 85, feesStatus: 'Pending' },
  { id: 'S003', name: 'Charlie Brown', grade: '10', section: 'B', rollNumber: '103', guardianName: 'James Brown', guardianContact: '555-0103', attendance: 78, feesStatus: 'Overdue' },
  { id: 'S004', name: 'Diana Prince', grade: '11', section: 'A', rollNumber: '201', guardianName: 'Queen Hippolyta', guardianContact: '555-0104', attendance: 98, feesStatus: 'Paid' },
  { id: 'S005', name: 'Evan Wright', grade: '9', section: 'C', rollNumber: '305', guardianName: 'Gary Wright', guardianContact: '555-0105', attendance: 88, feesStatus: 'Pending' },
];

export const MOCK_TEACHERS: Teacher[] = [
  { id: 'T001', name: 'Mr. John Keating', subject: 'English', email: 'j.keating@edusphere.com', phone: '555-1111', assignedClasses: ['10-A', '11-B'] },
  { id: 'T002', name: 'Ms. Katherine Johnson', subject: 'Mathematics', email: 'k.johnson@edusphere.com', phone: '555-1112', assignedClasses: ['10-A', '9-C', '12-A'] },
  { id: 'T003', name: 'Dr. Emmett Brown', subject: 'Physics', email: 'e.brown@edusphere.com', phone: '555-1113', assignedClasses: ['11-A', '12-B'] },
];

export const MOCK_BOOKS: LibraryBook[] = [
  { id: 'B001', title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', status: 'Available' },
  { id: 'B002', title: '1984', author: 'George Orwell', isbn: '9780451524935', status: 'Issued', borrower: 'Alice Johnson', dueDate: '2023-11-15' },
  { id: 'B003', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', status: 'Available' },
  { id: 'B004', title: 'Calculus Early Transcendentals', author: 'James Stewart', isbn: '9781285741550', status: 'Available' },
];

export const MOCK_RESULTS: ExamResult[] = [
  { id: 'R001', studentId: 'S001', studentName: 'Alice Johnson', subject: 'Mathematics', marks: 95, totalMarks: 100, grade: 'A+', examDate: '2023-10-10' },
  { id: 'R002', studentId: 'S001', studentName: 'Alice Johnson', subject: 'Physics', marks: 88, totalMarks: 100, grade: 'A', examDate: '2023-10-12' },
  { id: 'R003', studentId: 'S002', studentName: 'Bob Smith', subject: 'Mathematics', marks: 72, totalMarks: 100, grade: 'B', examDate: '2023-10-10' },
  { id: 'R004', studentId: 'S003', studentName: 'Charlie Brown', subject: 'Mathematics', marks: 45, totalMarks: 100, grade: 'C', examDate: '2023-10-10' },
];

export const MOCK_NOTICES: Notice[] = [
  { id: 'N001', title: 'Annual Sports Day', content: 'The Annual Sports Day will be held on December 15th. All students must register by Friday.', date: '2023-11-01', audience: [UserRole.STUDENT, UserRole.PARENT, UserRole.TEACHER] },
  { id: 'N002', title: 'Parent-Teacher Meeting', content: 'PTM for Grade 10 is scheduled for next Saturday, 10 AM to 2 PM.', date: '2023-11-05', audience: [UserRole.PARENT] },
];
