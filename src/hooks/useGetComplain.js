import { useQuery } from "@tanstack/react-query";
import { getComplain } from "../service/complains"; 
// import { getCabins } from "../../services/apiCabins";

export function useGetComplain() {
  const {
    isPending,
    data: complain,
    error,
  } = useQuery({
    queryKey: ["complain"],
    queryFn: getComplain,
  });

  return { isPending, error, complain };
}
