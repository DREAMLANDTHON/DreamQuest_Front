import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import palette from "../styles/colorPalette";

import axios from "axios";

import SelectQuest from "../components/SelectQuest";
import UnselectQuest from "../components/UnselectQuest"; // UnselectQuest 컴포넌트를 import합니다.

const emoji = ["❤️", "🧡", "💛", "💚", "💙"];

const SelectDreamQuest = () => {
  const navigate = useNavigate();
  const [bucketData, setBucketData] = useState([]); // 버킷 데이터를 저장할 상태를 생성합니다.

  const handleSave = () => {
    // 선택되지 않은 드림 퀘스트의 id를 배열로 수집합니다.
    const unselectedIds = bucketData
      .filter((_, index) => !selected[index])
      .map((bucket) => bucket[3]);

    // 서버에 선택되지 않은 드림 퀘스트들을 삭제 요청합니다.
    Promise.all(unselectedIds.map(deleteBucket))
      .then(() => {
        // 삭제 요청이 모두 완료된 후에 navigate를 호출합니다.
        navigate("/");
      })
      .catch((error) => {
        // 에러 처리
        console.error("Error deleting bucket data:", error);
      });
  };


  const url = "http://localhost:8080"
  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행되는 비동기 함수를 생성합니다.
    // axios로 데이터를 받아옵니다.
    axios
      .post(url + '/chat/list')
      .then((response) => {
        // 받아온 데이터를 상태로 저장합니다.
        //setBucketData(response.data);
        let list = response.data;
        for(let i = list.length - 1; i >= (list.length - 5) && i >= 0 ; i--) {
          if(!list[i].complete)
            setBucketData((currentArray) => [...currentArray, [currentArray.length, emoji[i%5], list[i].bucket, list[i].id]]);
        }
        console.log(list);
      })
      .catch((error) => {
        // 에러 처리
        console.error("Error fetching bucket data:", error);
      });

      //console.log(bucketData);

  }, []);

  useEffect(() => {
  }, [bucketData]);


  async function deleteBucket(bucketId) {
    //const response = 
    await axios.delete(
      url + `/chat/${bucketId}`
    );
  
    //let result = response.data;
    //console.log(result);
  }

  const handleRetry = () => {
    // 선택되지 않은 드림 퀘스트의 id를 배열로 수집합니다.
    const unselectedIds = bucketData
      .filter((_, index) => !selected[index])
      .map((bucket) => bucket[3]);
  
    // 선택되지 않은 드림 퀘스트들을 삭제 요청합니다.
    Promise.all(unselectedIds.map(deleteBucket))
      .then(() => {
        // 삭제 요청이 모두 완료된 후에 다시 요청하기 위해 선택된 데이터를 저장합니다.
        const selectedData = bucketData.filter((_, index) => selected[index]);
        setBucketData(selectedData);
  
        // navigate를 호출하여 메인 페이지로 이동합니다.
        // navigate("/");
      })
      .catch((error) => {
        // 에러 처리
        console.error("Error deleting bucket data:", error);
      });
  
    window.location.reload();
  };

  const [selected, setSelected] = useState(Array(bucketData.length).fill(false));

  const onSelected = (index) => {
    // selected 배열의 복사본을 만들어서 직접 상태를 수정하는 것을 피하기 위해 spread 구문을 사용합니다.
    const updatedSelected = [...selected];
    updatedSelected[index] = !updatedSelected[index];
    setSelected(updatedSelected);
  };


  return (
    <Container>
      <Title>나의 드림퀘스트가 완성되었어요!</Title>
      <Notice>마음에 드는 드림 퀘스트를 골라주세요.</Notice>

      <DreamList>
        {/* UnselectQuest 컴포넌트에 데이터를 props로 전달합니다. */}
        {bucketData.map((bucket) => (
          <div onClick={() => onSelected(bucket[0])}>
          {selected[bucket[0]] ?
          (
            <SelectQuest
              emoji={bucket[1]}
              content={bucket[2]}/>
          ) : (
            <UnselectQuest
              emoji={bucket[1]}
              content={bucket[2]}/>
          )}
          </div>
        ))}
      </DreamList>

      <CompleteBtn onClick={handleSave}>드림퀘스트 저장하기</CompleteBtn>
      <ReloadBtn onClick={handleRetry}>한 번 더 돌리기</ReloadBtn>
    </Container>
  );
};

const Container = styled.div`
  display: block;
  position: relative;
  height: 100vh;
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${palette.white};
`;

const Title = styled.div`
  margin-top: 27.5vw;
  font-family: 'NotoSansKR-Bold';
  font-size: 20px;
  color: ${palette.black};
  text-align: center;
`;
const Notice = styled.div`
  margin-top: 1vw;
  font-family: 'NotoSansKR-Regular';
  font-size: 16px;
  color: ${palette.black};
  text-align: center;
`;

const DreamList = styled.div`
  margin-top: 12vw;
  margin-left: 4vw;
  margin-right: 4vw;
`;

const CompleteBtn = styled.div`
  padding-top: 4vw;
  padding-bottom: 4vw;
  padding-left: 14vw;
  padding-right: 14vw;
  border-radius: 1.8vw;
  margin-top: 22vw;
  margin-bottom: 2vw;
  margin-left: 4vw;
  margin-right: 4vw;
  background-color: ${palette.mainColor};
  font-family: 'NotoSansKR-Medium';
  font-size: 14px;
  color: ${palette.white};
  text-align: center;
`;
const ReloadBtn = styled.div`
  padding-top: 4vw;
  padding-bottom: 4vw;
  padding-left: 14vw;
  padding-right: 14vw;
  margin-bottom: 3vw;
  margin-left: 4vw;
  margin-right: 4vw;
  border: 1px solid ${palette.mainColor};
  border-radius: 1.8vw;
  background-color: ${palette.white};
  font-family: 'NotoSansKR-Medium';
  font-size: 14px;
  color: ${palette.mainColor};
  text-align: center;
`;

export default SelectDreamQuest;
