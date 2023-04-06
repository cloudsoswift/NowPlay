import moment, { duration, Moment } from 'moment';
import { useState } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { reservationInfo, TReservationInfo } from '../../../pages/places/PlaceReservationPage';
import { TBusinessHour } from '../../../utils/api/graphql';
import { ENUM_DAYS, WEEK_OF_DAYS } from './DatePicker';
type Props = {
  businessHour: TBusinessHour[] 
};
type TimeProps = {
  time: Moment;
  isSelected: boolean;
  // businessHour: TBusinessHour[] 
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
const TimeList = ({date, businessHour}: {date: Moment, businessHour: TBusinessHour[]}) => {
  const today = moment(date).hour(0).minute(0);
  const todayBusinessHour = businessHour.find(bh=>{
    const key: ENUM_DAYS = bh.dayOfWeek as ENUM_DAYS;
    return WEEK_OF_DAYS[key] === today.weekday();
  })
  const arr = Array();
  const closeHour = moment(today).add(moment.duration(todayBusinessHour?.close))
  today.add(moment.duration(todayBusinessHour?.open));
  while(!today.isAfter(closeHour)){
    if(!today.isBefore(moment())){
      arr.push(<Time time={moment(today)} isSelected={date.isSame(moment(today))}/>)
    }
    today.add(todayBusinessHour?.reservationInterval || 30, "minute")
  }
  return <div className='grid grid-cols-3'>
    {arr.map((d)=>d)}
  </div>
}

export const TimePicker = ({ businessHour }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {dateTime, dateChecked} = useRecoilValue(reservationInfo);
  return (
    <div className={`w-[calc(100vw-32px)] ${isOpen ? "h-[calc(100vw-32px)]" : ""} border`}>
      <div className="w-full border text-2xl p-2" onClick={()=>{dateChecked ? setIsOpen((prevState)=>!prevState) : alert('날짜를 먼저 선택해주세요.')}}>2. 시간 선택</div>
      {isOpen && <TimeList date={dateTime} businessHour={businessHour} />}
    </div>
  );
};