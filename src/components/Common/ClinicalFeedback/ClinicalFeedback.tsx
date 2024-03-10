import { Image } from "react-bootstrap";
import DoctorImg from "./../../../assets/images/Doctor_detail.svg";
import "./clinical.css";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router-dom";
import AppointmentSuccessfulModal from "../../ViewPrescriptionModal";
import { formatted_Date } from "../../../global_func";
import { FaFileLines } from "react-icons/fa6";
const ClinicalFeedback = ({
  setModalShow,
  onClick,
  date,
  attachment,
  item,
}: any) => {
  const handleClick = () => {
    setModalShow(item);
  };
  return (
    <div className="clinical-feedback border rounded p-3">
      <div className="w-100 h-100">
        <div className="d-flex justify-content-end">
          {/* <small className="text-muted">09-09-2023</small> */}
          {/* <small className="text-muted">{item.updated_date}</small> */}
          <small
            className="text-muted"
            style={{
              fontSize: "12px",
              color: "#778690",
              lineHeight: "18px",
            }}
          >
            {formatted_Date(item.updated_date)}
          </small>
        </div>
        <div className="d-flex flex-column border-bottom align-items-center">
          <div
            className="d-flex justify-content-center align-items-center my-3"
            style={{ width: 115, height: 115 }}
          >
            {/* <Image src={DoctorImg} roundedCircle className="w-100 h-100" /> */}
            <div
              style={{ backgroundColor: "#EBF1F6" }}
              className="d-flex justify-content-center align-items-center w-100 h-100 rounded-circle"
            >
              <FaFileLines style={{ color: "#3773A9" }} className="w-50 h-50" />
            </div>
          </div>
          <div className="my-1">Clinical Feedback</div>
          <small className="mb-2 text-muted" 
            style={{
              fontSize: "14px",
              color: "#778690",
              lineHeight: "22px",
            }}
          >2 Attachment Files</small>
        </div>
        <div className="d-flex pt-3 px-3 justify-content-center">
          <Button
            onClick={handleClick}
            className="p-0 rounded w-100 py-2"
            variant="secondary"
            title="View Details"
          />
          {/* <button
          className="border-0 "
          style={{ backgroundColor: "transparent" }}
        >
          View Details
        </button> */}
        </div>
      </div>
    </div>
  );
};

export default ClinicalFeedback;
