// import { MouseEventHandler } from "react";
// import Image from "react-bootstrap/Image";

interface propsType {
  icon?: string;
  heading?: string;
  className?: string;
  description?: string;
}
const Services = ({ icon, heading, className, description }: propsType) => {
  return (
    <div className={`service__box ${className} pt-5 pb-3 ps-4 pe-5`}>
      <img src={icon} />
      <h4 className="pt-5">{heading}</h4>
      {description ? <p>{description}</p> : ""}
    </div>
  );
};

export default Services;
