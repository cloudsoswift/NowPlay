import { TinitialValues } from "../../../utils/hooks/useForm";

const StoreDescription = {
  formPlaceHolder: {
    
  },
  formMaxLength: {
    
  },
  validate: (values: TinitialValues) => {
    const errors = {
      storeName: "",
      storeAddress: "",
      
    };

    if (!values.storeName) {
      errors.storeName = "가게 이름은 필수입력 항목입니다."
    }
    if (!values.storeAddress) {
      errors.storeAddress = "가게 주소는 필수입력 항목입니다."
    }
    
    return errors;
  },
};

export default StoreDescription;
