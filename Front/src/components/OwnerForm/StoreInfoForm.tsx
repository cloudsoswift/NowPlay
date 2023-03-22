import StoreDescription from "./StoreDesription";
import StoreForm from "./StoreInputComponent";
import {
  Field,
  CheckBoxField,
  FileField,
  CategotySelectField,
  BusinessHourField,
} from "../AuthForm/AuthInputComponents";
import { TinitialValues } from "../../utils/hooks/useForm";

const StoreInfoForm = ({initialValues}: {initialValues: TinitialValues}) => {
  const { formPlaceHolder, formMaxLength, validate } = StoreDescription;
  const StoreUpdateHandler = (values: TinitialValues) => {
    console.log(values);
  };

  console.log(initialValues)
  return (
    <>
      <StoreForm
        initialValues={initialValues}
        formMaxLength={formMaxLength}
        formPlaceHolder={formPlaceHolder}
        validate={validate}
        onSubmit={StoreUpdateHandler}
      >
        <Field type="text" name="storeName" />
        <FileField type="file" name="storeBrcImages" />
        <Field type="text" name="storeAddress" />
        <Field type="text" name="storeContactNumber" />
        <Field type="text" name="storeHompageUrl" />
        <Field type="text" name="storeExplanation" />
        <CategotySelectField
          options={{
            "메인카테고리를 선택해주세요": [""],
            체육: [
              "",
              "풋살",
              "축구",
              "농구",
              "배드민턴",
              "탁구",
              "스쿼시",
              "테니스",
              "스크린 골프",
              "롤러장",
              "아이스링크장",
              "당구",
            ],
            문화: ["", "공연장", "박물관", "미술관", "연극장"],
            오락: [
              "",
              "PC방",
              "오락실",
              "플스방",
              "인형뽑기",
              "동전노래방",
              "보드게임방",
            ],
            레저: [
              "",
              "요트장",
              "서핑장",
              "수상스키",
              "클라이밍",
              "승마",
              "스킨다이빙",
              "스쿠버다이빙",
              "낚시",
              "레프팅",
            ],
            테마: [
              "",
              "놀이공원",
              "민속촌",
              "글램핑",
              "등산로",
              "VR방",
              "방탈출",
              "동물원",
            ],
            힐링: ["", "세차장", "목욕탕", "온천", "공원", "수목원", "화원"],
          }}
          name={["hobbyMainCategory", "hobbyMajorCategory"]}
        />
        <BusinessHourField />
        <CheckBoxField type="checkbox" name="isHoliday" />
      </StoreForm>
    </>
  );
};

export default StoreInfoForm;
