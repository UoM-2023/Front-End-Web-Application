import { useQuery } from "@tanstack/react-query";
import { getGuest } from "../service/guest";
// import { getCabins } from "../../services/apiCabins";

export function useGetGuest() {
  const {
    isPending,
    data: guest,
    error,
  } = useQuery({
    queryKey: ["guest"],
    queryFn: getGuest,
  });

  return { isPending, error, guest };
}
