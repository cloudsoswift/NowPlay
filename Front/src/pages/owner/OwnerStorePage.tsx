import { useState, Suspense, useDeferredValue } from "react";
import StoreInfoForm from "../../components/OwnerForm/StoreForm/StoreInfoForm";
import StoreInfo from "../../components/OwnerPage/StoreInfo";
import StoreInfoSuspense from "../../components/OwnerPage/StoreInfoSuspense";
import { TinitialValues } from "../../utils/hooks/useForm";

const dummyData: TinitialValues = {
  storeName: "피터 루거 스테이크 하우스",
  storeAddress: "178 Broadway, Brooklyn, NY 11211 미국",
  storeContactNumber: "718-387-7400",
  storeHompageUrl: "https://peterluger.com/",
  storeBrcImages: [
    "https://www.eatthis.com/wp-content/uploads/sites/4/2022/04/shulas-steakhouse-steak.jpg?quality=82&strip=1",
    "https://olo-images-live.imgix.net/14/148a54de922e4aecb705b905f405cd29.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1500&h=1200&fit=crop&s=cba7c8944afbf3d7157d0be622a741c7",
    "https://media.istockphoto.com/id/827639672/photo/three-steaks-roasted-on-the-grill.jpg?s=612x612&w=0&k=20&c=gAMNM76tFk60zgxThKQJ3YSNNlw9jJZFHLpQfx5VeDM=",
    "https://mp-seoul-image-production-s3.mangoplate.com/sources/web/restaurants/350267/1851613_1607879873062?fit=around|738:738&crop=738:738;*,*&output-format=jpg&output-quality=80",
    "https://img.siksinhot.com/article/1635736419573708.jpeg"
  ],
  storeExplanation: "뉴욕의 전통 스테이크 하우스",
  hobbyMainCategory: "힐링",
  hobbyMajorCategory: "세차장",
  businessHour: {
    monday: {
      open: "10:00",
      close: "18:00",
      reservationInterval: "60",
      storeHoliday: true,
    },
    tuesday: {
      open: "09:00",
      close: "18:00",
      reservationInterval: "60",
      storeHoliday: false,
    },
    wendesday: {
      open: "09:00",
      close: "18:00",
      reservationInterval: "60",
      storeHoliday: false,
    },
    thursday: {
      open: "09:00",
      close: "18:00",
      reservationInterval: "60",
      storeHoliday: false,
    },
    friday: {
      open: "09:00",
      close: "18:00",
      reservationInterval: "60",
      storeHoliday: false,
    },
    saturday: {
      open: "09:00",
      close: "18:00",
      reservationInterval: "60",
      storeHoliday: false,
    },
    sunday: {
      open: "09:00",
      close: "18:00",
      reservationInterval: "60",
      storeHoliday: false,
    },
  },
};

const OwnerStorePage = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const deferredValue = useDeferredValue(dummyData)

  const toUpdate = () => {
    setIsUpdate(prev => !prev)
  }

  return (
    <>
      {isUpdate ? (
        <Suspense fallback={<StoreInfoSuspense />} >
          <StoreInfoForm initialValues={deferredValue} updateHandle={toUpdate} />
        </Suspense>
      ) : (
        <StoreInfo values={dummyData} updateHandle={toUpdate}/>
      )}
    </>
  );
};

export default OwnerStorePage;
