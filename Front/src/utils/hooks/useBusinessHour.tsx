import { TinitialValues } from "./useForm";

export type TuseBusinessHour = {
  e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>;
  values: TinitialValues
};

const useBusinessHour = () => {
  function updateHour({ e, values }: TuseBusinessHour) {

    const newBus = values.businessHour;

    const eInfo = e.target.id.split("-");


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
    if (eInfo[0] === "tuesday") {
      if (eInfo[1] === "open" && eInfo[2] === "hour" && newBus) {
        newBus.tuesday.open =
          e.currentTarget.value + newBus.tuesday.open.slice(2);
      } else if (eInfo[1] === "open" && eInfo[2] === "min" && newBus) {
        newBus.tuesday.open =
          newBus.tuesday.open.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "hour" && newBus) {
        newBus.tuesday.close =
          newBus.tuesday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "min" && newBus) {
        newBus.tuesday.close =
          newBus.tuesday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "reservationInterval" && newBus) {
        newBus.tuesday.reservationInterval = e.currentTarget.value;
      } else if (
        eInfo[1] === "storeHoliday" &&
        newBus &&
        e.currentTarget instanceof HTMLInputElement
      ) {
        newBus.tuesday.storeHoliday = e.currentTarget.checked;
      }
    }
    if (eInfo[0] === "wendesday") {
      if (eInfo[1] === "open" && eInfo[2] === "hour" && newBus) {
        newBus.wendesday.open =
          e.currentTarget.value + newBus.wendesday.open.slice(2);
      } else if (eInfo[1] === "open" && eInfo[2] === "min" && newBus) {
        newBus.wendesday.open =
          newBus.wendesday.open.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "hour" && newBus) {
        newBus.wendesday.close =
          newBus.wendesday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "close" && eInfo[2] === "min" && newBus) {
        newBus.wendesday.close =
          newBus.wendesday.close.slice(0, 3) + e.currentTarget.value;
      } else if (eInfo[1] === "reservationInterval" && newBus) {
        newBus.wendesday.reservationInterval = e.currentTarget.value;
      } else if (
        eInfo[1] === "storeHoliday" &&
        newBus &&
        e.currentTarget instanceof HTMLInputElement
      ) {
        newBus.wendesday.storeHoliday = e.currentTarget.checked;
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
    return newBus
  }
  return updateHour
};

export default useBusinessHour