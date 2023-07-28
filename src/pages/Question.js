import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import styled from "styled-components";
import axios from "axios";

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  position: relative;
`;

const QuestionContent = styled.div`
  text-align: left;
`;

const PreviousButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: 20px;
  left: 20px;
  width: 50px;
  z-index: 1;
`;

const URL = "http://localhost:8080";

const Question = () => {
  const questions = [
    "나는 과거에 ___를/을 좋아했어요.",
    "지금은 ___를/을 좋아해요.",
    "나는 ___를/을 잘해요."
  ];

  const navigator = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPreviousButton, setShowPreviousButton] = useState(false);

  const isAnswerEmpty = () => {
    return (
      answers[currentQuestionIndex] === undefined || answers[currentQuestionIndex].trim() === ""
    );
  };

  const handleNextQuestion = () => {
    if (isAnswerEmpty()) {
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowPreviousButton(true);
    } else {
      console.log("모든 질문에 대한 답변이 완료되었습니다.");
      console.log(generateSummary());
      setIsCompleted(true);

      axios
        .post(URL + "/chat", {
          question: generateSummary()
        })
        .then((response) => {
          console.log(response);
        });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      if (currentQuestionIndex === 0) {
        setShowPreviousButton(false);
      }
    } else {
      navigator.goBack();
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = value;
      return updatedAnswers;
    });
  };

  const generateSummary = () => {
    const summary = `나는 과거에 ${answers[0] || ""}를 좋아했고, 지금은 ${answers[1] || ""}를 좋아하고 지금 ${
      answers[2] || ""
    }를 잘해요. 한달치 버킷리스트 5개 짜주라 !! 간단하게`;
    return summary;
  };

  return (
    <QuestionContainer>
      <PreviousButton
        src={`${process.env.PUBLIC_URL}/prev.png`}
        onClick={handlePreviousQuestion}
        style={{ display: showPreviousButton ? "block" : "none" }}
      />
      <ProgressBar currentStep={currentQuestionIndex + 1} totalSteps={questions.length} />

      <QuestionContent>
        <b>{`Q${currentQuestionIndex + 1}.`}</b>
        <p>{questions[currentQuestionIndex]}</p>
        <input
          placeholder="답변을 입력하세요."
          value={answers[currentQuestionIndex] || ""}
          onChange={handleInputChange}
        />
        <br />
        <button
          onClick={handleNextQuestion}
          style={{
            backgroundColor: isAnswerEmpty() ? "gray" : "blue",
            cursor: isAnswerEmpty() ? "not-allowed" : "pointer"
          }}
          disabled={isAnswerEmpty()}
        >
          {currentQuestionIndex < questions.length - 1 ? "다음" : "완료"}
        </button>
        {isCompleted && <p>전체 답변: {generateSummary()}</p>}
      </QuestionContent>
    </QuestionContainer>
  );
};

export default Question;
