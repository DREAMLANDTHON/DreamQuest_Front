import React, { useState } from "react";

const Question = () => {
  const questions = [
    "저는 과거에 ___을/를 좋아했어요.",
    "저는 지금 ___을/를 좋아해요.",
    "저는 ___을/를 잘해요."
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleNextQuestion = () => {
    // 다음 버튼을 클릭하면 다음 질문으로 이동
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 마지막 질문이면 추가적인 동작을 수행하거나 다른 화면으로 이동
      // 예: 결과 표시, 폼 제출 등
      console.log("모든 질문에 대한 답변이 완료되었습니다.");
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
    return answers.join(" ");
  };

  return (
    <>
      <p>{questions[currentQuestionIndex]}</p>
      <input
        placeholder="답변을 입력하세요."
        value={answers[currentQuestionIndex] || ""}
        onChange={handleInputChange}
      ></input>
      <button onClick={handleNextQuestion}>다음</button>
      <p>전체 답변: {generateSummary()}</p>
    </>
  );
};

export default Question;
