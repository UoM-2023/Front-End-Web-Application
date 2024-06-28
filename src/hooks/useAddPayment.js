import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayment } from "../service/payment"; 
// import { toast } from "react-hot-toast";
// import { createEditCabin } from "../../services/apiCabins";

export function useAddPayment() {
  const queryClient = useQueryClient();

  const { mutate: addPayment, isPending } = useMutation({
    mutationFn: (formData) => createPayment({ formData }),
    onSuccess: () => {
      //   toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["payment"] });
    },
    // onError: (err) => toast.error(err.message),
  });

  return { isPending, addPayment };
}