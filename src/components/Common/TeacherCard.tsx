import { useState } from "react";
import SideBar from "../SideBar";
import { useNavigate } from "react-router-dom";

type TeacherCardProps = {
  name: string;
  img: string | File | any;
  btnTitle: string;
  handleUserProfile: () => void;
};

const TeacherCard = ({
  img,
  handleUserProfile,
  name,
  btnTitle,
}: TeacherCardProps) => {
  const navigate = useNavigate();
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);

  const handleClick = () => {
    handleUserProfile();
  };

  const viewProfilePath = [
    "/doctor-dashboard",
    "/patient-dashboard",
    "/patients-history",
    "/all-doctors",
  ];

  return (
    <div className="select_doctor_card mb-3">
      <div
        className="doctor_img "
        onClick={handleClick}
        style={{ width: "100px", objectFit: "contain" }}
      >
        <img
          src={img}
          alt="doctor"
          style={{ width: "100%", borderRadius: "100%" }}
        />
      </div>
      <div className="info_container">
        {/* <p className="doctor_name">Dr. Bessie Cooper</p> */}
        <p className="doctor_name">
          {name.length > 15 ? name.slice(0, 15) + "..." : name}
        </p>
        <p className="doctor_designation">Teacher</p>
      </div>
      <hr className="form_separator" style={{ margin: "10px 0px" }} />
      <button className="doctor_card_btn text-center" onClick={handleClick}>
        {/* View Profile{" "} */}
        {btnTitle}
      </button>
    </div>
  );
};

export default TeacherCard;
