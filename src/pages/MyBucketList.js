// 나의 버킷리스트 페이지
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import palette from "../styles/colorPalette";

import profile from "../contents/img_user_profile.jpg";
import menuIcon from "../contents/ic_bucket_menu.jpg";
import navigateNext from "../contents/ic_navigate_next.jpg";

import QuestMenuPopUp from "../components/QuestMenuPopUp";
import CompleteQuestPopUp from "../components/CompleteQuestPopUp";
import DirectInputPopUp from "../components/DirectInputPopUp";

import axios from 'axios';

const baseUrl = `http://localhost:8080`;

const emoji = ["❤️", "🧡", "💛", "💚", "💙", "💜"];
const level = [0, 1, 2, 3, 5, 8, 11];


const MyBucketList = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCompleteQuest, setCompleteQuest] = useState(false);
  const [isDirectInput, setDirectInput] = useState(false);

  const [dreamList, setDreamList] = useState([]);
  const [completeCount, setCompleteCount] = useState(0);
  const [userLevel, setUserLevel] = useState(0);
  
  const [updateId, setUpdateId] = useState();
  const [updateContent, setUpdateContent] = useState();

  // 전체 버킷리스트 받아오기
  async function getDreamQuests() {
    const response = await axios.post(
      baseUrl + `/chat/list`,
    );

    setDreamList([]);
    setCompleteCount(0);
    let list = response.data;
    for(let i = 0; i < list.length; i++) {
      //dreamList.push([emoji[i%6], list[i].bucket]);
      if(list[i].complete){
        setCompleteCount((current) => current+1);
      }
      else {
        setDreamList((currentArray) => [...currentArray, [emoji[i%6], list[i].bucket, list[i].id]])
      }
    }
  
    return dreamList;
  }
  
  // 현재 레벨, 완료된 드림퀘스트 갯수
  async function getLevel() {
    const response = await axios.post(
      baseUrl + `/member/list`,
    );

    let list = response.data;
    for(let i = 0; i < list.length; i++) {
    
      if(list[i].id === 1){
        setCompleteCount(list[i].complete_count);
        setUserLevel(list[i].level);
      }
    }
  
    return dreamList;
  }

  // 버킷리스트 메뉴 열기
  const OpenMenu = (bucketId, bucketContent) => {
    setUpdateId(bucketId);
    setUpdateContent(bucketContent);

    setMenuOpen(true);
  }

  // 버킷리스트 메뉴 닫기
  const CloseMenu = () => {
    setMenuOpen(false);
  }

  // 드림퀘스트 완료창 열기
  const OpenCompleteQuest = (bucketId, bucketContent) => {
    setUpdateId(bucketId);
    setUpdateContent(bucketContent);

    setCompleteQuest(true);
  }

  // 드림퀘스트 완료창 닫기
  const CloseCompleteQuest = () => {
    setCompleteQuest(false);
  }

  // 직접 추가 입력창 열기
  const OpenDirectInput = () => {
    setDirectInput(true);
  }

  // 직접 추가 입력창 닫기
  const CloseDirectInput = () => {
    setDirectInput(false);
  }

  // 최초 접속 시, 드림퀘스트 조회해서 배열에 삽입
  useEffect(() => {
    getDreamQuests();
    getLevel();
  }, [dreamList]);

  // isMenuOpen 변수의 값이 변할 때마다 새로고침
  useEffect(() => {
  }, [isMenuOpen, dreamList, userLevel, isDirectInput]);

  return (
    <Container>
      {/* 헤더: 프로필, 서비스명 */}
      <Header>
        <ProfileImage src={profile}/>
        <ServiceName>DreamQuest</ServiceName>
      </Header>

      {/* 레벨 정보 */}
      <DreamLevel>
        <Level>Lv.{userLevel}</Level>

        {/* 레벨 진행바 */}
        <Progress>
          <ProgressBack/>
          <ProgressFrontBack widthPer={userLevel * 10}/>
        </Progress>

        <LevelNotice>
          드림퀘스트 <b>{level[userLevel + 1] - completeCount}개</b>를 더 달성하고,<br/>
          <b>Lv.{userLevel + 1}</b>로 레벨업하세요!
        </LevelNotice>
      </DreamLevel>

      {/* 보너스 드림퀘스트 */}
      <BonusDream>
        <BonusTitle>보너스 드림퀘스트</BonusTitle>
        <BonusBox>
          <BonusIcon>🔥</BonusIcon>
          <BonusContent>
            <BonusGoal>{userLevel + 1} 레벨 달성하기</BonusGoal>
            <BonusCategory>일상</BonusCategory>
          </BonusContent>
          <MenuButton src={menuIcon} />
        </BonusBox>
      </BonusDream>

      {/* 나의 드림퀘스트 */}
      <MyBucket>
        <MyBucketTitle>나의 드림퀘스트</MyBucketTitle>
        <YearBucket>
          <YearBucketContent>올해 달성한 드림퀘스트</YearBucketContent>
          <YearBucketCount>{completeCount}</YearBucketCount>
          <NavigateNextBtn src={navigateNext}/>
        </YearBucket>
      </MyBucket>

      {/* 드림퀘스트 생성 버튼 */}
      <CreateQuestBtns>
        <DirectCreateBtn
          onClick={OpenDirectInput}>
            직접 등록
        </DirectCreateBtn>
        <Link
          to={`/createbucket`}
          style={{ textDecoration: "none" }}>
          <GptCreateBtn>나의 드림퀘스트 만들기</GptCreateBtn>
        </Link>
      </CreateQuestBtns>

      {/* 드림퀘스트 내용 */}
      <AllBucketList>
        <Category>일상</Category>
        <div>
          {dreamList.map(dream => (
            <AllBucketBox>
              <AllBucketIcon onClick={() => {OpenCompleteQuest(dream[2], dream[1])}}>{dream[0]}</AllBucketIcon>
              <AllBucketContent onClick={() => {OpenCompleteQuest(dream[2], dream[1])}}>
                <AllBucketGoal>{dream[1]}</AllBucketGoal>
                <AllBucketCategory>일상</AllBucketCategory>
              </AllBucketContent>
              <MenuButton
                src={menuIcon}
                onClick={() => {OpenMenu(dream[2], dream[1])}}/>
            </AllBucketBox>
          ))}
        </div>
      </AllBucketList>

      {/* 드림퀘스트 메뉴: 수정, 삭제 */}
      <QuestMenuPopUp
        bucketId={updateId}
        bucketContent={updateContent}
        isOpen={isMenuOpen}
        isClose={CloseMenu}/>
      
      {/* 드림퀘스트 완료 */}
      <CompleteQuestPopUp
        bucketId={updateId}
        bucketContent={updateContent}
        isOpen={isCompleteQuest}
        isClose={CloseCompleteQuest}/>

      {/* 드림퀘스트 직접 추가 입력 */}
      <DirectInputPopUp
        isOpen={isDirectInput}
        isClose={CloseDirectInput} />

    </Container>
  );
}


const Container = styled.div`
  display: block;
  position: relative;
  height: max-content;
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${palette.background};
`;

// 헤더
const Header = styled.div`
  display: flex;
  align-items: center;
`;
const ProfileImage = styled.img`
  width: 8vw;
  height: 8vw;
  margin-left: 4vw;
  margin-top: 3vw;
  margin-bottom: 3vw;
  border-radius: 100%;
  object-fit: cover;
`;
const ServiceName = styled.div`
  display: block;
  margin: auto;
  padding-right: 12vw;
  font-family: 'NotoSansKR-Regular';
  font-size: 14px;
  color: ${palette.black};
`;

// 드림 레벨
const DreamLevel = styled.div`
  display: block;
  margin: 4vw 5vw 5vw 4vw;
`;
const Level = styled.div`
  font-family: 'NotoSansKR-Bold';
  font-size: 28px;
  color: ${palette.mainColor};
`;
const Progress = styled.div`
  display: block;
`;
const ProgressBack = styled.div`
  position: absolute;
  width: 92vw;
  height: 2vw;
  margin-top: 2vw;
  border-radius: 2vw;
  background-color: ${palette.progressPurple};
`;
const ProgressFrontBack = styled.div`
  position: absolute;
  width: ${props => `${props.widthPer}%`};
  height: 2vw;
  margin-top: 2vw;
  border-radius: 2vw;
  background-color: ${palette.mainColor};
`;
const LevelNotice = styled.div`
  display: block;
  margin-top: 7vw;
  font-family: 'NotoSansKR-Regular';
  font-size: 14px;
  color: ${palette.mainColor};
`;

// 보너스 드림퀘스트
const BonusDream = styled.div`
  display: block;
  margin-top: 5vw;
  margin-left: 4vw;
  margin-right: 4vw;
`;
const BonusTitle = styled.div`
  font-family: 'NotoSansKR-Bold';
  font-size: 16px;
  color: ${palette.black};
`;
const BonusBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2vw;
  width: 92vw;
  border-radius: 1.8vw;
  background-color: ${palette.white};
  box-shadow: 0.2vw 0.2vw 0.2vw 0.2vw ${palette.grayee};
`;
const BonusIcon = styled.div`
  margin-left: 4vw;
  margin-right: 4vw;
  font-size: 24px;
`;
const BonusContent = styled.div`
  display: block;
  margin-top: 2.5vw;
  margin-bottom: 2.5vw;
`;
const BonusGoal = styled.div`
  font-family: 'NotoSansKR-Medium';
  margin-bottom: 0.5vw;
  font-size: 14px;
  color: ${palette.black};
`;
const BonusCategory = styled.div`
  font-family: 'NotoSansKR-Regular';
  font-size: 12px;
  color: ${palette.gray66};
`;
const MenuButton = styled.img`
  width: 5vw;
  height: 5vw;
  margin-left: auto;
  padding: 1vw;
  margin-right: 2vw;
  margin-top: 3.5vw;
  margin-bottom: 3.5vw;
  object-fit: cover;
`;

// 나의 드림퀘스트
const MyBucket = styled.div`
  margin-top: 4.5vw;
  margin-bottom: 2vw;
  margin-left: 4vw;
  margin-right: 4vw;
`;
const MyBucketTitle = styled.div`
  font-family: 'NotoSansKR-Bold';
  font-size: 16px;
  color: ${palette.black};
`;
const YearBucket = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2vw;
  width: 92vw;
  border-radius: 1.8vw;
  background-color: ${palette.white};
  box-shadow: 0.2vw 0.2vw 0.2vw 0.2vw ${palette.grayee};
`;
const YearBucketContent = styled.div`
  margin-left: 4vw;
  margin-top: 4.3vw;
  margin-bottom: 4.3vw;
  font-family: 'NotoSansKR-Medium';
  font-size: 14px;
  color: ${palette.mainColor};
`;
const YearBucketCount = styled.div`
  margin-left: auto;
  margin-top: 4vw;
  margin-bottom: 4vw;
  font-family: 'NotoSansKR-Bold';
  font-size: 16px;
  color: ${palette.mainColor};
`;
const NavigateNextBtn = styled.img`
  margin-left: 1vw;
  margin-right: 4vw;
  width: 6vw;
  height: 6vw;
  object-fit: cover;
`;

// 드림퀘스트 생성 버튼
const CreateQuestBtns = styled.div`
  display: flex;
  width: 92vw;
  margin-left: 4vw;
  margin-right: 4vw;
  margin-top: 4vw;
  justify-items: center;
`;
// 직접 등록
const DirectCreateBtn = styled.div`
  width: 30vw;
  padding-top: 3.5vw;
  padding-bottom: 3.5vw;
  margin-right: 2vw;
  border: 1px solid ${palette.mainColor};
  border-radius: 1.8vw;
  background-color: ${palette.white};
  font-family: 'NotoSansKR-Medium';
  font-size: 14px;
  color: ${palette.mainColor};
  text-align: center;
`;
const GptCreateBtn = styled.div`
  width: 60vw;
  padding: 3.5vw 0vw 3.5vw 0vw;
  border-radius: 1.8vw;
  background-color: ${palette.mainColor};
  font-family: 'NotoSansKR-Medium';
  font-size: 14px;
  color: ${palette.white};
  text-align: center;
`;

// 버킷리스트
const AllBucketList = styled.div`
  display: block;
  margin-top: 6vw;
  margin-left: 4vw;
  margin-right: 4vw;
  padding-bottom: 6vw;
`;
const Category = styled.div`
  font-family: 'NotoSansKR-Regular';
  font-size: 12px;
  color: ${palette.gray66};
  margin-left: 4vw;
`;

// 버킷리스트
const AllBucketBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2vw;
  width: 92vw;
  border-radius: 1.8vw;
  background-color: ${palette.white};
  box-shadow: 0.2vw 0.2vw 0.2vw 0.2vw ${palette.grayee};
`;
const AllBucketIcon = styled.div`
  margin-left: 4vw;
  margin-right: 4vw;
  font-size: 24px;
`;
const AllBucketContent = styled.div`
  display: block;
  margin-top: 2.5vw;
  margin-bottom: 2.5vw;
  padding-right: 20vw;
`;
const AllBucketGoal = styled.div`
  font-family: 'NotoSansKR-Medium';
  font-size: 14px;
  margin-bottom: 0.5vw;
  color: ${palette.black};
`;
const AllBucketCategory = styled.div`
  font-family: 'NotoSansKR-Regular';
  font-size: 12px;
  color: ${palette.gray66};
`;

export default MyBucketList;