export type Notice = {
  id: string;
  category: 'Academic' | 'Examination' | 'Events' | 'Placement' | 'Scholarship' | 'Admin';
  title: string;
  description: string;
  date: string;
  isNew: boolean;
  urgent?: boolean;
};

export type TimetableEntry = {
  date: string;
  day: string;
  time: string;
  subject: string;
  venue: string;
};

export type SyllabusUnit = {
  unit: number;
  title: string;
  topics: string[];
};

export type StudyMaterial = {
  id: string;
  type: 'PDF' | 'PPT' | 'DOC' | 'Link';
  title: string;
  size?: string;
  subject: string;
};

export type Assignment = {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'Submitted';
};

// Define mock data for BCA and BCom as examples
export const mockData: Record<string, any> = {
  BCA: {
    notices: [
      { id: '1', category: 'Examination', title: 'Semester 5 Practical Exam Schedule', description: 'The practical exams will commence from 15th Nov.', date: '2 hours ago', isNew: true, urgent: true },
      { id: '2', category: 'Events', title: 'Tech Fest 2024 Registrations', description: 'Register your team for the upcoming coding competition.', date: '1 day ago', isNew: true },
      { id: '3', category: 'Placement', title: 'TCS Campus Drive', description: 'Pre-placement talk scheduled for Friday at 10 AM.', date: '3 days ago', isNew: false },
    ] as Notice[],
    timetable: [
      { date: '15 Nov', day: 'Monday', time: '10:00 AM - 12:30 PM', subject: 'Advanced Web Programming', venue: 'Lab 1' },
      { date: '17 Nov', day: 'Wednesday', time: '10:00 AM - 12:30 PM', subject: 'Mobile App Development', venue: 'Lab 2' },
      { date: '19 Nov', day: 'Friday', time: '10:00 AM - 12:30 PM', subject: 'Software Project Management', venue: 'Room 304' },
    ] as TimetableEntry[],
    syllabus: [
      { unit: 1, title: 'Introduction to React', topics: ['JSX', 'Components', 'Props', 'State'] },
      { unit: 2, title: 'Advanced React', topics: ['Hooks', 'Context API', 'Routing'] },
    ] as SyllabusUnit[],
    materials: [
      { id: 'm1', type: 'PPT', title: 'Chapter 1: React Basics', size: '2.4 MB', subject: 'Advanced Web Programming' },
      { id: 'm2', type: 'PDF', title: 'Important Questions Bank', size: '1.1 MB', subject: 'Software Project Management' },
    ] as StudyMaterial[],
    assignments: [
      { id: 'a1', subject: 'Advanced Web Programming', title: 'Build a Todo App using React', dueDate: '10 Nov 2024', status: 'Pending' },
      { id: 'a2', subject: 'Mobile App Development', title: 'UI Layouts in Flutter', dueDate: '05 Nov 2024', status: 'Submitted' },
    ] as Assignment[],
  },
  BCom: {
    notices: [
      { id: '1', category: 'Academic', title: 'Guest Lecture on Taxation', description: 'Compulsory attendance for final year students.', date: '4 hours ago', isNew: true },
      { id: '2', category: 'Examination', title: 'Accounts Internal Assessment', description: 'Internal assessment marks have been updated.', date: '2 days ago', isNew: false },
    ] as Notice[],
    timetable: [
      { date: '20 Nov', day: 'Monday', time: '09:00 AM - 11:00 AM', subject: 'Financial Accounting', venue: 'Hall 1' },
    ] as TimetableEntry[],
    syllabus: [
      { unit: 1, title: 'Basics of Taxation', topics: ['Direct Tax', 'Indirect Tax', 'GST'] },
    ] as SyllabusUnit[],
    materials: [
      { id: 'm1', type: 'PDF', title: 'GST Notes Part 1', size: '3.1 MB', subject: 'Taxation' },
    ] as StudyMaterial[],
    assignments: [
      { id: 'a1', subject: 'Financial Accounting', title: 'Balance Sheet Practice', dueDate: '12 Nov 2024', status: 'Pending' },
    ] as Assignment[],
  }
};

export function getMockDataForCourse(courseCode: string, moduleType: string) {
  // If the specific course isn't in our mock map, default to BCA data just for demonstration
  const courseData = mockData[courseCode] || mockData['BCA'];
  return courseData[moduleType] || [];
}
