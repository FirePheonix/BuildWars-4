import { Profile } from '../types';

export const profiles: Profile[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 26,
    height: '5\'4"',
    education: 'MBA',
    occupation: 'Software Engineer',
    location: 'Mumbai, Maharashtra',
    religion: 'Hindu',
    caste: 'Brahmin',
    motherTongue: 'Hindi',
    maritalStatus: 'Never Married',
    income: '8-12 Lakhs',
    about: 'I am a software engineer working in a multinational company. I believe in maintaining work-life balance and enjoy traveling, reading, and cooking in my free time.',
    photos: [
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    interests: ['Travel', 'Reading', 'Cooking', 'Music'],
    familyDetails: {
      fatherOccupation: 'Government Employee',
      motherOccupation: 'Teacher',
      siblings: 1
    },
    preferences: {
      ageRange: { min: 26, max: 32 },
      heightRange: { min: '5\'6"', max: '6\'0"' },
      education: ['BE/BTech', 'MBA', 'CA'],
      location: ['Mumbai', 'Pune', 'Delhi']
    },
    verified: true,
    premium: true,
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    name: 'Rahul Gupta',
    age: 29,
    height: '5\'10"',
    education: 'BE/BTech',
    occupation: 'Marketing Manager',
    location: 'Delhi, India',
    religion: 'Hindu',
    motherTongue: 'Hindi',
    maritalStatus: 'Never Married',
    income: '12-15 Lakhs',
    about: 'Working as a marketing manager in a leading FMCG company. I love sports, especially cricket and football. Looking for a life partner who shares similar values.',
    photos: [
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    interests: ['Sports', 'Travel', 'Movies', 'Business'],
    familyDetails: {
      fatherOccupation: 'Business Owner',
      motherOccupation: 'Homemaker',
      siblings: 2
    },
    preferences: {
      ageRange: { min: 23, max: 28 },
      heightRange: { min: '5\'2"', max: '5\'8"' },
      education: ['Graduate', 'Post Graduate'],
      location: ['Delhi', 'Gurgaon', 'Noida']
    },
    verified: true,
    premium: false,
    lastActive: '1 day ago'
  },
  {
    id: '3',
    name: 'Anita Reddy',
    age: 24,
    height: '5\'5"',
    education: 'CA',
    occupation: 'Chartered Accountant',
    location: 'Hyderabad, Telangana',
    religion: 'Hindu',
    motherTongue: 'Telugu',
    maritalStatus: 'Never Married',
    income: '6-10 Lakhs',
    about: 'I am a chartered accountant with a passion for finance and numbers. I enjoy classical music, dance, and spending time with family.',
    photos: [
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    interests: ['Classical Music', 'Dance', 'Finance', 'Family Time'],
    familyDetails: {
      fatherOccupation: 'Doctor',
      motherOccupation: 'Professor',
      siblings: 1
    },
    preferences: {
      ageRange: { min: 25, max: 30 },
      heightRange: { min: '5\'8"', max: '6\'2"' },
      education: ['CA', 'MBA', 'BE/BTech'],
      location: ['Hyderabad', 'Bangalore', 'Chennai']
    },
    verified: true,
    premium: true,
    lastActive: '3 hours ago'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    age: 31,
    height: '6\'0"',
    education: 'MBA',
    occupation: 'Investment Banker',
    location: 'Bangalore, Karnataka',
    religion: 'Hindu',
    motherTongue: 'Punjabi',
    maritalStatus: 'Never Married',
    income: '20+ Lakhs',
    about: 'Investment banker with a passion for financial markets. I enjoy traveling, photography, and adventure sports. Looking for an educated and independent partner.',
    photos: [
      'https://images.pexels.com/photos/1408978/pexels-photo-1408978.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    interests: ['Photography', 'Adventure Sports', 'Finance', 'Travel'],
    familyDetails: {
      fatherOccupation: 'Army Officer (Retd.)',
      motherOccupation: 'Social Worker',
      siblings: 0
    },
    preferences: {
      ageRange: { min: 24, max: 29 },
      heightRange: { min: '5\'3"', max: '5\'8"' },
      education: ['MBA', 'BE/BTech', 'Graduate'],
      location: ['Bangalore', 'Mumbai', 'Delhi']
    },
    verified: true,
    premium: true,
    lastActive: '5 hours ago'
  },
  {
    id: '5',
    name: 'Kavya Nair',
    age: 27,
    height: '5\'3"',
    education: 'MBBS',
    occupation: 'Doctor',
    location: 'Kochi, Kerala',
    religion: 'Hindu',
    motherTongue: 'Malayalam',
    maritalStatus: 'Never Married',
    income: '8-12 Lakhs',
    about: 'I am a practicing doctor who is passionate about helping others. I love reading medical journals, yoga, and spending time in nature.',
    photos: [
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    interests: ['Medicine', 'Yoga', 'Nature', 'Reading'],
    familyDetails: {
      fatherOccupation: 'Engineer',
      motherOccupation: 'Nurse',
      siblings: 2
    },
    preferences: {
      ageRange: { min: 28, max: 35 },
      heightRange: { min: '5\'6"', max: '6\'1"' },
      education: ['MBBS', 'MD', 'BE/BTech'],
      location: ['Kochi', 'Trivandrum', 'Bangalore']
    },
    verified: true,
    premium: false,
    lastActive: '1 hour ago'
  },
  {
    id: '6',
    name: 'Arjun Patel',
    age: 28,
    height: '5\'8"',
    education: 'BE/BTech',
    occupation: 'Product Manager',
    location: 'Ahmedabad, Gujarat',
    religion: 'Hindu',
    motherTongue: 'Gujarati',
    maritalStatus: 'Never Married',
    income: '15-20 Lakhs',
    about: 'Product manager at a tech startup. I enjoy building products that make a difference. Love traveling, cricket, and trying new cuisines.',
    photos: [
      'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    interests: ['Technology', 'Cricket', 'Food', 'Startups'],
    familyDetails: {
      fatherOccupation: 'Businessman',
      motherOccupation: 'Homemaker',
      siblings: 1
    },
    preferences: {
      ageRange: { min: 23, max: 27 },
      heightRange: { min: '5\'2"', max: '5\'7"' },
      education: ['BE/BTech', 'MBA', 'Graduate'],
      location: ['Ahmedabad', 'Mumbai', 'Pune']
    },
    verified: false,
    premium: true,
    lastActive: '6 hours ago'
  }
];