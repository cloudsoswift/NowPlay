// 새로운 폼 제작
import { authDescriptions } from "./AuthDescription";
import { Form, Field, FileField, CheckBoxField, BusinessHourField, SubmitButton, CategotySelectField } from "./AuthInputComponents";
import { Link, useLocation } from "react-router-dom";
import { useLogin } from "../../utils/hooks/useLogin";
import { useSignup } from "../../utils/hooks/useSignup";
import { TinitialValues } from "../../utils/hooks/useForm";

interface IAuthFomrProps {
  formType: "login" | "signup" | "ownerSignup";
}

const AuthForm = ({ formType }: IAuthFomrProps) => {
  const {
    initialValues,
    formPlaceHolder,
    formMaxLength,
    validate,
    // handleSubmit,
  } = authDescriptions[formType];

  const location = useLocation();

  const loginMutation = useLogin();

  const signupMutation = useSignup();

  // 뮤테이션 서브밋 할 때
  const loginHandleSubmit = (values: TinitialValues) => {
    loginMutation.mutate(values);
  };

  const signupHandleSubmit = (values: TinitialValues) => {
    signupMutation.mutate(values);
  };

  if (formType === "login") {
    return (
      <Form
        initialValues={initialValues}
        formMaxLength={formMaxLength}
        formPlaceHolder={formPlaceHolder}
        validate={validate}
        onSubmit={loginHandleSubmit}
      >
        <Field type="text" name="userId" />
        <Field type="password" name="password" />
        <SubmitButton type="submit">
          {loginMutation.isLoading ? <div id="spinner"></div> : "로그인"}
        </SubmitButton>
        <span>
          아직 회원이 아니신가요?{" "}
          <Link
            to={
              location.pathname.includes("owner")
                ? "/owner/signup"
                : "/mobile/mypage/signup"
            }
          >
            회원가입
          </Link>
        </span>
        <span>
          <Link
            to={
              location.pathname.includes("owner")
                ? "/owner/signup"
                : "/mobile/mypage/signup"
            }
          >
            아이디 찾기
          </Link>{" "}
          /{" "}
          <Link
            to={
              location.pathname.includes("owner")
                ? "/owner/signup"
                : "/mobile/mypage/signup"
            }
          >
            비밀번호 찾기
          </Link>
        </span>
      </Form>
    );
  } else if (formType === "signup") {
    return (
      <Form
        initialValues={initialValues}
        formMaxLength={formMaxLength}
        formPlaceHolder={formPlaceHolder}
        validate={validate}
        onSubmit={signupHandleSubmit}
      >
        <Field type="text" name="userId" />
        <Field type="password" name="password" />
        <Field type="password" name="passwordcheck" />
        <Field type="text" name="name" />
        <Field type="text" name="nickname" />
        <Field type="text" name="phoneNumber" />
        <Field type="text" name="email" />
        <CheckBoxField type="checkbox" name="agree" />
        <SubmitButton type="submit">회원가입</SubmitButton>
      </Form>
    );
  } else {
    return (
      <Form
        initialValues={initialValues}
        formMaxLength={formMaxLength}
        formPlaceHolder={formPlaceHolder}
        validate={validate}
        onSubmit={signupHandleSubmit}
      >
        <Field type="text" name="userId" />
        <Field type="password" name="password" />
        <Field type="password" name="passwordcheck" />
        <Field type="text" name="name" />
        <Field type="text" name="phoneNumber" />
        <Field type="text" name="email" />
        <FileField type="file" name="brcImage" />
        <CategotySelectField options={{"메인카테고리를 선택해주세요": [""], "체육": ["", "풋살", "축구", "농구", "배드민턴", "탁구", "스쿼시", "테니스", "스크린 골프" , "롤러장", "아이스링크장" , "당구"
      ], "문화": ["","공연장", "박물관", "미술관", "연극장"], "오락": ["","PC방", "오락실", "플스방", "인형뽑기", "동전노래방", "보드게임방"], "레저": ["","요트장", "서핑장", "수상스키", "클라이밍", "승마", "스킨다이빙", "스쿠버다이빙", "낚시", "레프팅"], "테마": ["","놀이공원", "민속촌", "글램핑", "등산로", "VR방", "방탈출", "동물원"], "힐링": ["","세차장", "목욕탕", "온천", "공원", "수목원", "화원"]}} name={["hobbyMainCategory", "hobbyMajorCategory"]}/>
        <BusinessHourField />
        <CheckBoxField type="checkbox" name="isHoliday" />
        <CheckBoxField type="checkbox" name="agree" />
        <SubmitButton type="submit">회원가입</SubmitButton>
      </Form>
    );
  }
};

export default AuthForm;
