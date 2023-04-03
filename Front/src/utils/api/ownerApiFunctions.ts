import { useState } from "react";
import { TinitialValues } from "../hooks/useForm";
import { ownerapi } from "./api";

import AWS from "aws-sdk";
import axios from "axios";

const s3 = new AWS.S3({
  endpoint: "https://kr.object.ncloudstorage.com",
  credentials: {
    accessKeyId: "ESCb1U9YUC1iPdriv1Qc",
    secretAccessKey: "1M49n1x3q4COn0KtlZ2rKt63AQ4ermzvsCg9yk3l",
  },
  region: "kr-standard",
});

const getImageAsBlob = async ({
  bucketName,
  key,
}: {
  bucketName: string;
  key: string;
}) => {
  try {
    const response = await axios.get(s3.getSignedUrl('getObject', { Bucket: bucketName, Key: key }), {
      responseType: 'arraybuffer',
    });
    // const blob = new Blob([response.Body], { type: response.ContentType });
    // return blob;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const storeUpdateAPI = async (values: TinitialValues) => {
  const formData = new FormData();

  const updateStoreDTO = {
    name: "",
    address: "",
    contactNumber: "",
    homepage: "",
    businessHourDtoList: {},
    subcategory: "",
    mainCategory: "",
    closedOnHolidays: false,
    explanation: "",
    lantitude: 0,
    longitude: 0,
  };

  if (values.storeBrcImages) {
    Array.from(values.storeBrcImages).forEach((img) => {
      ownerapi({
        method: "GET",
        baseURL: img,
        responseType: "blob",
      }).then((res) => {
        const myFile = new File([res.data], "imageName");
        formData.append("files", new Blob([myFile]) );
        formData.append("files", myFile );
      });
      const url_data = new Blob([img], {type: 'image'})
      console.log(url_data)
      formData.append("files", new File([url_data], img))
      // console.log(img.split("/")[img.split("/").length - 2] +
      // "/" +
      // img.split("/")[img.split("/").length - 1]);
      // getImageAsBlob({
      //   bucketName: "/d110/store",
      //   key:
          
      //     img.split("/")[img.split("/").length - 1],
      // });
    });
  }

  if (values.newStoreBrcImages) {
    Array.from(values.newStoreBrcImages).forEach((img) => {
      // formData.append("files", new Blob([img]));
      formData.append("files", img);
    });
  }
  if (values.storeName) {
    updateStoreDTO.name = values.storeName;
  }

  if (values.storeAddress) {
    updateStoreDTO.address = values.storeAddress;
  }

  if (values.storeContactNumber) {
    updateStoreDTO.contactNumber = values.storeContactNumber;
  }

  if (values.storeHompageUrl) {
    updateStoreDTO.homepage = values.storeHompageUrl;
  }

  if (values.storeExplanation)
    updateStoreDTO.explanation = values.storeExplanation;

  if (values.businessHour) {
    let apibusinessHour: any[] = [];
    Object.keys(values.businessHour).forEach((day) => {
      if (values.businessHour)
        apibusinessHour.push({ dayOfWeek: day, ...values.businessHour[day] });
    });
    console.log(apibusinessHour);
    updateStoreDTO.businessHourDtoList = apibusinessHour;
  }

  if (values.hobbyMajorCategory) {
    updateStoreDTO.subcategory = values.hobbyMajorCategory;
  }
  if (values.hobbyMainCategory) {
    updateStoreDTO.mainCategory = values.hobbyMainCategory;
  }
  if (values.isHoliday !== undefined) {
    updateStoreDTO.closedOnHolidays = values.isHoliday;
  }
  console.log(updateStoreDTO);

  formData.append(
    "UpdateStoreDto",
    new Blob([JSON.stringify(updateStoreDTO)], { type: "application/json" })
  );

  // FormData의 key 확인
  for (let key of formData.keys()) {
    console.log(key);
  }

  // FormData의 value 확인
  for (let value of formData.values()) {
    console.log(value);
  }

  const { data } = await ownerapi({
    headers: {
      "Content-Type": undefined,
    },
    url: "place/owners/1",
    method: "POST",
    data: formData,
  });
  return data;
};
