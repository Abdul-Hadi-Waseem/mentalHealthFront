import React, { useCallback, useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import "./psctestquiz.css";
import Button from "../../components/Common/Buttons/Button";
import BackButton from "../../components/Common/Buttons/BackButton";
import Copyright from "../../components/Footer/Copyright";
import { Navigate, useNavigate } from "react-router-dom";
import { useProgramdataMutation } from "../../gql/generated";
import axios from "axios";
import { getToken } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import config from "../../configs/config";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { setUserInformation } from "../../store/slices/UserSlice";

interface QuizAnswer {
  question: string;
  answer: string;
}

const PSC_Test_Quiz: React.FC = () => {
  const reduxUserState = useSelector(
    (state: any) => state.currentUserInformation
  );
  const dispatch = useDispatch();
  const [formId, setFormId] = useState(0);
  const navigate = useNavigate();

  const [loader, setLoader] = useState<Boolean>(false);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [result, executeMutation] = useProgramdataMutation();
  const [score, setScore] = useState("");

  const loadQuestions = useCallback(async (age: string | null) => {
    let questionSet;
    if (age && Number(age) < 18) {
      setFormId(22);
      questionSet = await import(
        "../../assets/jsons/psc-child-assessment.json"
      );
    } else {
      setFormId(23);
      questionSet = await import(
        "../../assets/jsons/psc-youth-assessments.json"
      );
    }

    setQuestions(questionSet);
  }, []);

  useEffect(() => {
    const age = localStorage.getItem("age");
    loadQuestions(age);
  }, []);

  if (!questions) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(e.target.value);
  };

  const handleRadioClick = (option) => {
    setSelectedAnswer(option);
  };

  console.log(answers, "Selected Answers");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnswer: QuizAnswer = {
      question: questions.questions[currentQuestion].questions,
      answer: selectedAnswer!,
    };
    setAnswers((prev) => [...prev, newAnswer]);
    if (currentQuestion < questions.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
    // } else if (score?.score) {
    //   // setShowModal(true); // show modal when form is submitted
    // }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // navigate("/"); // navigate to /home when "Exit" button is clicked
    navigate("/patient-dashboard"); // navigate to /dashboard when "Exit" button is clicked
  };

  const handleConsult = () => {
    console.log(answers); // print answers when "Consult" button is clicked
    navigate("/schedule-appointment");
    setShowModal(false);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const previousAnswer = answers.find(
        (ans) => ans.question === questions.questions[currentQuestion].question
      );
      setSelectedAnswer(previousAnswer?.answer || null);
    } else if (currentQuestion === 0) navigate(-1);
  };

  const dataSubmit = () => {
    executeMutation({
      Data: {
        formId: formId,
        metadata: answers,
      },
    }).then((res) => {
      setScore(res.data?.programform.data);
    });
  };

  return loader ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "90vh",
        width: "100%",
      }}
    >
      <Spinner animation="border" role="status" style={{ color: "#5E9CD3" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <div className="main-container">
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <Form
          onSubmit={handleSubmit}
          className="p-4 shadow bg-white rounded form-container"
        >
          <div className="d-flex justify-content-between mb-4">
            <BackButton onClick={goBack} />
            <span className="steps">
              Step {currentQuestion + 1}/{questions.questions.length}
            </span>
          </div>
          <p className="quiz-question mb-4">
            {questions.questions[currentQuestion].questions}
          </p>
          {questions.questions[currentQuestion].options.map(
            (option: string, i: number) => (
              <div
                key={i}
                className="mb-3"
                onClick={() => handleRadioClick(option)}
              >
                <Form.Check
                  type="radio"
                  id={`default-radio-${currentQuestion}-${i}`}
                  label={option}
                  value={option}
                  name={questions.questions[currentQuestion].question}
                  checked={selectedAnswer === option}
                  onChange={handleChange}
                  className={`optionRadio text-primary ${
                    selectedAnswer === option ? "selected" : ""
                  }`}
                />
              </div>
            )
          )}
          <Button
            onClick={() =>
              currentQuestion < questions.questions.length - 1
                ? null
                : dataSubmit()
            }
            title={
              currentQuestion < questions.questions.length - 1
                ? "Next"
                : "Submit"
            }
            className="w-100"
            disabled={selectedAnswer ? false : true}
          />
        </Form>
      </div>
      <Copyright />
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="d-flex align-items-center justify-content-center"
      >
        <Modal.Body className="d-flex flex-column justify-content-center py-3 px-4">
          <span className="modal-title">PSC Test</span>
          <span className="modal-text py-3">
            Based on your answers <br />
            {/* {score?.result} */}
            {/* {score?.score} */}
          </span>
          <div className="d-flex justify-content-center ">
            <Button
              onClick={handleCloseModal}
              title="Exit"
              variant="secondary"
              className="me-4 w-100"
            />
            <Button onClick={handleConsult} title="Consult" className="w-100" />
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default PSC_Test_Quiz;
// {

//   loader ?

//   <Spinner
//   animation="border"
//   role="status"
//   style={{ color: "#5E9CD3" }}
// >
//   <span className="visually-hidden">Loading...</span>
// </Spinner>

// }
