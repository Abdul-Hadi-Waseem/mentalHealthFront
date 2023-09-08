import { useState } from "react";
import SideBar from "../SideBar";
import { useNavigate } from "react-router-dom";

const UserCard = ({ img,handleUserProfile, userDetails}: any) => {
  const navigate = useNavigate();
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  let {name, treat} = userDetails;
  const handleClick = () => {
    // navigate("/doctor-detail");
    console.log("handleclick")
    handleUserProfile()
  };
  return (
    <div className="select_doctor_card">
      <div className="doctor_img" onClick={handleClick}>
        <img src={img} alt="doctor" />
      </div>
      <div className="info_container">
        {/* <p className="doctor_name">Dr. Bessie Cooper</p> */}
        <p className="doctor_name">{name.length > 15 ? name.slice(0,15)+ "...": name}</p>
        <p className="doctor_designation">{treat}</p>
      </div>
      <hr className="form_separator" style={{ margin: "10px 0px" }} />
      <button className="doctor_card_btn text-center" onClick={handleClick}>
        {" "}
        View Profile{" "}
      </button>

    </div>
  );
};

export default UserCard;
