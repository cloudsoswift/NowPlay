import { useContext } from "react";
import { FormContext, IFormParams } from "../../AuthForm/AuthFields";

import useForm from "../../../utils/hooks/useForm";
import styled from "styled-components";
import { ImCancelCircle } from "react-icons/im";

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

const OldImageField = () => {
  const { values, getFieldProps, touched, errors } = useContext(FormContext);
  const oldImages = values.storeBrcImages
    ? values.storeBrcImages.map((img, idx) => {
        return (
          <div key={idx}>
            <ImCancelCircle
              id={img}
              onClick={getFieldProps("storeBrcImages").onClick}
            />
            <img src={img} alt='' />
          </div>
        );
      })
    : null;

  return <>{oldImages}</>;
};

export { StoreForm, OldImageField };

// ===== styled-components =====

const OwnerFormBox = styled.form`
  max-width: 800px;
  width: 50vw;
  margin: 20px;
`;
