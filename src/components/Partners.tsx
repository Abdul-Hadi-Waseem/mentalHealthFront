import { Container, Modal, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { partners } from "../constants/constants";
import Comma from "../assets/images/comma.png";
import Stars from "../assets/images/stars.png";

interface Ipartners {
  id: number;
  name: string;
  designation: string;
  description: string;
  avatar: string;
}

function Partners() {
  const [activePartner, setActivePartner] = useState<number | null>(
    partners[0]?.id || null
  );
  const [selectedPartner, setSelectedPartner] = useState<Ipartners | null>(
    partners[0] || null
  );
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  const handleClick = (partnerId: number, partner: Ipartners) => {
    setActivePartner(partnerId);
    setSelectedPartner(partner);
  };

  const [showModal, setShowModal] = useState(false);

  const handleReadMoreClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="partners__section">
      <Row>
        <Col sm={12} lg={6}>
          <h2>
            See what Partners <br />
            are <span className="hero__txt__green">saying</span>
          </h2>
          <div className="pt-3">
            {partners.map((partner) => {
              return (
                <div
                  key={partner.id}
                  className={`partner__box mb-3 ${
                    partner.id === activePartner ? "active" : ""
                  }`}
                  onClick={() => handleClick(partner.id, partner)}
                >
                  <div className="d-flex align-items-center justify-content-between px-4 py-3">
                    <div className="d-flex align-items-center">
                      <img src={partner.avatar} alt={partner.name} />
                      <div className="d-flex flex-column ps-3">
                        <span className="partner__name">{partner.name}</span>
                        <span className="partner__des">
                          {partner.designation}
                        </span>
                      </div>
                    </div>
                    <div className="text-end">
                      <img src={Comma} alt="Comma" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
        <Col sm={12} lg={6}>
          {selectedPartner && (
            <div className="partner__desctription py-5 px-5">
              <div className="d-flex align-items-center justify-content-between py-3">
                <div className="d-flex align-items-center">
                  <img
                    src={selectedPartner.avatar}
                    alt={selectedPartner.name}
                  />
                  <div className="d-flex flex-column ps-3">
                    <span className="partner__name">
                      {selectedPartner.name}
                    </span>
                    <span className="partner__des">
                      {selectedPartner.designation}
                    </span>
                  </div>
                </div>
                <div className="text-end">
                  <img src={Comma} alt="Comma" />
                </div>
              </div>
              <img src={Stars} className="" />
              <p className="pt-4">
                {truncateDescription(selectedPartner.description, 550)}
                {selectedPartner.description.length > 550 && (
                  <span>
                    <br />
                    <a onClick={handleReadMoreClick} style={{ color: "blue" }}>
                      Read More
                    </a>
                  </span>
                )}
              </p>
            </div>
          )}
        </Col>
      </Row>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPartner.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedPartner.avatar} alt={selectedPartner.name} />
          <p>{selectedPartner.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Partners;
