import styled, { keyframes } from "styled-components";
import { createContext, useContext } from "react";
import useForm, { TinitialValues } from "../../utils/hooks/useForm";
import { TuseFormParams, TuseFormReturn } from "../../utils/hooks/useForm";

export {
  Form,
  Field,
  CheckBoxField,
  FileField,
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
      <div className="bar"></div>
      {!touched[name] || !errors[name] ? null : <span>{errors[name]}</span>}
    </InputBox>
  );
};

const CheckBoxField = ({ type, name }: { type: string; name: string }) => {
  const { getFieldProps, touched, errors } = useContext(FormContext);
  return (
    <InputBox>
      <div className="check-box">
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
      <input type={type} id={name} accept="image/*" {...getFieldProps(name)} />
      <div className="bar"></div>
      {!touched[name] || !errors[name] ? null : (
        <span id="FileError">{errors[name]}</span>
      )}
    </InputBox>
  );
};

const weekdays = [
  "monday",
  "tuseday",
  "wendsday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const BusinessHourField = () => {
  const { values, handleBusinessHour, getFieldProps } = useContext(FormContext);

  return (
    <InputBox>
      {weekdays.map((days: string) => {
        return <DayBusinessHour day={days} hourHandler={handleBusinessHour} values={values}/>;
      })}
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
  values: TinitialValues
};

const hours = Array.from({ length: 24 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);

const minutes = Array.from({ length: 6 }, (_, i) =>
  (i * 10).toString().padStart(2, "0")
);

const DayBusinessHour = ({ day, hourHandler }: TdayBussinessHour) => {

  return (
    <>
      {`${day}`} 오픈시간
      <select
        name={`${day}-open-hour`}
        id={`${day}-open-hour`}
        onChange={hourHandler}
        
      >
        {hours.map((hour) => (
          <option value={hour}>{hour}</option>
        ))}
      </select>
      <label htmlFor={`${day}-open-hour`}>시</label>
      <select
        name={`${day}-open-min`}
        id={`${day}-open-min`}
        onChange={hourHandler}
      >
        {minutes.map((minute) => (
          <option value={minute}>{minute}</option>
        ))}
      </select>
      <label htmlFor={`${day}-open-min`}>분</label>
      닫는시간
      <select name="" id={`${day}-close-hour`} onChange={hourHandler}>
        {hours.map((hour) => (
          <option value={hour}>{hour}</option>
        ))}
      </select>
      <label htmlFor={`${day}-close-hour`}>시</label>
      <select name="" id={`${day}-close-min`} onChange={hourHandler}>
        {minutes.map((minute) => (
          <option value={minute}>{minute}</option>
        ))}
      </select>
      <label htmlFor={`${day}-close-min`}>분</label>
      <label htmlFor={`${day}-reservationInterval`}>시간 간격</label>
      <select name="" id={`${day}-reservationInterval`} onChange={hourHandler}>
        <option value="30">30</option>
        <option value="60">60</option>
      </select>
      <label htmlFor={`${day}-storeHoliday`}>휴일인가요?</label>
      <input
        type="checkbox"
        id={`${day}-storeHoliday`}
        onChange={hourHandler}
      />
    </>
  );
};

// ===== styled-components =====

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: auto;
  width: 90vw;
  max-width: 500px;
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
    background: var(--primary-color-light);
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
