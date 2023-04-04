import { useQuery } from "@tanstack/react-query";
import React, { useState, Suspense, useDeferredValue, useEffect } from "react";
import { useRecoilValue } from "recoil";
// import StoreInfoForm from "../../components/OwnerForm/StoreForm/StoreInfoForm";
// import StoreInfo from "../../components/OwnerPage/StoreInfo";
import StoreInfoSuspense from "../../components/OwnerPage/StoreInfoSuspense";
import { ownerapi } from "../../utils/api/api";
import { TinitialValues, TbusinessDay } from "../../utils/hooks/useForm";
import { ownerInfoAtion } from "../../utils/recoil/userAtom";

const StoreInfo = React.lazy(
  () => import("../../components/OwnerPage/StoreInfo")
);
const StoreInfoForm = React.lazy(
  () => import("../../components/OwnerForm/StoreForm/StoreInfoForm")
);


const OwnerStorePageComp = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const ownerInfo = useRecoilValue(ownerInfoAtion)

  const { isLoading, data, isError, isSuccess } = useQuery<TinitialValues>(
    ["storeInfo"],
    async () => {
      const { data } = await ownerapi({
        method: "GET",
        url: `place/${17799}/store`,
      });
      let newbusinessHour: TbusinessDay = {
        monday: {
          open: "09:00",
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
      };
      if (data.businessHourList.length !== 0) {
        data.businessHourList.forEach((day: any) => {
          newbusinessHour[day.dayOfWeek] = {...day}
        })
      }
      return {
        storeName: data.name,
        storeAddress: data.address,
        storeContactNumber: data.contactNumber,
        storeHompageUrl: data.homepage,
        storeBrcImages: [data.imagesUrl, ...data.storeImageList],
        storeExplanation: data.explanation,
        hobbyMainCategory: data.mainCategory.mainCategory,
        hobbyMajorCategory: data.subcategory.subcategory,
        businessHour:
          data.businessHourList.length !== 0
            ? newbusinessHour
            : {
                monday: {
                  open: "09:00",
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
    },
    { suspense: true }
  );

  

  const toUpdate = () => {
    setIsUpdate((prev) => !prev);
  };

  return (
    <>
      {isUpdate
        ? data && <StoreInfoForm initialValues={data} updateHandle={toUpdate} />
        : data && <StoreInfo values={data} updateHandle={toUpdate} />}
    </>
  );
};

const OwnerStorePage = () => {
  return (
    <Suspense fallback={<StoreInfoSuspense />}>
      <OwnerStorePageComp />
    </Suspense>
  );
};

export default OwnerStorePage;
