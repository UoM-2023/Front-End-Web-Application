import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComplain } from "../service/complains"; 
// import { toast } from "react-hot-toast";
// import { createEditCabin } from "../../services/apiCabins";

export function useAddComplain() {
  const queryClient = useQueryClient();

  const { mutate: addComplain, isPending } = useMutation({
    mutationFn: (formData) => createComplain({ formData }),
    onSuccess: () => {
      //   toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["complain"] });
    },
    // onError: (err) => toast.error(err.message),
  });

  return { isPending, addComplain };
}
