import { MouseEventHandler } from "react";
import BackBtn from "../../../assets/icons/back.svg";

type Props = {
  onClick?: MouseEventHandler;
  className?: string;
};

const BackButton = (props: Props) => {
  return (
    <span className="d-flex align-items-center" onClick={props.onClick} style={{cursor: "pointer", width: "max-content"}}>
      <img src={BackBtn} />
      <span className="ps-2" style={{color: "#243D4C", fontSize: "16px", fontWeight: 500}}>Back</span>
    </span>
  );
};

export default BackButton;
