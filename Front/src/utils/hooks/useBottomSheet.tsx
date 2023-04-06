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
  isContentAreTouched: boolean; // 컨텐츠 영역을 터치하고 있음을 기록
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
  isContentAreTouched: false,
};
export const useBottomSheet = () => {
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const metrics = useRef<BottomSheetMetrics>(initialMetrics);
  useEffect(()=>{
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreTouched } = metrics.current;
      // 바텀 시트에서 컨텐츠 영역이 아닌 부분을 터치하면 항상 바텀 시트 움직임.
      
      if(!isContentAreTouched) {
        return true;
      }
      
      // 바텀 시트가 올라와 있는 상태가 아닐 때는 컨텐츠 영역 터치해도 바텀 시트 움직임
      if(sheet.current?.getBoundingClientRect().y !== MIN_Y) {
        return true;
      }
      
      if(touchMove.movingDirection === 'down') {
        // 스크롤 더 올릴거 없으면, 바텀 시트 움직이도록
        return content.current!.scrollTop <= 0;
      }

      return false;
    }
    const handleTouchStart = (e: TouchEvent) => {
      const {touchStart, touchMove} = metrics.current;
      // 유저가 BottomSheet 터치했을 때의 y 좌표 기록
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y; // BottomSheet의 Y값
      touchStart.touchY = e.touches[0].clientY; // 터치 포인트의 Y값
      touchMove.prevTouchY = touchStart.touchY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {

      const {touchStart, touchMove} = metrics.current;
      const currentTouch = e.touches[0];

      // 이전 터치 기록값 없으면 터치 시작점을 기록
      if(touchMove.prevTouchY === undefined || touchMove.prevTouchY === 0){
        touchMove.prevTouchY = touchStart.touchY;
      }
      // 이전 터치 기록 - 현재 터치 위치 비교해서 위로 끌고가는지 아래로 끌고가는지 판단
      if(touchMove.prevTouchY < currentTouch.clientY){
        touchMove.movingDirection = 'down';
      }
      if(touchMove.prevTouchY > currentTouch.clientY){
        touchMove.movingDirection = 'up';
      }
      if(canUserMoveBottomSheet()) {
        // 바텀시트 움직일 수 있는 싱태면, content에서 scroll 발생하는거 막음.
        e.preventDefault();
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
      } else {
        document.body.style.overflowY = 'hidden';
      }
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
          sheet.current?.style.setProperty('transform', `translateY(${MIN_Y - MAX_Y}px)`);
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
  useEffect(()=> {
    const handleTouchStart = () => {
      metrics.current.isContentAreTouched = true;
    }
    content.current?.addEventListener('touchstart', handleTouchStart);
    return () => content.current?.removeEventListener('touchstart', handleTouchStart);
  }, []);
  return {sheet, content};
};