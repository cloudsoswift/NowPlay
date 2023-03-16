// 새로운 폼 타입을 추가 시키려면
// {key: {initialValues 폼 값, formPlaceHolder 플레이스 홀더,
//        formMaxLength 인풋 최대길이, validate 인증함수,
//        handleSubmit 제출 함수}}
const authDescriptions = {
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
    validate: (values: { [key: string]: string }) => {
      const errors = {
        userId: "",
        password: "",
      };

      if (!values.userId) {
        errors.userId = "아이디를 입력하세요";
      }
      if (values.userId.length < 5 || values.userId.length > 20) {
        errors.userId = "아이디는 5~20자 입니다";
      }
      if (!values.password) {
        errors.password = "비밀번호를 입력하세요";
      } else if (
        !RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
        ).test(values.password)
      ) {
        errors.password = "소/대문자, 숫자, 특수문자가 포함되어야합니다.";
      }

      return errors;
    },
    handleSubmit: (values: { [key: string]: string }) => {
      console.log(values.userId);
      console.log(values.password);
    },
  },
  registration: {
    initialValues: {
      userId: "",
      password: "",
      nickname: "",
      phoneNumber: "",
      email: "",
    },
    formPlaceHolder: {
      phoneNumber: "'-'을 제외하고 입력해주세요",
      userId: "5~20자 사이로 입력해주세요",
      password: "대/소문자/숫자/특수문자 포함 8~20자",
      email: "example@ssafy.com",
    },
    formMaxLength: {
      phoneNumber: 13,
      userId: 20,
      password: 20,
    },
    validate: (values: { [key: string]: string }) => {
      const errors = {
        userId: "",
        password: "",
        passwordcheck: "",
        nickname: "",
        phoneNumber: "",
        email: "",
      };

      if (!values.userId) {
        errors.userId = "아이디를 입력하세요";
      }
      if (values.userId.length < 5 || values.userId.length > 20) {
        errors.userId = "아이디는 5~20자 입니다";
      }
      if (!values.password) {
        errors.password = "비밀번호를 입력하세요";
      } else if (
        !RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
        ).test(values.password)
      ) {
        errors.password = "소/대문자, 숫자, 특수문자가 포함되어야합니다.";
      }
      if (values.password !== values.passwordcheck) {
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
      } else if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(values.email)) {
        errors.email = "이메일형식을 지켜주세요";
      }

      return errors;
    },
    handleSubmit: (values: { [key: string]: string }) => {
      alert(JSON.stringify(values));
    },
  },
};


export { authDescriptions };
