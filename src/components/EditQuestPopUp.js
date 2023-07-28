// 직접 입력 팝업창(Modal)
import styled from "styled-components";
import palette from "../styles/colorPalette";

import axios from 'axios';

const baseUrl = `http://localhost:8080`;

const EditQuestPopUp = ({bucketId, originContent, isOpen, isClose}) => {
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

  async function complete(event) {
    const response = 
    await axios.patch(
      baseUrl + `/chat/${bucketId}`, {
        bucket: event.target.quest.value
      }
    );
  
    let result = response.data;
    console.log(result);

    alert("드림퀘스트를 수정했습니다!");
    
    isClose();
  }

  return (
    <div style={container}>
      <div style={modalBackground} onClick={isClose}></div>
      <Content>
        <Title>드림퀘스트 수정하기</Title>
        <form onSubmit={(event) => complete(event)}>
          <InputQuest type="text" name="quest" value={originContent} placeholder="드림퀘스트 내용을 작성해주세요."/>
          <CompleteBtn type="submit" value="완료하기" />
        </form>
        <CancelBtn onClick={isClose}>취소</CancelBtn>
      </Content>
    </div>
  );
}

const Content = styled.div`
  display: block;
  position: absolute;
  width: 75%;
  top: 50vh;
  left: 50vw;
  padding-left: 4vw;
  padding-right: 4vw;
  transform: translate(-50%, -50%);
  background-color: ${palette.white};
  border-radius: 1vw;
  z-index: 10000;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  margin-top: 8vw;
  margin-bottom: 4vw;
  font-family: 'NotoSansKR-Bold';
  font-size: 16px;
  color: ${palette.black};
  text-align: center;
`;
const InputQuest = styled.input`
  width: 85%;
  margin-bottom: 4vw;
  padding: 4vw;
  border: 1px solid ${palette.graycc};
  border-radius: 0.3vw;
`;
const CompleteBtn = styled.input`
  width: 100%;
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
  border: none;
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

export default EditQuestPopUp;