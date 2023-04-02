import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../main'
import { storeUpdateAPI } from '../api/ownerApiFunctions'
import { TinitialValues } from './useForm'

const useStoreUpdate = () => {
  console.log(1)
  
  return useMutation((values: TinitialValues) => storeUpdateAPI(values), {onSuccess: () => queryClient.invalidateQueries(["storeInfo"])})
}

export default useStoreUpdate