import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div>
      {showPreviousButton && (
        <button onClick={handlePreviousQuestion}>이전</button>
      )}
      <div>
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
          disabled={isAnswerEmpty()}
        >
          {currentQuestionIndex < questions.length - 1 ? "다음" : "완료"}
        </button>
        {isCompleted && <p>전체 답변: {generateSummary()}</p>}
      </div>
    </div>
  );
};

export default Question;
