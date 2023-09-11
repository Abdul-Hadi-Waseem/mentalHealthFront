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
    "/doctor-dashboard",
    "/upcoming-apointments",
    "/patients-history",
    "/patient-details",
    "/patient-dashboard",
    "/patient-myvisits"
  ];

  const isFooterVisible = footerVisibleRoutes.includes(location.pathname);
  const isHeaderVisible = headerNotVisibleRoutes.includes(location.pathname)
  // console.log("deployment date", moment().format("DD-MM-YYYY hh:mm:ss"))
  console.log("front_end deployment", "10-09-2023 04:14:04 pm")
  useEffect(() => {
    (async()=>{
      try {
        const res_connection = await axios.get(`${config.base_url}/check_connection`)
        console.log("check_connection new backend", res_connection.data.date)        
      } catch (e) {
        console.log("check_connection new backend error", e.message)
      }
    })()   
  }, [])
  

  return (
    <>
      {!isHeaderVisible && <Header />}
      {children}
      {isFooterVisible && <Footer />}
    </>
  )
}

export default AppLayout
