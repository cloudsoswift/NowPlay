import { useEffect, useRef } from "react";
import { MAX_Y, MIN_Y } from "../../components/Places/PlaceCard";

type BottomSheetMetrics = {
  touchStart: {
    sheetY: number; // touchstart에서 BottomSheet의 최상단 모서리의 Y값
    touchY: number; // touchstart에서 터치 포인트의 Y값
  };
  touchMove: {
    prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
    movingDirection: "none" | "down" | "up"; // 유저가 touch를 움직이고 있는 방향
  }
}
const initialMetrics:BottomSheetMetrics = {
  touchStart: {
    sheetY: 0,
    touchY: 0,
  },
  touchMove: {
    prevTouchY: 0,
    movingDirection: "none",
  },
};
export const useBottomSheet = () => {
  const sheet = useRef<HTMLDivElement>(null);
  const metrics = useRef<BottomSheetMetrics>(initialMetrics);
  useEffect(()=>{
    const handleTouchStart = (e: TouchEvent) => {
      const {touchStart} = metrics.current;
      // 유저가 BottomSheet 터치했을 때의 y 좌표 기록
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y; // BottomSheet의 Y값
      touchStart.touchY = e.touches[0].clientY; // 터치 포인트의 Y값
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      const {touchStart, touchMove} = metrics.current;
      const currentTouch = e.touches[0];

      // 이전 터치 기록값 없으면 터치 시작점을 기록
      if(touchMove.prevTouchY === undefined){
        touchMove.prevTouchY = touchStart.touchY;
      }
      // 이전 터치 기록 - 현재 터치 위치 비교해서 위로 끌고가는지 아래로 끌고가는지 판단
      if(touchMove.prevTouchY < currentTouch.clientY){
        touchMove.movingDirection = 'down';
      }
      if(touchMove.prevTouchY > currentTouch.clientY){
        touchMove.movingDirection = 'up';
      }
      // 터치 시작점 부터 현재 터치 포인트 까지 y값 차이
      const touchOffset = currentTouch.clientY - touchStart.touchY;
      let nextSheetY = touchStart.sheetY + touchOffset;

      // nextSheetY는 MIN_Y와 MAX_Y 사이의 값이어야 함.
      if(nextSheetY < MIN_Y){
        nextSheetY = MIN_Y;
      }
      if(nextSheetY > MAX_Y){
        nextSheetY = MAX_Y;
      }
      sheet.current?.style.setProperty('transform', `translateY(${nextSheetY - MAX_Y}px)`);
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const {touchMove} = metrics.current;
      // Snap Animation
      const currentSheetY = sheet.current?.getBoundingClientRect().y;
      if(currentSheetY !== MIN_Y){
        if(touchMove.movingDirection === 'down'){
          sheet.current?.style.setProperty('transform', 'translateY(0)');
        }
        if(touchMove.movingDirection === 'up') {
          sheet.current?.style.setProperty('transform', `translateY(${MIN_Y - MAX_Y})`);
        }
      }
      // metrics 초기화
      metrics.current = initialMetrics;
    }
    sheet.current?.addEventListener('touchstart', handleTouchStart);
    sheet.current?.addEventListener('touchmove', handleTouchMove);
    sheet.current?.addEventListener('touchend', handleTouchEnd);
    return () => {
      // 클린업 함수로 달아놨던 이벤트리스너 삭제
      sheet.current?.removeEventListener('touchstart', handleTouchStart);
      sheet.current?.removeEventListener('touchmove', handleTouchMove);
      sheet.current?.removeEventListener('touchend', handleTouchEnd);
    }
  }, [])
  return {sheet};
};