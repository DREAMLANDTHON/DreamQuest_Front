// 드림퀘스트 > 메뉴(미트볼 버튼) > 팝업창(Modal)
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../styles/colorPalette";

import axios from 'axios';

const baseUrl = `http://localhost:8080`;

const QuestMenuPopUp = ({ bucketId, bucketContent, isOpen, isClose }) => {
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
  const [isEdit, setEdit] = useState(false);

  const letEdit = () => {
    setEdit(true);
  }

  async function deleteBucket() {
    //const response = 
    await axios.delete(
      baseUrl + `/chat/${bucketId}`
    );
  
    //let result = response.data;
    //console.log(result);

    alert("선택한 드림퀘스트를 삭제하셨습니다!");
    
    isClose();
  }

  async function edit(event) {
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
      {isEdit ? (
        <EditContent>
        <EditTitle>드림퀘스트 수정하기</EditTitle>
        <form onSubmit={(event) => edit(event)}>
          <EditInputQuest type="text" name="quest" placeholder="드림퀘스트 내용을 작성해주세요."/>
          <EditCompleteBtn type="submit" value="완료하기" />
        </form>
        <EditCancelBtn onClick={isClose}>취소</EditCancelBtn>
      </EditContent>
      ) :
      (<Content>
        <RedBtn onClick={deleteBucket}>삭제</RedBtn>
        <Btn onClick={letEdit}>수정</Btn>
        <Btn onClick={isClose}>취소</Btn>
      </Content>)
      }
    </div>
  );
}

const Content = styled.div`
  display: block;
  position: absolute;
  width: 60%;
  top: 50vh;
  left: 50vw;
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

const EditContent = styled.div`
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
const EditTitle = styled.div`
  margin-top: 8vw;
  margin-bottom: 4vw;
  font-family: 'NotoSansKR-Bold';
  font-size: 16px;
  color: ${palette.black};
  text-align: center;
`;
const EditInputQuest = styled.input`
  width: 85%;
  margin-bottom: 4vw;
  padding: 4vw;
  border: 1px solid ${palette.graycc};
  border-radius: 0.3vw;
`;
const EditCompleteBtn = styled.input`
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
const EditCancelBtn = styled.div`
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

export default QuestMenuPopUp;