import { useState } from 'react';
type Props = {
  onClick: Function
};
export const TimePicker = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`w-[calc(100vw-32px)] ${isOpen ? "h-[calc(100vw-32px)]" : ""} border`}>
      <div className="w-full border text-2xl p-2" onClick={()=>setIsOpen((prevState)=>!prevState)}>2. 시간 선택</div>
      {isOpen && <div>ㅎㅇ</div>}
    </div>
  );
};