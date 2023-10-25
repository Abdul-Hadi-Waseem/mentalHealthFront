import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import config from "../configs/config";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const footerVisibleRoutes = [
    "/",
    "/blog-detail",
    "/contactUs",
    "/blog",
    "/whatWeTreat",
    "/about",
  ];
  const headerNotVisibleRoutes = [
    "/institute-dashboard",
    "/teacher-dashboard",
    "/teacher/detail/:id",
    "/doctor-dashboard",
    "/doctor-details",
    "/upcoming-appointments",
    "/conducted-appointments",
    "/patients-history",
    "/patient-details",
    "/patient-dashboard",
    "/patient-myvisits",
    "/all-doctors",
    "/set-schedule",
    "/patient-prescriptions",
    "/profile",
    "/change-password",
    "/privacy-policy",
    "/terms-conditions",
    "/select-doctor",
    "/doctor-detail",
    "/student-dashboard",
  ];

  const isFooterVisible = footerVisibleRoutes.includes(location.pathname);
  // const isHeaderVisible = headerNotVisibleRoutes.includes(location.pathname);

  const isHeaderVisible =
    headerNotVisibleRoutes.some((route) => location.pathname.includes(route)) ||
    location.pathname.startsWith("/teacher/detail/");

  // console.log("deployment date", moment().format("DD-MM-YYYY hh:mm:ss"));
  // console.log("front_end deployment", "26-09-2023 11:21:50");
  // console.log("front_end deployment", "26-09-2023 04:14:59");
  // console.log("front_end deployment", "28-09-2023 04:21:17");
  // console.log("front_end deployment", "29-09-2023 01:59:47");
  // console.log("front_end deployment", "29-09-2023 07:24:50");
  // console.log("front_end deployment", "30-09-2023 09:09:54");
  console.log("front_end deployment", "02-10-2023 05:39:42");

  useEffect(() => {
    (async () => {
      try {
        const res_connection = await axios.get(
          `${config.base_url}/check_connection`
        );
        console.log("check_connection new backend", res_connection.data.date);
      } catch (e) {
        console.log("check_connection new backend error", e.message);
      }
    })();
  }, []);

  return (
    <>
      {!isHeaderVisible && <Header />}
      {children}
      {isFooterVisible && <Footer />}
    </>
  );
};

export default AppLayout;
