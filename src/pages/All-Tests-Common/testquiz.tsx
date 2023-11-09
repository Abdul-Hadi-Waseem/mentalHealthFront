import React, { useCallback, useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import "./psctestquiz.css";
import Button from "../../components/Common/Buttons/Button";
import BackButton from "../../components/Common/Buttons/BackButton";
import Copyright from "../../components/Footer/Copyright";
import { useNavigate } from "react-router-dom";
import { useProgramdataMutation } from "../../gql/generated";
import { submitTests } from "../../components/Forms/Teachers/TeachersAPIs";
import { toast } from "react-toastify";

interface QuizAnswer {
  question: string;
  answer: string;
}
const PSC_Test_Quiz_NodeJs: React.FC<any> = ({ testData }) => {
  const studentData = JSON.parse(localStorage.getItem("student_information"));
  const [loading, setLoading] = useState(false);
  const [formId, setFormId] = useState(0);
  const history = useNavigate();
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [result, executeMutation] = useProgramdataMutation();
  const [score, setScore] = useState("");
  const navigate = useNavigate();

  const loadQuestions = useCallback(async (age: string | null) => {
    let questionSet;
    setFormId(24);
    // if (testData === 2) navigate("/asq-test-node");
    // if (testData === 3) navigate("/sdq-test-node");
    // if (testData === 4) navigate("/ace-test-node");
    if (testData === 5) questionSet = await import("../../assets/jsons/snap-test.json");
    if (testData === 6) questionSet = await import("../../assets/jsons/ces-test.json");
    if (testData === 7) questionSet = await import("../../assets/jsons/moves-test.json");
    if (testData === 8) questionSet = await import("../../assets/jsons/smq-test.json");
    // if (testData === 9) navigate("/craft-test-node");
    if (testData === 10) questionSet = await import("../../assets/jsons/wfirs-test.json");
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
    if (currentQuestion < questions?.questions?.length - 1) {
      const newAnswer: QuizAnswer = {
        question: questions?.questions[currentQuestion]?.questions,
        answer: selectedAnswer!,
      };
      setAnswers((prev) => [...prev, newAnswer]);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // clear the selected answer for the next question
    } else if (currentQuestion === questions?.questions?.length - 1) {
      if (answers.length >= questions?.questions?.length) {
        dataSubmit();
      } else {
        const newAnswer: QuizAnswer = {
          question: questions?.questions[currentQuestion]?.questions,
          answer: selectedAnswer!,
        };
        setAnswers((prev) => [...prev, newAnswer]);
      }
    }
    if (score) {
      setShowModal(true); // show modal when form is submittedx
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    history("/"); // navigate to /home when "Exit" button is clicked
  };

  const handleConsult = () => {
    console.log(answers); // print answers when "Consult" button is clicked
    history("/schedule-appointment");
    setShowModal(false);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const previousAnswer = answers.find(
        (ans) => ans.question === questions.questions[currentQuestion].question
      );
      setSelectedAnswer(previousAnswer?.answer || null);
      const updatedAnswers = [...answers.slice(0, -1)];
      setAnswers(updatedAnswers);
    } else if (currentQuestion === 0) navigate(-1);
  };

  const dataSubmit = () => {
    setLoading(true);
    submitTests(answers, studentData?.id,testData).then((res) => {
      if (res?.data?.status === 200) {
        toast.success(res?.data?.message, {
          toastId: "psc",
        });
        navigate("/student-dashboard");
        setLoading(false);
      }
      if (res?.data?.status !== 200) {
        toast.error(res?.data?.message, {
          hideProgressBar: true,
        });
        setLoading(false);
      }
    });
  };

  return (
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
          {loading ? (
            <p>Submitting...</p>
          ) : (
            <Button
              title={
                currentQuestion < questions.questions.length - 1
                  ? "Next"
                  : "Submit"
              }
              className="w-100"
              disabled={selectedAnswer ? false : true || loading}
            />
          )}
        </Form>
      </div>
      <Copyright />
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="d-flex align-items-center justify-content-center"
      >
        <Modal.Body className="d-flex flex-column justify-content-center py-3 px-4">
          <span className="modal-title">MOVES Test</span>
          <span className="modal-text py-3">
            Based on your answers,
            <br /> {score}
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
    </div>
  );
};

export default PSC_Test_Quiz_NodeJs;
