import { useEffect } from "react";
import React from "react";

export const useIsMount = () => {
  const isMounted = React.useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
};
