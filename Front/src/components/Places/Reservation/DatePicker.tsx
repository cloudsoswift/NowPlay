import moment from "moment";

import { useState } from "react";
type Props = {
  onClick: Function;
};

const Calendar = () => {
  const [calendarDate, setCalendarDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment());
  const arr = Array<JSX.IntrinsicElements>();
  const allWeek = calendarDate.daysInMonth()/7
  console.log(calendarDate.week());  
  console.log(calendarDate.day(1).add(1, 'week').format());
  arr.push()
  // for(let week = 1; week < calendarDate.daysInMonth()/7; week++){
  //   arr.push(
  //     <td>
  //       {for(let day = week)}
  //     </td>
  //   )
  // }
  console.log(moment().day(1).format("ddd"));
  console.log(calendarDate.format());
  console.log(calendarDate.startOf("month").format());
  console.log(calendarDate.startOf("month").day());
  
  return <div>
    <table className="w-full h-full text-center">
      <thead>
        <tr>
          <td>월</td>
          <td>화</td>
          <td>수</td>
          <td>목</td>
          <td>금</td>
          <td>토</td>
          <td>일</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ㅇ</td>
          <td>ㅇ</td>
          <td>ㅇ</td>
          <td>ㅇ</td>
          <td>ㅇ</td>
          <td>ㅇ</td>
          <td>ㅇ</td>
        </tr>
        {/* {
          Array.from()
        } */}
      </tbody>
    </table>
  </div>
}

export const DatePicker = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`w-[calc(100vw-32px)] ${isOpen ? "h-[calc(100vw-32px)]" : ""} border`}>
      <div className="w-full border text-2xl p-2" onClick={()=>setIsOpen((prevState)=>!prevState)}>1. 날짜 선택</div>
      {isOpen && <Calendar />}
    </div>
  );
};
