import {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { selectHobbyAction } from "../../utils/recoil/userAtom";

const GERMAN_DIGITS = [
  "풋살",
  "축구",
  "농구",
  "배드민턴",
  "탁구",
  "스쿼시",
  "테니스",
  "스크린 골프",
  "롤러장",
  "아이스링크장",
  "당구장",
  "스크린야구",
  "공연장",
  "박물관",
  "미술관",
  "연극극장",
  "PC방",
  "플스방",
  "인형뽑기",
  "동전노래방",
  "보드게임방",
  "요트장",
  "서핑장",
  "수상스키",
  "클라이밍",
  "승마",
  "스킨스쿠버",
  "낚시",
  "레프팅",
  "양궁",
  "사격",
  "놀이공원",
  "민속촌",
  "글램핑",
  "등산로",
  "VR방",
  "방탈출",
  "동물원",
  "세차장",
  "목욕탕",
  "온천",
  "공원",
  "수목원",
];

const HobbyPage = () => {
  return (
    <HobbyContainer>
      <SelectedHobbyBox />
      <InfiniteScrollLoop surroundingBackup={2} />
      <button>선택완료</button>
    </HobbyContainer>
  );
};

const HobbyContainer = styled.div`
  button {
    width: 100vw;
    height: 60px;
    position: absolute;
    bottom: 80px;
    left: 0;

    border-radius: 10px;

    background-color: var(--primary-color);

    color: var(--body-color);
    font-size: var(--large-text);
  }
`;
const SelectedHobbyBox = () => {
  const [hobbyAtom, setHobbyAtom] = useRecoilState(selectHobbyAction);

  const removeHobby = (clickhobby: string) => {
    setHobbyAtom((prev) =>
        prev.filter((hobby) => {
          if (hobby === clickhobby) {
            return false;
          }
          return true;
        })
      );
  }

  return (
    <>
      {hobbyAtom.length !== 0 ? (
        <HobbyBox>
          {hobbyAtom.map((hobby) => {
            return <HobbyButton onClick={() => removeHobby(hobby)}>{hobby}</HobbyButton>;
          })}
        </HobbyBox>
      ) : null}
    </>
  );
};

const HobbyBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  align-items: center;

  overflow: auto;
  position: absolute;
  top: 40px;
  left: 0;

  height: 60px;
  width: 100%;

  background-color: var(--gray-color-light);
  z-index: 1;
`;

const HobbyButton = styled.div`
  flex: 0 0 auto;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 20px;

  background-color: var(--body-color);

  margin: 4px;

  border-radius: 10px;

`;

function RotateCard({
  height,
  children,
}: {
  height: number;
  children: React.ReactNode;
}) {
  const textref = useRef<HTMLDivElement | null>(null);
  const [windowY, setWindowY] = useState(0);
  const [windowInnerHeight, setInnerHeight] = useState(0);

  const [selected, setSelected] = useState(false);
  const [hobbyAtom, setHobbyAtom] = useRecoilState(selectHobbyAction);

  useEffect(() => {
    setWindowY(window.pageYOffset);
    setInnerHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    if (children && hobbyAtom.includes(children.toString())) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [hobbyAtom]);

  const topToEle = textref.current?.getBoundingClientRect().top || 0;

  const viewPortRate =
    ((topToEle > 0 ? topToEle : height * 10 + topToEle) % height) /
      windowInnerHeight -
    0.4;
  const rotateYdeg = Math.floor(viewPortRate * 170);

  const selectHandler = (e: React.MouseEvent) => {
    const clickHobby = e.currentTarget.innerHTML;
    if (hobbyAtom.includes(clickHobby)) {
      setHobbyAtom((prev) =>
        prev.filter((hobby) => {
          if (hobby === clickHobby) {
            return false;
          }
          return true;
        })
      );
    } else {
      setHobbyAtom((prev) => [...prev, clickHobby]);
    }
  };

  return (
    <TextDiv
      ref={textref}
      style={{ transform: ` perspective(2000px) rotateY(${-rotateYdeg}deg)` }}
      onClick={selectHandler}
      selected={selected}
    >
      {children}
    </TextDiv>
  );
}

function InfiniteScrollLoop({
  surroundingBackup,
}: {
  surroundingBackup: number;
}): JSX.Element {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);
  const [propsScroll, setPropsScroll] = useState<number>(0);

  const backupHeight = height;

  const HobbyCards = Array.from(GERMAN_DIGITS.entries()).map(
    ([index, digit]) => (
      <RotateCard height={height} key={index}>
        {digit}
      </RotateCard>
    )
  );

  // 스크롤 동작시 발동하는 함수, height의 변경이 있을 때 재생성
  const handleScroll = useCallback(() => {
    // 스크롤 ref가 존재하면
    if (scrollRef.current) {
      // 지금의 스크롤 높이를 가져오고
      const scroll = scrollRef.current.scrollTop;
      setPropsScroll(scroll);
      // console.log(scroll)
      // 스크롤이 끝에 도달 했으면?
      if (scroll < backupHeight || scroll >= backupHeight + height) {
        // 스크롤을 똑같은 컨텐츠가 있는 위치로 돌려준다
        scrollRef.current.scrollTop = backupHeight + (scroll % height);
      }
    }
  }, [height]);

  // 랜더링시에 초기의 컨텐츠 높이를 구하고 지정
  useLayoutEffect(() => {
    if (contentRef.current && scrollRef.current) {
      setHeight(contentRef.current.offsetHeight);
      scrollRef.current.scrollTop = contentRef.current.offsetHeight;
    }
  }, []);

  return (
    <InfiniteScrollContainer className='infinite-scroll-loop-outer'>
      <div
        className='infinite-scroll-loop-inner'
        ref={scrollRef}
        style={{
          height,
        }}
        onScroll={handleScroll}
      >
        {Array(surroundingBackup)
          .fill(surroundingBackup)
          .map((idx) => (
            <div>{HobbyCards}</div>
          ))}
        <div ref={contentRef}>{HobbyCards}</div>
        {Array(surroundingBackup)
          .fill(surroundingBackup)
          .map((idx) => (
            <div>{HobbyCards}</div>
          ))}
      </div>
    </InfiniteScrollContainer>
  );
}

export default HobbyPage;

const InfiniteScrollContainer = styled.div`
  overflow-y: hidden;
  height: calc(100vh - 125px);

  .infinite-scroll-loop-outer {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: calc(100% - 80px);
      background: linear-gradient(
        #fff 0%,
        rgba(255, 255, 255, 0) calc(15%),
        rgba(255, 255, 255, 0) calc(85%),
        #fff 100%
      );
      pointer-events: none;
    }
  }
  .infinite-scroll-loop-inner {
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const TextDiv = styled.div<{ selected: boolean }>`
  width: 100%;
  margin-bottom: 4px;
  padding: 2px;

  border-radius: 10px;
  background-color: ${(props) =>
    props.selected ? `var(--primary-color)` : `var(--body-color)`};

  font-family: LINESeedKRBd;
  color: ${(props) => (props.selected ? `var(--body-color)` : ``)};

  text-align: center;
  letter-spacing: 8px;
  font-size: calc(var(--large-text) + 5px);

  transition: 0.5s color ease, 0.5s background-color ease;
`;
