import Header_Bg from "../../assets/images/aboutus-header.svg";

interface HeadingProps {
  title: string;
}

const Heading = ({ title }: HeadingProps) => {
  return (
    <div className="heading__bg">
      <div className="div-2">
        <div className="overlap">
          <img className="rectangle" alt="Rectangle" src={Header_Bg} />
          <h2 className="heading">{title}</h2>
        </div>
      </div>
    </div>
  );
};
export default Heading;
