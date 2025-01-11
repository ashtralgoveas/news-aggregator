import React from "react";
import { Link } from "react-router-dom";

export const NotRouteFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 Not Found</h1>
      <p>Oops! The page does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};
