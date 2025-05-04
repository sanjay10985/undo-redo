import React, { useEffect, useState } from "react";

export default function FunctionalErrorBoundary({ children, fallback }) {
  const [error, setError] = useState();

  useEffect(() => {
    try {
      // Assume we can run some rendering logic here
    } catch (err) {
      setError(err);
    }
  }, []);

  if (error) {
    return fallback || <h1>Something went wrong.</h1>;
  }

  return children;
}
