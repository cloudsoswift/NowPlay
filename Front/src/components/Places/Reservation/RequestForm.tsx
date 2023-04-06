import { useState, FocusEvent, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { reservationInfo } from "../../../pages/places/PlaceReservationPage";

type Props = {
  
};
const RequestInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [{request}, setReservation] = useRecoilState(reservationInfo);
  const handleInputBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    if(e.target.value.length > 255) {
      inputRef.current!.value = inputRef.current!.value.slice(0, 255);
    }
    setReservation((prevInfo)=>({
      ...prevInfo,
      request: inputRef.current!.value
    }));
  }
  return <div>
    <div className="w-full p-4">
      <textarea onBlur={handleInputBlur} rows={5} className="w-full border" ref={inputRef} />
      { inputRef.current?.value.length } / 255
    </div>
  </div>
}

export const RequestForm = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {timeChecked, dateChecked} = useRecoilValue(reservationInfo);
  const handleToggle = () => {
    if(!timeChecked || !dateChecked) {
      alert('먼저 날짜와 시간을 선택해주세요.');
      return;
    }
    setIsOpen((prevState)=>!prevState);
  }
  return (
    <div className={`w-[calc(100vw-32px)] ${isOpen ? "h-[calc(100vw-32px)]" : ""} border`}>
    <div className="w-full border text-2xl p-2" onClick={handleToggle}>3. 요청사항 작성</div>
    {isOpen && <RequestInput />}
  </div>
  );
};