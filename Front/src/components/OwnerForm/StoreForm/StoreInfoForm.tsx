import StoreDescription from "./StoreDesription";
import {StoreForm, OldImageField} from "./StoreFields";
import { Field, CheckBoxField, SubmitButton } from '../../AuthForm/AuthFields';
import { FileField, CategotySelectField, BusinessHourField } from '../OwnerAuthForm/OwnerFields';
import { TinitialValues } from '../../../utils/hooks/useForm'; 
import { category } from '../OwnerAuthForm/OwnerAuthDescription';
import useStoreUpdate from '../../../utils/hooks/useStoreUpdate';

const StoreInfoForm = ({
  initialValues, updateHandle
}: {
  initialValues: TinitialValues;
  updateHandle: () => void
}) => {
  const { formPlaceHolder, formMaxLength, validate } = StoreDescription;

  const storeInfoMutation = useStoreUpdate()

  const StoreUpdateHandler = (values: TinitialValues) => {
    console.log(values);
    updateHandle()
    // storeInfoMutation.mutate(values)
  };

  const newInitialValues = {...initialValues, newStoreBrcImages: undefined}

  return (
    <>
      <StoreForm
        initialValues={newInitialValues}
        formMaxLength={formMaxLength}
        formPlaceHolder={formPlaceHolder}
        validate={validate}
        onSubmit={StoreUpdateHandler}
      >
        <SubmitButton type='submit'>회원정보 수정 완료</SubmitButton>
        <Field type='text' name='storeName' />
        <OldImageField />
        <FileField type='file' name='newStoreBrcImages' />
        <Field type='text' name='storeAddress' />
        <Field type='text' name='storeContactNumber' />
        <Field type='text' name='storeHompageUrl' />
        <Field type='text' name='storeExplanation' />
        <CategotySelectField
          options={category}
          name={["hobbyMainCategory", "hobbyMajorCategory"]}
        />
        <BusinessHourField />
        <CheckBoxField type='checkbox' name='isHoliday' />
      </StoreForm>
    </>
  );
};

export default StoreInfoForm;
