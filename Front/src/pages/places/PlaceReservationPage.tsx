import moment from "moment";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { DatePicker } from "../../components/Places/Reservation/DatePicker";
import { RequestForm } from "../../components/Places/Reservation/RequestForm";
import { TimePicker } from "../../components/Places/Reservation/TimePicker";

type Props = {
  
};
export type TReservationInfo = {
  dateTime: moment.Moment;
  request: string;
  dateChecked: boolean;
  timeChecked: boolean;
}
export const reservationInfo = atom<TReservationInfo>({key: "reservationInfo", default: {dateTime: moment(), request: "", dateChecked: false, timeChecked: false,}});
export const PlaceReservationPage = (props: Props) => {
  const reservationInfoValue = useRecoilValue(reservationInfo);
  return (
    <div className="px-4 h-[calc(100vh-128px)] overflow-y-scroll">
      <DatePicker />
      <TimePicker />
      <RequestForm />
      <button className="w-full border" disabled={!(reservationInfoValue.dateChecked && reservationInfoValue.timeChecked && reservationInfoValue.request.trim().length > 0)}>예약하기</button>
    </div>
  );
};