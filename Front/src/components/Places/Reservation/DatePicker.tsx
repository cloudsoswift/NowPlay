import moment from "moment";
import { useState } from "react";
type Props = {
  onClick: Function;
};

const Calendar = () => {
  const date = moment();
  console.log(date);
  console.log(moment().day(1).format("ddd"));
  return <div>
    <table>
      <thead>
        <tr>
          <td>일</td>
          <td>월</td>
          <td>화</td>
          <td>수</td>
          <td>목</td>
          <td>금</td>
          <td>토</td>
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
