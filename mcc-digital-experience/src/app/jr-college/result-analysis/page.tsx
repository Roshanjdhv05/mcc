'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Trophy, Users, TrendingUp, Award, ChevronDown,
  Star, BookOpen, BarChart2,
} from 'lucide-react';

/* ─── Animated count-up hook ──────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) { setValue(0); return; }
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, active, duration]);
  return value;
}

import JrCollegeNav from '@/components/layout/JrCollegeNav';

/* ─── Year Data ───────────────────────────────────────────── */
const yearData = [
  {
    year: '2024',
    academicYear: '2023 – 24',
    totalStudents: 637,
    passed: 632,
    failed: 5,
    passPercentage: 99.21,
    classes: [
      { name: 'Distinction', count: 358, percentage: 56.30 },
      { name: 'First Class', count: 177, percentage: 27.78 },
      { name: 'Second Class', count: 80, percentage: 12.55 },
      { name: 'Pass Class', count: 17, percentage: 2.66 },
    ],
    rankHolders: [
      { rank: 1, seatNo: 'M343449', name: 'CHAPHEKAR ANOUSHKA MAHESH', marks: 578, percentage: 96.33 },
      { rank: 1, seatNo: 'M344151', name: 'DHANKI ANANNYA MANAB', marks: 578, percentage: 96.33 },
      { rank: 1, seatNo: 'M344326', name: 'FARIYA KRISHNA HARESH', marks: 578, percentage: 96.33 },
      { rank: 1, seatNo: 'M345321', name: 'KHARE NACHIKET JITENDRA', marks: 578, percentage: 96.33 },
      { rank: 2, seatNo: 'M345808', name: 'POPAT DISHA MAHESH', marks: 569, percentage: 94.83 },
      { rank: 3, seatNo: 'M344187', name: 'GOSAVI PRATHAM VISHAL', marks: 566, percentage: 94.33 },
      { rank: 3, seatNo: 'M344478', name: 'IYER SUDARSHAN ANANTHARAMAN', marks: 566, percentage: 94.33 },
      { rank: 4, seatNo: 'M345550', name: 'LOLAGE AARYA GIRISH', marks: 564, percentage: 94.00 },
      { rank: 5, seatNo: 'M344338', name: 'DEVALIA JITARTH AMIT', marks: 563, percentage: 93.83 },
      { rank: 6, seatNo: 'M344217', name: 'DESHMUKH DEVESH SHAILESH', marks: 562, percentage: 93.67 },
      { rank: 6, seatNo: 'M344533', name: 'HARWANDE SHREYA VINAYAK', marks: 562, percentage: 93.67 },
      { rank: 7, seatNo: 'M344264', name: 'DUBEY SUDHANSHU PRADEEP', marks: 560, percentage: 93.33 },
      { rank: 7, seatNo: 'M346825', name: 'SOHONI SOUMIL MOHIT', marks: 560, percentage: 93.33 },
      { rank: 8, seatNo: 'M344487', name: 'DATE ATHARV NINAD', marks: 559, percentage: 93.17 },
      { rank: 8, seatNo: 'M345752', name: 'NIRHALI YASH DHANANJAY', marks: 559, percentage: 93.17 },
      { rank: 8, seatNo: 'M346403', name: 'SAWANT VIDULA VIJAY', marks: 559, percentage: 93.17 },
      { rank: 8, seatNo: 'M347153', name: 'TATE SHREYA ANANDRAO', marks: 559, percentage: 93.17 },
      { rank: 9, seatNo: 'M344470', name: 'JADHAV SHREYA BHASKAR', marks: 558, percentage: 93.00 },
      { rank: 10, seatNo: 'M344012', name: 'COUTINHO UVANA JOSEPH', marks: 557, percentage: 92.83 },
      { rank: 10, seatNo: 'M344303', name: 'GRACIAS RIA OSCAR', marks: 557, percentage: 92.83 },
      { rank: 10, seatNo: 'M345211', name: 'MASURKAR ATHARVA VILAS', marks: 557, percentage: 92.83 },
      { rank: 10, seatNo: 'M346700', name: 'SHUKLA ADITYA RAHUL', marks: 557, percentage: 92.83 },
      { rank: 10, seatNo: 'M346728', name: 'SHELKE SAMIKSHA MAHADEV', marks: 557, percentage: 92.83 },
    ],
    subjectToppers: [
      { subject: 'English', rollNo: 'M344151', name: 'DHANKI ANANNYA MANAB', marks: 92 },
      { subject: 'English', rollNo: 'M344326', name: 'FARIYA KRISHNA HARESH', marks: 92 },
      { subject: 'English', rollNo: 'M344299', name: 'GOGRI MAHI AMIT', marks: 92 },
      { subject: 'Marathi', rollNo: 'M344325', name: 'GOSAVI VAISHANAVI DHANAJI', marks: 92 },
      { subject: 'Hindi', rollNo: 'M346082', name: 'RODRIGUES JOLIVIA THOMAS', marks: 96 },
      { subject: 'Sanskrit', rollNo: 'M344326', name: 'FARIYA KRISHNA HARESH', marks: 100 },
      { subject: 'Sanskrit', rollNo: 'M344217', name: 'DESHMUKH DEVESH SHAILESH', marks: 100 },
      { subject: 'French', rollNo: 'M344151', name: 'DHANKI ANANNYA MANAB', marks: 100 },
      { subject: 'German', rollNo: 'M345321', name: 'KHARE NACHIKET JITENDRA', marks: 100 },
      { subject: 'German', rollNo: 'M345808', name: 'POPAT DISHA MAHESH', marks: 100 },
      { subject: 'German', rollNo: 'M344187', name: 'GOSAVI PRATHAM VISHAL', marks: 100 },
      { subject: 'German', rollNo: 'M346700', name: 'SHUKLA ADITYA RAHUL', marks: 100 },
      { subject: 'German', rollNo: 'M343947', name: 'SHREYAS SESHADRI', marks: 100 },
      { subject: 'German', rollNo: 'M346745', name: 'SHENDE APOORVA ANIRUDDHA', marks: 100 },
      { subject: 'German', rollNo: 'M346242', name: 'RANE SAMIKSHA MAHESH', marks: 100 },
      { subject: 'O.C.', rollNo: 'M344151', name: 'DHANKI ANANNYA MANAB', marks: 97 },
      { subject: 'O.C.', rollNo: 'M344264', name: 'DUBEY SUDHANSHU PRADEEP', marks: 97 },
      { subject: 'O.C.', rollNo: 'M344595', name: 'JADHAV SRUSHTI SHRIKANT', marks: 97 },
      { subject: 'S.P.', rollNo: 'M346022', name: 'PAL SRISHTI BHAIYALAL', marks: 92 },
      { subject: 'Maths', rollNo: 'M343449', name: 'CHAPHEKAR ANOUSHKA MAHESH', marks: 100 },
      { subject: 'Maths', rollNo: 'M344326', name: 'FARIYA KRISHNA HARESH', marks: 100 },
      { subject: 'Maths', rollNo: 'M345550', name: 'LOLAGE AARYA GIRISH', marks: 100 },
      { subject: 'Maths', rollNo: 'M344217', name: 'DESHMUKH DEVESH SHAILESH', marks: 100 },
      { subject: 'Maths', rollNo: 'M344012', name: 'COUTINHO UVANA JOSEPH', marks: 100 },
      { subject: 'Maths', rollNo: 'M343947', name: 'SHREYAS SESHADRI', marks: 100 },
      { subject: 'Maths', rollNo: 'M345272', name: 'NADAR SOMESHWARAN KUMARESAN', marks: 100 },
      { subject: 'B.K.', rollNo: 'M344151', name: 'DHANKI ANANNYA MANAB', marks: 99 },
      { subject: 'B.K.', rollNo: 'M344326', name: 'FARIYA KRISHNA HARESH', marks: 99 },
      { subject: 'B.K.', rollNo: 'M345321', name: 'KHARE NACHIKET JITENDRA', marks: 99 },
      { subject: 'B.K.', rollNo: 'M345550', name: 'LOLAGE AARYA GIRISH', marks: 99 },
      { subject: 'B.K.', rollNo: 'M346825', name: 'SOHONI SOUMIL MOHIT', marks: 99 },
      { subject: 'B.K.', rollNo: 'M347153', name: 'TATE SHREYA ANANDRAO', marks: 99 },
      { subject: 'B.K.', rollNo: 'M344012', name: 'COUTINHO UVANA JOSEPH', marks: 99 },
      { subject: 'B.K.', rollNo: 'M344303', name: 'GRACIAS RIA OSCAR', marks: 99 },
      { subject: 'B.K.', rollNo: 'M343947', name: 'SHREYAS SESHADRI', marks: 99 },
      { subject: 'B.K.', rollNo: 'M344299', name: 'GOGRI MAHI AMIT', marks: 99 },
      { subject: 'B.K.', rollNo: 'M345797', name: 'PATEL SHREYA NARESHBHAI', marks: 99 },
      { subject: 'B.K.', rollNo: 'M344325', name: 'GOSAVI VAISHANAVI DHANAJI', marks: 99 },
      { subject: 'B.K.', rollNo: 'M344966', name: 'JAGTAP AARTI LALASAHEB', marks: 99 },
      { subject: 'B.K.', rollNo: 'M345384', name: 'KHAN MAARIYA MAQSOOD', marks: 99 },
      { subject: 'B.K.', rollNo: 'M343506', name: 'AIYA VRAJ VIPUL', marks: 99 },
      { subject: 'B.K.', rollNo: 'M345264', name: 'KHARWAR NEHA RAMESH PRASAD', marks: 99 },
      { subject: 'B.K.', rollNo: 'M343991', name: 'AGARWAL GUHN VISHAL', marks: 99 },
      { subject: 'B.K.', rollNo: 'M345009', name: 'JAIN MANASVI VASANT', marks: 99 },
      { subject: 'B.K.', rollNo: 'M347066', name: 'VARADKAR NEEL PRASAD', marks: 99 },
      { subject: 'Eco.', rollNo: 'M345612', name: 'KHOT AADITYA KIRAN', marks: 97 },
    ],
  },
  {
    year: '2025',
    academicYear: '2024 – 25',
    totalStudents: 636,
    passed: 636,
    failed: 0,
    passPercentage: 100,
    classes: [
      { name: 'Distinction', count: 435, percentage: 68.40 },
      { name: 'First Class', count: 172, percentage: 27.04 },
      { name: 'Second Class', count: 29, percentage: 4.56 },
      { name: 'Pass Class', count: 0, percentage: 0 },
    ],
    rankHolders: [
      { rank: 1, seatNo: 'M331528', name: 'DALVI AARYA RAJESH', marks: 578, percentage: 96.33 },
      { rank: 2, seatNo: 'M331266', name: 'DADAN FATIMA IMRAN', marks: 573, percentage: 95.50 },
      { rank: 3, seatNo: 'M332583', name: 'MAHADIK SAKSHI UDAY', marks: 572, percentage: 95.33 },
      { rank: 3, seatNo: 'M334308', name: 'SUVARNA TRISHA KUTTY', marks: 572, percentage: 95.33 },
      { rank: 3, seatNo: 'M334412', name: 'VICHARE SARTHAK ANIL', marks: 572, percentage: 95.33 },
      { rank: 4, seatNo: 'M332293', name: 'JAIN BHAVIT SANDIPU', marks: 570, percentage: 95.00 },
      { rank: 4, seatNo: 'M332308', name: 'JAKHOTIA KANISHKA SHASHIKANT', marks: 570, percentage: 95.00 },
      { rank: 5, seatNo: 'M331996', name: 'GHOSH ANUSHKA RATIKANTO', marks: 569, percentage: 94.83 },
      { rank: 6, seatNo: 'M331311', name: 'DESHMUKH JANHAVI RAHUL', marks: 568, percentage: 94.67 },
      { rank: 7, seatNo: 'M331252', name: 'BHANUSHALI PRISHA SHANKAR', marks: 567, percentage: 94.50 },
      { rank: 7, seatNo: 'M332008', name: 'GURAV SANSKRUTI HEMANT', marks: 567, percentage: 94.50 },
      { rank: 7, seatNo: 'M332228', name: 'JAGTAP RIDDHI DEEPAK', marks: 567, percentage: 94.50 },
      { rank: 7, seatNo: 'M333655', name: 'SADAFULE SHREYA GHANSHYAM', marks: 567, percentage: 94.50 },
      { rank: 8, seatNo: 'M332687', name: 'NAIK ANIKET ABHAY', marks: 566, percentage: 94.33 },
      { rank: 8, seatNo: 'M334418', name: 'WAGH JUI DEEPAK', marks: 566, percentage: 94.33 },
      { rank: 9, seatNo: 'M331541', name: 'DABIR AARZOO MASOOD', marks: 565, percentage: 94.17 },
      { rank: 9, seatNo: 'M334108', name: 'SONI DISHA CHANDU', marks: 565, percentage: 94.17 },
      { rank: 10, seatNo: 'M332440', name: 'KATIRA PUSHPENDRA HITEN', marks: 564, percentage: 94.00 },
      { rank: 10, seatNo: 'M332454', name: 'K R SRISHTI RAJESH', marks: 564, percentage: 94.00 },
    ],
    subjectToppers: [
      { subject: 'English', rollNo: 'M334108', name: 'SONI DISHA CHANDU', marks: 94 },
      { subject: 'English', rollNo: 'M333491', name: 'RAHATE NIDHI SUSHIL', marks: 94 },
      { subject: 'Marathi', rollNo: 'M333366', name: 'PAWAR SHRUTI SHANTARAM', marks: 91 },
      { subject: 'Marathi', rollNo: 'M334505', name: 'WAVDHANE ABHAY PRADEEP', marks: 91 },
      { subject: 'Marathi', rollNo: 'M333029', name: 'KRUPAL RIYA HANUMANT', marks: 91 },
      { subject: 'Hindi', rollNo: 'M334541', name: 'YADAV SUBI AMARNATH', marks: 96 },
      { subject: 'Sanskrit', rollNo: 'M332228', name: 'JAGTAP RIDDHI DEEPAK', marks: 100 },
      { subject: 'Sanskrit', rollNo: 'M333725', name: 'SANDU GARGI SHRIKRISHNA', marks: 100 },
      { subject: 'French', rollNo: 'M332608', name: 'MANSHARAMANI SAILEEY SUNIL', marks: 100 },
      { subject: 'French', rollNo: 'M333309', name: 'PALVE SUPRIYA ADINATH', marks: 100 },
      { subject: 'German', rollNo: 'M333655', name: 'SADAFULE SHREYA GHANSHYAM', marks: 100 },
      { subject: 'German', rollNo: 'M332687', name: 'NAIK ANIKET ABHAY', marks: 100 },
      { subject: 'German', rollNo: 'M332749', name: 'MALI KETKI SHATRUGHNA', marks: 100 },
      { subject: 'O.C.', rollNo: 'M331528', name: 'DALVI AARYA RAJESH', marks: 98 },
      { subject: 'O.C.', rollNo: 'M332440', name: 'KATIRA PUSHPENDRA HITEN', marks: 98 },
      { subject: 'S.P.', rollNo: 'M333729', name: 'SAWANT ABHILASHA SANJAY', marks: 97 },
      { subject: 'S.P.', rollNo: 'M334487', name: 'VEDAK YUKTA RAJESH', marks: 97 },
      { subject: 'S.P.', rollNo: 'M332634', name: 'NAIR PRANAV RAKESH', marks: 97 },
      { subject: 'S.P.', rollNo: 'M332976', name: 'KHOT MANASVI SHUBHENDU', marks: 97 },
      { subject: 'S.P.', rollNo: 'M332841', name: 'MURUDKAR MAYANK RAJESH', marks: 97 },
      { subject: 'Maths', rollNo: 'M334412', name: 'VICHARE SARTHAK ANIL', marks: 100 },
      { subject: 'B.K.', rollNo: 'M331528', name: 'DALVI AARYA RAJESH', marks: 100 },
      { subject: 'B.K.', rollNo: 'M331414', name: 'BOMBLE SHRAVANI RAJU', marks: 100 },
      { subject: 'Eco.', rollNo: 'M331528', name: 'DALVI AARYA RAJESH', marks: 97 },
      { subject: 'Eco.', rollNo: 'M331266', name: 'DADAN FATIMA IMRAN', marks: 97 },
      { subject: 'Eco.', rollNo: 'M334412', name: 'VICHARE SARTHAK ANIL', marks: 97 },
      { subject: 'Eco.', rollNo: 'M332293', name: 'JAIN BHAVIT SANDIPU', marks: 97 },
      { subject: 'Eco.', rollNo: 'M334418', name: 'WAGH JUI DEEPAK', marks: 97 },
      { subject: 'Eco.', rollNo: 'M332608', name: 'MANSHARAMANI SAILEEY SUNIL', marks: 97 },
      { subject: 'Eco.', rollNo: 'M331185', name: 'BANGERA GEETIKA ASHWIN', marks: 97 },
      { subject: 'Eco.', rollNo: 'M333880', name: 'SHINGRE HEMAKSHI PRASHANT', marks: 97 },
    ],
  },
  {
    year: '2026',
    academicYear: '2025 – 26',
    totalStudents: 623,
    passed: 622,
    failed: 1,
    passPercentage: 99.83,
    classes: [
      { name: 'Distinction', count: 381, percentage: 61.16 },
      { name: 'First Class', count: 199, percentage: 31.94 },
      { name: 'Second Class', count: 39, percentage: 6.25 },
      { name: 'Pass Class', count: 3, percentage: 0.48 },
    ],
    rankHolders: [
      { rank: 1, seatNo: 'M346021', name: 'NIDHI YOGESH THAKKAR', marks: 580, percentage: 96.67 },
      { rank: 2, seatNo: 'M342559', name: 'ASHWATHY GANESH', marks: 576, percentage: 96.00 },
      { rank: 3, seatNo: 'M344373', name: 'KIRTANA NARASIMHA NAIK', marks: 573, percentage: 95.50 },
      { rank: 4, seatNo: 'M346169', name: 'VIRENBHAI SHAILESHBHAI VADAWANA', marks: 570, percentage: 95.00 },
      { rank: 5, seatNo: 'M344414', name: 'GAUTAMI MANOJ MAYEKAR', marks: 568, percentage: 94.67 },
      { rank: 5, seatNo: 'M345423', name: 'SHRIYA SHRINIVAS PRABHU', marks: 568, percentage: 94.67 },
      { rank: 5, seatNo: 'M345861', name: 'JASWANT KESAR SINGH', marks: 568, percentage: 94.67 },
      { rank: 6, seatNo: 'M343705', name: 'SAVRI SANDEEP GUPTA', marks: 563, percentage: 93.83 },
      { rank: 6, seatNo: 'M345028', name: 'SAMRUDDHI BHUSHAN PATHAK', marks: 563, percentage: 93.83 },
      { rank: 7, seatNo: 'M342957', name: 'KSHITIJ ASHISH ANERAO', marks: 562, percentage: 93.67 },
      { rank: 7, seatNo: 'M343612', name: 'LAKSH SAMIR DHUVAD', marks: 562, percentage: 93.67 },
      { rank: 8, seatNo: 'M343685', name: 'NEERAJ GHANASHYAM DIXIT', marks: 561, percentage: 93.50 },
      { rank: 8, seatNo: 'M345868', name: 'RIYA RAJESH SHIRKE', marks: 561, percentage: 93.50 },
      { rank: 9, seatNo: 'M343840', name: 'SHRUSTI SANTOSH DHURI', marks: 560, percentage: 93.33 },
      { rank: 9, seatNo: 'M345998', name: 'NIDHI NIRANJAN SINHA', marks: 560, percentage: 93.33 },
      { rank: 10, seatNo: 'M344995', name: 'TITHI MANOJKUMAR PANCHAL', marks: 558, percentage: 93.00 },
      { rank: 10, seatNo: 'M345390', name: 'VANSH PAWAN KUMAR PIPARA', marks: 558, percentage: 93.00 },
    ],
    subjectToppers: [
      { subject: 'English', rollNo: 'M345028', name: 'SAMRUDDHI BHUSHAN PATHAK', marks: 94 },
      { subject: 'Marathi', rollNo: 'M346134', name: 'ABHISHEK KASHIRAM TELI', marks: 94 },
      { subject: 'Marathi', rollNo: 'M343781', name: 'ISHWARI PRADEEP GANJALE', marks: 94 },
      { subject: 'Hindi', rollNo: 'M343840', name: 'SHRUSTI SANTOSH DHURI', marks: 97 },
      { subject: 'Sanskrit', rollNo: 'M345028', name: 'SAMRUDDHI BHUSHAN PATHAK', marks: 100 },
      { subject: 'Sanskrit', rollNo: 'M342847', name: 'AKSHAYA ASOKAN', marks: 100 },
      { subject: 'Sanskrit', rollNo: 'M342599', name: 'VAIBHAVI DIPAK CHAUDHARI', marks: 100 },
      { subject: 'French', rollNo: 'M343424', name: 'HARSHITA ASHISH GONDKAR', marks: 99 },
      { subject: 'French', rollNo: 'M343371', name: 'PALAK RAHUL DUBEY', marks: 99 },
      { subject: 'German', rollNo: 'M346021', name: 'NIDHI YOGESH THAKKAR', marks: 100 },
      { subject: 'German', rollNo: 'M342559', name: 'ASHWATHY GANESH', marks: 100 },
      { subject: 'German', rollNo: 'M343705', name: 'SAVRI SANDEEP GUPTA', marks: 100 },
      { subject: 'German', rollNo: 'M343685', name: 'NEERAJ GHANASHYAM DIXIT', marks: 100 },
      { subject: 'German', rollNo: 'M343558', name: 'JAINIL JAYESH GALA', marks: 100 },
      { subject: 'German', rollNo: 'M343049', name: 'HELI MAYUR DEDHIA', marks: 100 },
      { subject: 'German', rollNo: 'M345987', name: 'ISHAAN SIDDHARTH SINKAR', marks: 100 },
      { subject: 'German', rollNo: 'M345970', name: 'MUGDHA SHRIKANT TAWDE', marks: 100 },
      { subject: 'O.C.', rollNo: 'M344737', name: 'SAMIKSHA SANDEEP LAD', marks: 98 },
      { subject: 'S.P.', rollNo: 'M344514', name: 'SOHINI SATISH NAZARE', marks: 97 },
      { subject: 'S.P.', rollNo: 'M344395', name: 'SWARALI RAHUL NAKHWA', marks: 97 },
      { subject: 'S.P.', rollNo: 'M344817', name: 'SHREYA SUNIL MORE', marks: 97 },
      { subject: 'Maths', rollNo: 'M343685', name: 'NEERAJ GHANASHYAM DIXIT', marks: 100 },
      { subject: 'B.K.', rollNo: 'M344414', name: 'GAUTAMI MANOJ MAYEKAR', marks: 99 },
      { subject: 'B.K.', rollNo: 'M345423', name: 'SHRIYA SHRINIVAS PRABHU', marks: 99 },
      { subject: 'B.K.', rollNo: 'M343705', name: 'SAVRI SANDEEP GUPTA', marks: 99 },
      { subject: 'B.K.', rollNo: 'M342957', name: 'KSHITIJ ASHISH ANERAO', marks: 99 },
      { subject: 'B.K.', rollNo: 'M343612', name: 'LAKSH SAMIR DHUVAD', marks: 99 },
      { subject: 'B.K.', rollNo: 'M343840', name: 'SHRUSTI SANTOSH DHURI', marks: 99 },
      { subject: 'B.K.', rollNo: 'M345998', name: 'NIDHI NIRANJAN SINHA', marks: 99 },
      { subject: 'B.K.', rollNo: 'M346288', name: 'TANVI VILAS ZAD', marks: 99 },
      { subject: 'B.K.', rollNo: 'M345540', name: 'TANMAY SIDDHESH SAMANT', marks: 99 },
      { subject: 'B.K.', rollNo: 'M344819', name: 'RIYA VISHAL MHATRE', marks: 99 },
      { subject: 'B.K.', rollNo: 'M344984', name: 'CHINMAYEE UDAY PARKAR', marks: 99 },
      { subject: 'B.K.', rollNo: 'M343869', name: 'ARYA ANIL GANDHI', marks: 99 },
      { subject: 'B.K.', rollNo: 'M345630', name: 'NATASHA PRAKASH SINGH', marks: 99 },
      { subject: 'B.K.', rollNo: 'M344600', name: 'HIMANI NARENDRA KOTKAR', marks: 99 },
      { subject: 'B.K.', rollNo: 'M345121', name: 'PARTH NAGESH PATIL', marks: 99 },
      { subject: 'B.K.', rollNo: 'M343454', name: 'HRITHIK BRIJESH', marks: 99 },
      { subject: 'B.K.', rollNo: 'M343311', name: 'SHREYA PRAKASH BANE', marks: 99 },
      { subject: 'Eco.', rollNo: 'M346021', name: 'NIDHI YOGESH THAKKAR', marks: 97 },
      { subject: 'Eco.', rollNo: 'M342559', name: 'ASHWATHY GANESH', marks: 97 },
      { subject: 'Eco.', rollNo: 'M346169', name: 'VIRENBHAI SHAILESHBHAI VADAWANA', marks: 97 },
      { subject: 'Eco.', rollNo: 'M345861', name: 'JASWANT KESAR SINGH', marks: 97 },
      { subject: 'Eco.', rollNo: 'M342957', name: 'KSHITIJ ASHISH ANERAO', marks: 97 },
      { subject: 'Eco.', rollNo: 'M343424', name: 'HARSHITA ASHISH GONDKAR', marks: 97 },
      { subject: 'Eco.', rollNo: 'M343371', name: 'PALAK RAHUL DUBEY', marks: 97 },
      { subject: 'Eco.', rollNo: 'M344002', name: 'TANAY NIKHIL JOSHI', marks: 97 },
      { subject: 'Eco.', rollNo: 'M346288', name: 'TANVI VILAS ZAD', marks: 97 },
      { subject: 'Eco.', rollNo: 'M344695', name: 'PARI YOGESH MARADE', marks: 97 },
      { subject: 'Eco.', rollNo: 'M345215', name: 'KAVYA SAKHARAM POL', marks: 97 },
      { subject: 'Eco.', rollNo: 'M346068', name: 'SAMRUDDHI SUNIL TAWADE', marks: 97 },
      { subject: 'Eco.', rollNo: 'M344025', name: 'VIDHI HITEN KATIRA', marks: 97 },
      { subject: 'Eco.', rollNo: 'M345687', name: 'SHREYA MAHADEV SHELAKE', marks: 97 },
      { subject: 'Eco.', rollNo: 'M344277', name: 'KAMYA RAJESH JOSHI', marks: 97 },
      { subject: 'Eco.', rollNo: 'M344249', name: 'TANISHKA RAJESH KAKARIYA', marks: 97 },
      { subject: 'Eco.', rollNo: 'M346113', name: 'DEVARSH MANDAR SULE', marks: 97 },
      { subject: 'Eco.', rollNo: 'M343236', name: 'RASIKH MOHAMMED JAVED ANSARI', marks: 97 },
      { subject: 'Eco.', rollNo: 'M344876', name: 'VIRAJ YOGESH PATIL', marks: 97 },
      { subject: 'Eco.', rollNo: 'M343692', name: 'PRANITHA RAVINDRA GAMBHIR', marks: 97 },
      { subject: 'Eco.', rollNo: 'M343454', name: 'HRITHIK BRIJESH', marks: 97 },
      { subject: 'Eco.', rollNo: 'M345446', name: 'AASHI MANOJ PODDAR', marks: 97 },
      { subject: 'Eco.', rollNo: 'M343217', name: 'ESHIKA RAJESH AGARWAL', marks: 97 },
      { subject: 'Eco.', rollNo: 'M344210', name: 'SANIKA SANDEEP KERLEKAR', marks: 97 },
      { subject: 'Eco.', rollNo: 'M343680', name: 'VARAD JAYASHREE GADADE', marks: 97 },
      { subject: 'Eco.', rollNo: 'M344226', name: 'KSHAMA SATISH KADAMBA', marks: 97 },
      { subject: 'Eco.', rollNo: 'M346045', name: 'PRIYANSHU BRIJESH TIWARI', marks: 97 },
      { subject: 'Eco.', rollNo: 'M346290', name: 'NEHA RAJNATH YADAV', marks: 97 },
      { subject: 'Eco.', rollNo: 'M346198', name: 'SUHANI SANTOSH VEDRE', marks: 97 },
      { subject: 'Eco.', rollNo: 'M346266', name: 'SOHAM RAVINDRA WALAVALKAR', marks: 97 },
      { subject: 'Eco.', rollNo: 'M342949', name: 'ASHFA PARVEEN AKHTAR ALI ANSARI', marks: 97 },
      { subject: 'Eco.', rollNo: 'M346361', name: 'AKSHAR SACHIN ZINGADE', marks: 97 },
    ],
  },
];

/* ─── Colour helpers ──────────────────────────────────────── */
const CLASS_META: Record<string, { bg: string; text: string; bar: string; donut: string; hex: string }> = {
  Distinction:   { bg: 'bg-amber-50',   text: 'text-amber-700',   bar: 'bg-amber-500',   donut: 'stroke-amber-500',   hex: '#f59e0b' },
  'First Class': { bg: 'bg-emerald-50', text: 'text-emerald-700', bar: 'bg-emerald-500', donut: 'stroke-emerald-500', hex: '#10b981' },
  'Second Class':{ bg: 'bg-blue-50',    text: 'text-blue-700',    bar: 'bg-blue-500',    donut: 'stroke-blue-500',    hex: '#3b82f6' },
  'Pass Class':  { bg: 'bg-purple-50',  text: 'text-purple-700',  bar: 'bg-purple-500',  donut: 'stroke-purple-500',  hex: '#a855f7' },
};

/* ─── Donut chart (SVG) ───────────────────────────────────── */
function DonutChart({ classes, animate }: {
  classes: { name: string; count: number; percentage: number }[];
  animate: boolean;
}) {
  const R = 80;
  const C = 2 * Math.PI * R;
  const [offsets, setOffsets] = useState<number[]>(classes.map(() => C));

  useEffect(() => {
    if (!animate) { setOffsets(classes.map(() => C)); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cum = 0;
    classes.forEach((cls, i) => {
      const delay = i * 160;
      timers.push(setTimeout(() => {
        setOffsets(prev => {
          const next = [...prev];
          next[i] = C * (1 - cls.percentage / 100);
          return next;
        });
      }, delay));
      cum += cls.percentage;
    });
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, classes.map(c => c.percentage).join(',')]);

  // build segments
  let rotation = -90;
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[220px] drop-shadow-lg">
      {/* Track */}
      <circle cx="100" cy="100" r={R} fill="none" stroke="#f1f5f9" strokeWidth="28" />
      {classes.map((cls, i) => {
        const m = CLASS_META[cls.name];
        const seg = (cls.percentage / 100) * C;
        const rot = rotation;
        rotation += (cls.percentage / 100) * 360;
        return (
          <circle
            key={cls.name}
            cx="100" cy="100" r={R}
            fill="none"
            stroke={m?.hex ?? '#94a3b8'}
            strokeWidth="28"
            strokeDasharray={`${seg} ${C - seg}`}
            strokeDashoffset={offsets[i]}
            strokeLinecap="butt"
            transform={`rotate(${rot} 100 100)`}
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)' }}
          />
        );
      })}
      {/* Centre label */}
      <text x="100" y="94" textAnchor="middle" className="font-black" style={{ fontSize: 22, fontWeight: 900, fill: '#123B6D' }}>
        {classes.reduce((s, c) => s + c.count, 0)}
      </text>
      <text x="100" y="114" textAnchor="middle" style={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}>PASSED</text>
    </svg>
  );
}

/* ─── Animated bar chart ──────────────────────────────────── */
function BarChart({ classes, animate }: {
  classes: { name: string; count: number; percentage: number }[];
  animate: boolean;
}) {
  const max = Math.max(...classes.map(c => c.percentage));
  return (
    <div className="flex items-end justify-around gap-3 h-48 w-full px-2">
      {classes.map((cls, i) => {
        const m = CLASS_META[cls.name];
        const barH = animate ? `${(cls.percentage / max) * 100}%` : '0%';
        return (
          <div key={cls.name} className="flex flex-col items-center gap-2 flex-1">
            {/* percentage badge */}
            <span
              className="text-xs font-bold"
              style={{
                color: m?.hex ?? '#64748b',
                opacity: animate ? 1 : 0,
                transition: `opacity 0.4s ease ${i * 160 + 600}ms`,
              }}
            >
              {cls.percentage}%
            </span>
            {/* bar column */}
            <div className="w-full rounded-t-xl flex-1 flex items-end">
              <div
                className="w-full rounded-t-xl"
                style={{
                  height: barH,
                  background: m?.hex ?? '#94a3b8',
                  transition: `height 0.9s cubic-bezier(0.34,1.56,0.64,1) ${i * 160}ms`,
                  minHeight: cls.percentage > 0 ? 4 : 0,
                  boxShadow: `0 -4px 12px ${m?.hex ?? '#94a3b8'}55`,
                }}
              />
            </div>
            {/* count chip */}
            <span
              className="text-[10px] font-black rounded-full px-2 py-0.5"
              style={{
                background: `${m?.hex ?? '#94a3b8'}22`,
                color: m?.hex ?? '#64748b',
                opacity: animate ? 1 : 0,
                transition: `opacity 0.4s ease ${i * 160 + 400}ms`,
              }}
            >
              {cls.count}
            </span>
            {/* label */}
            <span className="text-[9px] lg:text-[10px] font-bold text-gray-500 text-center leading-tight">
              {cls.name.replace(' Class', '').replace('Distinction', 'Dist.')}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Full graphic class-wise section ────────────────────── */
function ClasswiseChart({ classes, passed, passPercentage }: {
  classes: { name: string; count: number; percentage: number }[];
  passed: number;
  passPercentage: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(timer);
  }, [classes]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col gap-6">
      {/* ── Top: donut + bar side-by-side ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Donut */}
        <div className="bg-gradient-to-br from-[#f8faff] to-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center gap-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Distribution</h3>
          <DonutChart classes={classes} animate={animate} />
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {classes.map(cls => {
              const m = CLASS_META[cls.name];
              return (
                <div key={cls.name} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: m?.hex }} />
                  <span className="text-[10px] font-semibold text-gray-600">{cls.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bar chart */}
        <div className="bg-gradient-to-br from-[#f8faff] to-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Students per Class</h3>
          <BarChart classes={classes} animate={animate} />
        </div>
      </div>

      {/* ── Bottom: horizontal animated progress rows ── */}
      <div className="bg-gradient-to-br from-[#f8faff] to-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Percentage Breakdown</h3>
        {classes.map((cls, i) => {
          const m = CLASS_META[cls.name];
          return (
            <div key={cls.name} className="flex items-center gap-4">
              <span className="w-24 shrink-0 text-xs font-bold" style={{ color: m?.hex }}>{cls.name}</span>
              <div className="flex-1 h-4 rounded-full overflow-hidden bg-gray-100">
                <div
                  className="h-4 rounded-full flex items-center justify-end pr-2"
                  style={{
                    width: animate ? `${cls.percentage}%` : '0%',
                    background: `linear-gradient(90deg, ${m?.hex}cc, ${m?.hex})`,
                    transition: `width 1s cubic-bezier(0.4,0,0.2,1) ${i * 150}ms`,
                    minWidth: animate && cls.percentage > 0 ? 8 : 0,
                    boxShadow: `0 0 8px ${m?.hex}66`,
                  }}
                />
              </div>
              <span className="w-14 text-right text-xs font-black shrink-0" style={{ color: m?.hex }}>
                {cls.percentage}%
              </span>
              <span className="w-8 text-right text-xs font-semibold text-gray-500 shrink-0">{cls.count}</span>
            </div>
          );
        })}
      </div>

      {/* ── Total passed summary ── */}
      <div className="bg-gradient-to-r from-[#123B6D] to-[#1e5fa8] text-white rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Award size={20} />
          </div>
          <span className="font-bold text-sm tracking-wide">Total Students Passed</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-black text-3xl">{passed}</span>
          <span className="text-white/70 font-semibold text-base">/ {passPercentage}%</span>
        </div>
      </div>
    </div>
  );
}

const rankMedal = (rank: number) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return null;
};

function groupSubjectToppers(toppers: { subject: string; rollNo: string; name: string; marks: number }[]) {
  const map: Record<string, { rollNo: string; name: string; marks: number }[]> = {};
  toppers.forEach((t) => {
    if (!map[t.subject]) map[t.subject] = [];
    map[t.subject].push({ rollNo: t.rollNo, name: t.name, marks: t.marks });
  });
  return map;
}

function AccordionSection({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
      <button
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setOpen((p) => !p)}
      >
        <span className="flex items-center gap-3 text-[#123B6D] font-bold text-base lg:text-lg">
          {icon}
          {title}
        </span>
        <ChevronDown
          size={20}
          className={`text-[#123B6D] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="bg-white border-t border-gray-100 px-6 pb-6 pt-4">{children}</div>}
    </div>
  );
}

export default function ResultAnalysisPage() {
  const [selectedYear, setSelectedYear] = useState('2026');

  const data = yearData.find((d) => d.year === selectedYear)!;
  const subjectGroups = groupSubjectToppers(data.subjectToppers);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16 font-sans">
      <JrCollegeNav />

      {/* Hero */}
      <div className="relative py-12 flex flex-col items-center text-center overflow-hidden bg-gradient-to-b from-white to-[#f8f9fa]">
        <div className="absolute left-8 lg:left-16 top-12 grid grid-cols-3 gap-2 opacity-40">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#014d4e]/40" />)}
        </div>
        <div className="absolute right-8 lg:right-16 top-12 grid grid-cols-3 gap-2 opacity-40">
          {[...Array(15)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#014d4e]/40" />)}
        </div>
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4A017] to-amber-500 flex items-center justify-center mb-4 shadow-lg">
          <Trophy size={32} className="text-white" />
        </div>
        <p className="text-[#008e59] font-bold tracking-[0.2em] text-sm uppercase mb-2">Mulund College of Commerce</p>
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-[#123B6D] tracking-tight mb-3">
          H.S.C. Result Analysis
        </h1>
        <p className="text-gray-500 text-sm lg:text-base max-w-xl px-4">
          Year-wise performance summary, rank holders &amp; subject toppers
        </p>
      </div>

      {/* Year Tabs */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 mb-8">
        <div className="flex gap-3 justify-center flex-wrap">
          {yearData.map((d) => (
            <button
              key={d.year}
              onClick={() => setSelectedYear(d.year)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 border-2 ${
                selectedYear === d.year
                  ? 'bg-[#123B6D] text-white border-[#123B6D] shadow-md scale-105'
                  : 'bg-white text-[#123B6D] border-[#123B6D]/30 hover:border-[#123B6D]/70 hover:shadow-sm'
              }`}
            >
              {d.academicYear}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">

        {/* Overview stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Students', value: data.totalStudents, icon: <Users size={22} />, color: 'from-[#123B6D] to-[#1e5fa8]' },
            { label: 'Students Passed', value: data.passed, icon: <Award size={22} />, color: 'from-emerald-600 to-emerald-500' },
            { label: 'Students Failed', value: data.failed, icon: <BarChart2 size={22} />, color: data.failed === 0 ? 'from-slate-500 to-slate-400' : 'from-red-600 to-red-500' },
            { label: 'Pass Percentage', value: `${data.passPercentage}%`, icon: <TrendingUp size={22} />, color: 'from-[#D4A017] to-amber-500' },
          ].map((card, i) => (
            <div key={i} className={`bg-gradient-to-br ${card.color} rounded-2xl p-5 text-white shadow-md flex flex-col gap-3`}>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">{card.icon}</div>
              <div>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">{card.label}</p>
                <p className="text-2xl lg:text-3xl font-black mt-0.5">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Class-wise breakdown — animated graphic */}
        <AccordionSection title="Class-wise Performance" icon={<BarChart2 size={20} />} defaultOpen={true}>
          <ClasswiseChart
            classes={data.classes}
            passed={data.passed}
            passPercentage={data.passPercentage}
          />
        </AccordionSection>

        {/* Rank Holders */}
        <AccordionSection title="List of Rank Holders" icon={<Trophy size={20} />} defaultOpen={true}>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#123B6D] text-white">
                  <th className="px-4 py-3 text-left font-bold rounded-tl-xl">Rank</th>
                  <th className="px-4 py-3 text-left font-bold">Seat No.</th>
                  <th className="px-4 py-3 text-left font-bold">Name</th>
                  <th className="px-4 py-3 text-center font-bold">Marks</th>
                  <th className="px-4 py-3 text-center font-bold rounded-tr-xl">%</th>
                </tr>
              </thead>
              <tbody>
                {data.rankHolders.map((r, i) => {
                  const medal = rankMedal(r.rank);
                  const isFirst = r.rank === 1;
                  return (
                    <tr
                      key={i}
                      className={`border-b border-gray-50 transition-colors ${
                        isFirst ? 'bg-amber-50 hover:bg-amber-100' : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-4 py-3 font-black text-[#123B6D] text-base">
                        {medal ? <span>{medal}</span> : <span className="text-gray-600">{r.rank}</span>}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{r.seatNo}</td>
                      <td className={`px-4 py-3 font-semibold ${isFirst ? 'text-amber-800' : 'text-gray-800'}`}>
                        {r.name}
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-[#123B6D]">{r.marks}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold ${
                          isFirst ? 'bg-amber-200 text-amber-800' : 'bg-[#123B6D]/10 text-[#123B6D]'
                        }`}>
                          {r.percentage}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </AccordionSection>

        {/* Subject Toppers */}
        <AccordionSection title="Subject Toppers" icon={<Star size={20} />} defaultOpen={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Object.entries(subjectGroups).map(([subject, toppers]) => (
              <div key={subject} className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                <div className="bg-[#014d4e] text-white px-4 py-2.5 flex items-center gap-2">
                  <BookOpen size={14} />
                  <span className="font-bold text-sm tracking-wide">{subject}</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {toppers.map((t, i) => (
                    <div key={i} className="px-4 py-3 flex justify-between items-center">
                      <div>
                        <p className="text-xs font-mono text-gray-400 mb-0.5">{t.rollNo}</p>
                        <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                      </div>
                      <span className={`ml-3 shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-base ${
                        t.marks === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-[#123B6D]/10 text-[#123B6D]'
                      }`}>
                        {t.marks}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AccordionSection>

      </div>
    </div>
  );
}
