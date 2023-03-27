import { atom, useRecoilState } from "recoil";
import { DatePicker } from "../../components/Places/Reservation/DatePicker";
import { TimePicker } from "../../components/Places/Reservation/TimePicker";

type Props = {
  
};
export const PlaceReservationPage = (props: Props) => {
  const selectedDateTime = atom({key: "selectedDateTime", default: {Date: new Date(), Time: ""}});
  const [DateTime, setDateTime] = useRecoilState(selectedDateTime);
  return (
    <div className="px-4 h-[calc(100vh-128px)]">
      <DatePicker onClick={setDateTime}/>
      <TimePicker onClick={setDateTime}/>
    </div>
  );
};