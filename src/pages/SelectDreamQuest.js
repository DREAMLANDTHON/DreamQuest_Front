import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import UnselectQuest from "../components/UnselectQuest"; // UnselectQuest 컴포넌트를 import합니다.

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

const Button2 = styled.button`
  width: 50%;
  height: 52px;
  border-radius: 8px;
  background-color: white;
  font-family: NotoSansKR-Regular;
  font-size: 14px;
  color: #8B5C97;
  border: none;
  border: 1px solid #8B5C97;
`;

const Box = ({ children }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        borderRadius: "5px",
        background: "#f0f0f0",
        width: "fit-content",
      }}
    >
      {children}
    </div>
  );
};

const SelectDreamQuest = () => {
  const navigate = useNavigate();
  const [bucketData, setBucketData] = useState([]); // 버킷 데이터를 저장할 상태를 생성합니다.
  const url = "http://localhost:8080"
  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행되는 비동기 함수를 생성합니다.
    // axios로 데이터를 받아옵니다.
    axios
      .post(url + '/chat/list')
      .then((response) => {
        // 받아온 데이터를 상태로 저장합니다.
        setBucketData(response.data[0]);
      })
      .catch((error) => {
        // 에러 처리
        console.error("Error fetching bucket data:", error);
      });
  }, []);

  const handleSave = () => {
    navigate("/");
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <>
      <p>나의 드림퀘스트가 완성되었어요!</p>
      <br />
      <p>마음에 드는 드림 퀘스트를 골라주세요.</p>

      {/* Using the custom Box component */}
      <Box>고구마 먹고 춤추기</Box>
      <Button onClick={handleSave}>저장하기</Button>
      <br />
      <Button2 onClick={handleRetry}>한번 더 돌리기</Button2>

      {/* UnselectQuest 컴포넌트에 데이터를 props로 전달합니다. */}
      {bucketData.map((bucket) => (
        <UnselectQuest
          emoji = {'😊'} // 고유한 key 값을 지정합니다.
          content={bucket.bucket} // "bucket"만 전달합니다.
        />
      ))}
    </>
  );
};

export default SelectDreamQuest;
