import { TinitialValues } from "./useForm";

export type TuseBusinessHour = {
  e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>;
  values: TinitialValues
};

const useBusinessHour = ({ e, values }: TuseBusinessHour) => {
    const newBus = values.businessHour;

    const eInfo = e.target.id.split("-");
    console.log(eInfo);

    if (eInfo[0] === "monday") {
      if (eInfo[1] === "open" && eInfo[2] === "hour" && newBus) {
        newBus.monday.open =
          e.currentTarget.value + newBus.monday.open.slice(2);
      } else if (eInfo[1] === "open" && eInfo[2] === "min" && newBus) {
        newBus.monday.open =
          newBus.monday.open.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "hour" && newBus) {
        newBus.monday.close =
          newBus.monday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "min" && newBus) {
        newBus.monday.close =
          newBus.monday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "reservationInterval" && newBus) {
        newBus.monday.reservationInterval = e.currentTarget.value;
      } else if (
        eInfo[1] === "storeHoliday" &&
        newBus &&
        e.currentTarget instanceof HTMLInputElement
      ) {
        newBus.monday.storeHoliday = e.currentTarget.checked;
      }
    }
    if (eInfo[0] === "tuseday") {
      if (eInfo[1] === "open" && eInfo[2] === "hour" && newBus) {
        newBus.tuseday.open =
          e.currentTarget.value + newBus.tuseday.open.slice(2);
      } else if (eInfo[1] === "open" && eInfo[2] === "min" && newBus) {
        newBus.tuseday.open =
          newBus.tuseday.open.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "hour" && newBus) {
        newBus.tuseday.close =
          newBus.tuseday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "min" && newBus) {
        newBus.tuseday.close =
          newBus.tuseday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "reservationInterval" && newBus) {
        newBus.tuseday.reservationInterval = e.currentTarget.value;
      } else if (
        eInfo[1] === "storeHoliday" &&
        newBus &&
        e.currentTarget instanceof HTMLInputElement
      ) {
        newBus.tuseday.storeHoliday = e.currentTarget.checked;
      }
    }
    if (eInfo[0] === "wendsday") {
      if (eInfo[1] === "open" && eInfo[2] === "hour" && newBus) {
        newBus.wendsday.open =
          e.currentTarget.value + newBus.wendsday.open.slice(2);
      } else if (eInfo[1] === "open" && eInfo[2] === "min" && newBus) {
        newBus.wendsday.open =
          newBus.wendsday.open.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "hour" && newBus) {
        newBus.wendsday.close =
          newBus.wendsday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "min" && newBus) {
        newBus.wendsday.close =
          newBus.wendsday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "reservationInterval" && newBus) {
        newBus.wendsday.reservationInterval = e.currentTarget.value;
      } else if (
        eInfo[1] === "storeHoliday" &&
        newBus &&
        e.currentTarget instanceof HTMLInputElement
      ) {
        newBus.wendsday.storeHoliday = e.currentTarget.checked;
      }
    }
    if (eInfo[0] === "thursday") {
      if (eInfo[1] === "open" && eInfo[2] === "hour" && newBus) {
        newBus.thursday.open =
          e.currentTarget.value + newBus.thursday.open.slice(2);
      } else if (eInfo[1] === "open" && eInfo[2] === "min" && newBus) {
        newBus.thursday.open =
          newBus.thursday.open.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "hour" && newBus) {
        newBus.thursday.close =
          newBus.thursday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "min" && newBus) {
        newBus.thursday.close =
          newBus.thursday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "reservationInterval" && newBus) {
        newBus.thursday.reservationInterval = e.currentTarget.value;
      } else if (
        eInfo[1] === "storeHoliday" &&
        newBus &&
        e.currentTarget instanceof HTMLInputElement
      ) {
        newBus.thursday.storeHoliday = e.currentTarget.checked;
      }
    }
    if (eInfo[0] === "friday") {
      if (eInfo[1] === "open" && eInfo[2] === "hour" && newBus) {
        newBus.friday.open =
          e.currentTarget.value + newBus.friday.open.slice(2);
      } else if (eInfo[1] === "open" && eInfo[2] === "min" && newBus) {
        newBus.friday.open =
          newBus.friday.open.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "hour" && newBus) {
        newBus.friday.close =
          newBus.friday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "min" && newBus) {
        newBus.friday.close =
          newBus.friday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "reservationInterval" && newBus) {
        newBus.friday.reservationInterval = e.currentTarget.value;
      } else if (
        eInfo[1] === "storeHoliday" &&
        newBus &&
        e.currentTarget instanceof HTMLInputElement
      ) {
        newBus.friday.storeHoliday = e.currentTarget.checked;
      }
    }
    if (eInfo[0] === "saturday") {
      if (eInfo[1] === "open" && eInfo[2] === "hour" && newBus) {
        newBus.saturday.open =
          e.currentTarget.value + newBus.saturday.open.slice(2);
      } else if (eInfo[1] === "open" && eInfo[2] === "min" && newBus) {
        newBus.saturday.open =
          newBus.saturday.open.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "hour" && newBus) {
        newBus.saturday.close =
          newBus.saturday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "min" && newBus) {
        newBus.saturday.close =
          newBus.saturday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "reservationInterval" && newBus) {
        newBus.saturday.reservationInterval = e.currentTarget.value;
      } else if (
        eInfo[1] === "storeHoliday" &&
        newBus &&
        e.currentTarget instanceof HTMLInputElement
      ) {
        newBus.saturday.storeHoliday = e.currentTarget.checked;
      }
    }
    if (eInfo[0] === "sunday") {
      if (eInfo[1] === "open" && eInfo[2] === "hour" && newBus) {
        newBus.sunday.open =
          e.currentTarget.value + newBus.sunday.open.slice(2);
      } else if (eInfo[1] === "open" && eInfo[2] === "min" && newBus) {
        newBus.sunday.open =
          newBus.sunday.open.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "hour" && newBus) {
        newBus.sunday.close =
          newBus.sunday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "min" && newBus) {
        newBus.sunday.close =
          newBus.sunday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "reservationInterval" && newBus) {
        newBus.sunday.reservationInterval = e.currentTarget.value;
      } else if (
        eInfo[1] === "storeHoliday" &&
        newBus &&
        e.currentTarget instanceof HTMLInputElement
      ) {
        newBus.sunday.storeHoliday = e.currentTarget.checked;
      }
    }

};
