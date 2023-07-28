import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import styled from "styled-components";
import axios from "axios";

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 화면 높이에 맞게 컨테이너를 가운데 정렬합니다 */
`;

const QuestionContent = styled.div`
  text-align: center;
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
  const [isCompleted, setIsCompleted] = useState(false); // 마지막 질문 완료 여부

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
    } else {
      console.log("모든 질문에 대한 답변이 완료되었습니다.");
      console.log(generateSummary());
      setIsCompleted(true); // 마지막 질문이 완료되었음을 표시

      // axios.post는 handleNextQuestion 함수 내에서 호출합니다.
      axios
        .post(URL + "/chat", {
          "question": generateSummary()
        })
        .then((response) => {
          console.log(response);
        });
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
