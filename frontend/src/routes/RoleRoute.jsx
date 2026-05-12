import {
  Navigate,
} from "react-router-dom";

export default function RoleRoute({
  children,
  roles,
}) {

  //////////////////////////////////////////////////////
  // USER
  //////////////////////////////////////////////////////
  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  //////////////////////////////////////////////////////
  // NO USER
  //////////////////////////////////////////////////////
  if (!user) {

    return (
      <Navigate
        to="/login"
      />
    );
  }

  //////////////////////////////////////////////////////
  // INVALID ROLE
  //////////////////////////////////////////////////////
  if (
    !roles.includes(
      user.role
    )
  ) {

    return (
      <Navigate
        to="/unauthorized"
      />
    );
  }

  return children;
}