import { useState, useEffect } from "react";
import { GiCancel } from "react-icons/gi";
import StoreInfoForm from "../../components/OwnerForm/StoreInfoForm";
import { TinitialValues } from "../../utils/hooks/useForm";

const dummyData: TinitialValues = {
  storeName: "피터 루거 스테이크 하우스",
  storeAddress: "178 Broadway, Brooklyn, NY 11211 미국",
  storeContactNumber: "718-387-7400",
  storeHompageUrl: "https://peterluger.com/",
  storeBrcImages: [
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QBMRXhpZgAASUkqAAgAAAACAA4BAgASAAAAJgAAAJiCAgAMAAAAOAAAAAAAAABIYXBweSBkb2cgc21pbGluZy5TYXJpSnV1cmluZW7/7QByUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAFYcAlAADFNhcmlKdXVyaW5lbhwCeAASSGFwcHkgZG9nIHNtaWxpbmcuHAJ0AAxTYXJpSnV1cmluZW4cAm4AGEdldHR5IEltYWdlcy9pU3RvY2twaG90b//hBTBodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPgoJPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIgICB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgZGM6UmlnaHRzPSJTYXJpSnV1cmluZW4iIHBob3Rvc2hvcDpDcmVkaXQ9IkdldHR5IEltYWdlcy9pU3RvY2twaG90byIgR2V0dHlJ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",
    "data:image/jpeg;base64,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",
  ],
  storeExplanation: "뉴욕의 전통 스테이크 하우스",
  hobbyMainCategory: "힐링",
  hobbyMajorCategory: "세차장",
  businessHour: {
    monday: {
      open: "10:00",
      close: "18:00",
      reservationInterval: "01:00",
      storeHoliday: false,
    },
    tuesday: {
      open: "09:00",
      close: "18:00",
      reservationInterval: "01:00",
      storeHoliday: false,
    },
    wendesday: {
      open: "09:00",
      close: "18:00",
      reservationInterval: "01:00",
      storeHoliday: false,
    },
    thursday: {
      open: "09:00",
      close: "18:00",
      reservationInterval: "01:00",
      storeHoliday: false,
    },
    friday: {
      open: "09:00",
      close: "18:00",
      reservationInterval: "01:00",
      storeHoliday: false,
    },
    saturday: {
      open: "09:00",
      close: "18:00",
      reservationInterval: "01:00",
      storeHoliday: false,
    },
    sunday: {
      open: "09:00",
      close: "18:00",
      reservationInterval: "01:00",
      storeHoliday: false,
    },
  },
};

const OwnerStorePage = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const [storeInfo, setStoreInfo] = useState(dummyData);

  const imgRemoveHandler = (img: string) => {

  }

  const imgs = storeInfo.storeBrcImages ? storeInfo.storeBrcImages.map((img, idx) => {
    return (
      <div key={idx}>
        <img src={img} />
        <GiCancel onClick={() => imgRemoveHandler(img)} />
      </div>
    );
  }) : null;

  const updateHandler = () => {
    setIsUpdate((prev) => !prev);
  };

  return (
    <>
      <div>
        <span>누구누구 사장님</span> 여기가 헤더 <button>로그아웃 버튼</button>
      </div>
      
      {isUpdate ? (
        <StoreInfoForm initialValues={dummyData}/>
      ) : (
        <div>
          <h1>메인 컨테이너</h1>
          <div>
            {dummyData.storeName}
            <button onClick={updateHandler}>회원 정보 수정버튼</button>
          </div>
          {imgs}
          <div>
            {JSON.stringify(dummyData.storeMainCategory)}
            {JSON.stringify(dummyData.storeMajorCategory)}
          </div>
          <div>여기는 주소 {dummyData.storeAddress}</div>
          <div>
            여기는 영업시간 표시{JSON.stringify(dummyData.storeBusinessHour)}
          </div>
          <div>여기는 가게 설명 {dummyData.storeExplanation}</div>
        </div>
      )}
    </>
  );
};

export default OwnerStorePage;