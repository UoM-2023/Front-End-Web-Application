import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReservation } from "../service/reservstion";
// import { toast } from "react-hot-toast";
// import { createEditCabin } from "../../services/apiCabins";

export function useAddReservation() {
  const queryClient = useQueryClient();

  const { mutate: addReservation, isPending } = useMutation({
    mutationFn: (formData) => createReservation({ formData }),
    onSuccess: () => {
      //   toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["reservation"] });
    },
    // onError: (err) => toast.error(err.message),
  });

  return { isPending, addReservation };
}
