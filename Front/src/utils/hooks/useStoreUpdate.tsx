import { useMutation } from '@tanstack/react-query'
import { storeUpdateAPI } from '../api/ownerApiFunctions'
import { TinitialValues } from './useForm'

const useStoreUpdate = () => {
  return useMutation((values: TinitialValues) => storeUpdateAPI(values))
}

export default useStoreUpdate