import { Link } from 'react-router-dom';

import { TinitialValues } from '../../../utils/hooks/useForm';

import { Form, Field, SubmitButton, CheckBoxField } from '../../AuthForm/AuthFields';
import { FileField, CategotySelectField, BusinessHourField } from './OwnerFields';
import { category, ownerAuthDescriptions } from './OwnerAuthDescription';
import { authDescriptions } from '../../AuthForm/AuthDescription';
import { useOwnerLogin } from '../../../utils/hooks/useOwnerLogin';
import { useOwnerSignup } from '../../../utils/hooks/useOwnerSignup';

export {OwnerLoginAuthForm, OwnerSignupAuthForm}

const OwnerLoginAuthForm = () => {
  const {
    initialValues,
    formPlaceHolder,
    formMaxLength,
    validate,
    // handleSubmit,
  } = authDescriptions["login"];

  const loginMutation = useOwnerLogin();

  const loginHandleSubmit = (values: TinitialValues) => {
    loginMutation.mutate(values);
  };

  return (
    <Form
      initialValues={initialValues}
      formMaxLength={formMaxLength}
      formPlaceHolder={formPlaceHolder}
      validate={validate}
      onSubmit={loginHandleSubmit}
    >
      <Field type='text' name='userId' />
      <Field type='password' name='password' />
      <SubmitButton type='submit'>
        {loginMutation.isLoading ? <div id='spinner'></div> : "로그인"}
      </SubmitButton>
      <span>
        아직 회원이 아니신가요?{" "}
        <Link to={"/owner/signup"}>회원가입</Link>
      </span>
      <span>
        <Link to={"/owner/signup"}>아이디 찾기</Link> /{" "}
        <Link to={"/owner/signup"}>비밀번호 찾기</Link>
      </span>
    </Form>
  );
};

const OwnerSignupAuthForm = () => {
  const {
    initialValues,
    formPlaceHolder,
    formMaxLength,
    validate,
    // handleSubmit,
  } = ownerAuthDescriptions["ownerSignup"];

  const signupMutation = useOwnerSignup();

  const signupHandleSubmit = (values: TinitialValues) => {
    signupMutation.mutate(values);
  };

  return (
    <Form
      initialValues={initialValues}
      formMaxLength={formMaxLength}
      formPlaceHolder={formPlaceHolder}
      validate={validate}
      onSubmit={signupHandleSubmit}
    >
      <Field type='text' name='userId' />
      <Field type='password' name='password' />
      <Field type='password' name='passwordcheck' />
      <Field type='text' name='name' />
      <Field type='text' name='phoneNumber' />
      <Field type='text' name='email' />
      <FileField type='file' name='brcImage' />
      <CategotySelectField
        options={category}
        name={["hobbyMainCategory", "hobbyMajorCategory"]}
      />
      <BusinessHourField />
      <CheckBoxField type='checkbox' name='isHoliday' />
      <CheckBoxField type='checkbox' name='agree' />
      <SubmitButton type='submit'>회원가입</SubmitButton>
    </Form>
  );
};