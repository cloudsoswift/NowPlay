import { useState } from "react";
import { TinitialValues } from "../hooks/useForm";
import { ownerapi } from "./api";

export const storeUpdateAPI = async (values: TinitialValues) => {
  const formData = new FormData();

  if (values.storeBrcImages) {
    Array.from(values.storeBrcImages).forEach((img) => {
      ownerapi({
        method: "GET",
        baseURL: img,
        responseType: "blob",
      }).then((res) => {
        const myFile = new File([res.data], "imageName");
        formData.append("multipartFiles", myFile);
      });
    });
  }

  if (values.newStoreBrcImages) {
    Array.from(values.newStoreBrcImages).forEach((img) => {
      formData.append("multipartFiles", img);
    });
  }
  if (values.storeName) {
    formData.append("name", values.storeName);
  }

  if (values.storeAddress) {
    formData.append("address", values.storeAddress);
  }

  if (values.storeContactNumber) {
    formData.append("contactNumber", values.storeContactNumber);
  }

  if (values.storeHompageUrl) {
    formData.append("homepage", values.storeHompageUrl);
  }

  if (values.storeExplanation)
    formData.append("explanation", values.storeExplanation);

  if (values.businessHour) {
    let apibusinessHour:any[] = []
    Object.keys(values.businessHour).forEach(day => {
      if (values.businessHour)
      apibusinessHour.push({dayOfWeek: day, ...values.businessHour[day]})
    })
    console.log(apibusinessHour)
    formData.append("businessHourDtoList", JSON.stringify(apibusinessHour));
  }

  
  if (values.hobbyMajorCategory) {
    formData.append("subcategory", values.hobbyMajorCategory);
  }
  if (values.hobbyMainCategory) {
    formData.append("mainCategory", values.hobbyMainCategory);
  }
  formData.append("closedOnHolidays", JSON.stringify(values.isHoliday));

  
  const { data } = await ownerapi({
    headers: {
      "Content-Type": "multipart/form-data"
    },
    url: "place/owners/1",
    method: "POST",
    data: formData,
  });
  return data;
};
