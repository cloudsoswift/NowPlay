import { IFormParams, FormContext } from "../AuthForm/AuthInputComponents";

import useForm from "../../utils/hooks/useForm";
import styled from "styled-components";

const StoreForm = ({
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
      <OwnerFormBox onSubmit={formValue.handleSubmit}>{children}</OwnerFormBox>
    </FormContext.Provider>
  );
};

export default StoreForm;

const OwnerFormBox = styled.form`
  max-width: 800px;
  width: 50vw;
  margin: 20px
`;
