import React, { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { useLocation } from "react-router-dom";
import moment from "moment";
import axios, { Axios } from "axios";
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
    "/teacher/detail/:id",
    "/doctor-dashboard",
    "/doctor-details",
    "/upcoming-apointments",
    "/patients-history",
    "/patient-details",
    "/patient-dashboard",
    "/patient-myvisits",
    "/all-doctors",
    "/set-schedule",
    "/patient-prescriptions",
    "/patient-profile",
  ];

  const isFooterVisible = footerVisibleRoutes.includes(location.pathname);
  // const isHeaderVisible = headerNotVisibleRoutes.includes(location.pathname);

  const isHeaderVisible =
    headerNotVisibleRoutes.some((route) => location.pathname.includes(route)) ||
    location.pathname.startsWith("/teacher/detail/");

  console.log("deployment date", moment().format("DD-MM-YYYY hh:mm:ss"));
  // console.log("front_end deployment", "15-09-2023 01:51:24");

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
