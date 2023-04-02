import { useQuery } from "@tanstack/react-query";
import React, { useState, Suspense, useDeferredValue, useEffect } from "react";
import StoreInfoForm from "../../components/OwnerForm/StoreForm/StoreInfoForm";
// import StoreInfo from "../../components/OwnerPage/StoreInfo";
import StoreInfoSuspense from "../../components/OwnerPage/StoreInfoSuspense";
import { ownerapi } from "../../utils/api/api";
import { TinitialValues } from "../../utils/hooks/useForm";

const StoreInfo = React.lazy(() => import("../../components/OwnerPage/StoreInfo"))

const OwnerStorePage = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const { isLoading, data, isError, isSuccess } = useQuery<TinitialValues>(
    ["storeInfo"],
    async () => {
      const { data } = await ownerapi({
        method: "GET",
        url: "place/1/store",
      });
      return {
        storeName: data.name,
        storeAddress: data.address,
        storeContactNumber: data.contactNumber,
        storeHompageUrl: data.homepage,
        storeBrcImages: [data.imagesUrl],
        storeExplanation: data.explanation,
        hobbyMainCategory: data.mainCategory.mainCategory,
        hobbyMajorCategory: data.subcategory.subcategory,
        businessHour:
          data.businessHourList.length !== 0
            ? data.businessHourList
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
      <Suspense fallback={<StoreInfoSuspense />}>
        {isUpdate
          ? data && (
              <StoreInfoForm initialValues={data} updateHandle={toUpdate} />
            )
          : data && <StoreInfo values={data} updateHandle={toUpdate} />}
      </Suspense>
    </>
  );
};

export default OwnerStorePage;
