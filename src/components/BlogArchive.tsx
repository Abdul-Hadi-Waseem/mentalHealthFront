// import React from "react";
import Calender from "../assets/icons/calender.svg";
import Avatar from "../assets/icons/avatar.svg";
// import Blog_Image from "../assets/images/blogs/blog_1_img.png";
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
  return (
    <div className="d-flex flex-column px-2 pt-2 pb-4 blog__box mx-2">
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
        <div className="d-flex align-items-center">
          <img src={Calender} alt="Calendar Icon" />
          <span className="blog__date ps-2">{date}</span>
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
