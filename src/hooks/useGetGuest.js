import { useQuery } from "@tanstack/react-query";
import { getGuest } from "../service/guest";

//custum hook
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
