import React from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  width: 100vw;
  height: 1vw;
  background-color: #CCCCCC;
  overflow: hidden;
`;

const ProgressBarInner = styled.div`
  height: 100%;
  background-color: #8B5C97;
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
