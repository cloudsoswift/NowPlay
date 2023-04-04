import { TinitialValues } from "../hooks/useForm";
import { ownerapi } from "./api";

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

  // if (values.storeBrcImages) {
  //   Array.from(values.storeBrcImages).forEach((img) => {
  //     console.log(img.split('/').slice(0, 2))
  //     ownerapi({
  //       method: "GET",
  //       baseURL: "https://kr.object.ncloudstorage.com",
  //       url: `/d110/${img.split('/')[(img.split('/').length - 2)] + '/' + img.split('/')[(img.split('/').length - 1)]}`,
  //       responseType: "blob",
  //     }).then((res) => {
  //       const myFile = new File([res.data], "imageName");
  //       formData.append("files", new Blob([myFile]) );
  //       formData.append("files", myFile );
  //     });
  //     const url_data = new Blob([img], {type: 'image'})
  //     console.log(url_data)
  //     formData.append("files", new File([url_data], img))
  //     console.log(img.split("/")[img.split("/").length - 2] +
  //     "/" +
  //     img.split("/")[img.split("/").length - 1]);
  //     getImageAsBlob({
  //       bucketName: "/d110/store",
  //       key:
          
  //         img.split("/")[img.split("/").length - 1],
  //     });
  //   });
  // }

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
