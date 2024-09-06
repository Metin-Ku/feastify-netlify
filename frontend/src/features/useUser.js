import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });


  // useEffect(() => {
  //   // Component yüklendiğinde veya user değiştiğinde çalışacak kod bloğu
  //   if (user) {
  //     console.log("User:", user.data.user.isAuthenticated);
  //   }
  // }, [user]);
  return { isLoading, user, isAuthenticated: user?.data.user.isAuthenticated === true };
}
