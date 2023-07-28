import React from "react";

// Custom Box component
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
  return (
    <>
      <p>나의 드림퀘스트가 완성되었어요!</p>
      <br />
      <p>마음에 드는 드림 퀘스트를 골라주세요.</p>

      {/* Using the custom Box component */}
      <Box>고구마 먹고 춤추기</Box>
    </>
  );
};

export default SelectDreamQuest;
