import styled, { keyframes } from "styled-components";
import { createContext, useContext, useState } from "react";
import useForm, { TinitialValues } from "../../utils/hooks/useForm";
import { TuseFormParams, TuseFormReturn } from "../../utils/hooks/useForm";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";

export {
  Form,
  Field,
  CheckBoxField,
  FileField,
  CategotySelectField,
  BusinessHourField,
  SubmitButton,
};

interface IFormParams extends TuseFormParams {
  children: React.ReactNode;
}

const labelText: { [key: string]: string } = {
  userId: "아이디",
  password: "비밀번호",
  phoneNumber: "휴대전화 번호",
  email: "이메일",
  nickname: "닉네임",
  passwordcheck: "비밀번호 확인",
  brcImage: "사업자 등록증",
  businessHour: "영업시간 지정",
  agree: "약관에 동의하시겠습니까?",
  hobbyMajorCategory: "사업 카테고리",
  isHoliday: "공휴일 휴무",
};

const FormContext = createContext<TuseFormReturn>({
  values: {},
  errors: {},
  touched: {},
  handleChange: () => {},
  handleBusinessHour: () => {},
  handleBlur: () => {},
  handleSubmit: () => {},
  getFieldProps: () => {
    return { name: "", value: "", onBlur: () => {}, onChange: () => {} };
  },
});
FormContext.displayName = "FormContext";

const Form = ({
  children,
  initialValues,
  formPlaceHolder,
  formMaxLength,
  validate,
  onSubmit,
}: IFormParams) => {
  const formValue = useForm({
    initialValues,
    formPlaceHolder,
    formMaxLength,
    validate,
    onSubmit,
  });

  return (
    <FormContext.Provider value={formValue}>
      <FormBox onSubmit={formValue.handleSubmit}>{children}</FormBox>
    </FormContext.Provider>
  );
};

const Field = ({ type, name }: { type: string; name: string }) => {
  const { getFieldProps, touched, errors } = useContext(FormContext);

  return (
    <InputBox>
      <label htmlFor={name}>{labelText[name]}</label>
      <input type={type} id={name} {...getFieldProps(name)} />
      <div className='bar'></div>
      {!touched[name] || !errors[name] ? null : <span>{errors[name]}</span>}
    </InputBox>
  );
};

const CheckBoxField = ({ type, name }: { type: string; name: string }) => {
  const { getFieldProps, touched, errors } = useContext(FormContext);
  return (
    <InputBox>
      <div className='check-box'>
        <label htmlFor={name}>{labelText[name]}</label>
        <input type={type} id={name} {...getFieldProps(name)} />
      </div>
      {!touched[name] || !errors[name] ? null : <span>{errors[name]}</span>}
    </InputBox>
  );
};

const FileField = ({ type, name }: { type: string; name: string }) => {
  const { getFieldProps, touched, errors } = useContext(FormContext);

  return (
    <InputBox>
      <label htmlFor={name}>{labelText[name]}</label>
      <input type={type} id={name} accept='image/*' {...getFieldProps(name)} />
      <div className='bar'></div>
      {!touched[name] || !errors[name] ? null : (
        <span id='FileError'>{errors[name]}</span>
      )}
    </InputBox>
  );
};

type TselectOptions = {
  [key: string]: string[];
};

const CategotySelectField = ({
  options,
  name,
}: {
  options: TselectOptions;
  name: string[];
}) => {
  const { values, getFieldProps, touched, errors } = useContext(FormContext);

  const subOptions = values.hobbyMainCategory
    ? options[values.hobbyMainCategory].map((opt, idx) => {
        return (
          <option value={opt} key={idx}>
            {opt}
          </option>
        );
      })
    : null;

  return (
    <InputBox>
      <label htmlFor={name[1]}>{labelText[name[1]]}</label>
      <SelectBox>
      <select id={name[0]} {...getFieldProps(name[0])}>
        {Object.keys(options).map((option, idx) => {
          return (
            <option value={option} key={idx}>
              {option}
            </option>
          );
        })}
      </select>
      <select id={name[1]} {...getFieldProps(name[1])} value={values.hobbyMajorCategory}>
        {subOptions}
      </select>
      </SelectBox>
      {!touched[name[1]] || !errors[name[1]] ? null : (
        <span id='SelectError'>{errors[name[1]]}</span>
      )}
    </InputBox>
  );
};

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

const BusinessHourField = () => {
  const { values, handleBusinessHour, getFieldProps } = useContext(FormContext);

  const [hourOpen, setHourOpen] = useState(true);

  const hourHandler = () => {
    setHourOpen((prev) => !prev);
  };

  return (
    <InputBox>
      <div onClick={hourHandler} className='businesssheader'>
        영업시간 설정 {hourOpen ? <BiCaretUp /> : <BiCaretDown />}
      </div>

      <HourDisclosure open={hourOpen}>
        {Object.keys(weekdays).map((days: string, idx) => {
          return (
            <DayBusinessHour
              day={days}
              hourHandler={handleBusinessHour}
              values={values}
              key={idx}
            />
          );
        })}
      </HourDisclosure>
    </InputBox>
  );
};

type TdayBussinessHour = {
  day: string;
  hourHandler: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  values: TinitialValues;
};

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

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: auto;
  width: 90vw;
  max-width: 700px;
  padding: 40px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 10px var(--gray-color-light);

  a {
    color: var(--primary-color);
    font-family: "LINESeedKRBd";
  }
`;

const InputBox = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: auto;
  padding-bottom: 30px;

  > label {
    margin-bottom: 10px;
  }

  > input {
    padding: 6px;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid var(--gray-color);
  }

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: 1px solid var(--gray-color);
    appearance: none;
    transition: background 0.2s;
    content: "";
  }

  input[type="checkbox"]:checked {
    background: var(--primary-color);
    border: 2px solid var(--gray-color-light);
    border-radius: 100%;
  }

  > span {
    position: absolute;
    color: red;
    top: 70px;
    font-size: var(--caption);
  }

  > input:focus {
    outline: none;
  }

  /* Underline */

  .bar {
    position: relative;
    display: block;
    width: 100%;
  }

  .bar:before,
  .bar:after {
    content: "";
    height: 2px;
    width: 0;
    position: absolute;
    background: var(--primary-color);
    transition: all 0.2s ease;
  }

  .bar:before {
    left: 50%;
  }

  .bar:after {
    right: 50%;
  }

  /* active */

  input:focus ~ .bar:before,
  input:focus ~ .bar:after {
    width: 50%;
  }

  /* check-box */
  > .check-box {
    display: flex;
    justify-content: space-between;
  }

  > .check-box ~ span {
    top: 25px;
    color: red;
    font-size: var(--caption);
  }

  /* file */

  #FileError {
    top: 80px;
  }

  /* businesshour */

  > .businesssheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
`;

const SelectBox = styled.div`
display: flex;
justify-content: space-evenly;
  select {
    width: 40%;
    text-align: center;
    height: 30px;
  }
`

const HourDisclosure = styled.div<{open: boolean}>`
  background-color: var(--gray-color-light);
  border-radius: 10px;
  padding: 10px;
  overflow: hidden;
  height: ${props => `${props.open ? "580px" : "0px"}`};
  transition: height 0.7s;
`;

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

const spinAnimation = keyframes`
  0% {transform: rotate(0deg);}
  100% {transform: rotate(365deg);}
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
  border-radius: 20px;
  height: 50px;
  width: 100%;
  margin-bottom: 10px;
  color: var(--body-color);
  transition: var(--trans-02);
  font-family: "LINESeedKRBd";

  &:active {
    background-color: var(--primary-color-light);
  }

  #spinner {
    position: relative;
    width: 30px;
    height: 30px;
    border: 4px solid var(--gray-color-light);
    border-radius: 50%;
    border-top-color: var(--primary-color-light);
    animation: ${spinAnimation} 1s ease-out infinite;
  }
`;
