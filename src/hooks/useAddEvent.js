import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "../service/event"; 
// import { toast } from "react-hot-toast";
// import { createEditCabin } from "../../services/apiCabins";

export function useAddEvent() {
  const queryClient = useQueryClient();

  const { mutate: addEvent, isPending } = useMutation({
    mutationFn: (formData) => createEvent({ formData }),
    onSuccess: () => {
      //   toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["event"] });
    },
    // onError: (err) => toast.error(err.message),
  });

  return { isPending, addEvent };
}
