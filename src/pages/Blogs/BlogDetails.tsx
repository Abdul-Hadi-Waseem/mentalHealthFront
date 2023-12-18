import { Col, Container, Row } from "react-bootstrap";
import Avatar from "../../assets/images/avatar1.png";
import { socialIcons } from "../../constants/constants";
import BlogImage from "../../assets/images/blog_image.png";
import CommentForm from "../../components/Forms/CommentForm";
import SearchComponent from "../../components/Search";
import RecentPosts from "../../components/RecentPosts";
import StayInTouch from "../../components/StayInTouch";
function BlogDetails() {
  return (
    <Container className="blog__detail">
      <Row className="g-5">
        <Col lg={8}>
          <h2>Aenean egestas libero.</h2>
          <Row className="align-items-center justify-content-between py-3">
            <Col className="d-flex align-items-center">
              <img src={Avatar} />
              <span className="ps-3 d-flex flex-column">
                <h5 className="blog__detail__name">John smith</h5>
                <h5 className="blog__detail__extras">
                  January 19, 2022 — 3 minutes read
                </h5>
              </span>
            </Col>
            <Col className="social__icons d-flex justify-content-end">
              {socialIcons.map((socialIcon) => {
                return (
                  <a key={socialIcon.id} href={socialIcon.link}>
                    <img src={socialIcon.src} alt={socialIcon.name} />
                  </a>
                );
              })}
            </Col>
          </Row>
          <img src={BlogImage} className="w-100" />
          <h5 className="pt-5 pb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </h5>
          <p className="pb-3">
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum Anteger
            venenatis hendrerit quam nec ultrices. Vestibulum vehicula dui
            venenatis neque tempor, accumsan iaculis sapien ornare. Sed at ante
            porta, ullamcorper massa eu, ullamcorper sapien. Duis sapien eros,
            laoreet ac tempus ut, auctor vel nulla. Nunc tincidunt, risus eu
            congue gravida, ligula dolor sodales felis, in finibus nunc est quis
            leo. Mauris accumsan ante mi, venenatis porta nunc dignissim eu.
            Vestibulum quis tincidunt massa. Donec pretium tortor augue. Integer
            egestas ut tellus sed pretium. Nullam tristique augue ut mattis
            vulputate. Duis et lorem in odio ultricies porttitor. Nulla maximus
            diam turpis, et suscipit tortor fermentum in. Aliquam fringilla,
            lacus a iaculis porta, lectus nulla facilisis enim, ac volutpat
            velit eros quis dolor. Praesent tortor neque, feugiat eget ante et,
            placerat fermentum metus.
          </p>
          <h5 style={{ fontWeight: "500" }}>Comments</h5>

          <CommentForm />
        </Col>
        <Col>
          <SearchComponent />
          <RecentPosts />
          <StayInTouch />
        </Col>
      </Row>
    </Container>
  );
}

export default BlogDetails;
