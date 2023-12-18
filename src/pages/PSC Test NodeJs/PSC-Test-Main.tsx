import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./psctest.css";
import image1 from "../../assets/images/heroimg_step1.png";
import image2 from "../../assets/images/heroimg_step2.png";
import image3 from "../../assets/images/heroimg_step3.png";
import image4 from "../../assets/images/heroimg_step4.png";
import Button from "../../components/Common/Buttons/Button";
import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

const images = [
  image1, // Replace with your image URLs
  image2,
  image3,
  image4,
];

const HeroSectionNodeJs: React.FC = () => {
  const formContent = [
    {
      paragraph:
        "We are so pleased to help you today. Before we start, let us explore how we will go ahead.",
      button: {
        text: "Next",
      },
    },
    {
      paragraph:
        "We are human beings and its okay to have different emotions at different times, however sometimes its good and sometimes bad.",
      button: {
        text: "Next",
      },
    },
    {
      paragraph:
        "We will help you to stay focused, feel motivated and finish your day at a positive note.",
      button: {
        text: "Next",
      },
    },
    {
      paragraph:
        "You may have to answer few easy questions to design a well being program for you.  Are You Ready?",
      buttons: [
        {
          text: "No",
          type: "secondary",
          onClick: () => {
            // Add your custom onClick logic here for Button 1
          },
        },
        {
          text: "Yes",
          // type: "success",
          onClick: () => handleClick(),
          // Add your custom onClick logic here for Button 2
        },
      ],
    },
  ];

  const navigate = useNavigate();

  function handleClick() {
    navigate("/psc-test-quiz-node");
  }

  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => (prevStep + 1) % images.length);
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const renderStepperForm = () => {
    const currentForm = formContent[currentStep];
    return (
      <div className="stepper-form">
        <div className="form-content">
          <p>{currentForm.paragraph}</p>
        </div>
        <div className="d-flex justify-content-between flex-column align-items-center">
          <div className="stepper-dots">
            {images.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentStep ? "active" : ""}`}
                onClick={() => handleStepClick(index)}
              />
            ))}
          </div>

          {Array.isArray(currentForm.buttons) ? (
            <div className="stepper-buttons">
              {currentForm.buttons.map((button, index) => (
                <Button
                  className="stepper-btn me-3 mb-3"
                  variant={button.type}
                  key={index}
                  title={button.text}
                  onClick={button.onClick}
                />
              ))}
            </div>
          ) : (
            <div className=" text-center">
              <Button
                className="stepper-btn"
                title={currentForm.button?.text}
                onClick={handleNextStep}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Container
      fluid
      className="hero-section px-3 background-image"
      style={{
        backgroundImage: `url(${images[currentStep]})`,
        objectFit: "cover",
        marginTop: "7rem",
      }}
    >
      <Row
        className="step-form justify-content-md-start "
        style={{ overflow: "hidden" }}
      >
        <Col lg={4} sm={12} className="p-0">
          {renderStepperForm()}
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSectionNodeJs;
