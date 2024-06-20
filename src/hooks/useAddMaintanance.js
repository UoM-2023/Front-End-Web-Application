import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMaintanance } from "../service/maintanance"; 
// import { toast } from "react-hot-toast";
// import { createEditCabin } from "../../services/apiCabins";

export function useAddMaintanance() {
  const queryClient = useQueryClient();

  const { mutate: addMaintanance, isPending } = useMutation({
    mutationFn: (formData) => createMaintanance({ formData }),
    onSuccess: () => {
      //   toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["maintanance"] });
    },
    // onError: (err) => toast.error(err.message),
  });

  return { isPending, addMaintanance };
}
