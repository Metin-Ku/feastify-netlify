import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/useUser";
import FullPage from "./FullPage";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // * 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // * 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      console.log(isAuthenticated)
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // * 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Loader />
      </FullPage>
    );

  // * 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
