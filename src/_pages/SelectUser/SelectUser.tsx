import { Col, Container, Row } from "react-bootstrap";
import { users } from "../../constants/constants";
import "./SelectUser.css";
import { useNavigate } from "react-router-dom";

function SelectUser() {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <Container className="text-center py-5 px-4 select__user__section">
      <h5>Select User</h5>
      <h1 className="py-4">
        Welcome to <br /> <span className="txt__green">Mental Support</span> 👋
      </h1>
      <Row className="user__section">
        {users.map((user) => {
          // Check if user.path is defined before invoking handleClick
          const isPathDefined = typeof user.path === "string";

          return (
            <Col
              key={user.id}
              className="user__box py-5 px-4"
              lg={3}
              sm={12}
              onClick={
                isPathDefined ? () => handleClick(user.path!) : undefined
              }
            >
              <h5 className="text-start text-white">{user.heading}</h5>
              <div className="text-center">
                <img
                  src={user.image}
                  className="user__image"
                  alt={user.heading}
                />
              </div>
            </Col>
          );
        })}
      </Row>
      <p className="copyright mt-5">
        © 2023 Mental Support. All rights reserved, Privacy Policy and Terms of
        Use
      </p>
    </Container>
  );
}

export default SelectUser;
