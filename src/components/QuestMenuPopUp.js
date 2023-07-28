// 드림퀘스트 > 메뉴(미트볼 버튼) > 팝업창(Modal)
import styled from "styled-components";
import palette from "../styles/colorPalette";

const QuestMenuPopUp = ({ isOpen, isClose }) => {
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
        <RedBtn>삭제</RedBtn>
        <Btn>수정</Btn>
        <Btn onClick={isClose}>취소</Btn>
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
  transform: translate(-50%, -50%);
  background-color: ${palette.white};
  border-radius: 1vw;
  z-index: 10000;
`;

const Btn = styled.div`
  display: block;
  padding-left: 20vw;
  padding-right: 20vw;
  padding-top: 4.4vw;
  padding-bottom: 4.4vw;
  font-family: 'NotoSansKR-Regular';
  font-size: 14px;
  color: ${palette.black};
  text-align: center;
`;
const RedBtn = styled.div`
  display: block;
  padding-left: 20vw;
  padding-right: 20vw;
  padding-top: 4.4vw;
  padding-bottom: 4.4vw;
  font-family: 'NotoSansKR-Regular';
  font-size: 14px;
  color: ${palette.red};
  text-align: center;
`;


export default QuestMenuPopUp;