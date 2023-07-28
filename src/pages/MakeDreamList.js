import React from "react";
import styled from "styled-components"
const MakeDreamListComponent = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
const MakeDreamList = () => {
    return(
        <MakeDreamListComponent>
            <h1>드림퀘스트 만들기</h1>
        </MakeDreamListComponent>
    )
}
export default MakeDreamList