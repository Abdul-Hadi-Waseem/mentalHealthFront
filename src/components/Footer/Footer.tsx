import Container from "react-bootstrap/esm/Container";
import logo from "../../assets/images/logo.svg";
import { Link, useMatch } from "react-router-dom";
import { appRoutes, socialIcons } from "../../constants/constants";
import "./Footer.css";
import Copyright from "./Copyright";
import arrowImage from "../../assets/icons/footer_icon.svg";

function Footer() {
  return (
    <div className="footer">
      <Container className="d-flex flex-column align-items-center footer__top">
        <img src={arrowImage} alt="arrow" className="footer__arrow" />
        <div>
          <Link to="/">
            <img alt="logo" src={logo} />
          </Link>
        </div>
        <div className="footer__links d-flex flex-lg-row flex-column text-center">
          {appRoutes.map((route) => {
            if (route.visible) {
              return (
                <Link
                  key={route.id}
                  to={route.path}
                  className={useMatch(route.path) ? "active" : ""}
                >
                  {route.name}
                </Link>
              );
            }
            return null; // Skip rendering the route if `route.visible` is false
          })}
        </div>
        <div className="social__icons d-flex">
          {socialIcons.map((socialIcon) => {
            return (
              <a key={socialIcon.id} href={socialIcon.link}>
                <img src={socialIcon.src} alt={socialIcon.name} />
              </a>
            );
          })}
        </div>
      </Container>
      <Copyright />
    </div>
  );
}

export default Footer;
