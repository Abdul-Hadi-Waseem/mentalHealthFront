import { useState } from "react";
import SideBar from "../SideBar";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ img, doctor_details }: any) => {
  let { name, 
    clinic_experience,
    day,
    description,
    doctor_id,
    end_time,
    specialities,
    start_time,
    uid,
   } = doctor_details;
  const navigate = useNavigate();
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleClick = () => {
    sessionStorage.setItem(
      "currentDoctorDetails",
      JSON.stringify(doctor_details)
    );
    navigate("/doctor-detail");
    // handleUserProfile()
  };

  return (
    <div className="select_doctor_card">
      <div className="doctor_img" onClick={handleClick}>
        <img src={img} alt="doctor" />
      </div>
      <div className="info_container">
        {/* <p className="doctor_name">Dr. Bessie Cooper</p>
        <p className="doctor_designation">Psychiatrist</p> */}
        <p className="doctor_name">{name}</p>
        <p className="doctor_designation">{specialities}</p>
      </div>
      <hr className="form_separator" style={{ margin: "10px 0px" }} />
      <button className="doctor_card_btn text-center" onClick={handleClick}>
        {" "}
        View Profile{" "}
      </button>
      {/* <SideBar
        placement={"end"}
        name={"end"}
        show={showOffCanvas}
        onHide={handleCloseOffCanvas}
      /> */}
    </div>
  );
};

export default DoctorCard;
