// 나의 버킷리스트 페이지
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../styles/colorPalette";

import profile from "../contents/img_user_profile.jpg";
import menuIcon from "../contents/ic_bucket_menu.jpg";
import navigateNext from "../contents/ic_navigate_next.jpg";

import QuestMenuPopUp from "../components/QuestMenuPopUp";

const MyBucketList = () => {
  const dreamList = [["❤️", "고구마 먹고 춤추기"], ["🧡", "호랑이랑 악수하기"], ["💛", "사람들 앞에서 러닝머신타기"]];
  const emoji = ["❤️", "🧡", "💛", "💚", "💙", "💜"];
  
  const [isMenuOpen, setMenuOpen] = useState(false);

  // 버킷리스트 메뉴 열기
  const OpenMenu = () => {
    setMenuOpen(true);
  }

  // 버킷리스트 메뉴 닫기
  const CloseMenu = () => {
    setMenuOpen(false);
  }

  // isMenuOpen 변수의 값이 변할 때마다 새로고침?
  useEffect(() => {
  }, [isMenuOpen]);

  return (
    <Container>
      {/* 헤더: 프로필, 서비스명 */}
      <Header>
        <ProfileImage src={profile}/>
        <ServiceName>DreamQuest</ServiceName>
      </Header>

      {/* 레벨 정보 */}
      <DreamLevel>
        <Level>Lv.3</Level>

        {/* 레벨 진행바 */}
        <Progress>
          <ProgressBack/>
          <ProgressFrontBack/>
        </Progress>

        <LevelNotice>
          드림퀘스트 <b>2개</b>를 더 달성하고,<br/>
          <b>Lv.4</b>로 레벨업하세요!
        </LevelNotice>
      </DreamLevel>

      {/* 보너스 드림퀘스트 */}
      <BonusDream>
        <BonusTitle>보너스 드림퀘스트</BonusTitle>
        <BonusBox>
          <BonusIcon>🔥</BonusIcon>
          <BonusContent>
            <BonusGoal>5레벨 달성하기</BonusGoal>
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
          <YearBucketCount>16</YearBucketCount>
          <NavigateNextBtn src={navigateNext}/>
        </YearBucket>
      </MyBucket>

      {/* 드림퀘스트 생성 버튼 */}
      <CreateQuestBtns>
        <DirectCreateBtn>직접 등록</DirectCreateBtn>
        <GptCreateBtn>나의 드림퀘스트 만들기</GptCreateBtn>
      </CreateQuestBtns>

      {/* 드림퀘스트 내용 */}
      <AllBucketList>
        <Category>일상</Category>
        <div>
          {dreamList.map(dream => (
            <AllBucketBox>
              <AllBucketIcon>{dream[0]}</AllBucketIcon>
              <AllBucketContent>
                <AllBucketGoal>{dream[1]}</AllBucketGoal>
                <AllBucketCategory>일상</AllBucketCategory>
              </AllBucketContent>
              <MenuButton
                src={menuIcon}
                onClick={OpenMenu}/>
            </AllBucketBox>
          ))}
        </div>
      </AllBucketList>

      <QuestMenuPopUp isOpen={isMenuOpen} isClose={CloseMenu}/>

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
  width: 30%;
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
  padding-left: 6.3vw;
  padding-right: 6.3vw;
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
  padding: 3.5vw 3.5vw 3.5vw 3.5vw;
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