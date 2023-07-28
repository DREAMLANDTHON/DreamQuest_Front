import React from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #f2f2f2;
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressBarInner = styled.div`
  height: 100%;
  background-color: #4caf50;
  border-radius: 10px;
  width: ${(props) => props.progress}%;
`;

const ProgressBar = ({ currentStep, totalSteps }) => {
  const calculateProgress = () => {
    return (currentStep / totalSteps) * 100;
  };

  const progress = calculateProgress();

  return (
    <ProgressBarContainer>
      <ProgressBarInner progress={progress} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
