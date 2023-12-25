import { ReactElement } from "react";
import Access from "../assets/icons/access.svg";
import Digital from "../assets/icons/digital.svg";
// import Facebook from "../assets/icons/facebook.svg";
import Linkedin from "../assets/icons/linkedin.svg";
import Monitoring from "../assets/icons/marketing.svg";
import Messaging from "../assets/icons/messaging.svg";
import Private from "../assets/icons/private.svg";
import Secure from "../assets/icons/secure.svg";
import Video from "../assets/icons/video.svg";
import Virtual from "../assets/icons/virtual.svg";
import Voice from "../assets/icons/voice.svg";
import Avatar1 from "../assets/images/avatar1.png";
import Avatar2 from "../assets/images/avatar2.png";
import Avatar3 from "../assets/images/avatar3.png";
import Blog_Image from "../assets/images/blogs/blog_1_img.png";
import Team_sharjil from "../assets/images/team_sharjil.jpeg";
import Team_rajiv from "../assets/images/team_rajiv.jpeg";
import Team_lashari from "../assets/images/team_lashari.jpeg";
import Team_asif from "../assets/images/team_asif.jpeg";
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
    path: "/blog-detail/:blogId",
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
  // {
  //   id: 1,
  //   name: "Facebook",
  //   src: Facebook,
  //   link: "#",
  // },
  // ,
  // {
  //   id: 2,
  //   name: "Instagram",
  //   src: Instagram,
  //   link: "#",
  // },
  {
    id: 3,
    name: "Linkedin",
    src: Linkedin,
    link: "https://www.linkedin.com/company/mental-support/about/",
  },
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
    name: "Rimi",
    designation: "Student",
    avatar: Avatar1,
    description:
      "I am writing this with immense gratitude and a heart full of appreciation for the transformative journey I've experienced on the Mental Support platform. In a world where the challenges of mental health can sometimes feel isolating, this platform has been a beacon of hope, understanding, and personalized support. My journey began with a simple registration, and what set Mental Support apart from other platforms was its unique approach to understanding users. The initial questions weren't just routine; they were thoughtfully designed to unravel the intricacies of my thoughts, emotions, and needs. It was the first indication that Mental Support was truly committed to providing personalized care. The magic happened behind the scenes, where their AI system worked diligently to process my responses. Soon after, I was presented with recommendations for experienced therapists who aligned with my unique set of challenges. Having the power to choose a therapist based on their profile and expertise was empowering—it made me feel in control of my own healing process. The ability to communicate anonymously was a game-changer for me. It allowed me to be honest and vulnerable without the fear of judgment. The secure messaging system became my safe haven, a space where I could pour out my thoughts and receive thoughtful responses from my chosen therapist. What truly sets Mental Support apart is its flexibility. The platform offers various communication modes—text, voice calls, and video conversations. Having the choice to communicate in a way that felt most comfortable to me was liberating. It made the therapeutic process feel tailored to my preferences, adding an extra layer of comfort to the entire experience. Throughout my journey, one thing remained constant: the commitment to maintaining the utmost confidentiality. Every conversation, every detail shared, was treated with the utmost care. This sense of security allowed me to explore my thoughts and feelings in ways I hadn't thought possible. In a world where mental health care is often stigmatized or inaccessible, Mental Support stands as a beacon of hope. It's not just a platform; it's a community of compassionate professionals who genuinely care about your well-being. My Mental Support journey has been transformative, enlightening, and, most importantly, healing. If you're on the fence about seeking help, I encourage you to take that leap. Mental Support has been my guiding light through the darkness, and I am eternally grateful for the support and care they've provided.",
  },
  {
    id: 2,
    name: "Kamran",
    avatar: Avatar2,
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
      "I'm just a regular 14-year-old girl, and I want to share a bit about something that's been happening at home. It's not easy, but I found someone super cool who helped me, and I thought it might help someone else too. So, you know how sometimes parents fight? Well, mine did a lot, and it made me feel really scared and insecure. It's not fun when the people who are supposed to make you feel safe are always arguing. I needed someone to talk to, and that's when I met Syeda Asma Bukhari. Asma isn't like a regular grown-up who just tells you what to do. She's more like a friend who listens. I didn't have to use big words or be super serious. I just talked about how I felt, and she really understood. She helped me see things in a new way. Instead of feeling small and scared, she showed me that I'm strong and can handle tough stuff. She didn't make it all sound like a big deal, and that made it easier for me to understand. We did this thing called 'positive mindset'. It's like looking at problems in a different way. Asma helped me find good things even when everything seemed bad. She made me believe in myself. Now, I feel way more confident. It's like I have this secret power to stay cool even when things get crazy at home. She taught me that I'm not alone, and that it's okay to ask for help. I'm still learning, but every day feels a bit brighter. If you ever feel stuck or scared, maybe talking to someone like Syeda Asma can help you too. It's not about being perfect or having all the answers. It's just about finding your own way to feel better.\nStay strong, friends!",
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
    description: `Mental well-being is a crucial aspect of our overall health and quality of life. It encompasses our emotional, psychological, and social well-being, and can impact how we think, feel, and behave on a daily basis. Mental well-being is essential for our ability to cope with life's challenges, form healthy relationships, and achieve our goals. In this blog, we will explore the importance of mental well-being and ways in which we can promote and maintain it.
      Improved Physical Health: Good mental well-being is associated with better physical health outcomes. People with good mental well-being are less likely to suffer from chronic diseases such as heart disease, stroke, and diabetes. They are also more likely to engage in healthy behaviors such as regular exercise, healthy eating, and getting enough sleep.
      Better Relationships: Our mental well-being affects our ability to form and maintain healthy relationships. When we are mentally healthy, we are better able to communicate effectively, manage conflicts, and show empathy and compassion towards others. This can help us build strong and supportive relationships with our family, friends, and colleagues.
      Increased Resilience: Resilience is our ability to bounce back from adversity and overcome challenges. Good mental well-being can help us develop resilience, enabling us to cope with life's ups and downs more effectively. When we are mentally healthy, we are better able to manage stress, adapt to change, and stay optimistic in the face of setbacks.
      Higher Productivity: Mental well-being is also linked to higher levels of productivity at work and school. When we are mentally healthy, we are better able to focus our attention, stay motivated, and work efficiently. This can help us achieve our goals and perform at our best.
      Improved Self-Esteem: Good mental well-being is associated with higher levels of self-esteem and self-confidence. When we feel good about ourselves, we are more likely to pursue our goals, take risks, and try new things. This can help us grow and develop as individuals, leading to greater personal fulfillment and satisfaction.
      There are several ways in which we can promote and maintain good mental well-being. These include:
      Practicing Self-Care: Taking care of ourselves is essential for good mental well-being. This includes engaging in activities that promote relaxation and stress reduction, such as meditation, yoga, or deep breathing exercises. It also involves getting enough sleep, eating a healthy diet, and staying physically active.
      Building Strong Relationships: Forming and maintaining healthy relationships is also important for good mental well-being. This can involve spending time with loved ones, participating in social activities, or joining a community group or club.
      Seeking Help When Needed: It's important to seek help from a mental health professional if we are struggling with our mental well-being. This can include talking to a therapist, counselor, or psychiatrist, who can provide guidance and support in managing mental health conditions.
      In conclusion, mental well-being is a critical aspect of our overall health and quality of life. It impacts how we think, feel, and behave, and can influence our ability to cope with life's challenges and achieve our goals. By promoting and maintaining good mental well-being, we can lead happier, healthier, and more fulfilling lives.
      `,
    image: Blog_Image,
    title: "Mental well-being: Why is it important and how can we promote it?",
    date: "12-Aug-2022",
    writer: "John Smith",
  },
  {
    id: 2,
    description: `Mental health illnesses are a common problem that affect millions of people around the world. From anxiety and depression to more severe conditions like bipolar disorder and schizophrenia, mental illnesses can have a profound impact on a person's quality of life. Early intervention for mental health illnesses is crucial for several reasons. In this blog, we will explore the importance of early intervention for mental health illnesses and how it can help individuals lead happier, healthier lives.
      Preventing the Development of Chronic Mental Health Conditions: Early intervention for mental health illnesses can help prevent the development of chronic mental health conditions. If left untreated, mental health conditions can worsen over time, leading to more severe symptoms and a higher risk of long-term disability. Early intervention can help individuals receive the support they need to manage their symptoms effectively, preventing the condition from becoming chronic.
      Improving the Effectiveness of Treatment: Early intervention can also improve the effectiveness of treatment for mental health illnesses. When mental health conditions are caught early, treatment is often more effective, and individuals are more likely to respond positively to interventions like therapy, medication, or a combination of both. This can help individuals recover more quickly and maintain better mental health over the long term.
      Enhancing Quality of Life: Mental health conditions can have a significant impact on a person's quality of life, affecting their ability to work, socialize, and participate in activities they enjoy. Early intervention can help individuals manage their symptoms more effectively, enabling them to lead more fulfilling lives. This can lead to improvements in overall well-being, social relationships, and work performance.
      Reducing the Risk of Suicide: Mental health conditions can increase the risk of suicide, especially if left untreated. Early intervention can help identify individuals who are at risk of suicide and provide them with the support they need to manage their symptoms effectively. This can reduce the risk of suicide and improve overall mental health outcomes.
      Reducing the Stigma of Mental Illness: Early intervention can also help reduce the stigma associated with mental illness. When mental health conditions are identified and treated early, individuals are less likely to experience the negative consequences of untreated mental illness, such as social isolation and discrimination. This can help reduce the stigma associated with mental illness and promote greater acceptance and understanding of mental health conditions.
      In conclusion, early intervention for mental health illnesses is critical for promoting better mental health outcomes. It can help prevent the development of chronic mental health conditions, improve the effectiveness of treatment, enhance quality of life, reduce the risk of suicide, and reduce the stigma associated with mental illness. By identifying and treating mental health conditions early, we can help individuals lead happier, healthier lives and reduce the burden of mental illness on individuals, families, and communities.
      `,
    image: Blog_Image,
    title: "Mental health illnesses and risk of suicide",
    date: "12-Aug-2022",
    writer: "John Smith",
  },
  {
    id: 3,
    description: `As the COVID-19 pandemic continues to impact our daily lives, we are beginning to understand the impact it is having on children's mental health. As a teacher, I have seen firsthand how the pandemic has affected my students' emotional well-being. In this blog, I will analyze the effects of COVID-19 on children's mental health and offer some strategies for supporting students during these challenging times.
      Disruption of Daily Routine: The COVID-19 pandemic has disrupted many aspects of children's daily routine, including school, extracurricular activities, and social interactions. This disruption can be particularly challenging for children, who thrive on structure and routine. As a result, some children may experience feelings of anxiety, stress, and confusion.
      Increased Screen Time: With many schools and activities moving online, children are spending more time in front of screens than ever before. This increased screen time can lead to a range of mental health issues, including anxiety, depression, and difficulty sleeping. As a teacher, I have noticed that some of my students are experiencing difficulty concentrating and may be more easily distracted than usual.
      Social Isolation: The COVID-19 pandemic has forced many children to isolate themselves from friends and family members. This isolation can be particularly challenging for children, who rely on social interactions to develop important social skills and build relationships. Some children may experience feelings of loneliness, depression, and anxiety as a result of social isolation.
      Increased Family Stress: The COVID-19 pandemic has placed significant stress on families, including financial stress, job loss, and homeschooling responsibilities. This increased stress can impact children's mental health, leading to feelings of anxiety, stress, and confusion.
      Anxiety About the Future: Many children are understandably anxious about the future, particularly about when the pandemic will end and when they will be able to return to a more normal routine. This anxiety can be particularly challenging for children who are already struggling with mental health issues.
      As a teacher, I believe that it is important to prioritize children's mental health during these challenging times. Here are some strategies that can be used to support students' mental health:
      Maintain Regular Contact: Teachers should maintain regular contact with their students to check in on their mental health and offer support. This contact can be via phone, email, or video conferencing.
      Provide Resources: Teachers should provide students and families with resources to support mental health, including information about counseling services and self-care strategies.
      Encourage Self-Care: Teachers should encourage students to practice self-care strategies, such as exercise, meditation, and getting enough sleep.
      Create a Positive Classroom Environment: Teachers should create a positive classroom environment that promotes open communication, empathy, and understanding.
      Be Flexible: Teachers should be flexible with their expectations and recognize that students may need additional support during this challenging time.
      In conclusion, the COVID-19 pandemic has had a significant impact on children's mental health, and it is important for teachers to prioritize mental health during these challenging times. By maintaining regular contact, providing resources, encouraging self-care, creating a positive classroom environment, and being flexible, teachers can help support their students' emotional well-being during the pandemic.
      `,
    image: Blog_Image,
    title:
      "Impact of COVID-19 on children's mental health, a teacher's viewpoint",
    date: "01-Dec-2023",
    writer: "Sharjil Hussain, CEO, Mental Support",
  },
  {
    id: 4,
    description: `Children spend a significant amount of their time in the education system, and teachers play a critical role in shaping the lives of their students. Beyond imparting academic knowledge, teachers are often the first line of defense when it comes to identifying students who may be experiencing mental distress.
      Teachers can observe changes in a student's behavior, such as changes in mood, motivation, and performance, that may indicate mental health issues. In fact, research suggests that teachers are often better at identifying mental health issues in their students than mental health professionals.
      Unfortunately, many teachers are not equipped with the tools they need to identify these signs and provide the necessary support. In this blog, we'll discuss how equipping teachers with the tools to identify signs of mental distress in students can help improve students' mental health.
      Mental health issues are more common among children and youth than many people realize. In fact, according to the Canadian Mental Health Association, 1 in 5 young Canadians experience a mental health issue at some point in their lives. Despite this, many students suffer in silence, often because they do not have access to the support they need.
      One of the reasons that students do not receive the support they need is that mental health issues can be difficult to identify. This is where teachers come in. Teachers are uniquely positioned to observe changes in their students' behavior and to identify signs of mental distress. However, many teachers do not receive the training they need to recognize these signs and to respond appropriately.
      Equipping teachers with the tools to identify signs of mental distress in students can have a profound impact on students' mental health. When teachers are able to identify signs of mental distress, they can take action to connect students with the support they need. This may involve referring students to school counselors or mental health professionals, or providing support and resources themselves.
      In addition, when teachers are equipped with the tools to identify signs of mental distress, they can take steps to prevent mental health issues from arising in the first place. This may involve creating a positive classroom environment, fostering strong relationships with students, and promoting mental health awareness and education.
      At Mental Support, we're working with teachers and schools to provide them with the training and tools they need to help in identifying signs of mental distress in their student populations. 
      Through deep analytics, we can assist schools in focusing on areas of concern and build a positive and inclusive environment for all students.
      In conclusion, equipping teachers with the tools to identify signs of mental distress in students is essential for improving students' mental health. By taking a proactive approach to mental health, teachers can create a safe and supportive environment for their students, and help them get the support they need to thrive. With the right training and resources, teachers can play a critical role in promoting mental well-being for students, both now and in the future.
      `,
    image: Blog_Image,
    title:
      "The Importance of training teachers to identify early signs of mental distress",
    date: "01-Dec-2023",
    writer: "Sharjil Hussain, CEO, Mental Support",
  },
  {
    id: 5,
    description: `Mental health is a critical aspect of our overall health and well-being, but unfortunately, access to mental health services can be limited due to financial constraints. In many cases, people are not able to access the mental health services they need because of high costs or a lack of insurance coverage. This is why insurance coverage for mental health services is so important.
      Having insurance coverage for mental health services can make a significant difference in a person's ability to access the care they need. Insurance coverage can help to offset the costs of therapy, medication, and other mental health treatments. This can be particularly important for people who require ongoing mental health services or those who need specialized care.
      Moreover, insurance coverage for mental health services can help to reduce the stigma surrounding mental health. By providing coverage for mental health services, insurance companies send a message that mental health is just as important as physical health. This can encourage more people to seek help when they need it and can help to reduce the stigma that often surrounds mental health issues.
      Insurance coverage for mental health services can also have broader benefits for society as a whole. By providing people with access to mental health services, we can improve overall mental health outcomes, reduce the burden of mental illness on families and communities, and increase productivity and economic growth.
      In conclusion, insurance coverage for mental health services is a critical component of ensuring that everyone has access to the care they need. At Mental Support, we’re advocating for better insurance coverage for mental health services so we can help to promote mental well-being and reduce the negative impacts of mental illness.
      `,
    image: Blog_Image,
    title: "The importance of insurance coverage for mental health services",
    date: "12-Aug-2022",
    writer: "John Smith",
  },
  {
    id: 6,
    description: `Mental health is an essential aspect of overall health and well-being. However, many people around the world struggle to access the mental health services they need. This can be due to a variety of factors, including a shortage of mental health professionals, lack of insurance coverage, and stigma surrounding mental illness.
      At Mental Support, we're leveraging technology to develop a scalable mental health services platform. Through our interactive platform, we provide people with easy access to a range of mental health services, including counseling, therapy, and psychiatric care. By leveraging technology, Mental Support intends to increase access and deliver superior mental health services to a large number of people, regardless of their geographic location or financial situation.
      One of our key focuses is to provide care to people in remote or underserved areas. In many parts of the world, there is a shortage of mental health professionals, which makes it difficult for people to access the care they need. Mental Support addresses this challenge through technology  by connecting people with mental health professionals remotely, through video or phone consultations.
      We understand that each patient is unique in their needs which is why we provide tailored care to individuals. By using data and algorithms, our platform can identify a person's specific mental health needs and recommend personalized treatment options. This can help ensure that people receive the care that is most effective for their unique situation.
      We strongly feel about reducing the stigma around accessing mental health services. By providing access to mental health services in a private and confidential manner, we  envision improved access for people who need help for mental health issues. This can lead to increased awareness and understanding of mental health, which can help reduce the stigma surrounding mental illness.
      In conclusion, we believe using technology responsibly has the potential to provide people with easy access to a range of mental health services. By leveraging technology, Mental Support can reach a large number of people, provide tailored care, and help reduce the stigma surrounding mental illness. As mental health continues to be an essential aspect of overall health, we will continue to make improvements and enhancements to our platform to ensure our patients receive the care they need. 
      `,
    image: Blog_Image,
    title: "Using technology to improve access to mental health services",
    date: "01-Dec-2023",
    writer: "Asif Iqbal, Chief Strategy Officer, Mental Support",
  },
  {
    id: 7,
    description: `The UN charter on universal access to mental health services is important for several reasons:
      It recognizes mental health as a fundamental human right: The charter recognizes that access to mental health services is a basic human right, and that all people should have the right to access these services without discrimination.
      It promotes the availability and accessibility of mental health services: The charter emphasizes the importance of ensuring that mental health services are available, accessible, and affordable to all people, regardless of their socioeconomic status, location, or background.
      It advocates for the integration of mental health services into primary healthcare systems: The charter recognizes that mental health is an integral part of overall health and wellbeing, and emphasizes the need to integrate mental health services into primary healthcare systems to ensure that people can access these services easily and efficiently.
      It promotes mental health literacy and awareness: The charter recognizes the importance of promoting mental health literacy and awareness to reduce the stigma associated with mental illness and encourage people to seek help when they need it.
      It encourages investment in mental health research and data collection: The charter emphasizes the importance of investing in mental health research and data collection to inform evidence-based policy decisions and improve the quality of mental health services.
      Overall, the UN charter on universal access to mental health services is an important step towards promoting mental health as a fundamental human right and ensuring that all people have access to the mental health services they need to live healthy, fulfilling lives. At Mental Support, we’re integrating the UN Charter in our core working principles by promoting the availability and accessibility of mental health services through our state of the art platform. We’re also working with governments, policy makers and decision makers to integrate mental health services into primary healthcare systems. We're investing in mental health research and data collection. 
      By integrating the charter in our core working principles, we have the potential to improve the lives of millions of people around the world!
      `,
    image: Blog_Image,
    title:
      "The importance of the UN Charter on Universal Access to Mental Health Services",
    date: "01-Dec-2023",
    writer: "Rajiv Aggarwal, COO, Mental Support",
  },
];

export const contributors: IContributors[] = [
  {
    id: 1,
    articles: 2,
    name: "Sharjil Hussain, CEO, Mental Support",
  },
  {
    id: 2,
    articles: 1,
    name: "Asif Iqbal, Chief Strategy Officer, Mental Support",
  },
  {
    id: 3,
    articles: 1,
    name: "Rajiv Aggarwal, COO, Mental Support",
  },
  {
    id: 4,
    articles: 1,
    name: "M Lashari, Chief Insurance Officer, Mental Support",
  },
  {
    id: 5,
    articles: 1,
    name: "Dr. Anshul Kulkarni, Clinical Psychologist, Mental Support",
  },
  {
    id: 6,
    articles: 1,
    name: "Fariya Altaf, Chief Learning Officer, Mental Support",
  },
];

export const teams: ITeam[] = [
  {
    id: 1,
    name: "Sharjil Hussain",
    designation: "CEO",
    image: Team_sharjil,
  },
  {
    id: 2,
    name: "Rajiv Aggarwal",
    designation: "COO",
    image: Team_rajiv,
  },
  {
    id: 4,
    name: "Abdul Wahab Lashari",
    designation: "CIO",
    image: Team_lashari,
  },
  {
    id: 5,
    name: "Asif Iqbal",
    designation: "CSO",
    image: Team_asif,
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

export const countryList = [
  "Afghanistan",
  "Åland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas (the)",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational State of)",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory (the)",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands (the)",
  "Central African Republic (the)",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands (the)",
  "Colombia",
  "Comoros (the)",
  "Congo (the Democratic Republic of the)",
  "Congo (the)",
  "Cook Islands (the)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic (the)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands (the) [Malvinas]",
  "Faroe Islands (the)",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories (the)",
  "Gabon",
  "Gambia (the)",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See (the)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (the Democratic People's Republic of)",
  "Korea (the Republic of)",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic (the)",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands (the)",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova (the Republic of)",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands (the)",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger (the)",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands (the)",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines (the)",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Romania",
  "Russian Federation (the)",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan (the)",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan (Province of China)",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands (the)",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates (the)",
  "United Kingdom of Great Britain and Northern Ireland (the)",
  "United States Minor Outlying Islands (the)",
  "United States of America (the)",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela (Bolivarian Republic of)",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];
// export const baseUrl = "http://localhost:5000";
export const baseUrl = "https://mentalsupport.ca:6060";
