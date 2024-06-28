import { useQuery } from "@tanstack/react-query";
import { getReservation } from "../service/reservstion";
// import { getCabins } from "../../services/apiCabins";

export function useGetReservation() {
  const {
    isPending,
    data: reservation,
    error,
  } = useQuery({
    queryKey: ["reservation"],
    queryFn: getReservation,
  });

  return { isPending, error, reservation };
}
