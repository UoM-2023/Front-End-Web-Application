import { useQuery } from "@tanstack/react-query";
import { getMaintanance } from "../service/maintanance"; 
// import { getCabins } from "../../services/apiCabins";

export function useGetMaintanance() {
  const {
    isPending,
    data: maintanance,
    error,
  } = useQuery({
    queryKey: ["maintanance"],
    queryFn: getMaintanance,
  });

  return { isPending, error, maintanance };
}
