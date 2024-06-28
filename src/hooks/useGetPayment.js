import { useQuery } from "@tanstack/react-query";
import { getPayment } from "../service/payment"; 
// import { getCabins } from "../../services/apiCabins";

export function useGetPayment() {
  const {
    isPending,
    data: payment,
    error,
  } = useQuery({
    queryKey: ["payment"],
    queryFn: getPayment,
  });

  return { isPending, error, payment };
}