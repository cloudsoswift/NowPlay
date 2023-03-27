import { useContext } from "react";
import { FormContext, IFormParams } from "../../AuthForm/AuthFields";

import useForm from "../../../utils/hooks/useForm";
import styled, {keyframes} from "styled-components";
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
          <FileImageCard key={idx}>
            <ImCancelCircle
              id={img}
              onClick={getFieldProps("storeBrcImages").onClick}
            />
            <img src={img} alt='' />
          </FileImageCard>
        );
      })
    : null;

  return <FileImageContainer>{oldImages}</FileImageContainer>;
};

export { StoreForm, OldImageField };

// ===== styled-components =====

const faidIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
  }
`

const OwnerFormBox = styled.form`
  width: 70vw;
  margin: 20px;

  animation: ${faidIn} 1s;

  > div {
    background-color: white;
    margin-bottom: 20px;
    margin-left: 10px;
    border-left: 20px solid var(--primary-color-light);
    border-radius: 10px;
    padding: 10px;
    > div {
      font-size: var(--title-1);
      > label {
      font-size: var(--title-1);
      }
    }
    > label {
      font-size: var(--title-1);
    }
    > input {
      font-size: var(--title-2);
    }
  }
`;


const FileImageContainer = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
`

const FileImageCard = styled.div`
  flex: 0 0 auto;
  width: 250px;
  height: 250px;
  border-radius: 10px;
  margin-right: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    
  }
  
  svg {
    position: absolute;
    font-size: var(--title-1);
    color: var(--primary-color);
    
  }
`;