import React from 'react';
import { BallTriangle } from 'react-loader-spinner';
import styled from 'styled-components'; // styled-components import

// styled-components로 스타일 컴포넌트 정의
const LoadingContainer = styled.div`
    margin-top: 256px; /* 원하는 간격 값으로 조정하세요 */
    display: flex;
    text-align: center;
    flex-direction: column;
    font-family: NotoSansKR-Medium;
    font-size: 20px;
    align-items: center;
`;

const BoldText = styled.b`
    margin-bottom: 10px; /* 원하는 간격 값으로 조정하세요 */
`;

const Loading = () => {
    return (
        <LoadingContainer>
            <BoldText>당신에게 어울리는</BoldText>
            <BoldText>드림퀘스트를 찾고 있어요...</BoldText>
            <BallTriangle
                color="#ff0000"
                height={204}
                width={204}
            />
        </LoadingContainer>
    );
};

export default Loading;
