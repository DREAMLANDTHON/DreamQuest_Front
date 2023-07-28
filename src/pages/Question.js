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
  font-family: NotoSansKR-Bold;
  font-size: 20px;
`;

const QuestionContent = styled.div`
  text-align: left;
  width: 96vw; /* 내부 요소를 화면 너비에 맞게 설정합니다. */
  display: flex;
  flex-direction: column;
  font-family: NotoSansKR-Regular;
  font-size: 16px;
  margin-top:60px;
`;

const PreviousButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
  width: 24px;
  margin-top: 16px;
  z-index: 2;
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
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 98%; /* 인풋칸을 화면 너비에 맞게 설정합니다. */
  font-family: NotoSansKR-Regular;
  font-size: 14px;
  test-align: top;
`;

const Button = styled.button`
  width: 100%; /* 버튼을 화면 너비에 맞게 설정합니다. */
  height: 52px;
  margin-top:450px;
  border-radius: 8px;
  background-color: ${(props) => (props.disabled ? "#CCCCCC" : "#8B5C97")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-family: NotoSansKR-Regular;
  font-size: 14px;
  color: white;
  border: none;
`;
const QuestionNumber = styled.b`
  font-size: 20px;
  font-weight: bold;
`;
const URL = "http://localhost:8080";

const Question = () => {

  
  const navigator = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPreviousButton, setShowPreviousButton] = useState(false);

  const isAnswerEmpty = () => {
    return (
      answers[currentQuestionIndex] === undefined ||
      answers[currentQuestionIndex].trim() === ""
    );
  };

  const handleNextQuestion = () => {
    if (isAnswerEmpty()) {
      return;
    }

    if (currentQuestionIndex < 2) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowPreviousButton(true);
    } else {
      console.log("모든 질문에 대한 답변이 완료되었습니다.");
      console.log(generateSummary());
      setIsCompleted(true);

      axios.post(URL + "/chat", {
        question: generateSummary()
      }).then((response) => {
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
      navigator('/makedreamlist');
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
    const summary = `나는 과거에 ${answers[0] || ""}를 좋아했고, 지금은 ${
      answers[1] || ""
    }를 좋아하고 지금 ${answers[2] || ""}를 잘해요. 한달치 버킷리스트 5개 짜주라 !! 간단하게`;
    return summary;
  };

  const calculateProgress = () => {
    return ((currentQuestionIndex + 1) / 3) * 100;
  };
  

  const progress = calculateProgress();

  const adjustHeight = () => {
    const inputElement = document.getElementById("input");
    inputElement.style.height = "100px"; // 기본 높이 설정

    const scrollHeight = inputElement.scrollHeight;
    const lineHeight = 20; // 폰트 크기와 상관없이 텍스트 한 줄의 높이로 설정
    const maxLines = 5; // 최대 5줄까지만 확장되도록 설정

    // 입력된 텍스트 줄 수에 따라 높이 조절
    if (scrollHeight > lineHeight && scrollHeight <= lineHeight * maxLines) {
      inputElement.style.height = scrollHeight + "px";
    } else if (scrollHeight > lineHeight * maxLines) {
      inputElement.style.height = lineHeight * maxLines + "px";
      inputElement.scrollTop = scrollHeight - lineHeight * maxLines;
    }
  };
  const renderQuestion = () => {
    switch (currentQuestionIndex) {
      case 0:
        return <p>나는 어린시적 <b>어쩌구</b> 했당.</p>;
      case 1:
        return <p>sksms <b>짱</b>이다.</p>;
      case 2:
        return <p>랄라라라<b>헉~</b></p>
      default:
        return <p>없음</p>;
    }
  };
  return (
    <QuestionContainer>
      {/* <PreviousButtonFirst
       src={`${process.env.PUBLIC_URL}/prev.png`}
       onClick={handlePreviousQuestion}
        /> */}
        
      <PreviousButton
        src={`${process.env.PUBLIC_URL}/prev.png`}
        onClick={handlePreviousQuestion}
      />
      <ProgressBarContainer>
        <ProgressBarInner progress={progress} />
      </ProgressBarContainer>

      <QuestionContent >
      <QuestionNumber>{`Q${currentQuestionIndex + 1}.`}</QuestionNumber>
      {renderQuestion()}
        <Input
          id="input" // 이 부분을 추가해주세요.
          placeholder="자유롭게 입력해주세요."
          value={answers[currentQuestionIndex] || ""}
          onChange={handleInputChange}
          onInput={adjustHeight} 
        />
        <br />
        <Button
          onClick={handleNextQuestion}
          disabled={isAnswerEmpty()}
        >
          {currentQuestionIndex < 2 ? "다음" : "완료"}
        </Button>
        {isCompleted && <p>전체 답변: {generateSummary()}</p>}
      </QuestionContent>
    </QuestionContainer>
  );
};

export default Question;
