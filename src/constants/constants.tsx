import { ReactElement } from "react";
import Access from "../assets/icons/access.svg";
import Digital from "../assets/icons/digital.svg";
import Facebook from "../assets/icons/facebook.svg";
import Instagram from "../assets/icons/instagram.svg";
import Linkedin from "../assets/icons/linkedin.svg";
import Monitoring from "../assets/icons/marketing.svg";
import Messaging from "../assets/icons/messaging.svg";
import Private from "../assets/icons/private.svg";
import Secure from "../assets/icons/secure.svg";
import Telegram from "../assets/icons/telegram.svg";
import Twitter from "../assets/icons/twitter.svg";
import Video from "../assets/icons/video.svg";
import Virtual from "../assets/icons/virtual.svg";
import Voice from "../assets/icons/voice.svg";
import Avatar1 from "../assets/images/avatar1.png";
import Avatar2 from "../assets/images/avatar2.png";
import Avatar3 from "../assets/images/avatar3.png";
import Blog_Image from "../assets/images/blogs/blog_1_img.png";
import Team1 from "../assets/images/team-1.png";
import Team2 from "../assets/images/team-2.png";
import Team3 from "../assets/images/team-3.png";
import Team4 from "../assets/images/team-4.png";
import Team5 from "../assets/images/team-5.png";
import About from "../pages/About/About";
import Blog from "../pages/Blogs/Blog";
import BlogDetails from "../pages/Blogs/BlogDetails";
import ContactUs from "../pages/ContactUs/ContactUs";
import Home from "../pages/Home/Home";
import WhatWeTreat from "../pages/WhatWeTreat/WhatWeTreat";

import ChildIntakeSteper from "../pages/ChildIntake/ChildIntakeSteper.tsx";
import DoctorDetails from "../pages/SelectDoctor/DoctorDetails.tsx";
import SelectDoctor from "../pages/SelectDoctor/SelectDoctor.tsx";

import User1 from "../assets/images/User1.png";
import User2 from "../assets/images/User2.png";
import User3 from "../assets/images/User3.png";
import User4 from "../assets/images/User4.png";
import Account from "../pages/Account/Account";
import HeroSection from "../pages/PSC Test/PSC-Test-Main.tsx";
import PSC_Test_Quiz from "../pages/PSC Test/Psctestquiz.tsx";
import AppointmentScheduler from "../pages/Schedule Appointment/ScheduleAppoitment.tsx";
import ScheduleByDoctorDetails from "../pages/ScheduleByDoctor/ScheduleByDoctorDetails.tsx";
import SelectUser from "../pages/SelectUser/SelectUser";

// Doctor
import DoctorDashBoard from "../pages/DoctorDashboard/index.tsx";
import PatientDetails from "../pages/PatientDetails/PatientDetails.tsx";
import PatientsHistory from "../pages/PatientsHistory/PatientsHistory.tsx";
import UpcomingAppointment from "../pages/UpcomingAppointment";

// Patient
import PatientDashBoard from "../pages/PatientDashboard/index.tsx";
import PatientPrescriptions from "../pages/PatientPrescriptions/PatientPrescriptions.tsx";
import PatientVisits from "../pages/PatientVisits/PatientVisits.tsx";
import AppoinmentByDoctor from "../pages/ScheduleByDoctor/AppoinmentByDoctor.tsx";
import ShowAllDoctors from "../pages/ShowAllDoctors/ShowAllDoctors.tsx";

// Settings Pages
import TeacherDetail from "../components/TeacherDetail.tsx";
import InstituteDashBoard from "../pages/InstituteDashboard/index.tsx";
import HeroSectionNodeJs from "../pages/PSC Test NodeJs/PSC-Test-Main.tsx";
import HeroSectionNodeJsMAIN from "../pages/All-Tests-Common/Test-Main.tsx";
import PSC_Test_Quiz_NodeJs from "../pages/PSC Test NodeJs/Psctestquiz.tsx";
import Tests_Quiz_NodeJs from "../pages/All-Tests-Common/testquiz.tsx";
import ChangePassword from "../pages/Settings/ProfilesPages/ChangePassword.tsx";
import PrivacyPolicy from "../pages/Settings/ProfilesPages/PrivacyPolicy.tsx";
import Profile from "../pages/Settings/ProfilesPages/Profile.tsx";
import TermsAndConditions from "../pages/Settings/ProfilesPages/TermsAndConditions.tsx";
import StudentDashboard from "../pages/StudentDashboard/index.tsx";
import TeacherDashboard from "../pages/TeacherDashboard/index.tsx";

//video call
import PatientVideoCall from "../pages/Video-Calls/patient-video-call.tsx";
import DoctorVideoCall from "../pages/Video-Calls/doctor-video-call.tsx";
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
  // {
  //   id: 32,
  //   Component: <Account />,
  //   path: "/institute-login",
  //   name: "Institute Login",
  //   visible: false,
  // },
  {
    id: 32,
    Component: <Account />,
    path: "/institute-registration",
    name: "Institute Registration",
    visible: false,
  },
  {
    id: 33,
    Component: <InstituteDashBoard />,
    path: "/institute-dashboard",
    name: "Institute Dashboard",
    visible: false,
  },
  {
    id: 33,
    Component: <TeacherDetail />,
    path: "/teacher/detail/:id",
    name: "Teacher Detail",
    visible: false,
  },
  {
    id: 34,
    Component: <Account />,
    path: "/teacher-registration",
    name: "Teacher Registration",
    visible: false,
  },
  {
    id: 34,
    Component: <Account />,
    path: "/login",
    name: "Teacher / Institute Login",
    visible: false,
  },
  {
    id: 34,
    Component: <TeacherDashboard />,
    path: "/teacher-dashboard",
    name: "Teacher Dashboard",
    visible: false,
  },
  {
    id: 35,
    Component: <PSC_Test_Quiz_NodeJs />,
    path: "/psc-test-quiz-node",
    name: "PSC Test Quiz Node",
    visible: false,
  },
  {
    id: 36,
    Component: <HeroSectionNodeJs />,
    path: "/psc-test-node",
    name: "PSC Test Node",
    visible: false,
  },
  {
    id: 34,
    Component: <TermsAndConditions />,
    path: "/terms-conditions",
    name: "Terms and Conditions",
    visible: false,
  },
  {
    id: 35,
    Component: <StudentDashboard />,
    path: "/student-dashboard",
    name: "Terms and Conditions",
    visible: false,
  },
  {
    id: 36,
    Component: <HeroSectionNodeJsMAIN testData={7} />,
    path: "/moves-test-node",
    name: "MOVES Test Node",
    visible: false,
  },
  // {
  //   id: 38,
  //   Component: <HeroSectionNodeJsMAIN testData={2} />,
  //   path: "/asq-test-node",
  //   name: "ASQ Test Node",
  // },
  {
    id: 39,
    Component: <HeroSectionNodeJsMAIN testData={3} />,
    path: "/sdq-test-node",
    name: "SDQ Test Node",
  },
  {
    id: 40,
    Component: <HeroSectionNodeJsMAIN testData={4} />,
    path: "/ace-test-node",
    name: "ACE Test Node",
  },
  {
    id: 41,
    Component: <HeroSectionNodeJsMAIN testData={5} />,
    path: "/snap-test-node",
    name: "SNAP Test Node",
  },
  {
    id: 42,
    Component: <HeroSectionNodeJsMAIN testData={6} />,
    path: "/ces-test-node",
    name: "CES Test Node",
  },
  {
    id: 43,
    Component: <HeroSectionNodeJsMAIN testData={8} />,
    path: "/smq-test-node",
    name: "SMQ Test Node",
  },
  {
    id: 44,
    Component: <HeroSectionNodeJsMAIN testData={9} />,
    path: "/craft-test-node",
    name: "CRAFT Test Node",
  },
  {
    id: 45,
    Component: <HeroSectionNodeJsMAIN testData={10} />,
    path: "/wfirs-test-node",
    name: "WFIRS Test Node",
  },
  {
    id: 37,
    Component: <Tests_Quiz_NodeJs testData={7} />,
    path: "/moves-test-quiz-node",
    name: "moves Test Quiz Node",
    visible: false,
  },
  {
    id: 46,
    Component: <Tests_Quiz_NodeJs testData={10} />,
    path: "/wfirs-test-quiz-node",
    name: "Wfirs Test Quiz Node",
    visible: false,
  },
  {
    id: 47,
    Component: <Tests_Quiz_NodeJs testData={6} />,
    path: "/ces-test-quiz-node",
    name: "CES Test Quiz Node",
  },
  // {
  //   id: 48,
  //   Component: <Tests_Quiz_NodeJs testData={9} />,
  //   path: "/craft-test-quiz-node",
  //   name: "CRAFT Test Quiz Node",
  // },
  {
    id: 49,
    Component: <Tests_Quiz_NodeJs testData={5} />,
    path: "/snap-test-quiz-node",
    name: "SNAP Test Quiz Node",
  },
  {
    id: 50,
    Component: <Tests_Quiz_NodeJs testData={8} />,
    path: "/smq-test-quiz-node",
    name: "SMQ Test Quiz Node",
  },
  {
    id: 51,
    Component: <PatientVideoCall />,
    path: "/patient-video-call",
    name: "Patient Video Call",
  },
  {
    id: 52,
    Component: <DoctorVideoCall />,
    path: "/doctor-video-call",
    name: "Doctor Video Call",
  },  
];

export const socialIcons: IsocialIcons[] = [
  {
    id: 1,
    name: "Facebook",
    src: Facebook,
    link: "#",
  }
  // ,
  // {
  //   id: 2,
  //   name: "Instagram",
  //   src: Instagram,
  //   link: "#",
  // },
  // {
  //   id: 3,
  //   name: "Linkedin",
  //   src: Linkedin,
  //   link: "#",
  // },
  // {
  //   id: 4,
  //   name: "Twitter",
  //   src: Twitter,
  //   link: "#",
  // },
  // {
  //   id: 5,
  //   name: "Telegram",
  //   src: Telegram,
  //   link: "#",
  // },
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
    name: "Rayan",
    designation: "Student",
    avatar: Avatar2,
    description:
      "Dear Mental Support Community,\nI am writing this with immense gratitude and a heart full of appreciation for the transformative journey I've experienced on the Mental Support platform. In a world where the challenges of mental health can sometimes feel isolating, this platform has been a beacon of hope, understanding, and personalized support. My journey began with a simple registration, and what set Mental Support apart from other platforms was its unique approach to understanding users. The initial questions weren't just routine; they were thoughtfully designed to unravel the intricacies of my thoughts, emotions, and needs. It was the first indication that Mental Support was truly committed to providing personalized care. The magic happened behind the scenes, where their AI system worked diligently to process my responses. Soon after, I was presented with recommendations for experienced therapists who aligned with my unique set of challenges. Having the power to choose a therapist based on their profile and expertise was empowering—it made me feel in control of my own healing process. The ability to communicate anonymously was a game-changer for me. It allowed me to be honest and vulnerable without the fear of judgment. The secure messaging system became my safe haven, a space where I could pour out my thoughts and receive thoughtful responses from my chosen therapist. What truly sets Mental Support apart is its flexibility. The platform offers various communication modes—text, voice calls, and video conversations. Having the choice to communicate in a way that felt most comfortable to me was liberating. It made the therapeutic process feel tailored to my preferences, adding an extra layer of comfort to the entire experience. Throughout my journey, one thing remained constant: the commitment to maintaining the utmost confidentiality. Every conversation, every detail shared, was treated with the utmost care. This sense of security allowed me to explore my thoughts and feelings in ways I hadn't thought possible. In a world where mental health care is often stigmatized or inaccessible, Mental Support stands as a beacon of hope. It's not just a platform; it's a community of compassionate professionals who genuinely care about your well-being. My Mental Support journey has been transformative, enlightening, and, most importantly, healing. If you're on the fence about seeking help, I encourage you to take that leap. Mental Support has been my guiding light through the darkness, and I am eternally grateful for the support and care they've provided.",
  },
  {
    id: 2,
    name: "Rania",
    avatar: Avatar1,
    designation: "Student",
    description:
      "In the chaos of exam stress, my anxiety levels were through the roof. Sleepless nights, racing thoughts—fear of failure was suffocating. Enter Mental Support, a game-changer in my struggle for mental well-being. No hoops to jump through—registering was a breeze. The initial questions weren generic; however they delved deep into my exam anxiety. It felt like they understood me before we even started. The AI wizardry kicked in, analyzing my responses. It recommended therapists specialized in academic anxiety. It was like having a study buddy who knew the ins and outs of the mental game. What set Mental Support apart was the option to communicate anonymously. I could spill my fears without judgment. The secure messaging system became my private confessional. Flexibility in communication was key. Choosing how to connect—messages, voice calls, or video—adapted to my study schedule and comfort level. With Mental Support's support, my mindset shifted. Anxiety turned into empowerment. Techniques from my therapist became tools against exam stress. Facing exams went from daunting to doable. To students grappling with exam anxiety, consider Mental Support. It's more than a platform—it's a companion in your academic journey, offering personalized support that goes beyond textbooks. My journey is proof that seeking help is a proactive step toward well-being.",
  },
  {
    id: 3,
    name: "Thara Lie",
    avatar: Avatar3,
    designation: "Student",
    description:
      "I'm just a regular 14-year-old girl, and I want to share a bit about something that's been happening at home. It's not easy, but I found someone super cool who helped me, and I thought it might help someone else too. So, you know how sometimes parents fight? Well, mine did a lot, and it made me feel really scared and insecure. It's not fun when the people who are supposed to make you feel safe are always arguing. I needed someone to talk to, and that's when I met Syeda Asma Bukhari. Asma isn't like a regular grown-up who just tells you what to do. She's more like a friend who listens. I didn't have to use big words or be super serious. I just talked about how I felt, and she really understood. She helped me see things in a new way. Instead of feeling small and scared, she showed me that I'm strong and can handle tough stuff. She didn't make it all sound like a big deal, and that made it easier for me to understand. We did this thing called 'positive mindset'. It's like looking at problems in a different way. Asma helped me find good things even when everything seemed bad. She made me believe in myself. Now, I feel way more confident. It's like I have this secret power to stay cool even when things get crazy at home. She taught me that I'm not alone, and that it's okay to ask for help. I'm still learning, but every day feels a bit brighter. If you ever feel stuck or scared, maybe talking to someone like Syeda Asma can help you too. It's not about being perfect or having all the answers. It's just about finding your own way to feel better.\nStay strong, friends!"
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
    path: "/register",
    // path: "/child-intake",
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
    path: "/institute-registration",
  },
  {
    id: 4,
    heading: "Clinicians",
    image: User4,
    // path: "/doctor-login",
    path: "/doctor-registration",
  },
];

export const baseUrl = "http://localhost:5000";
// export const baseUrl = "http://139.99.28.47:5000";
