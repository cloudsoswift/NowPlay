import moment, { Moment } from 'moment';
import { useState } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { reservationInfo, TReservationInfo } from '../../../pages/places/PlaceReservationPage';
type Props = {
};
type TimeProps = {
  time: Moment;
  isSelected: boolean;
}
const Time = ({time, isSelected}: TimeProps) => {
  const onClick = useSetRecoilState(reservationInfo);
  const handleClick = () => {
    onClick((prevReservationInfo)=>{
      return {
        ...prevReservationInfo,
        dateTime: time,
        timeChecked: true,
      }
    })
  }
  return <div className={`text-center py-2 border ${isSelected ? "text-white bg-[var(--primary-color)]" : ""}`} onClick={handleClick}>{`${time.format('HH:mm')}`}</div>
}
const TimeList = ({date}: {date: Moment}) => {
  const today = moment(date).hour(9).minute(0);
  const arr = Array();
  console.log(today.isAfter(moment(date).hour(18).minute(0)), today.format(), moment(date).hour(18).minute(0).format());
  while(!today.isAfter(moment(date).hour(18).minute(0))){
    console.log(today.format());
    arr.push(<Time time={moment(today)} isSelected={date.isSame(moment(today))}/>)
    today.add(30, "minute")
  }
  console.log(today.format());
  return <div className='grid grid-cols-3'>
    {arr.map((d)=>d)}
  </div>
}

export const TimePicker = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {dateTime} = useRecoilValue(reservationInfo);
  return (
    <div className={`w-[calc(100vw-32px)] ${isOpen ? "h-[calc(100vw-32px)]" : ""} border`}>
      <div className="w-full border text-2xl p-2" onClick={()=>setIsOpen((prevState)=>!prevState)}>2. 시간 선택</div>
      {isOpen && <TimeList date={dateTime}/>}
    </div>
  );
};