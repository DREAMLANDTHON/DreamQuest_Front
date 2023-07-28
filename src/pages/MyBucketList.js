// 나의 버킷리스트 페이지
import styled from "styled-components";
import palette from "../styles/colorPalette";

import profile from "../contents/img_user_profile.jpg";
import menuIcon from "../contents/ic_bucket_menu.jpg";

const MyBucketList = () => {
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
        <MyBucketBox></MyBucketBox>
      </MyBucket>
      
    </Container>
  );
}


const Container = styled.div`
  display: block;
  position: relative;
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
  font-family: 'NotoSansKR-Bold';
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
  margin-right: 3vw;
  margin-top: 4.5vw;
  margin-bottom: 4.5vw;
  object-fit: cover;
`;

// 나의 드림퀘스트
const MyBucket = styled.div`
  margin-top: 4.5vw;
  margin-bottom: 2vw;
  margin-left: 4vw;
  margin-right: 4vw;
`;
const MyBucketBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2vw;
  width: 92vw;
  border-radius: 1.8vw;
  background-color: ${palette.white};
`;

export default MyBucketList;