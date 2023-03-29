import { useRef, useState, useCallback, useLayoutEffect } from "react";
import styled from "styled-components";

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

const InfiniteScroll = () => {
  return (
    <InfiniteScrollLoop surroundingBackup={1}>
      {Array.from(GERMAN_DIGITS.entries()).map(([index, digit]) => (
        <TextDiv>
          {digit}
        </TextDiv>
      ))}
    </InfiniteScrollLoop>
  );
};

function InfiniteScrollLoop({
  surroundingBackup,
  children,
}: {
  surroundingBackup: number;
  children: React.ReactNode;
}): JSX.Element {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);

  const backupHeight = height;
  console.log(height)

  // 스크롤 동작시 발동하는 함수, height의 변경이 있을 때 재생성
  const handleScroll = useCallback(() => {
    // 스크롤 ref가 존재하면
    if (scrollRef.current) {
      // 지금의 스크롤 높이를 가져오고
      const scroll = scrollRef.current.scrollTop;
      console.log(scroll % height)
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
      scrollRef.current.scrollTop = backupHeight;
    }
  });

  return (
    <InfiniteScrollContainer className="infinite-scroll-loop-outer">
      <div
        className="infinite-scroll-loop-inner"
        ref={scrollRef}
        style={{
          height,
        }}
        onScroll={handleScroll}
      >
        {Array(surroundingBackup)
          .fill(surroundingBackup)
          .map(() => (
            <div>{children}</div>
          ))}
        <div ref={contentRef} className="main">{children}</div>
        {Array(surroundingBackup)
          .fill(surroundingBackup)
          .map(() => (
            <div>{children}</div>
          ))}
      </div>
    </InfiniteScrollContainer>
  );
}

export default InfiniteScroll;

const InfiniteScrollContainer = styled.div`
  &.infinite-scroll-loop-outer {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: calc(100%-80px);
      height: 100%;
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
    /* &::-webkit-scrollbar {
      display: none;
    } */
  }
`;

const TextDiv = styled.div`
  text-align: center;
  font-size: var(--large-text);
`;
