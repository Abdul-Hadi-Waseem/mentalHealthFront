import { socialIcons } from "../constants/constants";

const StayInTouch = () => {
  return (
    <div className="text-center py-3 px-4 search__box mt-4">
      <h5>Stay In Touch</h5>
      <hr
        className="my-4"
        style={{ width: "100%", opacity: "0.1", borderBottom: "1px" }}
      />
      <div className="social__icons d-flex justify-content-center">
        {socialIcons.map((socialIcon) => {
          return (
            <a key={socialIcon.id} href={socialIcon.link}>
              <img src={socialIcon.src} alt={socialIcon.name} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default StayInTouch;
