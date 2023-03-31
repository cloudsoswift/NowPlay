import moment, { Moment } from "moment";

import { useState } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { reservationInfo, TReservationInfo } from "../../../pages/places/PlaceReservationPage";
type DayProps = {
  onClick: SetterOrUpdater<TReservationInfo>;
  isSelected: boolean;
  isPresentMonth: boolean;
  date: Moment;
};
const Day = ({ onClick, isSelected, isPresentMonth, date }: DayProps) => {
  const weekday = date.weekday();
  return (
    <td
      className={`${(!isPresentMonth && "text-opacity-30") || ""} ${
        (isSelected && "text-white bg-[var(--primary-color)]") || 
        (weekday === 6 && "text-blue-500") ||
        (weekday === 0 && "text-red-500") || "text-black"
      } py-2`}
      onClick={() => {
        onClick((prevReservationInfo)=>{
          return {
            ...prevReservationInfo,
            dateTime: date,
            dateChecked: true,
          }
        });
      }}
    >
      {date.date()}
    </td>
  );
};

const Calendar = () => {
  const [calendarDate, setCalendarDate] = useState(moment());
  const [{dateTime}, setReservationInfo] = useRecoilState(reservationInfo);

  const dayOfMonth = calendarDate.daysInMonth();
  const previousMonth = moment(calendarDate).subtract(1, "month");
  const dayOfPreviousMonth = previousMonth.daysInMonth();
  const nextMonth = moment(calendarDate).add(1, "month");
  let previousMonthLWS =
    moment(previousMonth).date(dayOfPreviousMonth).weekday() !== 6
      ? moment(previousMonth).date(dayOfPreviousMonth).startOf("week").date()
      : dayOfPreviousMonth + 1;
  let presentMonthCount = 1;
  let nextMonthFWSCount = 1;
  let nextMonthFWS = moment(nextMonth).date(1).endOf("week").date() + 7;

  return (
    <div>
      <div className="flex justify-between">
        <button
          onClick={() => {
            setCalendarDate((prevDate) =>
              moment(prevDate).subtract(1, "month")
            );
          }}
        >
          이전 달로
        </button>
        <span>
          <span className="text-xl mr-1">{calendarDate.year()}</span>
          <span>{calendarDate.month() + 1}</span>
        </span>
        <button
          onClick={() => {
            setCalendarDate((prevDate) => moment(prevDate).add(1, "month"));
          }}
        >
          다음 달로
        </button>
      </div>
      <table className="w-full h-full text-center">
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
          {Array.from(Array(6).keys()).map((week) => {
            return (
              <tr>
                {Array.from(Array(7).keys()).map((i) => {
                  // 현재 달의 첫 날이 일요일이 아닌 경우
                  // 달력에서 지난 달 마지막 주 ~ 현재 달의 첫 날 표시하는 부분
                  if (previousMonthLWS <= dayOfPreviousMonth) {
                    // return <td>{previousMonthLWS++}</td>
                    return (
                      <Day
                        date={moment(previousMonth).date(previousMonthLWS++)}
                        isSelected={moment(previousMonth)
                          .date(previousMonthLWS - 1)
                          .isSame(dateTime, 'day')}
                        onClick={setReservationInfo}
                        isPresentMonth={false}
                      />
                    );
                  } else if (presentMonthCount <= dayOfMonth) {
                    return (
                      <Day
                        date={moment(calendarDate).date(presentMonthCount++)}
                        isSelected={moment(calendarDate)
                          .date(presentMonthCount - 1)
                          .isSame(dateTime, 'day')}
                        onClick={setReservationInfo}
                        isPresentMonth={true}
                      />
                    );
                    // 현재 달의 마지막 날 ~ 다음 달의 두 번째 주(현재 달의 마지막 날이 토요일이면 첫 번째 주 까지만) 표시하는 부분
                  } else if (nextMonthFWSCount <= nextMonthFWS) {
                    return (
                      <Day
                        date={moment(nextMonth).date(nextMonthFWSCount++)}
                        isSelected={moment(nextMonth)
                          .date(nextMonthFWSCount - 1)
                          .isSame(dateTime, 'day')}
                        onClick={setReservationInfo}
                        isPresentMonth={false}
                      />
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const DatePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`w-[calc(100vw-32px)] ${
        isOpen ? "h-[calc(100vw-32px)]" : ""
      } border`}
    >
      <div
        className="w-full border text-2xl p-2"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        1. 날짜 선택
      </div>
      {isOpen && <Calendar />}
    </div>
  );
};
