import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const marqueeAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const MarqueeText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  position: relative;

  &::before,
  &::after {
    content: " ";
    display: inline-block;
    width: 50%;
  }

  &::before {
    margin-right: -100%;
  }

  &::after {
    margin-left: -100%;
  }

  animation: ${marqueeAnimation} 10s linear infinite;
`;

const MakeDreamListComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const MakeDreamList = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleStartClick = () => {
    // Function to handle the "시작하기" button click
    navigate("/question"); // Navigate to the "/question" page
  };

  return (
    <MakeDreamListComponent>
      <h1>드림퀘스트 만들기</h1>
      <p>내가 살아온 여정을 돌아보며</p>
      <br />
      <p>숨어있던 드림퀘스트를 발견해보세요.</p>
      <MarqueeText>
        좌우로 이동하는 텍스트를 만들어 봅시당. 랄라불라 . <br />
        똥똥 우사너리ㅏㅓㅇㄴ
      </MarqueeText>
      <button onClick={handleStartClick}>시작하기</button>
    </MakeDreamListComponent>
  );
};

export default MakeDreamList;
