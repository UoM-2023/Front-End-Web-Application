import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGuest } from "../service/guest";
// import { toast } from "react-hot-toast";
// import { createEditCabin } from "../../services/apiCabins";

export function useAddGuest() {
  const queryClient = useQueryClient();

  const { mutate: addGuest, isPending } = useMutation({
    mutationFn: (formData) => createGuest({ formData }),
    onSuccess: () => {
      //   toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["guest"] });
    },
    // onError: (err) => toast.error(err.message),
  });

  return { isPending, addGuest };
}