import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const QuestionContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh; /* 최소 높이를 100vh로 설정하여 컨테이너가 화면을 꽉 채우도록 합니다. */
  position: relative;
  text-align: left;
`;

const QuestionContent = styled.div`
  text-align: left;
  width: 100vw; /* 내부 요소를 화면 너비에 맞게 설정합니다. */
  //flex: 1; /* QuestionContent가 QuestionContainer를 꽉 채우도록 합니다. */
  display: flex;
  flex-direction: column;
  // justify-content: center;
`;

const PreviousButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  z-index: 2;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const ProgressBarContainer = styled.div`
  margin-top: 56px;
  width: 100%;
  height: 1vw;
  background-color: #cccccc;
  overflow: hidden;
`;

const ProgressBarInner = styled.div`
  height: 100%;
  background-color: #8b5c97;
  width: ${(props) => props.progress}%;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  padding: 8px;
  outline: none;
  width: 100%; /* 인풋칸을 화면 너비에 맞게 설정합니다. */
  margin-bottom: 20px; /* 하단 여백을 추가합니다. */
`;

const Button = styled.button`
  width: 100%; /* 버튼을 화면 너비에 맞게 설정합니다. */
  padding: 10px;
  color: #fff;
  background-color: ${(props) => (props.disabled ? "gray" : "blue")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;


const URL = "http://localhost:8080";

const Question = () => {
  const questions = [
    "나는 과거에 ___를/을 좋아했어요.",
    "지금은 ___를/을 좋아해요.",
    "나는 ___를/을 잘해요.",
    "나는 ___를/을 어쩌구.",
    "나는 ___를/을 저쩌구."
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

  const calculateProgress = () => {
    return (currentQuestionIndex / (questions.length - 1)) * 100;
  };

  const progress = calculateProgress();

  return (
    <QuestionContainer>
      <PreviousButton
        src={`${process.env.PUBLIC_URL}/prev.png`}
        onClick={handlePreviousQuestion}
        show={showPreviousButton}
      />
      <ProgressBarContainer>
        <ProgressBarInner progress={progress} />
      </ProgressBarContainer>

      <QuestionContent>
        <b>{`Q${currentQuestionIndex + 1}.`}</b>
        <p>{questions[currentQuestionIndex]}</p>
        <input
          placeholder="자유롭게 입력해주세요."
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
