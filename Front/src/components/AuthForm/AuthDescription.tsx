import api from "../../utils/api/api";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { TinitialValues } from "../../utils/hooks/useForm";

export { authDescriptions, DayBusinessHour, weekdays, labelText };

type TdayBussinessHour = {
  day: string;
  hourHandler: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  values: TinitialValues;
};

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
        // errors.password = "소/대문자, 숫자, 특수문자가 포함되어야합니다.";
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
      name: "",
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
        name: "",
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
      if (!values.name) {
        errors.name = "이름을 입력하세요"
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
      name: "",
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
        name: "",
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
      if (!values.name) {
        errors.name = "이름을 입력하세요";
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

// ===== 라벨 텍스트 =====

const labelText: { [key: string]: string } = {
  userId: "아이디",
  password: "비밀번호",
  phoneNumber: "휴대전화 번호",
  email: "이메일",
  name: "이름",
  nickname: "닉네임",
  passwordcheck: "비밀번호 확인",
  brcImage: "사업자 등록증",
  businessHour: "영업시간 지정",
  agree: "약관에 동의하시겠습니까?",
  hobbyMajorCategory: "사업 카테고리",
  isHoliday: "공휴일 휴무 여부",
  storeName: "가게 이름",
  storeAddress: "가게 주소",
  storeContactNumber: "가게 전화번호",
  storeHompageUrl: "가게 홈페이지",
  storeBrcImages: "가게 이미지",
  storeExplanation: "가게 설명",
};

// ===== 영업시간 관련 =====

const weekdays: { [key: string]: string } = {
  monday: "월요일",
  tuesday: "화요일",
  wendesday: "수요일",
  thursday: "목요일",
  friday: "금요일",
  saturday: "토요일",
  sunday: "일요일",
};

const hours = Array.from({ length: 24 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);

const minutes = Array.from({ length: 6 }, (_, i) =>
  (i * 10).toString().padStart(2, "0")
);

const DayBusinessHour = ({ day, hourHandler, values }: TdayBussinessHour) => {
  const defaultOpenHour =
    values.businessHour && values.businessHour[day]
      ? values.businessHour[day].open
      : "09:30";
  const defaultCloseHour =
    values.businessHour && values.businessHour[day]
      ? values.businessHour[day].close
      : "06:00";
  const defaultReservationInterval =
    values.businessHour && values.businessHour[day]
      ? values.businessHour[day].reservationInterval
      : "30";
  const defaultStoreHoliday =
    values.businessHour && values.businessHour[day]
      ? values.businessHour[day].storeHoliday
      : false;

  return (
    <BusinessHourBox>
      <Daytitle>{`${weekdays[day]}`}</Daytitle>
      <HourSetting>
        오픈시간
        <label htmlFor={`${day}-open-hour`}>
          <select
            name={`${day}-open-hour`}
            id={`${day}-open-hour`}
            onChange={hourHandler}
            defaultValue={defaultOpenHour.slice(0, 2)}
          >
            {hours.map((hour, idx) => {
              return (
                <option value={hour} key={idx}>
                  {hour}
                </option>
              );
            })}
          </select>
          시
        </label>
        <label htmlFor={`${day}-open-min`}>
          <select
            name={`${day}-open-min`}
            id={`${day}-open-min`}
            onChange={hourHandler}
            defaultValue={defaultOpenHour.slice(3)}
          >
            {minutes.map((minute, idx) => (
              <option value={minute} key={idx}>
                {minute}
              </option>
            ))}
          </select>
          분
        </label>
        닫는시간
        <label htmlFor={`${day}-close-hour`}>
          <select
            name=''
            id={`${day}-close-hour`}
            onChange={hourHandler}
            defaultValue={defaultCloseHour.slice(0, 2)}
          >
            {hours.map((hour, idx) => (
              <option value={hour} key={idx}>
                {hour}
              </option>
            ))}
          </select>
          시
        </label>
        <label htmlFor={`${day}-close-min`}>
          <select
            name=''
            id={`${day}-close-min`}
            onChange={hourHandler}
            defaultValue={defaultCloseHour.slice(3)}
          >
            {minutes.map((minute, idx) => (
              <option value={minute} key={idx}>
                {minute}
              </option>
            ))}
          </select>
          분
        </label>
        예약 간격
        <label htmlFor={`${day}-reservationInterval`}>
          <select
            name=''
            id={`${day}-reservationInterval`}
            onChange={hourHandler}
            defaultValue={defaultReservationInterval}
          >
            <option value='30'>30</option>
            <option value='60'>60</option>
          </select>
          분
        </label>
      </HourSetting>
      <HolidaySetting>
        <label htmlFor={`${day}-storeHoliday`}>휴일인가요?</label>
        <input
          type='checkbox'
          id={`${day}-storeHoliday`}
          onChange={hourHandler}
          checked={defaultStoreHoliday}
        />
      </HolidaySetting>
    </BusinessHourBox>
  );
};

// ===== styled-components =====

const BusinessHourBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Daytitle = styled.div`
  margin-top: 8px;
`;

const HourSetting = styled.div`
  label {
    margin-right: 10px;
    
  }
  select option {
    background: var(--gray-color-light);
  }
`;

const HolidaySetting = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  label {
    margin-right: 8px;
  }
`;
