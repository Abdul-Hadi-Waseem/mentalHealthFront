import Heading from "../../components/Common/Heading";
import Depression from "../../components/Depression";
import "./WhatWeTreat.css";
import Dep_Img from "../../assets/images/dep_img.png";
import Symptoms from "../../components/Symptoms";
import Treatment from "../../components/Treatment";
import Appointment from "../../components/Appointment";

function WhatWeTreat() {
  return (
    <>
      <Heading title="Depression" />
      <Depression />
      <div className="dep__img text-center py-5 ">
        <img src={Dep_Img} className="img-fluid px-2" alt=""/>
      </div>
      <Symptoms />
      <Treatment />
      <Appointment />
    </>
  );
}

export default WhatWeTreat;
