import { ReactElement } from "react";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Blog from "../pages/Blogs/Blog";
import BlogDetails from "../pages/Blogs/BlogDetails";
import ContactUs from "../pages/ContactUs/ContactUs";
import WhatWeTreat from "../pages/WhatWeTreat/WhatWeTreat";
import ChildIntake from "../pages/ChildIntake/ChildIntake.tsx";
import Facebook from "../assets/icons/facebook.svg";
import Instagram from "../assets/icons/instagram.svg";
import Linkedin from "../assets/icons/linkedin.svg";
import Telegram from "../assets/icons/telegram.svg";
import Twitter from "../assets/icons/twitter.svg";
import Virtual from "../assets/icons/virtual.svg";
import Secure from "../assets/icons/secure.svg";
import Private from "../assets/icons/private.svg";
import Digital from "../assets/icons/digital.svg";
import Monitoring from "../assets/icons/marketing.svg";
import Access from "../assets/icons/access.svg";
import Messaging from "../assets/icons/messaging.svg";
import Voice from "../assets/icons/voice.svg";
import Video from "../assets/icons/video.svg";
import Avatar1 from "../assets/images/avatar1.png";
import Avatar2 from "../assets/images/avatar2.png";
import Avatar3 from "../assets/images/avatar3.png";
import Blog_Image from "../assets/images/blogs/blog_1_img.png";
import Team1 from "../assets/images/team-1.png";
import Team2 from "../assets/images/team-2.png";
import Team3 from "../assets/images/team-3.png";
import Team4 from "../assets/images/team-4.png";
import Team5 from "../assets/images/team-5.png";

import ChildIntakeSteper from "../pages/ChildIntake/ChildIntakeSteper.tsx";
import SelectDoctor from "../pages/SelectDoctor/SelectDoctor.tsx";
import DoctorDetails from "../pages/SelectDoctor/DoctorDetails.tsx";

import SelectUser from "../pages/SelectUser/SelectUser";
import User1 from "../assets/images/User1.png";
import User2 from "../assets/images/User2.png";
import User3 from "../assets/images/User3.png";
import User4 from "../assets/images/User4.png";
import Account from "../pages/Account/Account";
import AcademicInformation from "../components/Forms/Doctors/AcademicInformation.tsx";
import PSC_Test_Quiz from "../pages/PSC Test/Psctestquiz.tsx";
import HeroSection from "../pages/PSC Test/PSC-Test-Main.tsx";
import AppointmentScheduler from "../pages/Schedule Appointment/ScheduleAppoitment.tsx";
import ScheduleByDoctorDetails from "../pages/ScheduleByDoctor/ScheduleByDoctorDetails.tsx";

// Doctor
import DoctorDashBoard from "../pages/DoctorDashboard/index.tsx";
import UpcomingAppointment from "../pages/UpcomingAppointment";
import PatientsHistory from "../pages/PatientsHistory/PatientsHistory.tsx";
import PatientDetails from "../pages/PatientDetails/PatientDetails.tsx";

// Patient
import PatientDashBoard from "../pages/PatientDashboard/index.tsx";
import PatientVisits from "../pages/PatientVisits/PatientVisits.tsx";
import ShowAllDoctors from "../pages/ShowAllDoctors/ShowAllDoctors.tsx";
import AppoinmentByDoctor from "../pages/ScheduleByDoctor/AppoinmentByDoctor.tsx";
import PatientPrescriptions from "../pages/PatientPrescriptions/PatientPrescriptions.tsx";


// Settings Pages
import Profile from "../pages/Settings/ProfilesPages/Profile.tsx";
import ChangePassword from "../pages/Settings/ProfilesPages/ChangePassword.tsx";
import TermsAndConditions from "../pages/Settings/ProfilesPages/TermsAndConditions.tsx";
import PrivacyPolicy from "../pages/Settings/ProfilesPages/PrivacyPolicy.tsx";








interface RouteItem {
  id: number;
  Component: ReactElement;
  path: string;
  name?: string;
  visible?: boolean;
}

interface Iservices {
  id?: number;
  icon?: string;
  heading?: string;
  description?: string;
}

interface IsocialIcons {
  id: number;
  src: string;
  link: string;
  name: string;
}

interface Isteps {
  id: number;
  title: string;
  description: string;
  align: string;
}
interface Ipartners {
  id: number;
  name: string;
  designation: string;
  description: string;
  avatar: string;
}
interface Symptom {
  id: number;
  description: string;
}
interface IBlogs {
  id: number;
  description: string;
  image: string;
  title: string;
  date: string;
  writer: string;
}
interface IContributors {
  id: number;
  name: string;
  articles: number;
  avatar: string;
}
interface ITeam {
  id: number;
  name: string;
  designation: string;
  image: string;
}

interface IUser {
  id: number;
  heading: string;
  image: string;
  path?: string;
}
export const appRoutes: RouteItem[] = [
  {
    id: 1,
    Component: <Home />,
    path: "/",
    name: "Home",
    visible: true,
  },
  {
    id: 2,
    Component: <About />,
    path: "/about",
    name: "About",
    visible: true,
  },
  {
    id: 3,
    Component: <WhatWeTreat />,
    path: "/whatWeTreat",
    name: "What We Treat",
    visible: true,
  },
  {
    id: 4,
    Component: <Blog />,
    path: "/blog",
    name: "Blog",
    visible: true,
  },
  {
    id: 5,
    Component: <ContactUs />,
    path: "/contactUs",
    name: "Contact Us",
    visible: true,
  },
  {
    id: 6,
    Component: <BlogDetails />,
    path: "/blog-detail",
    name: "Blog Detail",
    visible: false,
  },
  {
    id: 7,
    Component: <ChildIntakeSteper />,
    path: "/child-intake",
    name: "ChildIntake",
  },
  {
    id: 8,
    Component: <SelectUser />,
    path: "/select-user",
    name: "Select User",
    visible: false,
  },
  // {
  //   id: 9,
  //   Component: <ChildIntakeSteper />,
  //   path: "/child-intake-steper",
  //   name: "ChildIntakeSteper",
  //   visible: false,
  // },
  {
    id: 10,
    Component: <SelectDoctor />,
    path: "/select-doctor",
    name: "SelectDoctor",
    visible: false,
  },
  {
    id: 11,
    Component: <DoctorDetails />,
    path: "/doctor-detail",
    name: "DoctorDetail",
    visible: false,
  },
  {
    id: 12,
    Component: <Account />,
    path: "/login",
    name: "Login",
    visible: false,
  },
  {
    id: 13,
    Component: <Account />,
    path: "/register",
    name: "Register",
    visible: false,
  },
  {
    id: 14,
    Component: <PSC_Test_Quiz />,
    path: "/psc-test-quiz",
    name: "PSC Test Quiz",
    visible: false,
  },
  {
    id: 15,
    Component: <HeroSection />,
    path: "/psc-test",
    name: "PSC Test",
    visible: false,
  },
  {
    id: 16,
    Component: <AppointmentScheduler />,
    path: "/schedule-appointment",
    name: "Schedule Appointment",
    visible: false,
  },
  {
    id: 17,
    Component: <Account />,
    path: "/doctor-login",
    name: "Doctor Login",
    visible: false,
  },
  {
    id: 18,
    Component: <Account />,
    path: "/doctor-registration",
    name: "Doctor Registration",
    visible: false,
  },
  {
    id: 19,
    Component: <Account />,
    path: "/academic-information",
    name: "Academic Information",
    visible: false,
  },
  {
    id: 20,
    Component: <Account />,
    path: "/professional-experience",
    name: "Professional Experience",
    visible: false,
  },
  {
    id: 21,
    Component: <DoctorDashBoard />,
    path: "/doctor-dashboard",
    name: "Doctor Dashboard",
    visible: false,
  },
  {
    id: 22,
    Component: <UpcomingAppointment />,
    path: "/upcoming-appointments",
    name: "Upcoming Appointments",
    visible: false,
  },
  {
    id: 22,
    Component: <UpcomingAppointment />,
    path: "/conducted-appointments",
    name: "Conducted Appointments",
    visible: false,
  },
  {
    id: 23,
    Component: <PatientsHistory />,
    path: "/patients-history",
    name: "Patients History",
    visible: false,
  },
  {
    id: 24,
    Component: <PatientDetails />,
    path: "/patient-details",
    name: "Patient Details",
    visible: false,
  },
  {
    id: 25,
    Component: <PatientDashBoard />,
    path: "/patient-dashboard",
    name: "Patient Dashboard",
    visible: false,
  },
  {
    id: 26,
    Component: <PatientVisits />,
    path: "/patient-myvisits",
    name: "Patient Visits",
    visible: false,
  },
  {
    id: 27,
    Component: <ShowAllDoctors />,
    path: "/all-doctors",
    name: "All Doctors",
    visible: false,
  },
  {
    id: 28,
    Component: <ScheduleByDoctorDetails />,
    path: "/doctor-details",
    name: "Doctor Details",
    visible: false,
  },
  {
    id: 29,
    Component: <AppoinmentByDoctor />,
    path: "/set-schedule",
    name: "Schedule Calendar",
    visible: false,
  },
  {
    id: 30,
    Component: <PatientPrescriptions />,
    path: "/patient-prescriptions",
    name: "Patient Prescriptions",
    visible: false,
  },
  {
    id: 31,
    Component: <Profile />,
    path: "/profile",
    name: "Patient Profile",
    visible: false,
  },
  {
    id: 32,
    Component: <ChangePassword />,
    path: "/change-password",
    name: "Patient Change Password",
    visible: false,
  },
  {
    id: 33,
    Component: <PrivacyPolicy />,
    path: "/privacy-policy",
    name: "Patient Profile",
    visible: false,
  },
  {
    id: 34,
    Component: <TermsAndConditions />,
    path: "/terms-conditions",
    name: "Terms and Conditions",
    visible: false,
  },
];

export const socialIcons: IsocialIcons[] = [
  {
    id: 1,
    name: "Facebook",
    src: Facebook,
    link: "#",
  },
  {
    id: 2,
    name: "Instagram",
    src: Instagram,
    link: "#",
  },
  {
    id: 3,
    name: "Linkedin",
    src: Linkedin,
    link: "#",
  },
  {
    id: 4,
    name: "Twitter",
    src: Twitter,
    link: "#",
  },
  {
    id: 5,
    name: "Telegram",
    src: Telegram,
    link: "#",
  },
];

export const services1: Iservices[] = [
  {
    id: 1,
    heading: "Virtual Appointments",
    icon: Virtual,
  },
  {
    id: 2,
    heading: "Secure Video Conferencing",
    icon: Secure,
  },
  {
    id: 3,
    heading: "Secure & private chat",
    icon: Private,
  },
  {
    id: 4,
    heading: "Digital intake and assessments",
    icon: Digital,
  },
  {
    id: 5,
    heading: "Ongoing monitoring",
    icon: Monitoring,
  },
  {
    id: 6,
    heading: "Access to mental health resources",
    icon: Access,
  },
];

export const services2: Iservices[] = [
  {
    id: 1,
    heading: "Secure Messaging",
    icon: Messaging,
    description:
      "We offer text messaging services to help you connect with your therapist when you are feeling under the weather",
  },
  {
    id: 2,
    heading: "Voice Messaging",
    icon: Voice,
    description:
      "Whenever you feel the need, record and send a message to your therapist",
  },
  {
    id: 3,
    heading: "Secure Video Calling",
    icon: Video,
    description: "Patients and therapists benefit from private video calls",
  },
];

export const workSteps: Isteps[] = [
  {
    id: 1,
    title: "Assessment",
    description:
      "At Mental Support, we’ve built an intelligent platform which will take you through a questionnaire in order to help us assess your needs",
    align: "start",
  },
  {
    id: 2,
    title: "Find your match",
    description:
      "Based on your assessment, we’ll help you find the perfect therapist",
    align: "center",
  },
  {
    id: 3,
    title: "Start Therapy",
    description: "Start talking to your therapist anytime and anywhere",
    align: "end",
  },
];
export const partners: Ipartners[] = [
  {
    id: 1,
    name: "Bessie Cooper",
    designation: "CEO Amazon",
    avatar: Avatar1,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five.",
  },
  {
    id: 2,
    name: "Leslie Alexander",
    avatar: Avatar2,
    designation: "Medical Assistant",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five.",
  },
  {
    id: 3,
    name: "Courtney Henry",
    avatar: Avatar3,
    designation: "Marketing Coordinator",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five.",
  },
];

export const symptoms: Symptom[] = [
  {
    id: 1,
    description: "Persistent feelings of sadness, emptiness, or hopelessness",
  },
  {
    id: 2,
    description:
      "Loss of interest or pleasure in activities that were once enjoyable",
  },
  {
    id: 3,
    description: "Changes in appetite or weight",
  },
  {
    id: 4,
    description: "Sleep disturbances, such as insomnia or oversleeping",
  },
  {
    id: 5,
    description: "Fatigue or loss of energy",
  },
  {
    id: 6,
    description: "Feelings of worthlessness or guilt",
  },
  {
    id: 7,
    description: "Difficulty concentrating or making decisions",
  },
  {
    id: 8,
    description: "Restlessness or slowed movements",
  },
  {
    id: 9,
    description: "Thoughts of death or suicide",
  },
  {
    id: 10,
    description:
      "Physical symptoms, such as headaches or digestive problems, that do not have a medical cause",
  },
];

export const blogs: IBlogs[] = [
  {
    id: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum hendrerit mauris vel consequat. Proin pharetra dui id ipsum lacinia, ut viverra felis venenatis.",
    image: Blog_Image,
    title: "Aenean egestas libero.",
    date: "12-Aug-2022",
    writer: "John Smith",
  },
  {
    id: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum hendrerit mauris vel consequat. Proin pharetra dui id ipsum lacinia, ut viverra felis venenatis.",
    image: Blog_Image,
    title: "Aenean egestas libero.",
    date: "12-Aug-2022",
    writer: "John Smith",
  },
  {
    id: 3,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum hendrerit mauris vel consequat. Proin pharetra dui id ipsum lacinia, ut viverra felis venenatis.",
    image: Blog_Image,
    title: "Aenean egestas libero.",
    date: "12-Aug-2022",
    writer: "John Smith",
  },
  {
    id: 4,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum hendrerit mauris vel consequat. Proin pharetra dui id ipsum lacinia, ut viverra felis venenatis.",
    image: Blog_Image,
    title: "Aenean egestas libero.",
    date: "12-Aug-2022",
    writer: "John Smith",
  },
  {
    id: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum hendrerit mauris vel consequat. Proin pharetra dui id ipsum lacinia, ut viverra felis venenatis.",
    image: Blog_Image,
    title: "Aenean egestas libero.",
    date: "12-Aug-2022",
    writer: "John Smith",
  },
  {
    id: 6,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum hendrerit mauris vel consequat. Proin pharetra dui id ipsum lacinia, ut viverra felis venenatis.",
    image: Blog_Image,
    title: "Aenean egestas libero.",
    date: "12-Aug-2022",
    writer: "John Smith",
  },
];

export const contributors: IContributors[] = [
  {
    id: 1,
    articles: 135,
    avatar: Avatar1,
    name: "Leslie Alexander",
  },
  {
    id: 2,
    articles: 135,
    avatar: Avatar2,
    name: "Robert Fox",
  },
  {
    id: 3,
    articles: 135,
    avatar: Avatar3,
    name: "Savannah Nguyen",
  },
  {
    id: 4,
    articles: 135,
    avatar: Avatar1,
    name: "Jenny Wilson",
  },
  {
    id: 5,
    articles: 135,
    avatar: Avatar2,
    name: "Bessie Cooper",
  },
  {
    id: 6,
    articles: 135,
    avatar: Avatar3,
    name: "Ralph Edwards",
  },
  {
    id: 7,
    articles: 135,
    avatar: Avatar1,
    name: "Ronald Richards",
  },
  {
    id: 8,
    articles: 135,
    avatar: Avatar2,
    name: "Albert Flores",
  },
  {
    id: 9,
    articles: 135,
    avatar: Avatar3,
    name: "Savannah Nguyen",
  },
  {
    id: 10,
    articles: 135,
    avatar: Avatar3,
    name: "Savannah Nguyen",
  },
];

export const teams: ITeam[] = [
  {
    id: 1,
    name: "Sharjil Hussain",
    designation: "CEO",
    image: Team1,
  },
  {
    id: 2,
    name: "Rajiv Aggarwal",
    designation: "COO",
    image: Team2,
  },
  {
    id: 3,
    name: "Fariya Altaf",
    designation: "CLO",
    image: Team3,
  },
  {
    id: 4,
    name: "Abdul Wahab Lashari",
    designation: "CIO",
    image: Team4,
  },
  {
    id: 5,
    name: "Asif Iqbal",
    designation: "CSO",
    image: Team5,
  },
];

export const users: IUser[] = [
  {
    id: 1,
    heading: "Seeking help for a family member",
    image: User1,
    // path: "/register",
    path: "/child-intake",
  },
  {
    id: 2,
    heading: "Seeking services for myself",
    image: User2,
    // path: "/login",
    path: "/register",
  },
  {
    id: 3,
    heading: "Educational institutions",
    image: User3,
  },
  {
    id: 4,
    heading: "Clinicians",
    image: User4,
    // path: "/doctor-login",
    path: "/doctor-registration",
  },
];
