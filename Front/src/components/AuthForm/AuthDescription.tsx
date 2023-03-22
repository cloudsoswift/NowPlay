import api from "../../utils/api/api";
import { useMutation } from "@tanstack/react-query";
import { TinitialValues } from "../../utils/hooks/useForm";

// 새로운 폼 타입을 추가 시키려면
// {key: {initialValues 폼 값, formPlaceHolder 플레이스 홀더,
//        formMaxLength 인풋 최대길이, validate 인증함수,

//        handleSubmit 제출 함수}}
const authDescriptions = {
  // ===== login =====
  login: {
    initialValues: { userId: "", password: "" },
    formPlaceHolder: {
      userId: "아이디를 입력해주세요",
      password: "비밀번호를 입력해주세요",
    },
    formMaxLength: {
      userId: 20,
      password: 20,
    },
    validate: (values: TinitialValues) => {
      const errors = {
        userId: "",
        password: "",
      };

      if (!values.userId) {
        errors.userId = "아이디를 입력하세요";
      }
      if (typeof(values.userId) === "string" && (values.userId.length < 5 || values.userId.length > 20)) {
        errors.userId = "아이디는 5~20자 입니다";
      }
      if (!values.password) {
        errors.password = "비밀번호를 입력하세요";
      }
      else if (typeof(values.password) === "string" &&
        !RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
        ).test(values.password)
      ) {
        errors.password = "소/대문자, 숫자, 특수문자가 포함되어야합니다.";
      }

      return errors;
    },
    handleSubmit: (values: TinitialValues) => {
    },
  },

  // ==== signup =====

  signup: {
    initialValues: {
      userId: "",
      password: "",
      passwordcheck: "",
      nickname: "",
      phoneNumber: "",
      email: "",
      agree: false,
    },
    formPlaceHolder: {
      phoneNumber: "'-'을 제외하고 입력해주세요",
      userId: "5~20자 사이로 입력해주세요",
      password: "대/소문자/숫자/특수문자 포함 8~20자",
      passwordcheck: "비밀번호를 한 번 더 입력해 주세요",
      email: "example@ssafy.com",
    },
    formMaxLength: {
      phoneNumber: 13,
      userId: 20,
      password: 20,
    },
    validate: (values: TinitialValues) => {
      const errors = {
        userId: "",
        password: "",
        passwordcheck: "",
        nickname: "",
        phoneNumber: "",
        email: "",
        agree: "",
      };

      if (!values.userId) {
        errors.userId = "아이디를 입력하세요";
      } else if (typeof(values.userId) === "string" && (values.userId.length < 5 || values.userId.length > 20)) {
        errors.userId = "아이디는 5~20자 입니다";
      }
      if (!values.password) {
        errors.password = "비밀번호를 입력하세요";
      } else if (typeof(values.password) === "string" &&
        !RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
        ).test(values.password)
      ) {
        errors.password = "소/대문자, 숫자, 특수문자가 포함되어야합니다.";
      }
      if (!values.passwordcheck || values.password !== values.passwordcheck) {
        errors.passwordcheck = "동일한 비밀번호를 입력하세요";
      }
      if (!values.nickname) {
        errors.nickname = "닉네임을 입력하세요";
      }
      if (!values.phoneNumber) {
        errors.phoneNumber = "전화번호를 입력하세요";
      }
      if (!values.email) {
        errors.email = "이메일을 입력하세요";
      } else if (typeof(values.email) === "string" && !/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(values.email)) {
        errors.email = "이메일형식을 지켜주세요";
      }
      if (!values.agree) {
        errors.agree = "약관에 동의해주세요";
      }

      return errors;
    },
    handleSubmit: (values: { [key: string]: string }) => {
      alert(JSON.stringify(values));
    },
  },

  //  ===== OwnerSignUp =====
  ownerSignup: {
    initialValues: {
      userId: "",
      password: "",
      passwordcheck: "",
      nickname: "",
      phoneNumber: "",
      email: "",
      brcImage: undefined,
      businessHour: {
        monday: {
          open: "09:00",
          close: "18:00",
          reservationInterval: "01:00",
          storeHoliday: false
        },
        tuesday: {
          open: "09:00",
          close: "18:00",
          reservationInterval: "01:00",
          storeHoliday: false
        },
        wendesday: {
          open: "09:00",
          close: "18:00",
          reservationInterval: "01:00",
          storeHoliday: false
        },
        thursday: {
          open: "09:00",
          close: "18:00",
          reservationInterval: "01:00",
          storeHoliday: false
        },
        friday: {
          open: "09:00",
          close: "18:00",
          reservationInterval: "01:00",
          storeHoliday: false
        },
        saturday: {
          open: "09:00",
          close: "18:00",
          reservationInterval: "01:00",
          storeHoliday: false
        },
        sunday: {
          open: "09:00",
          close: "18:00",
          reservationInterval: "01:00",
          storeHoliday: false
        },
      },
      isHoliday: false,
      hobbyMajorCategory: "",
      hobbyMainCategory: "",
      agree: false,
    },
    formPlaceHolder: {
      phoneNumber: "'-'을 제외하고 입력해주세요",
      userId: "5~20자 사이로 입력해주세요",
      password: "대/소문자/숫자/특수문자 포함 8~20자",
      passwordcheck: "비밀번호를 한 번 더 입력해 주세요",
      email: "example@ssafy.com",
    },
    formMaxLength: {
      phoneNumber: 13,
      userId: 20,
      password: 20,
    },
    validate: (values: TinitialValues) => {
      const errors = {
        userId: "",
        password: "",
        passwordcheck: "",
        nickname: "",
        phoneNumber: "",
        email: "",
        hobbyMajorCategory: "",
        brcImage: "",
        agree: "",
      };

      if (!values.userId) {
        errors.userId = "아이디를 입력하세요";
      } else if (typeof(values.userId) === "string" && (values.userId.length < 5 || values.userId.length > 20)) {
        errors.userId = "아이디는 5~20자 입니다";
      }
      if (!values.password) {
        errors.password = "비밀번호를 입력하세요";
      } else if (typeof(values.password) === "string" &&
        !RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
        ).test(values.password)
      ) {
        errors.password = "소/대문자, 숫자, 특수문자가 포함되어야합니다.";
      }
      if (!values.passwordcheck || values.password !== values.passwordcheck) {
        errors.passwordcheck = "동일한 비밀번호를 입력하세요";
      }
      if (!values.nickname) {
        errors.nickname = "닉네임을 입력하세요";
      }
      if (!values.phoneNumber) {
        errors.phoneNumber = "전화번호를 입력하세요";
      }
      if (!values.email) {
        errors.email = "이메일을 입력하세요";
      } else if (typeof(values.email) === "string" && !/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(values.email)) {
        errors.email = "이메일형식을 지켜주세요";
      }
      if (!values.brcImage) {
        errors.brcImage = "사업자 등록증을 올려주세요"
      }
      if (!values.agree) {
        errors.agree = "약관에 동의해주세요";
      }
      if (values.hobbyMajorCategory === "" || !values.hobbyMajorCategory) {
        errors.hobbyMajorCategory = "카테고리를 골라주세요"
      }

      return errors;
    },
    handleSubmit: (values: { [key: string]: string }) => {
      alert(JSON.stringify(values));
    },
  },
};

export { authDescriptions };
