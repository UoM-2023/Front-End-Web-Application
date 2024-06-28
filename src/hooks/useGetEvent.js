import { useQuery } from "@tanstack/react-query";
import { getEvent } from "../service/event"; 
// import { getCabins } from "../../services/apiCabins";

export function useGetEvent() {
  const {
    isPending,
    data: event,
    error,
  } = useQuery({
    queryKey: ["event"],
    queryFn: getEvent,
  });

  return { isPending, error, event };
}
