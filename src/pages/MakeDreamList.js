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
  font-size: 15px;
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


const MakeDreamList = () =>{
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
        <p>
          <marquee>시간을 내어 명상하기</marquee>
          {/* 움직이는 텍스트 */}
        </p>
        <p>
          <marquee width="100" height="50">
            여행지마다 명소 찾아가기
          </marquee>
          {/* 크기 조절 */}
        </p>
        <p>
          <marquee behavior="scroll">나만의 실록 만들기</marquee>
          {/* 스크롤의 속성 */}
        </p>
        <p>
          <marquee loop="5">좋아하는 것과 관련된 작품 그리기</marquee>
          {/* 스크롤의 속성 */}
        </p>
        <p>
          <marquee scrolldelay="200">
            제빵을 해서 주변인들과 나누기
          </marquee>
          {/* 스크롤의 속도 */}
        </p>
        <p>
          <marquee hspace="50" vspace="50">
            도자기 체험해보기
          </marquee>
          {/* 스크롤의 여백 */}
        </p>
        <Button onClick={handleStartClick}>시작하기</Button>
      <Link to="/" style={{marginTop:"15px"}}>돌아가기</Link>
      </MakeDreamListComponent>
    );
  }

export default MakeDreamList;
