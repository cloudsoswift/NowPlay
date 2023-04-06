import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../main";
import { storeUpdateAPI } from "../api/ownerApiFunctions";
import { TinitialValues } from "./useForm";

const useStoreUpdate = () => {
  return useMutation(
    ({ values, idx }: { values: TinitialValues; idx: number }) =>
      storeUpdateAPI({ values, idx }),
    {
      onSettled: () => queryClient.invalidateQueries(["storeInfo"]),
      onMutate: async (newInfo) => {
        await queryClient.cancelQueries({ queryKey: ["storeInfo"] });

        const previousInfo = queryClient.getQueryData(["storeInfo"]);

        queryClient.setQueryData(["storeInfo"], newInfo.values);

        return { previousInfo, newInfo };
      },
      onError: (err, newTodo, context) => {
        queryClient.setQueryData(['todos'], context?.previousInfo)
      }
    }
  );
};

export default useStoreUpdate;
