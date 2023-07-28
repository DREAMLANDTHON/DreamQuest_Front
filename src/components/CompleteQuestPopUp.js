// 드림퀘스트 완료 체크 팝업(Modal)

import styled from "styled-components";
import palette from "../styles/colorPalette";

const CompleteQuestPopUp = ({ isOpen, isClose }) => {
  const container = {
    display: isOpen ? 'block' : 'none',
  }

  const modalBackground = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  };

  return (
    <div style={container}>
      <div style={modalBackground} onClick={isClose}></div>
      <Content>
        <MenuTitle>퀘스트를 완료할까요?</MenuTitle>
        <CompleteBtn>완료하기</CompleteBtn>
        <CancelBtn>취소</CancelBtn>
      </Content>
    </div>
  );
}

const Content = styled.div`
  display: block;
  position: absolute;
  width: 60%;
  top: 50%;
  left: 50%;
  padding-left: 3vw;
  padding-right: 3vw;
  transform: translate(-50%, -50%);
  background-color: ${palette.white};
  border-radius: 1vw;
  z-index: 10000;
`;

const MenuTitle = styled.div`
  margin-top: 6vw;
  margin-bottom: 6vw;
  font-family: 'NotoSansKR-Regular';
  font-size: 16px;
  color: ${palette.black};
  text-align: center;
`;
const CompleteBtn = styled.div`
  padding-top: 4vw;
  padding-bottom: 4vw;
  padding-left: 14vw;
  padding-right: 14vw;
  border-radius: 1.8vw;
  margin-bottom: 2vw;
  background-color: ${palette.mainColor};
  font-family: 'NotoSansKR-Medium';
  font-size: 14px;
  color: ${palette.white};
  text-align: center;
`;
const CancelBtn = styled.div`
  padding-top: 4vw;
  padding-bottom: 4vw;
  padding-left: 14vw;
  padding-right: 14vw;
  margin-bottom: 3vw;
  border: 1px solid ${palette.mainColor};
  border-radius: 1.8vw;
  background-color: ${palette.white};
  font-family: 'NotoSansKR-Medium';
  font-size: 14px;
  color: ${palette.mainColor};
  text-align: center;
`;

export default CompleteQuestPopUp;