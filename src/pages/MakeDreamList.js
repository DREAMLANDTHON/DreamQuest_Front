import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, Link } from "react-router-dom"; // Link 컴포넌트를 불러옵니다.

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
  position: relative;
  font-family: NotoSansKR-Regular;
  font-size: 14px;
`;

const StyledParagraph = styled.p`
  border: 1px solid black;
  padding: 8px;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 50%;
  height: 52px;
  border-radius: 8px;
  background-color: #8B5C97;
  font-family: NotoSansKR-Regular;
  font-size: 14px;
  color: white;
  border: none;
`;

const MakeDreamList = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/question");
  };

  return (
    <MakeDreamListComponent>
      <p style={{ fontFamily: "NotoSansKR-Bold", fontSize: "20px" }}>
        드림퀘스트 만들기
      </p>
      <p>내가 살아온 여정을 돌아보며</p>
      <br />
      <p style={{ marginTop: "-20px" }}>
        숨어있던 드림퀘스트를 발견해보세요.
      </p>
      <MarqueeText>
        <StyledParagraph>요리학원 다니기</StyledParagraph>
        <StyledParagraph>바다에서 사진찍기</StyledParagraph>
        <StyledParagraph>영어로된 에세이 읽기</StyledParagraph>
        <StyledParagraph>한국사 관련 영화보기</StyledParagraph>
      </MarqueeText>
      <Button onClick={handleStartClick}>시작하기</Button>
      <Link to="/" style={{marginTop:"15px"}}>돌아가기</Link> {/* Link 컴포넌트를 사용하여 링크를 지정합니다. */}
    </MakeDreamListComponent>
  );
};

export default MakeDreamList;
