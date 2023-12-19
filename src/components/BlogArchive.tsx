import Calender from "../assets/icons/calender.svg";
import Avatar from "../assets/icons/avatar.svg";
import Button from "./Common/Buttons/Button";
import { useNavigate } from "react-router-dom";

interface BlogProps {
  description: string;
  showDescription: boolean;
  showButton: boolean;
  image: string;
  title: string;
  date: string;
  writer: string;
}

function BlogArchive({
  description,
  showDescription,
  showButton,
  image,
  title,
  date,
  writer,
}: BlogProps) {
  const trimmedDescription = showDescription
    ? description.split(" ").slice(0, 30).join(" ") + "..."
    : "";

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/blog-detail");
  };

  const calculateTimeAgo = (inputDate: string): string => {
    const currentDate = new Date();
    const postDate = new Date(inputDate);
    const timeDifference = currentDate.getTime() - postDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const weeksDifference = Math.floor(daysDifference / 7);
    let result = "";
    if (weeksDifference > 0) {
      result = weeksDifference + "w ago";
    } else {
      result = daysDifference + "d ago";
    }

    return result;
  };

  return (
    <div
      className="d-flex flex-column px-2 pt-2 pb-4 blog__box mx-2"
      style={{ height: "350px" }}
    >
      <div className="text-end">
        <span className="blog__read__time">2 Min Read</span>
      </div>
      <img src={image} className="w-100 blog__image" alt="Blog Image" />
      <span className="blog__title pt-3">{title}</span>
      <hr />
      {showDescription && (
        <div className="blog__description pb-3">{trimmedDescription}</div>
      )}
      <div className="d-flex align-items-center pb-3">
        <div className="d-flex align-items-center" style={{ width: "100%" }}>
          <img src={Calender} alt="Calendar Icon" />
          <span className="blog__date ps-1">{calculateTimeAgo(date)}</span>
        </div>
        <div className="ps-4 d-flex align-items-center">
          <img src={Avatar} alt="Avatar Icon" />
          <span className="blog__writer ps-2">{writer}</span>
        </div>
      </div>
      {showButton && (
        <Button title="Read More" className="blog__btn" onClick={handleClick} />
      )}
    </div>
  );
}

export default BlogArchive;
