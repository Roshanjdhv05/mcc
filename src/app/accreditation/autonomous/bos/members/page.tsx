'use client';

import React, { useState } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';

interface BOSMember {
  numMembers: string;
  nature: string;
  name: string;
}

interface BOSSection {
  id: string;
  label: string;
  subtitle?: string;
  members: BOSMember[];
}

const bosData: BOSSection[] = [
  {
    id: 'commerce',
    label: 'Commerce',
    members: [
      { numMembers: '1 MEMBER',  nature: 'Head of Department / Chairperson',                                              name: 'CA Dr. Anuradha Ganesh' },
      { numMembers: '3 MEMBERS', nature: 'Names of Faculty',                                                              name: 'Dr. Sulbha Dey' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Vaishali Patil' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Divya Iyer' },
      { numMembers: '2 MEMBERS', nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Dr. Khushpat S Jain' },
      { numMembers: '',          nature: '',                                                                               name: 'Mr. Raju Nathu Chauhan' },
      { numMembers: '1 MEMBER',  nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Prin. Dr. Vinita Pimpale' },
      { numMembers: '1 MEMBER',  nature: 'Representative of Industry / Corporate',                                        name: 'CA Dr. Vinay Gudi' },
      { numMembers: '1 MEMBER',  nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'Ms. Vibhuti M Kulkarni' },
    ],
  },
  {
    id: 'accountancy',
    label: 'Accountancy',
    members: [
      { numMembers: '1 MEMBER',  nature: 'Head of Department / Chairperson',                                              name: 'Nikhil Dilip Karkhanis' },
      { numMembers: '6 MEMBERS', nature: 'Names of Faculty',                                                              name: 'Ms. Riya Dhamapurkar' },
      { numMembers: '',          nature: '',                                                                               name: 'CA(Ms.) Snehal Chavan' },
      { numMembers: '',          nature: '',                                                                               name: 'Mr. Prathamesh Bobhat' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Shweta Ghare' },
      { numMembers: '',          nature: '',                                                                               name: 'Mr. Felix Anthonysami' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Divya Iyer' },
      { numMembers: '2 MEMBERS', nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Dr. Varadraj Bapat' },
      { numMembers: '',          nature: '',                                                                               name: 'CA Seema Shah' },
      { numMembers: '1 MEMBER',  nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Dr. Ashok Poojari' },
      { numMembers: '1 MEMBER',  nature: 'Representative of Industry / Corporate',                                        name: 'CA Govinda Goyal' },
      { numMembers: '1 MEMBER',  nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'CA Anil Naik' },
    ],
  },
  {
    id: 'economics',
    label: 'Economics',
    members: [
      { numMembers: '1 MEMBER',  nature: 'Head of Department / Chairperson',                                              name: 'Dr. Shivaji Pawar' },
      { numMembers: '7 MEMBERS', nature: 'Names of Faculty',                                                              name: 'Dr. Arjun Lakhe' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Gopika Pal' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Rajashree Deshpande' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Shilipi Jawake' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Soumya George' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Sipra Routaray' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Siddhi Kambli' },
      { numMembers: '2 MEMBERS', nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Dr. Anil Chougule' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Mansi Gore' },
      { numMembers: '1 MEMBER',  nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Prof. (Dr.) Sucheta Joshi' },
      { numMembers: '1 MEMBER',  nature: 'Representative of Industry / Corporate',                                        name: 'Mr. Chandrashekhar Tilak' },
      { numMembers: '1 MEMBER',  nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'Mr. Harsh M. Mandhane' },
    ],
  },
  {
    id: 'maths',
    label: 'Mathematics & Statistics',
    members: [
      { numMembers: '1 MEMBER',  nature: 'Head of Department / Chairperson',                                              name: 'Ms. Seema M Attarde' },
      { numMembers: '4 MEMBERS', nature: 'Names of Faculty',                                                              name: 'Ms. Komal Bhatt' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Neha Pal' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Chetna Panchal' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Priti Gupta' },
      { numMembers: '2 MEMBERS', nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Dr. Sunil Devendranath Singh' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Aarti Nayak' },
      { numMembers: '1 MEMBER',  nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Dr. Mangala Deshpande' },
      { numMembers: '1 MEMBER',  nature: 'Representative of Industry / Corporate',                                        name: 'Mr. Vinay Nair' },
      { numMembers: '1 MEMBER',  nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'Mr. Amit Deora' },
    ],
  },
  {
    id: 'evs',
    label: 'EVS',
    members: [
      { numMembers: '1 MEMBER',  nature: 'Head of Department / Chairperson',                                              name: 'Mr. Amit Subhash Yadav' },
      { numMembers: '2 MEMBERS', nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Dr. Rani Tyagi' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Ratankumar Hajare' },
      { numMembers: '1 MEMBER',  nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Dr. Swapnesh Rangekar' },
      { numMembers: '1 MEMBER',  nature: 'Representative of Industry / Corporate',                                        name: 'Mr. Akash Mhadgut' },
      { numMembers: '1 MEMBER',  nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'Mr. Sreevallaban Narayanan' },
    ],
  },
  {
    id: 'law',
    label: 'Law',
    members: [
      { numMembers: '1 MEMBER',  nature: 'Head of Department / Chairperson',                                              name: "Dr. Pramila D'Souza" },
      { numMembers: '3 MEMBERS', nature: 'Names of Faculty',                                                              name: 'Ms. Swapna Acharya' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Ashwini Mondkar' },
      { numMembers: '',          nature: '',                                                                               name: 'CA. Nitin Upadhe' },
      { numMembers: '2 MEMBERS', nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Dr. Anand. N. Raut' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Manjiri S Kulkarni' },
      { numMembers: '1 MEMBER',  nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Dr. Sachin Joshi' },
      { numMembers: '1 MEMBER',  nature: 'Representative of Industry / Corporate',                                        name: 'Adv. Manoj Kumar Upadhyay' },
      { numMembers: '1 MEMBER',  nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'Mr. Saish S Bhosale' },
    ],
  },
  {
    id: 'english',
    label: 'English',
    members: [
      { numMembers: '1 MEMBER',   nature: 'Head of Department / Chairperson',                                              name: 'Dr. Shayerie Ghosh' },
      { numMembers: '10 MEMBERS', nature: 'Names of Faculty',                                                              name: 'Mr. Jayanta Ghorpade' },
      { numMembers: '',           nature: '',                                                                               name: 'Mr. Nitin Lalsare' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Vinita R.' },
      { numMembers: '',           nature: '',                                                                               name: 'Dr. Hiren Dand' },
      { numMembers: '',           nature: '',                                                                               name: 'Dr. Reena Nagda' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Shilpa Thakur' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Siddhi Kambli' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Gauri Patil' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Sanika Ratnaparkhi' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Aparajitha' },
      { numMembers: '2 MEMBERS',  nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Prof. Dr. Savita Kishan Pawar' },
      { numMembers: '',           nature: '',                                                                               name: 'Dr. Sachin Bhumbe' },
      { numMembers: '1 MEMBER',   nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Prof. Praful Bhosale' },
      { numMembers: '1 MEMBER',   nature: 'Representative of Industry / Corporate',                                        name: 'Mr. Sunil Arjun Bhalerao' },
      { numMembers: '1 MEMBER',   nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'Mr. Shubham Kadam' },
    ],
  },
  {
    id: 'it-ds-ca',
    label: 'IT / DS / CA',
    subtitle: 'Composition for IT',
    members: [
      { numMembers: '1 MEMBER',  nature: 'Head of Department / Chairperson',                                              name: 'Dr. Hiren Dand' },
      { numMembers: '5 MEMBERS', nature: 'Names of Faculty',                                                              name: 'Dr. Jyotika D. Chheda' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Priti Pathak' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Vishal D. Borude' },
      { numMembers: '',          nature: '',                                                                               name: 'Mr. Siddhesh S. Gotekar' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Ujwala Sharma' },
      { numMembers: '2 MEMBERS', nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Dr. Marietia Assumption' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Sarika Chauhan' },
      { numMembers: '1 MEMBER',  nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Prof. Pournima Bhangale' },
      { numMembers: '1 MEMBER',  nature: 'Representative of Industry / Corporate',                                        name: 'Mr. Vishesh Prajapati' },
      { numMembers: '1 MEMBER',  nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'Mr. Rohit Dhilor' },
    ],
  },
  {
    id: 'ds',
    label: 'Data Science',
    subtitle: 'Composition for DS',
    members: [
      { numMembers: '1 MEMBER',  nature: 'Head of Department / Chairperson',                                              name: 'Dr. Hiren Dand' },
      { numMembers: '5 MEMBERS', nature: 'Names of Faculty',                                                              name: 'Dr. Jyotika D. Chheda' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Priti Pathak' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Vishal D. Borude' },
      { numMembers: '',          nature: '',                                                                               name: 'Mr. Siddhesh S. Gotekar' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Ujwala Sharma' },
      { numMembers: '2 MEMBERS', nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Dr. Hemalatha G. B.' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Rakhi Gupta' },
      { numMembers: '1 MEMBER',  nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Dr. Ujwala Sav' },
      { numMembers: '1 MEMBER',  nature: 'Representative of Industry / Corporate',                                        name: 'Dr. Rajendra Patil' },
      { numMembers: '1 MEMBER',  nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'Mr. Sanketh Iyer' },
    ],
  },
  {
    id: 'ca',
    label: 'Computer Applications',
    subtitle: 'Composition for CA',
    members: [
      { numMembers: '1 MEMBER',  nature: 'Head of Department / Chairperson',                                              name: 'Dr. Hiren Dand' },
      { numMembers: '5 MEMBERS', nature: 'Names of Faculty',                                                              name: 'Dr. Jyotika D. Chheda' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Priti Pathak' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Vishal D. Borude' },
      { numMembers: '',          nature: '',                                                                               name: 'Mr. Siddhesh S. Gotekar' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Ujwala Sharma' },
      { numMembers: '2 MEMBERS', nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Prof. Kamatchi Iyer' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Harshali Patil' },
      { numMembers: '1 MEMBER',  nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Dr. Yogeshwari Patil' },
      { numMembers: '1 MEMBER',  nature: 'Representative of Industry / Corporate',                                        name: 'Mrs. Samruddhi Kotibhaskar' },
      { numMembers: '1 MEMBER',  nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'Mr. Ajay Sharma' },
    ],
  },
  {
    id: 'cs',
    label: 'Computer Science',
    members: [
      { numMembers: '1 MEMBER',  nature: 'Head of Department / Chairperson',                                              name: 'Dr. Reena Nagda' },
      { numMembers: '5 MEMBERS', nature: 'Names of Faculty',                                                              name: 'Dr. Vaishnavi Assar' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Pooja Patil' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Bhumika Nakum' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Bhumika Pansare' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Pratiksha Harwalkar' },
      { numMembers: '2 MEMBERS', nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Dr. Sindhu Satheesh' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Sunita Yadav' },
      { numMembers: '1 MEMBER',  nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Prof. Vilas Mahajan' },
      { numMembers: '1 MEMBER',  nature: 'Representative of Industry / Corporate',                                        name: 'Mr. Chaitanya Kolhe' },
      { numMembers: '1 MEMBER',  nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'Mr. Makarand Mahadev Patil' },
    ],
  },
  {
    id: 'management',
    label: 'Management Studies',
    members: [
      { numMembers: '1 MEMBER',  nature: 'Head of Department / Chairperson',                                              name: 'Ms. Seema Ashar' },
      { numMembers: '7 MEMBERS', nature: 'Names of Faculty',                                                              name: 'Dr. Viji Kannan' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Kanchana Sattur' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Soumya George' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Abilasha N' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Shilpi Jawake' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Shilpa Kulkarni' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Shrusti Desai' },
      { numMembers: '2 MEMBERS', nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Dr. Jarna Kalra' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Ritika Pathak' },
      { numMembers: '1 MEMBER',  nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Prof. Yogesh Kolhatkar' },
      { numMembers: '1 MEMBER',  nature: 'Representative of Industry / Corporate',                                        name: 'Mr. Shailendra Dhamdhare' },
      { numMembers: '1 MEMBER',  nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'Mr. Ashish Jha' },
    ],
  },
  {
    id: 'mass-media',
    label: 'Mass Media / Bus. Admin.',
    members: [
      { numMembers: '1 MEMBER',  nature: 'Head of Department / Chairperson',                                              name: 'Dr. Viji Kannan' },
      { numMembers: '6 MEMBERS', nature: 'Names of Faculty',                                                              name: 'Ms. Shriya Shenoy' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Nimisha Gadkari' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Sanika Rataparki' },
      { numMembers: '',          nature: '',                                                                               name: 'Mr. Chaitanya Sant' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Shilpa K' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Gauri Patil' },
      { numMembers: '2 MEMBERS', nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Dr. Nimisha Kambli' },
      { numMembers: '',          nature: '',                                                                               name: 'Dr. Surya Gune' },
      { numMembers: '1 MEMBER',  nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Dr. Shyam Choitani' },
      { numMembers: '1 MEMBER',  nature: 'Representative of Industry / Corporate',                                        name: 'Ms. Apoorva Mulani' },
      { numMembers: '1 MEMBER',  nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'Mr. Bala C Iyer' },
    ],
  },
  {
    id: 'iks',
    label: 'IKS',
    members: [
      { numMembers: '1 MEMBER',  nature: 'Head of Department / Chairperson',                                              name: 'Dr. Minal Mapuskar' },
      { numMembers: '6 MEMBERS', nature: 'Names of Faculty',                                                              name: 'Dr. Shayerie Ghosh' },
      { numMembers: '',          nature: '',                                                                               name: 'Mr. Jayanta Ghorpade' },
      { numMembers: '',          nature: '',                                                                               name: 'Mr. Nitin Lalsare' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Gopika Pal' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Vineeta Radhakrishnan' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Jui Kadvekar' },
      { numMembers: '2 MEMBERS', nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Prof. Bhavana Vivek Patole' },
      { numMembers: '',          nature: '',                                                                               name: 'Prof. (Dr.) Madhumita Bandyopadhyay' },
      { numMembers: '1 MEMBER',  nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Prof. Shilpa N. Suryawanshi (Prof. Manasi Kedari)' },
      { numMembers: '1 MEMBER',  nature: 'Representative of Industry / Corporate',                                        name: 'Dr. Pankaj Gokul Patil' },
      { numMembers: '1 MEMBER',  nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'Advaita Varadraj Bapat' },
    ],
  },
  {
    id: 'af',
    label: 'Accounting & Finance',
    members: [
      { numMembers: '1 MEMBER',   nature: 'Head of Department / Chairperson',                                              name: 'Ms. Alpa Katira' },
      { numMembers: '10 MEMBERS', nature: 'Names of Faculty',                                                              name: 'Mrs. Shilpa Thakur' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Archana Kadam' },
      { numMembers: '',           nature: '',                                                                               name: 'Dr. Rajashri Deshpande' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Seema Attarde' },
      { numMembers: '',           nature: '',                                                                               name: 'CA Vinaya Marathe' },
      { numMembers: '',           nature: '',                                                                               name: 'Mr. Nitin Pawar' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Swapna Acharya' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Sneha Prajapati' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Siddhi Kambli' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Sipra Routaray' },
      { numMembers: '2 MEMBERS',  nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Mr. Manish Malkani' },
      { numMembers: '',           nature: '',                                                                               name: 'CA (Ms.) Soumya Nichani' },
      { numMembers: '1 MEMBER',   nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Dr. Priyanka Mohan' },
      { numMembers: '1 MEMBER',   nature: 'Representative of Industry / Corporate',                                        name: 'CA Ojas Shah' },
      { numMembers: '1 MEMBER',   nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'Mr. Jay Koli' },
    ],
  },
  {
    id: 'bi-bfsi',
    label: 'BI / BFSI / Finance',
    members: [
      { numMembers: '1 MEMBER',   nature: 'Head of Department / Chairperson',                                              name: 'Dr. Rajashri Deshpande' },
      { numMembers: '10 MEMBERS', nature: 'Names of Faculty',                                                              name: 'Mrs. Shilpa Thakur' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Archana Kadam' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Alpa Katira' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Seema Attarde' },
      { numMembers: '',           nature: '',                                                                               name: 'CA Vinaya Marathe' },
      { numMembers: '',           nature: '',                                                                               name: 'Mr. Nitin Pawar' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Swapna Acharya' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Sneha Prajapati' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Siddhi Kambli' },
      { numMembers: '',           nature: '',                                                                               name: 'Ms. Sipra Routaray' },
      { numMembers: '2 MEMBERS',  nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Dr. Navin Punjabi' },
      { numMembers: '',           nature: '',                                                                               name: 'Mr. Raju Nathu Chauhan' },
      { numMembers: '1 MEMBER',   nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Prof. Meenal Gandhi' },
      { numMembers: '1 MEMBER',   nature: 'Representative of Industry / Corporate',                                        name: 'Ms. Supriya R. Pillai' },
      { numMembers: '1 MEMBER',   nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'Ms. Sayali Sohoni' },
      { numMembers: '2 MEMBERS (Invitee – BFSI)', nature: 'Name of the Faculty',                                         name: 'Mr. Soumya Ranjan' },
      { numMembers: '',           nature: '',                                                                               name: 'Mr. Nabaroon Chakraborty' },
    ],
  },
  {
    id: 'financial-market',
    label: 'Financial Market',
    members: [
      { numMembers: '1 MEMBER',  nature: 'Head of Department / Chairperson',                                              name: 'Ms. Shilpa Thakur' },
      { numMembers: '7 MEMBERS', nature: 'Names of Faculty',                                                              name: 'Ms. Vinaya Marathe' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Siddhi Kambli' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Sipra Routaray' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Archana Kadam' },
      { numMembers: '',          nature: '',                                                                               name: 'Mr. Nitin Pawar' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Swapna Acharya' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Sneha Prajapati' },
      { numMembers: '3 MEMBERS', nature: 'Invitee Members',                                                               name: 'Dr. Rajashri Deshpande' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Seema Attarde' },
      { numMembers: '',          nature: '',                                                                               name: 'Ms. Alpa Katira' },
      { numMembers: '2 MEMBERS', nature: 'Subject expert from outside Parent University (nominated by Academic Council)', name: 'Dr. Purvy Karia' },
      { numMembers: '',          nature: '',                                                                               name: 'CMA Sarvottam Rege' },
      { numMembers: '1 MEMBER',  nature: 'Nominated by VC from 6 recommended by college Principal',                      name: 'Prof. Mandar Thakur' },
      { numMembers: '1 MEMBER',  nature: 'Representative of Industry / Corporate',                                        name: 'Dr. Nitin Tike' },
      { numMembers: '1 MEMBER',  nature: 'PG Meritorious Alumnus nominated by Principal',                                 name: 'Mr. Nirav Gohil' },
    ],
  },
];

const bgPalette = [
  'bg-blue-600','bg-purple-600','bg-emerald-600','bg-rose-500',
  'bg-indigo-600','bg-teal-600','bg-orange-500','bg-cyan-600',
];

function getInitials(name: string) {
  return name
    .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|CA|Prin\.|Prof\.|Shri|Adv\.|CMA)\.*\s*/i, '')
    .split(' ')
    .slice(0, 2)
    .map(w => w[0] || '')
    .join('')
    .toUpperCase();
}

export default function BOSMembersPage() {
  const [activeId, setActiveId] = useState(bosData[0].id);
  const current = bosData.find(s => s.id === activeId) || bosData[0];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#123B6D] pt-28 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -left-20 top-40 w-72 h-72 bg-[#D4A017] rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-4">
            Autonomous HEI · Accreditation &amp; Rankings
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-[var(--font-heading)] mb-3">
            Board of Studies (BOS)
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
            Composition of the Board of Studies for each department at Mulund College of Commerce (Autonomous).
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-4 lg:sticky lg:top-24">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 pt-2 pb-3">Departments</p>
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {bosData.map(s => {
                  const isActive = activeId === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveId(s.id)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 transition-all duration-200 text-left shrink-0 lg:w-full
                        ${isActive
                          ? 'bg-blue-50 border-blue-200 shadow-sm'
                          : 'bg-white border-transparent hover:bg-gray-50'
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${isActive ? 'bg-[#123B6D] text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}>
                        <BookOpen size={16} />
                      </div>
                      <span className={`font-semibold text-xs leading-tight whitespace-nowrap lg:whitespace-normal ${isActive ? 'text-[#123B6D]' : 'text-gray-600'}`}>
                        {s.label}
                      </span>
                      {isActive && <ChevronRight size={14} className="ml-auto text-[#123B6D] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">
              {/* Panel Header */}
              <div className="px-6 md:px-10 py-8 border-b flex items-center gap-5 bg-blue-50">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 bg-[#123B6D]">
                  <BookOpen size={28} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">BOS – {current.label}</p>
                  <h2 className="text-xl md:text-2xl font-bold text-[#123B6D] font-[var(--font-heading)]">
                    {current.subtitle ?? `Composition – ${current.label}`}
                  </h2>
                  <p className="text-gray-500 mt-0.5 text-sm">{current.members.length} entries</p>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F1F5F9]">
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-36">No. of Members</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Nature</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {current.members.map((m, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/20 transition-colors">
                        <td className="px-4 py-3">
                          {m.numMembers ? (
                            <span className="inline-block bg-[#EBF3FF] text-[#123B6D] text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                              {m.numMembers}
                            </span>
                          ) : null}
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs leading-relaxed max-w-[220px]">{m.nature}</td>
                        <td className="px-4 py-3">
                          {m.name ? (
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm ${bgPalette[idx % bgPalette.length]}`}>
                                {getInitials(m.name)}
                              </div>
                              <span className="font-semibold text-gray-800 text-xs leading-snug">{m.name}</span>
                            </div>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
